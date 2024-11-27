"use client";
import { useState } from "react";
import styles from "./CalendarView.module.css";

export default function CalendarView({ selectedDoctor }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Get current date and month details
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Generate calendar days
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className={styles.emptyDay}></div>);
    }

    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = today.toDateString() === date.toDateString();
      const isSelected = selectedDate?.toDateString() === date.toDateString();

      days.push(
        <button
          key={day}
          className={`${styles.day} ${isToday ? styles.today : ""} ${
            isSelected ? styles.selected : ""
          }`}
          onClick={() => handleDateSelect(date)}
          disabled={date < today}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  // Generate time slots
  const generateTimeSlots = () => {
    if (!selectedDate) return [];

    // Example time slots - replace with actual availability data
    const timeSlots = [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
    ];

    return timeSlots.map((time) => (
      <button
        key={time}
        className={`${styles.timeSlot} ${
          selectedTime === time ? styles.selectedTime : ""
        }`}
        onClick={() => setSelectedTime(time)}
      >
        {time}
      </button>
    ));
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className={styles.calendarView}>
      <div className={styles.calendarHeader}>
        <h2>
          {monthNames[currentMonth]} {currentYear}
        </h2>
      </div>

      <div className={styles.weekDays}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className={styles.weekDay}>
            {day}
          </div>
        ))}
      </div>

      <div className={styles.daysGrid}>{generateCalendarDays()}</div>

      {selectedDate && (
        <div className={styles.timeSlotSection}>
          <h3>Available Times for {selectedDate.toLocaleDateString()}</h3>
          <div className={styles.timeSlotGrid}>{generateTimeSlots()}</div>
        </div>
      )}

      {selectedTime && (
        <button className={styles.confirmButton}>
          Confirm Appointment for {selectedDate.toLocaleDateString()} at{" "}
          {selectedTime}
        </button>
      )}
    </div>
  );
}
