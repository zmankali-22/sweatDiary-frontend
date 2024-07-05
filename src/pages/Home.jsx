import { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

export default function Home() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    // Fetch data on component mount
    const fetchWorkout = async () => {
      const response = await fetch(
        "http://localhost:3001/api/workouts"
      );
      const data = await response.json();

      if (response.ok) {
        setWorkouts(data);
      }
    };

    fetchWorkout();
  }, []);
  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
}
