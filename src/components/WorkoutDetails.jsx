import { useWorkoutContext } from "../hooks/useWorkoutContext";

export default function WorkoutDetails({workout}) {

    const {dispatch} = useWorkoutContext()


    const handleClick = async() => {

        const response = await fetch(`http://localhost:3001/api/workouts/${workout._id}`, {
          method: "DELETE",
        });

        const data = await response.json()

        if (response.ok) {
            dispatch({ type: "DELETE_WORKOUT", payload: data})
            console.log("Workout deleted successfully", data)

        }

    }
  return (

    <div className="workout-details">
        <h4>{workout.title}</h4>
        <p><strong>Load (kg): </strong> {workout.load}</p>
        <p><strong>Reps : </strong> {workout.reps}</p>
        <p>{workout.creaTedAt}</p>
        <span onClick = {handleClick} >delete</span>

    </div>
    
  )
}
