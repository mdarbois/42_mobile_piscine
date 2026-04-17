import React from "react";
import { View, Text, FlatList } from "react-native";
import { weatherCodeMap } from "../../utils/weatherCodes";

export default function TodayScreen({ 
  location,
  weather,
  loading,
  error,
    }: any) {
    if (error) {
      return null;
    }
    if (loading) return <Text>Loading...</Text>;
    if (!weather?.current_weather) {
        return <Text>No data yet</Text>;
    }

  if (!weather?.hourly) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No hourly data</Text>
      </View>
    );
  }

  const { time, temperature_2m, windspeed_10m, weathercode } =
    weather.hourly;

  const today = new Date().toISOString().split("T")[0];
  const data = time.map((t: string, index: number) => ({
    time: t,
    temp: temperature_2m[index],
    wind: windspeed_10m[index],
    code: weathercode[index],
  }))
  .filter((item: any) => item.time.startsWith(today));

  const renderItem = ({ item }: any) => {
    const hour = new Date(item.time).getHours();

    return (
      <View
        style={{
          padding: 12,
          marginVertical: 6,
          backgroundColor: "#fff",
          borderRadius: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontWeight: "bold" }}>
          {hour.toString().padStart(2, "0")}:00
        </Text>

        <Text>{item.temp}°C</Text>

        <Text>{weatherCodeMap[item.code] || "Unknown"}</Text>

        <Text>{item.wind} km/h</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        {location?.label}
      </Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.time}
        renderItem={renderItem}
      />
    </View>
  );
}