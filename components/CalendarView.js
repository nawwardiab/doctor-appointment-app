"use client";
import { useState } from "react";
import styles from "./CalendarView.module.css";

export default function CalendarView({ selectedDoctor }) {
  // State management for selected date and time
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Initialize date-related variables
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Helper functions for calendar calculations
  // Calculate total number of days in a given month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get the day of week (0-6) for the first day of the month
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  // Generate the calendar grid including empty days and actual dates
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Fill in empty cells for days before the month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className={styles.emptyDay}></div>);
    }

    // Generate buttons for each day of the month
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
          disabled={date < today} // Disable past dates
        >
          {day}
        </button>
      );
    }

    return days;
  };

  // Generate available time slots for the selected date
  const generateTimeSlots = () => {
    if (!selectedDate) return [];

    // TODO: Replace with actual availability data from API/backend
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

  // Handler for date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time selection when date changes
  };

  // Array of month names for display purposes
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
      {/* Calendar header showing current month and year */}
      <div className={styles.calendarHeader}>
        <h2>
          {monthNames[currentMonth]} {currentYear}
        </h2>
      </div>

      {/* Week day labels */}
      <div className={styles.weekDays}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className={styles.weekDay}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid with days */}
      <div className={styles.daysGrid}>{generateCalendarDays()}</div>

      {/* Time slot section - only shown when a date is selected */}
      {selectedDate && (
        <div className={styles.timeSlotSection}>
          <h3>Available Times for {selectedDate.toLocaleDateString()}</h3>
          <div className={styles.timeSlotGrid}>{generateTimeSlots()}</div>
        </div>
      )}

      {/* Confirmation button - only shown when both date and time are selected */}
      {selectedTime && (
        <button className={styles.confirmButton}>
          Confirm Appointment for {selectedDate.toLocaleDateString()} at{" "}
          {selectedTime}
        </button>
      )}
    </div>
  );
}
