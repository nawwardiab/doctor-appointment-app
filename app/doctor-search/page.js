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
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const [filters, setFilters] = useState({
    specialty: "",
    language: "",
    availability: "",
    maxPrice: "",
  });
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'map'

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

  const filteredDoctors = state.doctors.filter((doctor) => {
    return (
      (!filters.specialty || doctor.specialty === filters.specialty) &&
      (!filters.language || doctor.languages.includes(filters.language)) &&
      (!filters.maxPrice || doctor.price <= filters.maxPrice)
    );
  });

  return (
    <div className={styles.doctorSearchPage}>
      <div className={styles.searchHeader}>
        <h1>Find Your Doctor</h1>
        <div className={styles.viewToggle}>
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
        <FilterSection filters={filters} setFilters={setFilters} />

        <div className={styles.resultsContainer}>
          {viewMode === "list" ? (
            <div className={styles.doctorList}>
              {filteredDoctors.length > 0 ? (
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
                <div className={styles.noResults}>
                  No doctors found matching your criteria
                </div>
              )}
            </div>
          ) : (
            <MapView doctors={filteredDoctors} />
          )}

          <div className={styles.calendarSection}>
            <CalendarView selectedDoctor={null} />
          </div>
        </div>
      </div>
    </div>
  );
}
