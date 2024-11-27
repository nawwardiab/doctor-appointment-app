import styles from "./CTASection.module.css";

export default function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Are you a doctor or therapist?</h2>
          <p className={styles.subtitle}>
            Join over 90,000 healthcare professionals who trust Doctolib
          </p>
          <button className={styles.ctaButton}>Discover Our Solutions</button>
        </div>
      </div>
    </section>
  );
}
