"use client";
import { createContext, useReducer, useContext } from "react";

// Create Context
const AppContext = createContext();

// Initialize the State
const initialState = {
  user: null,
  doctors: [],
  appointments: [],
};

// Create Reducer
function reducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_DOCTORS":
      return { ...state, doctors: action.payload };
    case "SET_APPOINTMENTS":
      return { ...state, appointments: action.payload };
    default:
      return state;
  }
}

// Create and export Context Provider
export default function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Create and export custom context hook to easily access state and dispatch functions
export function useAppContext() {
  return useContext(AppContext);
}
