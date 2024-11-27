"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import styles from "./MapView.module.css";

// Dynamically import Leaflet with no SSR
const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className={styles.mapContainer}>
      <div className={styles.loadingMap}>Loading map...</div>
    </div>
  ),
});

export default function MapView({ doctors }) {
  return <MapComponent doctors={doctors} />;
}
