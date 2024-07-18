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
    if (Number(load) < 1 || Number(reps) < 1) {
      setError("Load and reps must be at least 1");
      return;
    }
    const workout = { title, load, reps };
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
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form className="space-y-4 max-w-sm mx-auto mt-8" onSubmit={handleSubmit}>
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
          className={emptyFields.includes("title") ? "border-red-500" : ""}
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
          className={emptyFields.includes("load") ? "border-red-500" : ""}
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
          className={emptyFields.includes("reps") ? "border-red-500" : ""}
        />
      </div>
      
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding Workout...
          </>
        ) : (
          'Add Workout'
        )}
      </Button>
      
      {error && <ErrorMessage message={error} />}
    </form>
  );
}