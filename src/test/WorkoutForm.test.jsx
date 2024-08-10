import React from "react";
import {
  render,
  screen,
  fireEvent,
  within,
  waitFor,
} from "@testing-library/react";
import WorkoutForm from "@/components/WorkoutForm";
import { useWorkoutContext } from "@/hooks/useWorkoutContext";  // Import here
import { useAuthContext } from "@/hooks/useAuthContext"; 
import { vi } from "vitest";

// Mock the custom hooks
vi.mock('@/hooks/useAuthContext', () => ({
    useAuthContext: () => ({
      user: { token: 'fake-token' },
    }),
  }));
  
  vi.mock('@/hooks/useWorkoutContext', () => ({
    useWorkoutContext: () => ({
      dispatch: vi.fn(),
    }),
  }));

// Mock react-hot-toast
vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock the API_URL
vi.mock("@/lib/constants", () => ({
  API_URL: "http://localhost:3000",
}));

vi.mock('@/lib/utils', () => ({
    cn: (...args) => args.filter(Boolean).join(' '),
  }));

describe("WorkoutForm", () => {
  const mockSetWorkoutToEdit = vi.fn();
  const mockOnWorkoutUpdated = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  

  test("renders the form with all fields", () => {
    render(
      <WorkoutForm
        setWorkoutToEdit={mockSetWorkoutToEdit}
        onWorkoutUpdated={mockOnWorkoutUpdated}
      />
    );

    const form = screen.getByTestId("workout-form");

    expect(
      within(form).getByText("Add a New Workout")
    ).toBeInTheDocument();
    expect(
      within(form).getByLabelText("Exercise Title:")
    ).toBeInTheDocument();
    expect(
      within(form).getByLabelText("Load (kg):")
    ).toBeInTheDocument();
    expect(within(form).getByLabelText("Reps:")).toBeInTheDocument();
    expect(
      within(form).getByLabelText("Duration (minutes):")
    ).toBeInTheDocument();
    expect(
      within(form).getByLabelText("Calories Burned:")
    ).toBeInTheDocument();
    expect(
      within(form).getByLabelText("Category:")
    ).toBeInTheDocument();
    expect(within(form).getByLabelText("Notes:")).toBeInTheDocument();
    expect(
      within(form).getByRole("button", { name: "Add Workout" })
    ).toBeInTheDocument();
  });

  test("updates form fields when user types", () => {
    render(
      <WorkoutForm
        setWorkoutToEdit={mockSetWorkoutToEdit}
        onWorkoutUpdated={mockOnWorkoutUpdated}
      />
    );

    const form = screen.getByTestId("workout-form");

    const titleInput = within(form).getByLabelText("Exercise Title:");
    fireEvent.change(titleInput, {
      target: { value: "New Workout" },
    });
    expect(titleInput).toHaveValue("New Workout");

    const loadInput = within(form).getByLabelText("Load (kg):");
    fireEvent.change(loadInput, { target: { value: "50" } });
    expect(loadInput).toHaveValue(50);
  });

 
  
  test("submits the form with valid data", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({ id: "123", title: "New Workout" }),
    });

    render(
      <WorkoutForm
        setWorkoutToEdit={mockSetWorkoutToEdit}
        onWorkoutUpdated={mockOnWorkoutUpdated}
      />
    );

    const form = screen.getByTestId("workout-form");

    fireEvent.change(within(form).getByLabelText("Exercise Title:"), {
      target: { value: "New Workout" },
    });
    fireEvent.change(within(form).getByLabelText("Load (kg):"), {
      target: { value: "50" },
    });
    fireEvent.change(within(form).getByLabelText("Reps:"), {
      target: { value: "10" },
    });
    fireEvent.change(
      within(form).getByLabelText("Duration (minutes):"),
      { target: { value: "30" } }
    );
    fireEvent.change(
      within(form).getByLabelText("Calories Burned:"),
      { target: { value: "200" } }
    );
    fireEvent.change(within(form).getByLabelText("Category:"), {
      target: { value: "Strength" },
    });
    fireEvent.change(within(form).getByLabelText("Notes:"), {
      target: { value: "Test notes" },
    });

    const submitButton = within(form).getByRole("button", {
      name: "Add Workout",
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3000/api/workouts",
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
            Authorization: "Bearer fake-token",
          }),
          body: JSON.stringify({
            title: "New Workout",
            load: "50",
            reps: "10",
            duration: "30",
            caloriesBurned: "200",
            category: "Strength",
            notes: "Test notes",
          }),
        })
      );
    });
  });

  test("renders edit form when workoutToEdit is provided", () => {
    const workoutToEdit = {
      _id: "123",
      title: "Edit Workout",
      load: 60,
      reps: 12,
      duration: 45,
      caloriesBurned: 250,
      category: "Cardio",
      notes: "Edit notes",
    };

    render(
      <WorkoutForm
        workoutToEdit={workoutToEdit}
        setWorkoutToEdit={mockSetWorkoutToEdit}
        onWorkoutUpdated={mockOnWorkoutUpdated}
      />
    );

    const form = screen.getByTestId("workout-form");

    expect(
      within(form).getByText("Edit Workout")
    ).toBeInTheDocument();
    expect(
      within(form).getByLabelText("Exercise Title:")
    ).toHaveValue("Edit Workout");
    expect(within(form).getByLabelText("Load (kg):")).toHaveValue(60);
    expect(within(form).getByLabelText("Reps:")).toHaveValue(12);
    expect(
      within(form).getByLabelText("Duration (minutes):")
    ).toHaveValue(45);
    expect(
      within(form).getByLabelText("Calories Burned:")
    ).toHaveValue(250);
    expect(within(form).getByLabelText("Category:")).toHaveValue(
      "Cardio"
    );
    expect(within(form).getByLabelText("Notes:")).toHaveValue(
      "Edit notes"
    );
    expect(
      within(form).getByRole("button", { name: "Update Workout" })
    ).toBeInTheDocument();
    expect(
      within(form).getByRole("button", { name: "Cancel" })
    ).toBeInTheDocument();
  });
});
