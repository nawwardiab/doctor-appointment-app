"use client";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import CalendarView from "./doctor-search/CalendarView";
import Notification from "./Notification";
import styles from "./AppointmentForm.module.css";

export default function AppointmentForm({ doctorId }) {
  const { state, dispatch } = useAppContext();
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    userName: "",
    userEmail: "",
  });
  const [availableTimes, setAvailableTimes] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleDateSelect = (selectedDate) => {
    setFormData({ ...formData, date: selectedDate });

    // Find doctor availability for the selected date
    const doctor = state.doctors.find((d) => d.id === doctorId);
    if (doctor) {
      const dateAvailability = doctor.availability.find(
        (slot) => slot.date === selectedDate
      );
      setAvailableTimes(dateAvailability ? dateAvailability.times : []);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.date) {
      setNotification({
        message: "Please select a date for the appointment.",
        type: "error",
      });
      return;
    }

    if (!formData.time) {
      setNotification({
        message: "Please select a time for the appointment.",
        type: "error",
      });
      return;
    }

    const newAppointment = {
      id: state.appointments.length + 1,
      doctorId,
      userId: state.user ? state.user.id : null,
      date: formData.date,
      time: formData.time,
      status: "pending",
    };
    dispatch({
      type: "SET_APPOINTMENTS",
      payload: [...state.appointments, newAppointment],
    });
    setNotification({
      message: "Appointment booked successfully!",
      type: "success",
    });
  };

  const doctor = state.doctors.find((d) => d.id === doctorId);

  return (
    <form onSubmit={handleSubmit} className={styles.appointmentForm}>
      <h2>Book an Appointment with {doctor?.name}</h2>
      <Notification message={notification.message} type={notification.type} />
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
      <CalendarView
        availability={doctor?.availability || []}
        onDateSelect={handleDateSelect}
      />
      <label>
        Time:
        <select
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          disabled={!formData.date || availableTimes.length === 0}
        >
          <option value="" disabled>
            {availableTimes.length === 0
              ? "No available times"
              : "Select a time"}
          </option>
          {availableTimes.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>
      </label>

      <button>Confirm Appointment</button>
    </form>
  );
}
