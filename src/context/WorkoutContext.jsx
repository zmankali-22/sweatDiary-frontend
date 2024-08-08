import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

export const workoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        ...state,
        workouts: action.payload,
      };

    case "CREATE_WORKOUT":
      return {
        ...state,
        workouts: [action.payload, ...(state.workouts || null)],
      };

    case "DELETE_WORKOUT":
      return {
        ...state,
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        ),
      };

    case "UPDATE_WORKOUT":
      return {
        ...state,
        workouts: state.workouts.map((workout) =>
          workout._id === action.payload._id ? action.payload : workout
        ),
      };

    default:
      return state;
  }
};

export function WorkoutContextProvider({ children }) {
  const [state, dispatch] = useReducer(workoutReducer, {
    workouts: null,
  });


  return (
    <WorkoutContext.Provider value={{ ...state, dispatch}}>
      {children}
    </WorkoutContext.Provider>
  );
}
