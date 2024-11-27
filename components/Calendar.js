import React, { useState } from "react";
import styles from "./Calendar.module.css";

export default function Calendar({ availability, onDateSelect }) {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (e) => {
    const formattedDate = e.target.value;
    setSelectedDate(formattedDate);
    onDateSelect(formattedDate);
  };

  return (
    <div className={styles.calendar}>
      <h3>Select an Appointment Date</h3>
      <select value={selectedDate} onChange={handleDateChange}>
        <option value="" disabled>
          Select a date
        </option>
        {availability.map((slot, index) => (
          <option key={index} value={slot.date}>
            {new Date(slot.date).toLocaleDateString()}
          </option>
        ))}
      </select>
    </div>
  );
}
