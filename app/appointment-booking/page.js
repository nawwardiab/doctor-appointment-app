"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import AppointmentForm from "@/components/AppointmentForm";
import Image from "next/image";
import styles from "./AppointmentBooking.module.css";

export default function AppointmentBooking() {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const doctorId = searchParams.get("doctorId");
  const selectedDate = searchParams.get("date");
  const selectedTime = searchParams.get("time");

  useEffect(() => {
    if (doctorId && selectedDate && selectedTime) {
      const slot = { date: selectedDate, time: selectedTime };

      dispatch({
        type: "SYNC_SELECTED_SLOT",
        payload: slot,
      });
    }
  }, []);

  if (!doctorId) {
    return <p>Loading...</p>;
  }

  const doctor = state.doctors.find((d) => d.id === parseInt(doctorId));
  const selectedSlot =
    selectedDate && selectedTime
      ? { date: selectedDate, time: selectedTime }
      : null;

  if (!doctor) {
    return <p>Doctor not found</p>;
  }

  return (
    <div className={styles.appointmentBookingPage}>
      <div className={styles.bookingContainer}>
        <div className={styles.doctorDetails}>
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

          {selectedSlot && (
            <div className={styles.selectedSlotInfo}>
              <h3>Selected Appointment Time</h3>
              <div className={styles.slotDetails}>
                <p>
                  <strong>Day:</strong>{" "}
                  {new Date(selectedSlot.date).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </p>
                <p>
                  <strong>Date:</strong> {selectedSlot.date}
                </p>
                <p>
                  <strong>Time:</strong> {selectedSlot.time}
                </p>
              </div>
            </div>
          )}
        </div>

        <AppointmentForm doctorId={doctorId} selectedSlot={selectedSlot} />
      </div>
    </div>
  );
}
