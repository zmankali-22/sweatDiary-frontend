import React from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
import WorkoutDetails from '@/components/WorkoutDetails';
import { WorkoutContext } from '@/context/WorkoutContext';
import { AuthContext } from '@/context/AuthContext';

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

// Manually mock the @/lib/utils module
vi.mock('@/lib/utils', () => ({
  cn: (...args) => args.filter(Boolean).join(' '),
}));

// Mock the UI components
vi.mock('@/components/ui/card', () => ({
  Card: ({ children, className }) => <div data-testid="mock-card" className={className}>{children}</div>,
  CardHeader: ({ children }) => <div data-testid="mock-card-header">{children}</div>,
  CardTitle: ({ children }) => <div data-testid="mock-card-title">{children}</div>,
  CardContent: ({ children }) => <div data-testid="mock-card-content">{children}</div>,
  CardFooter: ({ children }) => <div data-testid="mock-card-footer">{children}</div>,
}));

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className }) => <button onClick={onClick} className={className}>{children}</button>,
}));

vi.mock('lucide-react', () => ({
  Trash2: () => <span>Trash2Icon</span>,
  Pen: () => <span>PenIcon</span>,
}));

vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockWorkout = {
  _id: '1',
  title: 'Test Workout',
  load: 50,
  reps: 10,
  category: 'Strength',
  duration: 30,
  caloriesBurned: 200,
  notes: 'Test notes',
  createdAt: new Date().toISOString(),
};

describe('WorkoutDetails', () => {
  test('renders workout details correctly', () => {
    render(
      <AuthContext.Provider value={{ user: { token: 'fake-token' } }}>
        <WorkoutContext.Provider value={{ dispatch: vi.fn() }}>
          <WorkoutDetails
            workout={mockWorkout}
            setWorkoutToEdit={vi.fn()}
            onViewWorkout={vi.fn()}
          />
        </WorkoutContext.Provider>
      </AuthContext.Provider>
    );

    const card = screen.getByTestId('mock-card');
    const cardContent = within(card).getByTestId('mock-card-content');

    expect(within(card).getByTestId('mock-card-title')).toHaveTextContent('Test Workout');
    
    expect(cardContent).toHaveTextContent('Load:');
    expect(cardContent).toHaveTextContent('50');
    expect(cardContent).toHaveTextContent('kg');
    
    expect(cardContent).toHaveTextContent('Reps:');
    expect(cardContent).toHaveTextContent('10');
    
    expect(cardContent).toHaveTextContent('Category:');
    expect(cardContent).toHaveTextContent('Strength');
    
    expect(cardContent).toHaveTextContent('Duration:');
    expect(cardContent).toHaveTextContent('30');
    expect(cardContent).toHaveTextContent('minutes');
    
    expect(cardContent).toHaveTextContent('Calories Burned:');
    expect(cardContent).toHaveTextContent('200');
    
    expect(cardContent).toHaveTextContent('Notes:');
    expect(cardContent).toHaveTextContent('Test notes');

    const cardFooter = within(card).getByTestId('mock-card-footer');
    expect(within(cardFooter).getByText('Edit')).toBeInTheDocument();
    expect(within(cardFooter).getByText('Delete')).toBeInTheDocument();
  });

  test('calls setWorkoutToEdit when Edit button is clicked', () => {
    const mockSetWorkoutToEdit = vi.fn();
    render(
      <AuthContext.Provider value={{ user: { token: 'fake-token' } }}>
        <WorkoutContext.Provider value={{ dispatch: vi.fn() }}>
          <WorkoutDetails
            workout={mockWorkout}
            setWorkoutToEdit={mockSetWorkoutToEdit}
            onViewWorkout={vi.fn()}
          />
        </WorkoutContext.Provider>
      </AuthContext.Provider>
    );

    const card = screen.getByTestId('mock-card');
    const cardFooter = within(card).getByTestId('mock-card-footer');
    const editButton = within(cardFooter).getByText('Edit');

    fireEvent.click(editButton);

    expect(mockSetWorkoutToEdit).toHaveBeenCalledWith(mockWorkout);
  });
});