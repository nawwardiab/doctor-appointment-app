import styles from "./DoctorsCard.module.css";

export default function DoctorCard({ doctor, onClick, handleBookAppointment }) {
  return (
    <div className={styles.doctorCard} onClick={onClick}>
      <h2>{doctor.name}</h2>
      <p>Speciality: {doctor.specialty}</p>
      <p>Available Slots: {doctor.availability.length}</p>
      <button
        className={styles.bookButton}
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the parent onClick
          handleBookAppointment();
        }}
      >
        Book Appointment
      </button>
    </div>
  );
}
