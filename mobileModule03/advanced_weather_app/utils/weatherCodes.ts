import Ionicons from "@expo/vector-icons/Ionicons";

export const weatherCodeMap: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Cloudy",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Drizzle: Light",
  53: "Drizzle: Moderate",
  55: "Drizzle: Dense",
  56: "Freezing Drizzle: Light",
  57: "Freezing Drizzle: Dense",
  61: "Rain: Slight",
  63: "Rain: Moderate",
  65: "Rain: Heavy",
  66: "Freezing Rain: Light",
  67: "Freezing Rain: Heavy",
  71: "Snow fall: Slight",
  73: "Snow fall: Moderate",
  75: "Snow fall: Heavy",
  77: "Snow grains",
  80: "Rain showers: Slight",
  81: "Rain showers: Moderate",
  82: "Rain showers: Violent",
  85: "Snow showers: Slight",
  86: "Snow showers: Heavy",
  96: "Thuderstorm with slight hail",
};


export const getWeatherIcon = (
  code: number
): keyof typeof Ionicons.glyphMap => {
  if (code === 0) return "sunny";
  if (code <= 2) return "partly-sunny";
  if (code === 3 || code === 45 || code === 48) return "cloud";
  if (code >= 51 && code <= 67) return "rainy";
  if (code >= 71 && code <= 77) return "snow";
  if (code >= 80 && code <= 82) return "rainy";
  if (code === 96) return "thunderstorm";

  return "cloud";
};