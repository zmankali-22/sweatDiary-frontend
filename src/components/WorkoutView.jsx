import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function WorkoutView({ workout, onClose }) {
  if (!workout) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{workout.title}</h2>
          <Button onClick={onClose} variant="ghost">
            <X className="w-6 h-6" />
          </Button>
        </div>
        <div className="space-y-2">
          <p>
            <strong>Load:</strong> {workout.load} kg
          </p>
          <p>
            <strong>Reps:</strong> {workout.reps}
          </p>
          <p>
            <strong>Duration:</strong> {workout.duration} minutes
          </p>
          <p>
            <strong>Calories Burned:</strong>{" "}
            {workout.caloriesBurned || "N/A"}
          </p>
          <p>
            <strong>Category:</strong> {workout.category}
          </p>
          <p>
            <strong>Notes:</strong> {workout.notes || "No notes"}
          </p>
          <p className="text-sm text-gray-500">
            Created{" "}
            {formatDistanceToNow(new Date(workout.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
