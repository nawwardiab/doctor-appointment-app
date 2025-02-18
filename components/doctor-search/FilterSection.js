import styles from "./FilterSection.module.css";

export default function FilterSection({ filters, setFilters }) {
  // Array of available specialties for the dropdown
  const specialties = [
    "Cardiology",
    "Dermatology",
    "Pediatrics",
    "Orthopedics",
  ];

  // Array of available languages for the dropdown
  const languages = ["English", "German", "French", "Spanish"];

  return (
    <div className={styles.filterSection}>
      <h2>Filters</h2>

      {/* Specialty Filter Group */}
      <div className={styles.filterGroup}>
        <label>Specialty</label>
        <select
          value={filters.specialty}
          onChange={(e) =>
            setFilters({ ...filters, specialty: e.target.value })
          }
        >
          <option value="">All Specialties</option>
          {/* Map through specialties array to create options */}
          {specialties.map((specialty) => (
            <option key={specialty} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>
      </div>

      {/* Language Filter Group */}
      <div className={styles.filterGroup}>
        <label>Language</label>
        <select
          value={filters.language}
          onChange={(e) => setFilters({ ...filters, language: e.target.value })}
        >
          <option value="">All Languages</option>
          {/* Map through languages array to create options */}
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter Group */}
      <div className={styles.filterGroup}>
        <label>Max Price</label>
        <input
          type="range"
          min="0"
          max="500"
          step="50"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        />
        {/* Display selected price or "Any" if no price is selected */}
        <span>{filters.maxPrice ? `${filters.maxPrice}€` : "Any"}</span>
      </div>

      {/* Availability Date Filter Group */}
      <div className={styles.filterGroup}>
        <label>Availability</label>
        <input
          type="date"
          value={filters.availability}
          onChange={(e) =>
            setFilters({ ...filters, availability: e.target.value })
          }
        />
      </div>
    </div>
  );
}
