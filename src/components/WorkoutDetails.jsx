import React from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";

import { Button } from "./ui/button";
import { Trash2, Pen } from "lucide-react";
import toast from "react-hot-toast";
import { API_URL } from "../lib/constants";

export default function WorkoutDetails({
  workout,
  setWorkoutToEdit,
  onViewWorkout,
}) {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  if (!user) {
    return null;
  }

  const handleDelete = async (e) => {
    e.stopPropagation();
    const response = await fetch(
      `${API_URL}/api/workouts/${workout._id}`,
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
      toast.success("Workout deleted successfully");
    } else {
      toast.error("Failed to delete workout");
    }
  };

  const handleEdit = (e) => {
    setWorkoutToEdit(workout);
    e.stopPropagation();
  };

  return (
    <Card
      className="w-full max-w-sm cursor-pointer hover:shadow-md transition-shadow duration-200"
      onClick={() => onViewWorkout(workout)}
    >
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
        <p className="text-sm text-gray-600">
          <strong>Category:</strong> {workout.category}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Duration:</strong> {workout.duration} minutes
        </p>
        {workout.caloriesBurned && (
          <p className="text-sm text-gray-600">
            <strong>Calories Burned:</strong> {workout.caloriesBurned}
          </p>
        )}
        {workout.notes && (
          <p className="text-sm text-gray-600">
            <strong>Notes:</strong> {workout.notes}
          </p>
        )}
        <p className="text-xs text-gray-400 mt-2">
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={handleEdit}>
          <Pen size={16} className="mr-2" />
          Edit
        </Button>
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
