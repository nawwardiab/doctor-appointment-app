import { useState } from "react";
import Image from "next/image";
import {
  FaHeart,
  FaRegHeart,
  FaVideo,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";
import styles from "./DoctorCard.module.css";
import { useRouter } from "next/navigation";

export default function DoctorCard({ doctor, onBookAppointment }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  const {
    name = "",
    specialty = "",
    languages = [],
    price = 0,
    rating = 0,
    image = "/default-doctor.png",
    location = { address: "" },
    availability = [],
  } = doctor || {};

  // Extract quick slots from availability
  const quickSlots = availability.map((slot) => ({
    date: slot.date,
    time: slot.times[0], // Use the first available time for quick slots
  }));

  const handleQuickSlotSelect = (quickSlot) => {
    // Create the URL with date and time parameters
    const url = `/appointment-booking?doctorId=${doctor.id}&date=${quickSlot.date}&time=${quickSlot.time}`;
    router.push(url);
  };

  return (
    <div className={styles.doctorCard}>
      <div className={styles.cardHeader}>
        <div className={styles.imageContainer}>
          <Image
            src={image}
            alt={name}
            width={120}
            height={120}
            className={styles.doctorImage}
          />
          <button
            className={styles.favoriteButton}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>

        <div className={styles.headerInfo}>
          <div className={styles.nameSection}>
            <h2>
              {name} <FaCheckCircle className={styles.verifiedBadge} />
            </h2>
          </div>

          <p className={styles.specialty}>{specialty}</p>

          <div className={styles.ratingSection}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < Math.floor(rating) ? styles.starFilled : styles.star
                  }
                />
              ))}
              <span className={styles.rating}>{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.detailsSection}>
          <div className={styles.detailItem}>
            <span className={styles.label}>Languages</span>
            <span className={styles.value}>{languages.join(", ")}</span>
          </div>
        </div>

        <div className={styles.availabilitySection}>
          <h3>Next Available Slots</h3>
          <div className={styles.quickSlots}>
            {quickSlots.map((quickSlot, index) => (
              <button
                key={index}
                className={styles.slotButton}
                onClick={() => handleQuickSlotSelect(quickSlot)}
              >
                {quickSlot.date} - {quickSlot.time}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.location}>
          <span className={styles.address}>{location.address}</span>
          <span className={styles.price}>From {price}€</span>
        </div>
        <button
          className={styles.bookButton}
          onClick={() => onBookAppointment(doctor)}
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}
