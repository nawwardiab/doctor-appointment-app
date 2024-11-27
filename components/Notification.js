import styles from "./Notification.module.css";

export default function Notification({ message, type }) {
  if (!message) return null;

  return (
    <div
      className={`${styles.notification} ${
        type === "success" ? styles.success : styles.error
      }`}
    >
      {message}
    </div>
  );
}
