import { useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa"; // Import icons for filter and close buttons
import styles from "./SearchFilters.module.css";

export default function SearchFilters({ onFilterChange }) {
  // State to control filter panel visibility
  const [isOpen, setIsOpen] = useState(false);

  // State to store all filter values
  const [filters, setFilters] = useState({
    specialty: "", // Doctor's specialty (e.g., Cardiology)
    gender: "", // Doctor's gender preference
    language: "", // Preferred language
    insurance: "", // Insurance provider
    rating: "", // Minimum rating
    distance: "10", // Search radius in km (default: 10)
    videoConsultation: false, // Video consultation availability
    instantBooking: false, // Instant booking availability
  });

  // Handler for updating individual filter values
  const handleFilterChange = (name, value) => {
    const newFilters = { ...filters, [name]: value }; // Create new filters object
    setFilters(newFilters); // Update local state
    onFilterChange(newFilters); // Notify parent component
  };

  // Handler for clearing all filters
  const clearFilters = () => {
    // Reset all filters to default values
    setFilters({
      specialty: "",
      gender: "",
      language: "",
      insurance: "",
      rating: "",
      distance: "10",
      videoConsultation: false,
      instantBooking: false,
    });
    onFilterChange({}); // Notify parent with empty filters
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.activeFilters}>
        {/* Filter Toggle Button */}
        <button
          className={styles.filterToggle}
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaFilter /> Filters
        </button>

        {/* Active filter tags */}
        {Object.entries(filters).map(([key, value]) => {
          // Only show tags for non-empty and non-boolean filters
          if (value && typeof value !== "boolean") {
            return (
              <span key={key} className={styles.filterTag}>
                {value}
                {/* Remove filter button */}
                <button
                  onClick={() => handleFilterChange(key, "")}
                  className={styles.removeTag}
                >
                  <FaTimes />
                </button>
              </span>
            );
          }
          return null;
        })}
      </div>

      {/* Filter Panel (shown when isOpen is true) */}
      {isOpen && (
        <div className={styles.filterPanel}>
          {/* Specialty Filter Section */}
          <div className={styles.filterSection}>
            <h3>Specialty</h3>
            <select
              value={filters.specialty}
              onChange={(e) => handleFilterChange("specialty", e.target.value)}
            >
              <option value="">All Specialties</option>
              <option value="General Practice">General Practice</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
              {/* Add more specialties */}
            </select>
          </div>

          {/* Add more filter sections */}

          {/* Filter Action Buttons */}
          <div className={styles.filterActions}>
            {/* Clear Filters Button */}
            <button className={styles.clearButton} onClick={clearFilters}>
              Clear All
            </button>
            {/* Apply Filters Button */}
            <button
              className={styles.applyButton}
              onClick={() => setIsOpen(false)}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
