import { useState } from "react";
import * as ExpoLocation from "expo-location";
import { ERROR_MESSAGES } from "../utils/errors";
import { GeoResult } from "../utils/types";

export function useGeolocation() {
  const [permissionGranted, setPermissionGranted] = useState(false);

  const requestPermission = async (): Promise<boolean> => {
    const { status } =
      await ExpoLocation.requestForegroundPermissionsAsync();

    const granted = status === "granted";
    setPermissionGranted(granted);

    return granted;
  };

  const getLocation = async (): Promise<GeoResult> => {
    const granted = await requestPermission();
    if (!granted) {
      return { error: ERROR_MESSAGES.GEO_DENIED };
    }
    try {
      const pos = await ExpoLocation.getCurrentPositionAsync({});

      return {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
    } catch (e){
      return { error: ERROR_MESSAGES.GEO_DENIED };
    }
  };

  return {
    permissionGranted,
    requestPermission,
    getLocation,
  };
}