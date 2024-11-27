import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.sections}>
          {/* Company Section */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Company</h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/careers">Careers</Link>
              </li>
              <li>
                <Link href="/press">Press</Link>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Resources</h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="/help">Help Center</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Legal</h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link href="/cookies">Cookie Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Doctermine. All rights reserved.
          </p>
          <div className={styles.socialLinks}>
            {/* Add social media icons/links here */}
          </div>
        </div>
      </div>
    </footer>
  );
}
