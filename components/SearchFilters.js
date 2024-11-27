import { useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import styles from "./SearchFilters.module.css";

export default function SearchFilters({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    specialty: "",
    gender: "",
    language: "",
    insurance: "",
    rating: "",
    distance: "10",
    videoConsultation: false,
    instantBooking: false,
  });

  const handleFilterChange = (name, value) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
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
    onFilterChange({});
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.activeFilters}>
        <button
          className={styles.filterToggle}
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaFilter /> Filters
        </button>
        {/* Active filter tags */}
        {Object.entries(filters).map(([key, value]) => {
          if (value && typeof value !== "boolean") {
            return (
              <span key={key} className={styles.filterTag}>
                {value}
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

      {isOpen && (
        <div className={styles.filterPanel}>
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

          <div className={styles.filterActions}>
            <button className={styles.clearButton} onClick={clearFilters}>
              Clear All
            </button>
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
