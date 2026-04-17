import React from "react";
import { View, Text, FlatList } from "react-native";
import { weatherCodeMap } from "../../utils/weatherCodes";

export default function WeeklyScreen({ 
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

  if (!weather?.daily) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No daily data</Text>
      </View>
    );
  }

  const { time, temperature_2m_max, temperature_2m_min, weathercode } =
    weather.daily;

  const data = time.map((date: string, index: number) => ({
    date,
    max: temperature_2m_max[index],
    min: temperature_2m_min[index],
    code: weathercode[index],
  }));

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);

    const day = d.toLocaleDateString("en-US", { weekday: "short" });
    const date = d.getDate();
    const month = d.toLocaleDateString("en-US", { month: "short" });

    return `${day} ${date} ${month}`;
  };

  const renderItem = ({ item }: any) => {
    return (
      <View
        style={{
          padding: 12,
          marginVertical: 6,
          backgroundColor: "#fff",
          borderRadius: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
          {formatDate(item.date)}
        </Text>

        <Text>
          Min: {item.min}°C / Max: {item.max}°C
        </Text>

        <Text>
          {weatherCodeMap[item.code] || "Unknown"}
        </Text>
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
        keyExtractor={(item) => item.date}
        renderItem={renderItem}
      />
    </View>
  );
}