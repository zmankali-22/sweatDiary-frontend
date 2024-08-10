import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Home from '../pages/Home';
import { WorkoutContext } from '../context/WorkoutContext';
import { AuthContext } from '../context/AuthContext';
import { API_URL } from '@/lib/constants';
import { useAuthContext } from '../hooks/useAuthContext';
import { useWorkoutContext } from '../hooks/useWorkoutContext';

// Mock child components
vi.mock('../components/WorkoutDetails', () => ({
  default: ({ workout, setWorkoutToEdit, onViewWorkout }) => (
    <div data-testid={`workout-${workout._id}`}>
      {workout.title}
      <button onClick={() => setWorkoutToEdit(workout)}>Edit</button>
      <button onClick={() => onViewWorkout(workout)}>View</button>
    </div>
  ),
}));

vi.mock('../components/WorkoutForm', () => ({
  default: ({ workoutToEdit, setWorkoutToEdit, onWorkoutUpdated }) => (
    <div data-testid="workout-form">
      Workout Form
      {workoutToEdit && <p>Editing: {workoutToEdit.title}</p>}
      <button onClick={onWorkoutUpdated}>Update</button>
    </div>
  ),
}));

vi.mock('@/components/WorkoutView', () => ({
  default: ({ workout, onClose }) => (
    <div data-testid="workout-view">
      Viewing: {workout.title}
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

// Mock hooks
vi.mock('../hooks/useWorkoutContext', () => ({
  useWorkoutContext: vi.fn(),
}));

vi.mock('../hooks/useAuthContext', () => ({
  useAuthContext: vi.fn(),
}));

describe('Home Component', () => {
  const mockDispatch = vi.fn();
  const mockWorkouts = [
    { _id: '1', title: 'Workout 1' },
    { _id: '2', title: 'Workout 2' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
    
    vi.mocked(useWorkoutContext).mockReturnValue({
      workouts: mockWorkouts,
      dispatch: mockDispatch,
    });
    
    vi.mocked(useAuthContext).mockReturnValue({
      user: { token: 'fake-token' },
    });
  });

  it('renders loading state initially', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockWorkouts,
    });

    render(<Home />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('fetches and displays workouts', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockWorkouts,
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Workout 1')).toBeInTheDocument();
      expect(screen.getByText('Workout 2')).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `${API_URL}/api/workouts`,
      expect.objectContaining({
        headers: {
          Authorization: 'Bearer fake-token',
        },
      })
    );
  });

  it('handles workout editing', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockWorkouts,
    });

    render(<Home />);

    await waitFor(() => {
      fireEvent.click(screen.getAllByText('Edit')[0]);
    });

    expect(screen.getByText('Editing: Workout 1')).toBeInTheDocument();
  });

  it('handles workout viewing', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockWorkouts,
    });

    render(<Home />);

    await waitFor(() => {
      fireEvent.click(screen.getAllByText('View')[0]);
    });

    expect(screen.getByText('Viewing: Workout 1')).toBeInTheDocument();
  });

  it('displays message when no workouts are found', async () => {
    vi.mocked(useWorkoutContext).mockReturnValue({
      workouts: [],
      dispatch: mockDispatch,
    });

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText(/No workouts found/i)).toBeInTheDocument();
    });
  });

  it('displays login message when user is not authenticated', () => {
    vi.mocked(useAuthContext).mockReturnValue({
      user: null,
    });

    render(<Home />);

    expect(screen.getByText(/Please log in to view workouts/i)).toBeInTheDocument();
  });
});