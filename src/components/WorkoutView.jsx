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
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md w-full transform transition-all duration-300 ease-in-out scale-95 hover:scale-100">
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h2 className="text-3xl font-bold text-gray-800">
            {workout.title}
          </h2>
          <Button
            onClick={onClose}
            variant="ghost"
            className="hover:bg-gray-100 rounded-full p-2"
          >
            <X className="w-6 h-6 text-gray-600" />
          </Button>
        </div>
        <div className="space-y-2">
          <InfoItem label="Load" value={`${workout.load} kg`} />
          <InfoItem label="Reps" value={workout.reps} />
          <InfoItem
            label="Duration"
            value={`${workout.duration} minutes`}
          />
          <InfoItem
            label="Calories Burned"
            value={workout.caloriesBurned || "N/A"}
          />
          <InfoItem label="Category" value={workout.category} />
          <InfoItem
            label="Notes"
            value={workout.notes || "No notes"}
          />
          <p className="text-sm text-gray-500 italic mt-4">
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

function InfoItem({ label, value }) {
  return (
    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
      <span className="font-semibold text-gray-700">{label}:</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
}
