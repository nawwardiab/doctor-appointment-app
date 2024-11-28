"use client";
import { useState, useEffect } from "react";
import styles from "./CalendarView.module.css";

export default function CalendarView({
  selectedDoctor,
  onDateSelect,
  availableDates = [],
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const isDateAvailable = (dateString) => {
    if (!Array.isArray(availableDates)) return false;
    return availableDates.includes(dateString);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDayOfMonth };
  };

  const renderCalendar = () => {
    const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentMonth);
    const days = [];
    const year = currentMonth.getFullYear();
    const month = (currentMonth.getMonth() + 1).toString().padStart(2, "0");

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className={styles.emptyDay}></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${month}-${day.toString().padStart(2, "0")}`;
      const available = isDateAvailable(dateString);
      const isSelected = dateString === selectedDate;

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
            ${isSelected ? styles.selected : ""}`}
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
      <div className={styles.header}>
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
        <h3>
          {currentMonth.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h3>
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
      <div className={styles.weekdays}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className={styles.weekday}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.days}>{renderCalendar()}</div>
    </div>
  );
}
