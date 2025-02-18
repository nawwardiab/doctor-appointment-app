"use client"; // Marks this as a client-side component

import { useState, useEffect } from "react";
import styles from "./CalendarView.module.css";

export default function CalendarView({ selectedDoctor, onDateSelect }) {
  // State to track current month being displayed
  const [currentMonth, setCurrentMonth] = useState(new Date());
  // State to track selected date
  const [selectedDate, setSelectedDate] = useState(null);
  // State to track availabilty
  const [availabiltyCache, setAvailabilityCache] = useState({});

  useEffect(() => {
    const fetchAvailability = async () => {
      if (!selectedDoctor || !selectedDoctor.id) {
        console.warn("Selected doctor is not defined");
        return;
      }

      const year = currentMonth.getFullYear();
      const month = (currentMonth.getMonth() + 1).toString().padStart(2, "0");
      const cacheKey = `${year}-${month}`;

      if (availabilityCache[cacheKey]) return;

      try {
        const response = await fetch(
          `/api/availability?doctorId=${selectedDoctor.id}&year=${year}&month=${month}`
        );
        if (!response.ok) throw new Error("Failed to fetch availability");
        const data = await response.json();

        setAvailabilityCache((prev) => ({
          ...prev,
          [cacheKey]: data,
        }));
      } catch (error) {
        console.error("Error fetching availability:", error);
      }
    };

    fetchAvailability();
  }, [currentMonth, selectedDoctor, availabiltyCache]);

  const currentMonthKey = `${currentMonth.getFullYear()}-${(
    currentMonth.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}`;

  const availableDates = availabiltyCache[currentMonthKey] || [];

  // Helper function to check if a date is available
  const isDateAvailable = (dateString) => {
    if (!Array.isArray(availableDates)) return false;
    return availableDates.includes(dateString);
  };

  // Helper function to get days in month and first day of month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get last day of month
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // Get day of week (0-6)
    return { daysInMonth, firstDayOfMonth };
  };

  // Function to render calendar days
  const renderCalendar = () => {
    const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentMonth);
    const days = [];
    // const year = currentMonth.getFullYear();
    // const month = (currentMonth.getMonth() + 1).toString().padStart(2, "0");

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className={styles.emptyDay}></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentMonth.getFullYear()}-${(
        currentMonth.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
      const available = isDateAvailable(dateString);
      const partiallyBooked = availableDates.some(
        (d) => d.date === dateString && d.status === "partiallyBooked"
      );

      days.push(
        <button
          key={dateString}
          onClick={() => {
            if (available) {
              setSelectedDate(dateString);
              onDateSelect(dateString);
            }
          }}
          className={`${styles.day} 
            ${available ? styles.available : styles.unavailable}
            ${selectedDate === dateString ? styles.selected : ""}
            ${partiallyBooked ? styles.partiallyBooked : ""}`}
          disabled={!available}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className={styles.calendar}>
      {/* Calendar Header with Month Navigation */}
      <div className={styles.header}>
        {/* Previous Month Button */}
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
            )
          }
          className={styles.monthButton}
        >
          ←
        </button>
        {/* Current Month and Year Display */}
        <h3>
          {currentMonth.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        {/* Next Month Button */}
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.setMonth(currentMonth.getMonth() + 1))
            )
          }
          className={styles.monthButton}
        >
          →
        </button>
      </div>

      {/* Weekday Headers */}
      <div className={styles.weekdays}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className={styles.weekday}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className={styles.days}>{renderCalendar()}</div>
    </div>
  );
}
