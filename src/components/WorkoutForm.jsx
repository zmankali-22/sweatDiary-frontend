import { useEffect, useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { API_URL } from "@/lib/constants";

const ErrorMessage = ({ message }) => (
  <Alert variant="destructive" className="mt-4">
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);

export default function WorkoutForm({
  workoutToEdit,
  setWorkoutToEdit,
  onWorkoutUpdated,
}) {
  const { dispatch } = useWorkoutContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [duration, setDuration] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuthContext();

  useEffect(() => {
    if (workoutToEdit) {
      setTitle(workoutToEdit.title);
      setLoad(workoutToEdit.load);
      setReps(workoutToEdit.reps);
      setDuration(workoutToEdit.duration);
      setCaloriesBurned(workoutToEdit.caloriesBurned || "");
      setCategory(workoutToEdit.category);
      setNotes(workoutToEdit.notes || "");
    }
  }, [workoutToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You need to be logged in to create a workout");
      return;
    }
    if (
      Number(load) < 1 ||
      Number(reps) < 1 ||
      Number(duration) < 1 ||
      Number(caloriesBurned) < 1
    ) {
      setError("Load, reps, and duration must be at least 1");
      return;
    }
    const workout = {
      title,
      load,
      reps,
      duration,
      caloriesBurned,
      category,
      notes,
    };
    setLoading(true);

    const url = workoutToEdit
      ? `${API_URL}/api/workouts/${workoutToEdit._id}`
      : `${API_URL}/api/workouts`;

    const method = workoutToEdit ? "PATCH" : "POST";
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(workout),
      });
      const json = await response.json();
      setLoading(false);
      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields || []);
      } else {
        setError(null);
        setEmptyFields([]);

        if (workoutToEdit) {
          dispatch({
            type: "UPDATE_WORKOUT",
            payload: { ...workoutToEdit, ...json },
          });
          setWorkoutToEdit(null);
        } else {
          dispatch({ type: "CREATE_WORKOUT", payload: json });
        }

        if (onWorkoutUpdated) {
          onWorkoutUpdated();
        }

        setTitle("");
        setLoad("");
        setReps("");
        setDuration("");
        setCaloriesBurned("");
        setCategory("");
        setNotes("");

        toast.success(
          workoutToEdit
            ? "Workout updated successfully"
            : "Workout added successfully"
        );
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setWorkoutToEdit(null);
    setTitle("");
    setLoad("");
    setReps("");
    setDuration("");
    setCaloriesBurned("");
    setCategory("");
    setNotes("");
    setError(null);
    setEmptyFields([]);
  };

  return (
    <form
      className="space-y-4 max-w-sm mx-auto mt-8"
      onSubmit={handleSubmit}
    >
      <h3 className="text-2xl font-bold mb-6">
        {workoutToEdit ? "Edit Workout" : "Add a New Workout"}
      </h3>

      <div className="space-y-2">
        <Label htmlFor="title">Exercise Title:</Label>
        <Input
          id="title"
          type="text"
          placeholder="Enter workout title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={
            emptyFields.includes("title") ? "border-red-500" : ""
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="load">Load (kg):</Label>
        <Input
          id="load"
          type="number"
          placeholder="Enter load (kg)"
          required
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          min="1"
          className={
            emptyFields.includes("load") ? "border-red-500" : ""
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reps">Reps:</Label>
        <Input
          id="reps"
          type="number"
          placeholder="Enter reps"
          required
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          min="1"
          className={
            emptyFields.includes("reps") ? "border-red-500" : ""
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="duration">Duration (minutes):</Label>
        <Input
          id="duration"
          type="number"
          value={duration}
          min="1"
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="caloriesBurned">Calories Burned:</Label>
        <Input
          id="caloriesBurned"
          type="number"
          value={caloriesBurned}
          min="1"
          onChange={(e) => setCaloriesBurned(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category:</Label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select a category</option>
          <option value="Cardio">Cardio</option>
          <option value="Strength">Strength</option>
          <option value="Flexibility">Flexibility</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes:</Label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex justify-between space-x-4">
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {workoutToEdit
                ? "Updating Workout..."
                : "Adding Workout..."}
            </>
          ) : workoutToEdit ? (
            "Update Workout"
          ) : (
            "Add Workout"
          )}
        </Button>

        {workoutToEdit && (
          <Button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            Cancel
          </Button>
        )}
      </div>

      {error && <ErrorMessage message={error} />}
    </form>
  );
}
