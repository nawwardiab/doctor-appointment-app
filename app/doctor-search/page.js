"use client";
import styles from "./DoctorSearch.module.css";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import DoctorCard from "@/components/DoctorCard";
import FilterSection from "@/components/FilterSection";
import MapView from "@/components/MapView";
import CalendarView from "@/components/CalendarView";

export default function DoctorSearch() {
  // Access global state and dispatch function from AppContext
  const { state, dispatch } = useAppContext();
  const router = useRouter();

  // Local state for filters and view mode
  const [filters, setFilters] = useState({
    specialty: "",
    language: "",
    availability: "",
    maxPrice: "",
  });
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'map'

  // Fetch doctors data on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("/api/doctors");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        // Update global state with fetched doctors
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
      (!filters.specialty || doctor.specialty === filters.specialty) &&
      (!filters.language || doctor.languages.includes(filters.language)) &&
      (!filters.maxPrice || doctor.price <= filters.maxPrice)
    );
  });

  return (
    <div className={styles.doctorSearchPage}>
      {/* Header section with title and view toggle */}
      <div className={styles.searchHeader}>
        <h1>Find Your Doctor</h1>
        <div className={styles.viewToggle}>
          {/* Toggle buttons for list and map views */}
          <button
            className={`${styles.viewButton} ${
              viewMode === "list" ? styles.active : ""
            }`}
            onClick={() => setViewMode("list")}
          >
            List View
          </button>
          <button
            className={`${styles.viewButton} ${
              viewMode === "map" ? styles.active : ""
            }`}
            onClick={() => setViewMode("map")}
          >
            Map View
          </button>
        </div>
      </div>

      <div className={styles.mainContent}>
        {/* Filter section component */}
        <FilterSection filters={filters} setFilters={setFilters} />

        <div className={styles.resultsContainer}>
          {/* Conditional rendering based on view mode */}
          {viewMode === "list" ? (
            <div className={styles.doctorList}>
              {filteredDoctors.length > 0 ? (
                // Map through filtered doctors and render DoctorCard components
                filteredDoctors.map((doctor) => (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    onBookAppointment={() =>
                      router.push(`/appointment-booking?doctorId=${doctor.id}`)
                    }
                  />
                ))
              ) : (
                // Display message when no doctors match the criteria
                <div className={styles.noResults}>
                  No doctors found matching your criteria
                </div>
              )}
            </div>
          ) : (
            // Render MapView component when in map mode
            <MapView doctors={filteredDoctors} />
          )}

          {/* Calendar section */}
          <div className={styles.calendarSection}>
            <CalendarView selectedDoctor={null} />
          </div>
        </div>
      </div>
    </div>
  );
}
