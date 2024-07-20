import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const ErrorMessage = ({ message }) => (
  <Alert variant="destructive" className="mt-4">
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);

export default function WorkoutForm() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You need to be logged in to create a workout");
      return;
    }
    if (Number(load) < 1 || Number(reps) < 1 || Number(duration) < 1) {
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
    console.log("Sending workout data:", workout); // Add this line
    setLoading(true);
    const response = await fetch(
      "http://localhost:3001/api/workouts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(workout),
      }
    );
    const json = await response.json();
    console.log("Received response:", json); // Add this line
    setLoading(false);
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    } else {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      setDuration("");
      setCaloriesBurned("");
      setCategory("");
      setNotes("");

      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form
      className="space-y-4 max-w-sm mx-auto mt-8"
      onSubmit={handleSubmit}
    >
      <h3 className="text-2xl font-bold mb-6">Add a new Workout</h3>

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

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding Workout...
          </>
        ) : (
          "Add Workout"
        )}
      </Button>

      {error && <ErrorMessage message={error} />}
    </form>
  );
}
