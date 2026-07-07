import { useEffect, useState } from "react";

const DEFAULT_COORDINATES = {
  lat: 40.7128,
  lng: -74.006,
};

const DEFAULT_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
};

export const useGeolocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: {
      lat: null,
      lng: null,
    },
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    if (!navigator.geolocation) {
      // Schedule state update to avoid React lint warning about synchronous updates in effects.
      const id = window.setTimeout(() => {
        if (cancelled) return;
        setLocation({
          loaded: true,
          coordinates: {
            ...DEFAULT_COORDINATES,
          },
          error: "Geolocation is not supported by this browser.",
        });
      }, 0);

      return () => {
        cancelled = true;
        window.clearTimeout(id);
      };
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (cancelled) return;

        setLocation({
          loaded: true,
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          error: null,
        });
      },
      (error) => {
        if (cancelled) return;

        const message =
          (error && typeof error.message === "string" && error.message) ||
          "Failed to retrieve your location.";

        setLocation({
          loaded: true,
          coordinates: {
            ...DEFAULT_COORDINATES,
          },
          error: message,
        });
      },
      DEFAULT_OPTIONS
    );

    return () => {
      cancelled = true;
    };
  }, []);

  return location;
};


