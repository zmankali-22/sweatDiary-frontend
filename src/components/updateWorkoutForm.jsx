import { useState } from 'react';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';

const UpdateWorkoutForm = ({ workout, onClose }) => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState(workout.title);
  const [load, setLoad] = useState(workout.load);
  const [reps, setReps] = useState(workout.reps);
  const [duration, setDuration] = useState(workout.duration);
  const [category, setCategory] = useState(workout.category);
  const [caloriesBurned, setCaloriesBurned] = useState(workout.caloriesBurned);
  const [notes, setNotes] = useState(workout.notes);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const updatedWorkout = { title, load, reps, duration, category, caloriesBurned, notes };

    const response = await fetch(`https://sweatdiary-server.onrender.com/api/workouts/${workout._id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedWorkout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      setError(null);
      dispatch({ type: 'UPDATE_WORKOUT', payload: json });
      onClose();
    }
  };

  return (
    <form className="update-workout" onSubmit={handleSubmit}>
      <h3>Update Workout</h3>

      <label>Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
      />

      <label>Load (in kg):</label>
      <input 
        type="number" 
        onChange={(e) => setLoad(e.target.value)} 
        value={load}
      />

      <label>Reps:</label>
      <input 
        type="number" 
        onChange={(e) => setReps(e.target.value)} 
        value={reps}
      />

      <label>Duration (minutes):</label>
      <input 
        type="number" 
        onChange={(e) => setDuration(e.target.value)} 
        value={duration}
      />

      <label>Category:</label>
      <select
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      >
        <option value="Cardio">Cardio</option>
        <option value="Strength">Strength</option>
        <option value="Flexibility">Flexibility</option>
      </select>

      <label>Calories Burned:</label>
      <input 
        type="number" 
        onChange={(e) => setCaloriesBurned(e.target.value)} 
        value={caloriesBurned}
      />

      <label>Notes:</label>
      <textarea 
        onChange={(e) => setNotes(e.target.value)} 
        value={notes}
      ></textarea>

      <button>Update Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default UpdateWorkoutForm;