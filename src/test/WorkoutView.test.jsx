import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import WorkoutView from '../components/WorkoutView';

// Mock the date-fns function
vi.mock('date-fns/formatDistanceToNow', () => ({
  default: vi.fn(() => '2 days ago'),
}));

// Mock the imported components
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
}));

vi.mock('lucide-react', () => ({
  X: () => <div data-testid="close-icon" />,
}));

describe('WorkoutView', () => {
  const mockWorkout = {
    title: 'Test Workout',
    load: 50,
    reps: 10,
    duration: 30,
    caloriesBurned: 300,
    category: 'Strength',
    notes: 'Test notes',
    createdAt: '2023-08-10T12:00:00Z',
  };

  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  test('renders workout details correctly', () => {
    render(<WorkoutView workout={mockWorkout} onClose={mockOnClose} />);

    expect(screen.getByText('Test Workout')).toBeInTheDocument();
    expect(screen.getByText('50 kg')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('30 minutes')).toBeInTheDocument();
    expect(screen.getByText('300')).toBeInTheDocument();
    expect(screen.getByText('Strength')).toBeInTheDocument();
    expect(screen.getByText('Test notes')).toBeInTheDocument();
    expect(screen.getByText('Created 2 days ago')).toBeInTheDocument();
  });

  test('calls onClose when clicking outside the modal', () => {
    render(<WorkoutView workout={mockWorkout} onClose={mockOnClose} />);

    fireEvent.click(screen.getByTestId('modal-overlay'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when clicking the close button', () => {
    render(<WorkoutView workout={mockWorkout} onClose={mockOnClose} />);

    fireEvent.click(screen.getByTestId('close-icon'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('does not render when workout is null', () => {
    const { container } = render(<WorkoutView workout={null} onClose={mockOnClose} />);
    expect(container.firstChild).toBeNull();
  });

  test('displays N/A for missing calories burned', () => {
    const workoutWithoutCalories = { ...mockWorkout, caloriesBurned: null };
    render(<WorkoutView workout={workoutWithoutCalories} onClose={mockOnClose} />);

    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  test('displays "No notes" when notes are missing', () => {
    const workoutWithoutNotes = { ...mockWorkout, notes: '' };
    render(<WorkoutView workout={workoutWithoutNotes} onClose={mockOnClose} />);

    expect(screen.getByText('No notes')).toBeInTheDocument();
  });
});