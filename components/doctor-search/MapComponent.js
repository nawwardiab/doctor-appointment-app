"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./MapView.module.css";

export default function MapComponent({ doctors }) {
  // Refs to store DOM element and map instance
  const mapRef = useRef(null); // Reference to the map container DOM element
  const mapInstanceRef = useRef(null); // Reference to the Leaflet map instance

  useEffect(() => {
    // Early return conditions:
    // - Skip if running server-side (no window object)
    // - Skip if map container isn't mounted
    // - Skip if map is already initialized
    if (
      typeof window === "undefined" ||
      !mapRef.current ||
      mapInstanceRef.current
    ) {
      return;
    }

    // Configure default marker icon for Leaflet
    // This is necessary because Leaflet's default markers don't work well with webpack
    const defaultIcon = L.icon({
      iconUrl: "/images/marker-icon.png",
      iconRetinaUrl: "/images/marker-icon-2x.png",
      shadowUrl: "/images/marker-shadow.png",
      iconSize: [25, 41], // Size of the icon
      iconAnchor: [12, 41], // Point of the icon which corresponds to marker's location
      popupAnchor: [1, -34], // Point from which the popup should open
      shadowSize: [41, 41], // Size of the shadow
    });

    // Set the default icon for all markers
    L.Marker.prototype.options.icon = defaultIcon;

    // Initialize the map centered on Berlin coordinates
    const map = L.map(mapRef.current).setView([52.520008, 13.404954], 12);
    mapInstanceRef.current = map;

    // Add OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Add markers for each doctor location
    if (doctors && doctors.length > 0) {
      doctors.forEach((doctor) => {
        // Only add marker if doctor has location coordinates
        if (doctor.location?.coordinates) {
          const { lat, lng } = doctor.location.coordinates;
          // Create marker with popup containing doctor information
          const marker = L.marker([lat, lng])
            .bindPopup(
              `
              <div class="${styles.popupContent}">
                <h3>${doctor.name}</h3>
                <p>${doctor.specialty}</p>
                <p>${doctor.location.address}</p>
              </div>
            `
            )
            .addTo(map);
        }
      });
    }

    // Cleanup function to remove map instance when component unmounts
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [doctors]); // Re-initialize map when doctors data changes

  return (
    <div className={styles.mapContainer}>
      {/* Map container div with ref for Leaflet initialization */}
      <div ref={mapRef} className={styles.map} />
    </div>
  );
}
