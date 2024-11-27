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

export default function DoctorCard({ doctor, onBookAppointment }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    name = "",
    specialty = "",
    languages = [],
    price = 0,
    rating = 0,
    reviewCount = 0,
    image = "/default-doctor.png",
    location = { address: "" },
    nextAvailable = "No availability",
    education = [],
    acceptedInsurance = [],
    hasVideoConsultation = false,
    isVerified = false,
    practicePhotos = [],
    quickSlots = [],
  } = doctor || {};

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
              {name}{" "}
              {isVerified && <FaCheckCircle className={styles.verifiedBadge} />}
            </h2>
            <div className={styles.badges}>
              {hasVideoConsultation && (
                <span className={styles.videoBadge}>
                  <FaVideo /> Video consultation
                </span>
              )}
            </div>
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
              <span className={styles.rating}>{rating}</span>
            </div>
            <span className={styles.reviewCount}>({reviewCount} reviews)</span>
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.detailsSection}>
          <div className={styles.detailItem}>
            <span className={styles.label}>Languages</span>
            <span className={styles.value}>{languages.join(", ")}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Education</span>
            <span className={styles.value}>
              {education.map((edu, index) => (
                <div key={index} className={styles.educationItem}>
                  {edu}
                </div>
              ))}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Insurance</span>
            <span className={styles.value}>
              {acceptedInsurance.length > 0 ? (
                <div className={styles.insuranceList}>
                  {acceptedInsurance.slice(0, 3).join(", ")}
                  {acceptedInsurance.length > 3 && " + more"}
                </div>
              ) : (
                "Information not available"
              )}
            </span>
          </div>
        </div>

        <div className={styles.availabilitySection}>
          <h3>Next Available Slots</h3>
          <div className={styles.quickSlots}>
            {quickSlots.map((slot, index) => (
              <button
                key={index}
                className={styles.slotButton}
                onClick={() => onBookAppointment(slot)}
              >
                {slot.date} - {slot.time}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.practicePhotos}>
          {practicePhotos.slice(0, 3).map((photo, index) => (
            <div key={index} className={styles.photoThumbnail}>
              <Image
                src={photo}
                alt={`Practice photo ${index + 1}`}
                width={100}
                height={75}
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.location}>
          <span className={styles.address}>{location.address}</span>
          <span className={styles.price}>From {price}€</span>
        </div>
        <button
          className={styles.bookButton}
          onClick={() => onBookAppointment()}
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}
