"use client";
import styles from "./DoctorSearch.module.css";
import { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation"; // Use the new router API for Next.js 15
import DoctorCard from "@/components/DoctorCard";

export default function DoctorSearch() {
  const { state, dispatch } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("/api/doctors");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        dispatch({ type: "SET_DOCTORS", payload: data });
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, [dispatch]);

  const handleDoctorClick = (doctorId) => {
    console.log(`Doctor ${doctorId} clicked`);
  };

  const handleBookAppointment = (doctorId) => {
    // Correcting the router.push function
    router.push(`/appointment-booking?doctorId=${doctorId}`);
  };

  return (
    <div className={styles.doctorSearchPage}>
      <h1>Search for Doctors</h1>
      <div className={styles.doctorList}>
        {state.doctors.length > 0 ? (
          state.doctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onClick={() => handleDoctorClick(doctor.id)}
              handleBookAppointment={() => handleBookAppointment(doctor.id)}
            />
          ))
        ) : (
          <p>Loading doctors...</p>
        )}
      </div>
    </div>
  );
}
