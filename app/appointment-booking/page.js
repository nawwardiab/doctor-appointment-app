"use client";
import { useRouter, useSearchParams } from "next/navigation";
import AppointmentForm from "@/components/AppointmentForm";
import styles from "./AppointmentBooking.module.css"; // Import the CSS module

export default function AppointmentBooking() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const doctorId = searchParams.get("doctorId");

  if (!doctorId) {
    return <p>loading...</p>;
  }

  return (
    <div className={styles.appointmentBookingPage}>
      <h1 className={styles.pageHeading}>Appointment Booking</h1>
      <AppointmentForm doctorId={doctorId} />
    </div>
  );
}
