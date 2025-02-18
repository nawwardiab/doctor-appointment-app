"use client"; // Marks this as a client-side component

import styles from "./HeroSection.module.css";
import Image from "next/image"; // Next.js optimized image component
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { debounce } from "lodash";
import { useAppContext } from "@/context/AppContext";

export default function HeroSection() {
  const { dispatch } = useAppContext();
  const [searchQuery, setSearchQuery] = useState({ doctor: "", location: "" });
  // Initialize router for programmatic navigation
  const router = useRouter();

  // Debounced search function
  const debounceSearch = useCallback(
    debounce((updatedQuery) => {
      dispatch({
        type: "SET_SEARCH_FILTERS",
        payload: {
          searchQuery: updatedQuery.doctor,
          location: updatedQuery.location,
        },
      });
    }, 300), // 300ms debounce time
    []
  );

  // Update searchQuery state and debounce dispatch
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedQuery = { ...searchQuery, [name]: value };
    setSearchQuery(updatedQuery);
    debounceSearch(updatedQuery);
  };

  // Navigate to search page on button click
  const handleSearch = () => {
    router.push("/doctor-search"); // Navigate to doctor search page
  };

  return (
    <section className={styles.heroSection}>
      {/* Hero Image Container */}
      <div className={styles.heroImageContainer}>
        <Image
          src="/images/hero-doctor.png" // Path to hero image
          alt="Healthcare professionals" // Accessibility description
          fill // Makes image fill container
          priority // Marks this as a high-priority image to load
          className={styles.heroImage} // Styling class for the image
        />
        {/* Overlay div for adding dark/gradient effect over the image */}
        <div className={styles.overlay}></div>
      </div>

      {/* Hero Content Section */}
      <div className={styles.heroContent}>
        {/* Main headline */}
        <h1 className={styles.heroTitle}>For a healthier life</h1>

        {/* Search Container */}
        <div className={styles.searchContainer}>
          {/* Doctor/Specialty Search Input */}
          <input
            type="text"
            name="doctor"
            value={searchQuery.doctor}
            placeholder="Name, field, institution"
            className={styles.searchInput}
            onChange={handleInputChange}
          />

          {/* Location Search Input */}
          <input
            type="text"
            name="location"
            value={searchQuery.location}
            placeholder="e.g., Berlin or 12043"
            className={styles.locationInput}
            onChange={handleInputChange}
          />

          {/* Search Button */}
          <button className={styles.searchButton} onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
