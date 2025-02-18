import styles from "./CTASection.module.css";

export default function CTASection() {
  return (
    // Main CTA section container
    <section className={styles.ctaSection}>
      {/* Content container for alignment and spacing */}
      <div className={styles.container}>
        {/* Content wrapper for the CTA elements */}
        <div className={styles.content}>
          {/* Main heading for healthcare professionals */}
          <h2 className={styles.title}>Are you a doctor or therapist?</h2>

          {/* Subtitle showing social proof */}
          <p className={styles.subtitle}>
            Join over 90,000 healthcare professionals who trust Doctolib
          </p>

          {/* Call-to-action button */}
          <button className={styles.ctaButton}>Discover Our Solutions</button>
        </div>
      </div>
    </section>
  );
}
