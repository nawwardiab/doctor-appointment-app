"use client";
import { useEffect, useRef } from "react";
import styles from "./MapView.module.css";

export default function MapView({ doctors }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    // Load Google Maps Script
    const loadGoogleMaps = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      // Default center (e.g., Berlin)
      const center = { lat: 52.520008, lng: 13.404954 };

      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 12,
        styles: [
          {
            featureType: "all",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#e9e9e9" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9e9e9e" }],
          },
        ],
      });

      // Add markers for doctors
      updateMarkers();
    };

    const updateMarkers = () => {
      // Clear existing markers
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      // Add new markers
      doctors.forEach((doctor) => {
        if (doctor.location?.coordinates) {
          const marker = new window.google.maps.Marker({
            position: {
              lat: doctor.location.coordinates.lat,
              lng: doctor.location.coordinates.lng,
            },
            map: mapInstanceRef.current,
            title: doctor.name,
          });

          // Add info window
          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div class="${styles.infoWindow}">
                <h3>${doctor.name}</h3>
                <p>${doctor.specialty}</p>
                <p>${doctor.location.address}</p>
              </div>
            `,
          });

          marker.addListener("click", () => {
            infoWindow.open(mapInstanceRef.current, marker);
          });

          markersRef.current.push(marker);
        }
      });
    };

    loadGoogleMaps();

    return () => {
      // Cleanup markers when component unmounts
      if (markersRef.current) {
        markersRef.current.forEach((marker) => marker.setMap(null));
      }
    };
  }, [doctors]);

  return (
    <div className={styles.mapContainer}>
      <div ref={mapRef} className={styles.map} />
    </div>
  );
}
