import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import SearchBar from "../components/searchBar";
import ResultsList from "../components/resultsList";
import TabsNavigator from "./navigation/tabsNavigator";

import { useDebouncedSearch } from "../hooks/useDebouncedSearch";
import { useGeolocation } from "../hooks/useGeoLocation";
import { useWeather } from "../hooks/useWeather";
import { useReverseGeocode } from "@/utils/useReverseGeocode";

import { City, Location } from "../utils/types";
import { ERROR_MESSAGES } from "../utils/errors";

export default function App() {
  const [input, setInput] = useState("");
  const [showResults, setShowResults] = useState(true);
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [geoCoords, setGeoCoords] = useState<{ lat: number; lon: number } | null>(null);

  const { permissionGranted, requestPermission, getLocation } = useGeolocation();
  const { results, loading: searchLoading } = useDebouncedSearch(input, setError);
  const { weather, loading: weatherLoading } = useWeather(location, setError);

  useEffect(() => {
  const init = async () => {
    const granted = await getLocation();

    if (!granted) {
      setError(ERROR_MESSAGES.GEO_DENIED);
    }
  };

  init();
  }, []);

  useEffect(() => {

    if (input.length > 0) {
      setShowResults(true);
    }
  }, [input]);

  const handleSelectCity = (city: City) => {
    setError(null);

    setLocation({
      type: "city",
      city,
      lat: city.latitude,
      lon: city.longitude,
      label: `${city.name}, ${city.admin1}, ${city.country}`,
    });

    setInput(`${city.name}, ${city.admin1}, ${city.country}`);
    setShowResults(false);
  };

  const handleSubmit = () => {
    if (!showResults) return;

    if (!results?.length) {
      setError(ERROR_MESSAGES.NOT_FOUND);
      return;
    }

    setError(null); 

    const city = results[0];

    setLocation({
      type: "city",
      city,
      lat: city.latitude,
      lon: city.longitude,
      label: `${city.name}, ${city.admin1}, ${city.country}`,
    });

    setShowResults(false);
  };

  const handleGeo = async () => {
    const geo = await getLocation();

    if ("error" in geo) {
      setError(geo.error);
      return;
    }

    const result = await useReverseGeocode(geo.lat, geo.lon);

    if ("error" in result) {
      setError(result.error);
      return;
    }
    
    setError(null);

    setLocation({
      type: "geo",
      lat: geo.lat,
      lon: geo.lon,
      label: result.label,
    });

    setShowResults(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        input={input}
        setInput={setInput}
        onSubmit={handleSubmit}
        onGeo={handleGeo}
      />
      {error && (
        <View style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          zIndex: 999,
          padding: 10,
          backgroundColor: "rgba(255,0,0,0.1)"
        }}>
        <Text style={{ color: "red", padding: 10, textAlign: "center" }}>
          {error}
        </Text>
        </View>
      )}
      <View style={{ flex: 1, marginTop: error ? 60 : 0 }}>
        {showResults && (
          <ResultsList
            results={results}
            loading={searchLoading}
            onSelect={handleSelectCity}
          />
        )}
      
      <TabsNavigator
        location={location}
        weather={weather}
        loading={weatherLoading}
      />
    </View>
    </View>
  );
}