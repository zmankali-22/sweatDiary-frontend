import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

export default function WorkoutForm() {

  const {dispatch} =  useWorkoutContext()
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    const response = await fetch("http://localhost:3001/api/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workout),
    });

    const json = await response.json();

    if (!response.ok) {
        setError(json.error)

    }
    if (response.ok) {
       
        setTitle("");
        setLoad("");
        setReps("");
        setError(null);
        console.log("New workout added successfully", json)
        dispatch({ type: "CREATE_WORKOUT", payload: json })
  
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Workout</h3>
      <label htmlFor="">Exrecise Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="">Load (kg):</label>
      <input
        type="number"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
      />
      <label htmlFor="">Reps:</label>
      <input
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />
      <button type="submit">Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
