import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  if (!user) {
    return null;
  }

  const handleDelete = async () => {
    const response = await fetch(
      `http://localhost:3001/api/workouts/${workout._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: data });
      console.log("Workout deleted successfully", data);
    } else {
      console.error("Failed to delete workout:", data);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{workout.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          <strong>Load:</strong> {workout.load} kg
        </p>
        <p className="text-sm text-gray-600">
          <strong>Reps:</strong> {workout.reps}
        </p>
        <p className="text-xs text-gray-400 mt-2">
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          className="ml-auto"
        >
          <Trash2 size={16} className="mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
