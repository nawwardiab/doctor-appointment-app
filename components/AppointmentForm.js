"use client"; // Marks this as a client-side component

import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import CalendarView from "./doctor-search/CalendarView";
import Notification from "./Notification";
import styles from "./AppointmentForm.module.css";

export default function AppointmentForm({ doctorId, selectedSlot }) {
  // Initialize state variables
  const { state, dispatch } = useAppContext();
  const [step, setStep] = useState(1); // Current form step
  const [notification, setNotification] = useState({ message: "", type: "" }); // Notification state
  const [showCalendar, setShowCalendar] = useState(false); // Calendar visibility
  const [selectedDate, setSelectedDate] = useState(null); // Selected appointment date
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]); // Available time slots
  const [initialSlotSet, setInitialSlotSet] = useState(false); // Track if initial slot is set
  const [isChangingTime, setIsChangingTime] = useState(false); // Track if user is changing time

  const { bookingData } = state;
  const doctor = state.doctors.find((d) => d.id === parseInt(doctorId));

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "SET_BOOKING_DATA",
      payload: {
        ...bookingData,
        [name]: value,
      },
    });
  };

  // Initialize booking data when component mounts
  useEffect(() => {
    if (!initialSlotSet && selectedSlot && doctor) {
      dispatch({
        type: "SYNC_SELECTED_SLOT",
        payload: selectedSlot,
      });
      setSelectedDate(selectedSlot.date);
      setInitialSlotSet(true);
    }
  }, [selectedSlot, doctor, dispatch, initialSlotSet]);

  const totalSteps = selectedSlot ? 2 : 3; // Determine total steps based on slot selection

  // Handle date selection
  const handleDateSelect = (date) => {
    console.log("Date selected:", date);
    setSelectedDate(date);

    if (doctor?.availability) {
      // Find available time slots for selected date
      const dateAvailability = doctor.availability.find(
        (slot) => slot.date === date
      );
      console.log("Date availability:", dateAvailability);

      if (dateAvailability) {
        setAvailableTimeSlots(dateAvailability.times);
        console.log("Setting available times:", dateAvailability.times);
      } else {
        setAvailableTimeSlots([]);
      }
    }
  };

  // Handle time slot selection
  const handleTimeSelect = (timeValue) => {
    console.log("Time slot selected:", timeValue);
    console.log("Selected date:", selectedDate);

    if (!selectedDate || !timeValue) {
      console.error("Missing date or time value");
      return;
    }

    // Create new appointment slot
    const newSlot = {
      date: selectedDate,
      time: timeValue,
      day: new Date(selectedDate).toLocaleDateString("en-US", {
        weekday: "long",
      }),
    };

    console.log("Created new slot:", newSlot);

    // Update booking data in global state
    dispatch({
      type: "SET_BOOKING_DATA",
      payload: {
        ...bookingData,
        selectedDate: selectedDate,
        selectedTime: timeValue,
      },
    });

    // Sync selected slot in global state
    dispatch({
      type: "SYNC_SELECTED_SLOT",
      payload: newSlot,
    });
  };

  // Handle viewing booking details
  const handleSeeBookingDetails = () => {
    const newSlot = {
      date: selectedDate,
      time: bookingData.selectedTime,
      day: new Date(selectedDate).toLocaleDateString("en-US", {
        weekday: "long",
      }),
    };

    dispatch({
      type: "SYNC_SELECTED_SLOT",
      payload: newSlot,
    });

    setIsChangingTime(false);
    setShowCalendar(false);
    setStep(3);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      setStep(2);
      return;
    }

    // Handle final submission in step 3
    if (step === 3) {
      try {
        // Here you would typically make an API call to save the appointment
        setNotification({
          message: "Appointment booked successfully!",
          type: "success",
        });
      } catch (error) {
        setNotification({
          message: "Error booking appointment. Please try again.",
          type: "error",
        });
      }
    }
  };

  // Validate if booking details can be viewed
  const canSeeBookingDetails = () => {
    console.log("Checking can see booking details:");
    console.log("Is changing time:", isChangingTime);
    console.log("Selected slot:", state.selectedSlot);
    console.log("Booking data:", bookingData);

    if (isChangingTime) {
      return state.selectedSlot?.time != null;
    }
    return state.selectedSlot != null;
  };

  // Render available time slots
  const renderTimeSlots = () => {
    console.log("Rendering time slots:", {
      selectedDate,
      availableTimeSlots,
    });

    if (!selectedDate || !availableTimeSlots?.length) {
      return null;
    }

    return (
      <div className={styles.timeSlotSection}>
        <h4>Available Times for {selectedDate}</h4>
        <div className={styles.timeSlotGrid}>
          {availableTimeSlots.map((time) => (
            <button
              key={`${selectedDate}-${time}`}
              type="button"
              className={`${styles.timeSlot} ${
                state.selectedSlot?.time === time ? styles.selected : ""
              }`}
              onClick={() => handleTimeSelect(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Render step one of the form
  const renderStepOne = () => {
    return (
      <div className={styles.formStep}>
        <div className={styles.formField}>
          <label htmlFor="visitedBefore">
            Have you visited this doctor before?
          </label>
          <select
            id="visitedBefore"
            name="visitedBefore"
            value={bookingData.visitedBefore}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">Select an option</option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        <div className={styles.formField}>
          <label htmlFor="purpose">Purpose of visit</label>
          <select
            id="purpose"
            name="purpose"
            value={bookingData.purpose}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">Select purpose</option>
            <option value="check up">Check Up</option>
            <option value="follow up">Follow Up</option>
            <option value="consultation">Consultation</option>
          </select>
        </div>
      </div>
    );
  };

  // Render step two of the form
  const renderStepTwo = () => {
    const activeSlot = state.selectedSlot;

    if (activeSlot && !isChangingTime) {
      return (
        <div className={styles.formStep}>
          <div className={styles.selectedAppointment}>
            <div className={styles.appointmentDetails}>
              <p>
                <strong>Day:</strong> {activeSlot.day}
              </p>
              <p>
                <strong>Date:</strong> {activeSlot.date}
              </p>
              <p>
                <strong>Time:</strong> {activeSlot.time}
              </p>
            </div>
            <div className={styles.appointmentActions}>
              <p className={styles.changePrompt}>
                Would you like to change this appointment time?
              </p>
              <button
                type="button"
                className={styles.selectDifferentTimeButton}
                onClick={() => {
                  setIsChangingTime(true);
                  setShowCalendar(true);
                }}
              >
                Select Different Time
              </button>
            </div>
          </div>
        </div>
      );
    }

    const availableDates = doctor?.availability?.map((slot) => slot.date) || [];

    return (
      <div className={styles.formStep}>
        <div className={styles.calendarContainer}>
          <CalendarView
            selectedDoctor={doctor}
            onDateSelect={handleDateSelect}
            availableDates={availableDates}
          />
          {renderTimeSlots()}
        </div>
      </div>
    );
  };

  // Render step three of the form (confirmation)
  const renderStepThree = () => {
    const currentSlot = state.selectedSlot;

    return (
      <div className={styles.formStep}>
        <div className={styles.confirmationBox}>
          <h3>Confirm your appointment details</h3>
          <div className={styles.confirmationDetails}>
            <div className={styles.appointmentInfo}>
              <h4>Appointment Time</h4>
              <p>
                <strong>Day:</strong>{" "}
                {new Date(currentSlot.date).toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </p>
              <p>
                <strong>Date:</strong> {currentSlot.date}
              </p>
              <p>
                <strong>Time:</strong> {currentSlot.time}
              </p>
            </div>

            <div className={styles.patientInfo}>
              <h4>Visit Information</h4>
              <p>
                <strong>First Visit:</strong>{" "}
                {bookingData.visitedBefore ? "No" : "Yes"}
              </p>
              <p>
                <strong>Purpose:</strong> {bookingData.purpose}
              </p>
            </div>

            <div className={styles.doctorInfo}>
              <h4>Doctor Information</h4>
              <p>
                <strong>Doctor:</strong> {doctor.name}
              </p>
              <p>
                <strong>Specialty:</strong> {doctor.specialty}
              </p>
              <p>
                <strong>Location:</strong> {doctor.location.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Validate if form can proceed to next step
  const canProceed = () => {
    if (step === 1) {
      return bookingData.visitedBefore && bookingData.purpose;
    }
    if (step === 2) {
      return (
        state.selectedSlot ||
        (bookingData.selectedDate && bookingData.selectedTime)
      );
    }
    return true;
  };

  // Get button text based on current step
  const getButtonText = () => {
    if (step === 3) {
      return "Confirm Appointment";
    }
    return "Next";
  };

  // Get button class based on current step
  const getButtonClass = () => {
    if (step === 3) {
      return styles.confirmButton;
    }
    if (step === 2) {
      return styles.seeDetailsButton;
    }
    return styles.nextButton;
  };

  // Handle back button click
  const handleBack = () => {
    if (step > 1) {
      if (isChangingTime && step === 2) {
        setIsChangingTime(false);
        setShowCalendar(false);

        if (selectedSlot) {
          dispatch({
            type: "SYNC_SELECTED_SLOT",
            payload: selectedSlot,
          });

          dispatch({
            type: "SET_BOOKING_DATA",
            payload: {
              ...bookingData,
              selectedDate: selectedSlot.date,
              selectedTime: selectedSlot.time,
            },
          });
        }
      }
      setStep(step - 1);
    }
  };

  // Debug logging
  useEffect(() => {
    console.log("Current step:", step);
    console.log("Selected slot:", selectedSlot);
    console.log("Booking data:", bookingData);
    console.log("Can proceed:", canProceed());
  }, [step, selectedSlot, bookingData]);

  // Step indicator component
  const StepIndicator = () => {
    return (
      <div className={styles.stepIndicator}>
        <div className={`${styles.step} ${step >= 1 ? styles.active : ""}`}>
          <div className={styles.stepNumber}>1</div>
          <span className={styles.stepLabel}>Basic Info</span>
        </div>
        <div className={styles.stepDivider} />
        <div className={`${styles.step} ${step >= 2 ? styles.active : ""}`}>
          <div className={styles.stepNumber}>2</div>
          <span className={styles.stepLabel}>Select Time</span>
        </div>
        <div className={styles.stepDivider} />
        <div className={`${styles.step} ${step >= 3 ? styles.active : ""}`}>
          <div className={styles.stepNumber}>3</div>
          <span className={styles.stepLabel}>Confirm</span>
        </div>
      </div>
    );
  };

  // Main render
  return (
    <form onSubmit={handleSubmit} className={styles.appointmentForm}>
      {/* Display notifications if any */}
      {notification.message && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
          {notification.message}
          <button
            type="button"
            className={styles.closeNotification}
            onClick={() => setNotification({ message: "", type: "" })}
          >
            ×
          </button>
        </div>
      )}

      {/* Display step indicator */}
      <StepIndicator />

      {/* Render appropriate step content */}
      {step === 1 && renderStepOne()}
      {step === 2 && renderStepTwo()}
      {step === 3 && renderStepThree()}

      {/* Form action buttons */}
      <div className={styles.formActions}>
        {step > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className={styles.backButton}
          >
            Back
          </button>
        )}
        {step === 2 ? (
          <button
            type="button"
            onClick={handleSeeBookingDetails}
            className={styles.seeDetailsButton}
            disabled={!canSeeBookingDetails()}
          >
            See Booking Details →
          </button>
        ) : (
          <button
            type="submit"
            className={step === 3 ? styles.confirmButton : styles.nextButton}
            disabled={!canProceed()}
          >
            {getButtonText()}
          </button>
        )}
      </div>
    </form>
  );
}
