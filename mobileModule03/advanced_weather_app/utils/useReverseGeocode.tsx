import { ERROR_MESSAGES } from "./errors";

export type GeoLabelResult =
  | { label: string }
  | { error: string };

export async function useReverseGeocode(
  lat: number,
  lon: number
): Promise<GeoLabelResult> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      {
        headers: {
          "User-Agent": "advanced-weather-app",
        },
      }
    );

    if (!res.ok) {
      return { error: ERROR_MESSAGES.NETWORK };
    }

    const data = await res.json();
    const address = data.address;

    const city =
      address.city ||
      address.town ||
      address.village ||
      address.hamlet;

    const region = address.state;
    const country = address.country;

    if (!city && !country) {
      return { error: ERROR_MESSAGES.NOT_FOUND };
    }

    const label =
      city && region && country
        ? `${city}, ${region}, ${country}`
        : city && country
        ? `${city}, ${country}`
        : "Current location";

    return { label };
  } catch {
    return { error: ERROR_MESSAGES.NETWORK };
  }
}