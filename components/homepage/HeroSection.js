import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
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
