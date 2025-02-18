import { useState } from "react";
import Image from "next/image"; // Next.js optimized image component
import {
  FaHeart, // Filled heart icon for favorites
  FaRegHeart, // Outline heart icon for non-favorites
  FaVideo, // Video call icon
  FaCheckCircle, // Verification badge icon
  FaStar, // Star icon for ratings
} from "react-icons/fa";
import styles from "./DoctorCard.module.css";
import { useRouter } from "next/navigation";

export default function DoctorCard({ doctor, onBookAppointment }) {
  // Local state for favorite status
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  // Destructure doctor properties with default values to prevent undefined errors
  const {
    name = "", // Doctor's name
    specialty = "", // Medical specialty
    languages = [], // Languages spoken
    price = 0, // Consultation price
    rating = 0, // Doctor's rating
    image = "/default-doctor.png", // Profile image with fallback
    location = { address: "" }, // Location information
    availability = [], // Available time slots
  } = doctor || {};

  // Extract quick slots from availability
  const quickSlots = availability.map((slot) => ({
    date: slot.date,
    time: slot.times[0], // Use the first available time for quick slots
  }));

  // Handler for quick slot selection
  const handleQuickSlotSelect = (quickSlot) => {
    // Create the URL with date and time parameters
    const url = `/appointment-booking?doctorId=${doctor.id}&date=${quickSlot.date}&time=${quickSlot.time}`;
    router.push(url);
  };

  return (
    <div className={styles.doctorCard}>
      {/* Card Header Section */}
      <div className={styles.cardHeader}>
        {/* Doctor Image and Favorite Button */}
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

        {/* Doctor Information Header */}
        <div className={styles.headerInfo}>
          {/* Name and Verification Badge */}
          <div className={styles.nameSection}>
            <h2>
              {name} <FaCheckCircle className={styles.verifiedBadge} />
            </h2>
          </div>

          {/* Specialty */}
          <p className={styles.specialty}>{specialty}</p>

          {/* Rating Display */}
          <div className={styles.ratingSection}>
            <div className={styles.stars}>
              {/* Render 5 stars, filled based on rating */}
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

      {/* Main Content Section */}
      <div className={styles.mainContent}>
        {/* Details Section (Languages) */}
        <div className={styles.detailsSection}>
          <div className={styles.detailItem}>
            <span className={styles.label}>Languages</span>
            <span className={styles.value}>{languages.join(", ")}</span>
          </div>
        </div>

        {/* Quick Appointment Slots */}
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

      {/* Card Footer */}
      <div className={styles.cardFooter}>
        {/* Location and Price Information */}
        <div className={styles.location}>
          <span className={styles.address}>{location.address}</span>
          <span className={styles.price}>From {price}€</span>
        </div>
        {/* Book Appointment Button */}
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
