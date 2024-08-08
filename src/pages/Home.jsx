import { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { workouts, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [workoutToEdit, setWorkoutToEdit] = useState(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://sweatdiary-server.onrender.com/api/workouts",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_WORKOUTS", payload: data });
        } else {
          console.error("Failed to fetch workouts");
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchWorkout();
    } else {
      setLoading(false);
    }
  }, [dispatch, user]);

  if (!user) {
    return (
      <div className="text-center mt-8">
        Please log in to view workouts.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Workouts</h1>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : workouts && workouts.length > 0 ? (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {workouts.map((workout) => (
                <WorkoutDetails
                  key={workout._id}
                  workout={workout}
                  setWorkoutToEdit={setWorkoutToEdit}
                />
              ))}
            </div>
          ) : (
            <p className="text-center">
              No workouts found. Add a new one to get started!
            </p>
          )}
        </div>
        <div className="md:col-span-4">
          <WorkoutForm
            workoutToEdit={workoutToEdit}
            setWorkoutToEdit={setWorkoutToEdit}
          />
        </div>
      </div>
    </div>
  );
}
