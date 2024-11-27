import styles from "./InfoCard.module.css";

export default function InfoCard({ title, description, image }) {
  return (
    <div className={styles.infoCard}>
      <img src={image} alt={title} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{title}</h2>
        <p className={styles.cardDescription}>{description}</p>
      </div>
    </div>
  );
}
