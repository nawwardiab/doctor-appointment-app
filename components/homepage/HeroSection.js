import styles from "./HeroSection.module.css";
import Image from "next/image"; // Import Next.js Image component

export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
      {/* Hero Image Container */}
      <div className={styles.heroImageContainer}>
        <Image
          src="/images/hero-doctor.png" // Update this path to your actual image
          alt="Healthcare professionals"
          fill
          priority
          className={styles.heroImage}
        />
        {/* Optional overlay to ensure text readability */}
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>For a healthier life</h1>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Name, field, institution"
            className={styles.searchInput}
          />
          <input
            type="text"
            placeholder="e.g., Berlin or 12043"
            className={styles.locationInput}
          />
          <button className={styles.searchButton}>Search</button>
        </div>
      </div>
    </section>
  );
}
