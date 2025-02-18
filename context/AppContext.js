"use client";
import { createContext, useReducer, useContext } from "react";

// Create a new Context object for the application state
const AppContext = createContext();

// Define the initial state structure for the application
const initialState = {
  user: null, // Stores current user information
  doctors: [], // List of all doctors
  appointments: [], // List of user's appointments
  selectedDoctor: null, // Currently selected doctor
  selectedSlot: null, // Selected appointment time slot
  viewMode: "list", // Display mode for doctor search (list/map)
  searchFilters: {
    // Filters for doctor search
    specialty: "", // Doctor's specialty
    language: "", // Preferred language
    availability: "", // Desired appointment date
    maxPrice: "", // Maximum price filter
    location: "", // Location preference
    searchQuery: "", // Search text input
  },
  bookingData: {
    // Appointment booking information
    visitedBefore: "", // Whether patient has visited before
    purpose: "", // Purpose of visit
    selectedDate: null, // Selected appointment date
    selectedTime: null, // Selected appointment time
  },
};

// Reducer function to handle state updates
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
      // Reset booking data to initial state
      return {
        ...state,
        bookingData: initialState.bookingData,
        selectedSlot: null,
      };
    case "SET_VIEW_MODE":
      return { ...state, viewMode: action.payload };
    case "SYNC_SELECTED_SLOT":
      // Synchronize selected slot with booking data
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

// Context Provider component
export default function AppProvider({ children }) {
  // Initialize state with reducer
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the AppContext
export function useAppContext() {
  return useContext(AppContext);
}
