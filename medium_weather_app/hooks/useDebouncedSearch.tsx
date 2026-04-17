import { useEffect, useState } from 'react';
import { City } from '../utils/types';
import { ERROR_MESSAGES } from "../utils/errors";

export function useDebouncedSearch(
  query: string,
  setError: (msg: string | null) => void
) {
  const [results, setResults] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.length > 2) {
        fetchCities(query);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  const fetchCities = async (searchText: string) => {
    setLoading(true);

    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchText)}`
      );
      if (!res.ok) {
        throw new Error("network");
      }
      const data = await res.json();

      setResults(data.results || []);
    } catch (err) {
      setError(ERROR_MESSAGES.NETWORK);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading };
}