"use client";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import styles from "./AppointmentForm.module.css";
export default function AppointmentForm({ doctorId }) {
  const { state, dispatch } = useAppContext();
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    userName: "",
    userEmail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointment = {
      id: state.appointments.length + 1,
      doctorId,
      userId: state.user ? state.user.id : null,
      date: `${formData.date}T${formData.time}:00Z`,
      status: "pending",
    };
    dispatch({
      type: "SET_APPOINTMENTS",
      payload: [...state.appointments, newAppointment],
    });
    alert("Appointment booked successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.appointmentForm}>
      <h1>Book an Appointment</h1>
      <label>
        Name:
        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="userEmail"
          value={formData.userEmail}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Time:
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </label>
      <button>Confirm Appointment</button>
    </form>
  );
}
