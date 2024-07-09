import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

export default function WorkoutForm() {

  const {dispatch} =  useWorkoutContext()
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [ emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(load) < 1 || Number(reps) < 1) {
        setError("Load and reps must be at least 1");
        return;
      }

    const workout = { title, load, reps };

    const response = await fetch("http://localhost:3001/api/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workout),
    });

    const json = await response.json();

    if (!response.ok) {
        setError(json.error)
        setEmptyFields(json.emptyFields || [])

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
      <label htmlFor="title">Exrecise Title:</label>
      <input
        type="text"
        id="title"
        placeholder="Enter workout title"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={emptyFields.includes('title') ? 'error' : ''}
      />
      <label htmlFor="load">Load (kg):</label>
      <input
        type="number"
        placeholder="Enter load (kg)"
        required
        value={load}
        onChange={(e) => setLoad(e.target.value)}
        min= "1"
        className={emptyFields.includes('load')? 'error' : ''}
      />
      <label htmlFor="reps">Reps:</label>
      <input
        type="number"
        placeholder="Enter reps"
        required
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        min= "1"
        className={emptyFields.includes('reps')? 'error' : ''}
      />
      <button type="submit">Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
