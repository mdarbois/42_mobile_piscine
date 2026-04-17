import { useEffect, useState } from "react";
import { Location } from "../utils/types";
import { ERROR_MESSAGES } from "../utils/errors";

export function useWeather(
  location: Location | null,
  setError: (msg: string | null) => void
  ) {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast` +
          `?latitude=${location.lat}` +
          `&longitude=${location.lon}` +
          `&current_weather=true` +
          `&hourly=temperature_2m,weathercode,windspeed_10m` +
          `&daily=temperature_2m_max,temperature_2m_min,weathercode` +
          `&temperature_unit=celsius` +
          `&timezone=auto`
        );

        if (!res.ok) {
          throw new Error("network");
        }

        const data = await res.json();
        setWeather(data);
        setError(null);

      } catch (err) {
        setWeather(null);
        setError(ERROR_MESSAGES.NETWORK);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);
  return { weather, loading };
}