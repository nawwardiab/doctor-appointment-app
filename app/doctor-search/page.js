"use client"; // Marks this as a client-side component

// Import necessary styles and components
import styles from "./DoctorSearch.module.css";
import { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import DoctorCard from "@/components/doctor-search/DoctorCard";
import FilterSection from "@/components/doctor-search/FilterSection";
import MapView from "@/components/doctor-search/MapView";
import CalendarView from "@/components/doctor-search/CalendarView";

export default function DoctorSearch() {
  // Access global state and router
  const { state, dispatch } = useAppContext();
  const router = useRouter();

  // Initialize viewMode in global state if not present
  useEffect(() => {
    if (!state.viewMode) {
      dispatch({ type: "SET_VIEW_MODE", payload: "list" });
    }
  }, [dispatch, state.viewMode]);

  // Handler for filter changes
  const handleFilterChange = (newFilters) => {
    dispatch({
      type: "SET_SEARCH_FILTERS",
      payload: newFilters,
    });
  };

  // Handler for doctor selection
  const handleDoctorSelect = (doctor) => {
    // Update selected doctor in global state
    dispatch({
      type: "SET_SELECTED_DOCTOR",
      payload: doctor,
    });
    // Navigate to appointment booking page
    router.push(`/appointment-booking?doctorId=${doctor.id}`);
  };

  // Fetch doctors data on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("/api/doctors");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        // Update doctors list in global state
        dispatch({ type: "SET_DOCTORS", payload: data });
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, [dispatch]);

  // Filter doctors based on selected filters
  const filteredDoctors = state.doctors.filter((doctor) => {
    const query = state.searchFilters.searchQuery.toLowerCase();

    return (
      // Filter by searchQuery
      !state.searchFilters.searchQuery ||
      doctor.name.toLowerCase().includes(query) ||
      // Filter by specialty if selected

      doctor.specialty.toLowerCase().includes(query) ||
      // Filter by language if selected

      doctor.languages.some((lang) => lang.toLowerCase().includes(query))
    );
  });

  return (
    <div className={styles.doctorSearchPage}>
      {/* Header section with title and view toggle */}
      <div className={styles.searchHeader}>
        <h1>Find Your Doctor</h1>
        <div className={styles.viewToggle}>
          {/* List view toggle button */}
          <button
            className={`${styles.viewButton} ${
              state.viewMode === "list" ? styles.active : ""
            }`}
            onClick={() => dispatch({ type: "SET_VIEW_MODE", payload: "list" })}
          >
            List View
          </button>
          {/* Map view toggle button */}
          <button
            className={`${styles.viewButton} ${
              state.viewMode === "map" ? styles.active : ""
            }`}
            onClick={() => dispatch({ type: "SET_VIEW_MODE", payload: "map" })}
          >
            Map View
          </button>
        </div>
      </div>

      {/* Main content section */}
      <div className={styles.mainContent}>
        {/* Filter section component */}
        <FilterSection
          filters={state.searchFilters}
          setFilters={handleFilterChange}
        />

        {/* Results container */}
        <div className={styles.resultsContainer}>
          {/* Conditional rendering based on view mode */}
          {state.viewMode === "list" ? (
            <div className={styles.doctorList}>
              {filteredDoctors.length > 0 ? (
                // Map through filtered doctors and render DoctorCard for each
                filteredDoctors.map((doctor) => (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    onBookAppointment={() => handleDoctorSelect(doctor)}
                  />
                ))
              ) : (
                // Show message when no doctors match filters
                <div className={styles.noResults}>
                  No doctors found matching your criteria
                </div>
              )}
            </div>
          ) : (
            // Render map view if not in list view
            <MapView doctors={filteredDoctors} />
          )}

          {/* Calendar section */}
          {/* <div className={styles.calendarSection}>
            <CalendarView selectedDoctor={state.selectedDoctor} />
          </div> */}
        </div>
      </div>
    </div>
  );
}
