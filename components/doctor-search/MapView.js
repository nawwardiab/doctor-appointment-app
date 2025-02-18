"use client"; // Marks this as a client-side component

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic"; // Import dynamic for lazy loading
import styles from "./MapView.module.css";

// Dynamically import Leaflet with no SSR (Server-Side Rendering)
// This is necessary because Leaflet requires window object which isn't available during SSR
const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false, // Disable server-side rendering for this component
  loading: () => (
    // Show loading state while MapComponent is being loaded
    <div className={styles.mapContainer}>
      <div className={styles.loadingMap}>Loading map...</div>
    </div>
  ),
});

// MapView component serves as a wrapper for the dynamically loaded MapComponent
export default function MapView({ doctors }) {
  // Simply render the MapComponent with the doctors prop
  return <MapComponent doctors={doctors} />;
}
