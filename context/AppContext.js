"use client";
import { createContext, useReducer, useContext } from "react";

// Create Context
const AppContext = createContext();

// Initialize the State
const initialState = {
  user: null,
  doctors: [],
  appointments: [],
  selectedDoctor: null,
  selectedSlot: null,
  viewMode: "list",
  searchFilters: {
    specialty: "",
    language: "",
    availability: "",
    maxPrice: "",
    location: "",
    searchQuery: "",
  },
  bookingData: {
    visitedBefore: "",
    purpose: "",
    selectedDate: null,
    selectedTime: null,
  },
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
    case "SET_SELECTED_DOCTOR":
      return { ...state, selectedDoctor: action.payload };
    case "SET_SELECTED_SLOT":
      return { ...state, selectedSlot: action.payload };
    case "SET_SEARCH_FILTERS":
      return {
        ...state,
        searchFilters: { ...state.searchFilters, ...action.payload },
      };
    case "SET_BOOKING_DATA":
      return {
        ...state,
        bookingData: { ...state.bookingData, ...action.payload },
      };
    case "RESET_BOOKING_DATA":
      return {
        ...state,
        bookingData: initialState.bookingData,
        selectedSlot: null,
      };
    case "SET_VIEW_MODE":
      return { ...state, viewMode: action.payload };
    case "SYNC_SELECTED_SLOT":
      return {
        ...state,
        selectedSlot: action.payload,
        bookingData: {
          ...state.bookingData,
          selectedDate: action.payload?.date || null,
          selectedTime: action.payload?.time || null,
        },
      };
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
