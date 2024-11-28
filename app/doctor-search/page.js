"use client";
import styles from "./DoctorSearch.module.css";
import { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import DoctorCard from "@/components/doctor-search/DoctorCard";
import FilterSection from "@/components/doctor-search/FilterSection";
import MapView from "@/components/doctor-search/MapView";
import CalendarView from "@/components/doctor-search/CalendarView";

export default function DoctorSearch() {
  const { state, dispatch } = useAppContext();
  const router = useRouter();

  // Initialize viewMode in global state if not present
  useEffect(() => {
    if (!state.viewMode) {
      dispatch({ type: "SET_VIEW_MODE", payload: "list" });
    }
  }, [dispatch, state.viewMode]);

  const handleFilterChange = (newFilters) => {
    dispatch({
      type: "SET_SEARCH_FILTERS",
      payload: newFilters,
    });
  };

  const handleDoctorSelect = (doctor) => {
    dispatch({
      type: "SET_SELECTED_DOCTOR",
      payload: doctor,
    });
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
        dispatch({ type: "SET_DOCTORS", payload: data });
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, [dispatch]);

  // Filter doctors based on selected filters
  const filteredDoctors = state.doctors.filter((doctor) => {
    return (
      (!state.searchFilters.specialty ||
        doctor.specialty === state.searchFilters.specialty) &&
      (!state.searchFilters.language ||
        doctor.languages.includes(state.searchFilters.language)) &&
      (!state.searchFilters.maxPrice ||
        doctor.price <= state.searchFilters.maxPrice)
    );
  });

  return (
    <div className={styles.doctorSearchPage}>
      <div className={styles.searchHeader}>
        <h1>Find Your Doctor</h1>
        <div className={styles.viewToggle}>
          <button
            className={`${styles.viewButton} ${
              state.viewMode === "list" ? styles.active : ""
            }`}
            onClick={() => dispatch({ type: "SET_VIEW_MODE", payload: "list" })}
          >
            List View
          </button>
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

      <div className={styles.mainContent}>
        <FilterSection
          filters={state.searchFilters}
          setFilters={handleFilterChange}
        />

        <div className={styles.resultsContainer}>
          {state.viewMode === "list" ? (
            <div className={styles.doctorList}>
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    onBookAppointment={() => handleDoctorSelect(doctor)}
                  />
                ))
              ) : (
                <div className={styles.noResults}>
                  No doctors found matching your criteria
                </div>
              )}
            </div>
          ) : (
            <MapView doctors={filteredDoctors} />
          )}

          <div className={styles.calendarSection}>
            <CalendarView selectedDoctor={state.selectedDoctor} />
          </div>
        </div>
      </div>
    </div>
  );
}
