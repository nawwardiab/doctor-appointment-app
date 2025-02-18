"use client"; // Marks this as a client-side component

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import AppointmentForm from "@/components/AppointmentForm";
import Image from "next/image";
import styles from "./AppointmentBooking.module.css";

export default function AppointmentBooking() {
  // Access global state and dispatch function from context
  const { state, dispatch } = useAppContext();

  // Initialize router and search params hooks
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract query parameters from URL
  const doctorId = searchParams.get("doctorId"); // Get doctor ID from URL
  const selectedDate = searchParams.get("date"); // Get selected date from URL
  const selectedTime = searchParams.get("time"); // Get selected time from URL

  // Sync URL parameters with global state when component mounts
  useEffect(() => {
    if (doctorId && selectedDate && selectedTime) {
      const slot = { date: selectedDate, time: selectedTime };

      // Update selected slot in global state
      dispatch({
        type: "SYNC_SELECTED_SLOT",
        payload: slot,
      });
    }
  }, []); // Empty dependency array means this runs once on mount

  // Show loading state if no doctorId is provided
  if (!doctorId) {
    return <p>Loading...</p>;
  }

  // Find doctor details from global state
  const doctor = state.doctors.find((d) => d.id === parseInt(doctorId));

  // Create selected slot object if date and time are provided
  const selectedSlot =
    selectedDate && selectedTime
      ? { date: selectedDate, time: selectedTime }
      : null;

  // Show error state if doctor is not found
  if (!doctor) {
    return <p>Doctor not found</p>;
  }

  return (
    <div className={styles.appointmentBookingPage}>
      <div className={styles.bookingContainer}>
        {/* Doctor Details Section */}
        <div className={styles.doctorDetails}>
          {/* Doctor Header with Image and Basic Info */}
          <div className={styles.doctorHeader}>
            <Image
              src={doctor.image}
              alt={doctor.name}
              width={80}
              height={80}
              className={styles.doctorImage}
            />
            <div className={styles.doctorInfo}>
              <h2>{doctor.name}</h2>
              <p>{doctor.specialty}</p>
              <p>{doctor.location.address}</p>
            </div>
          </div>

          {/* Selected Slot Information */}
          {selectedSlot && (
            <div className={styles.selectedSlotInfo}>
              <h3>Selected Appointment Time</h3>
              <div className={styles.slotDetails}>
                {/* Display day of week */}
                <p>
                  <strong>Day:</strong>{" "}
                  {new Date(selectedSlot.date).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </p>
                {/* Display date */}
                <p>
                  <strong>Date:</strong> {selectedSlot.date}
                </p>
                {/* Display time */}
                <p>
                  <strong>Time:</strong> {selectedSlot.time}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Appointment Form Component */}
        <AppointmentForm doctorId={doctorId} selectedSlot={selectedSlot} />
      </div>
    </div>
  );
}
