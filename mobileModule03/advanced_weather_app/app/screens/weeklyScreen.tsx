import React from "react";
import { View, Text, FlatList, useWindowDimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getWeatherIcon } from "../../utils/weatherCodes";


export default function WeeklyScreen({
  location,
  weather,
  loading,
  error,
}: any) {
  if (error) return null;
  if (loading) return <Text style={{ color: "#fff" }}>Loading...</Text>;
  if (!weather?.daily) return <Text>No daily data</Text>;

  const COLORS = {
    max: "#ff6b6b",
    min: "#4dabf7",
  };

  const { width } = useWindowDimensions();

  const { time, temperature_2m_max, temperature_2m_min, weathercode } =
    weather.daily;

  const data = time.map((date: string, index: number) => ({
    date,
    max: temperature_2m_max[index],
    min: temperature_2m_min[index],
    code: weathercode[index],
  }));

  const chartData = {
    labels: data.map((d: any) =>
      new Date(d.date).toLocaleDateString("en-US", { weekday: "short" })
    ),

    datasets: [
      {
        data: data.map((d: any) => d.max),
        color: () => "#ff6b6b",
        strokeWidth: 2,
      },
      {
        data: data.map((d: any) => d.min),
        color: () => "#4dabf7",
        strokeWidth: 2,
      },
    ],

    legend: ["Max °C", "Min °C"],
  };

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);

    const day = d.toLocaleDateString("en-US", { weekday: "short" });
    const date = d.getDate();
    const month = d.toLocaleDateString("en-US", { month: "short" });

    return `${day} ${date} ${month}`;
  };

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.card}>
        <Text style={styles.date}>
          {formatDate(item.date)}
        </Text>

        <Ionicons
          name={getWeatherIcon(item.code)}
          size={22}
          color="#000"
        />

        <Text style={styles.temp}>
         <Text style={{ color: COLORS.min }}>
          {item.min}°C
          </Text>

        {"  /  "}

        <Text style={{ color: COLORS.max }}>
          {item.max}°C
        </Text>
        </Text>
        
      </View>
    );
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.location}>
        {location?.city?.name || location?.label}
      </Text>

      <Text style={styles.subLocation}>
        {location?.city
          ? `${location.city.admin1}, ${location.city.country}`
          : ""}
      </Text>

      <LineChart
        data={chartData}
        width={width - 20}
        height={200}
        bezier
        fromZero={false}
        chartConfig={{
          backgroundColor: "transparent",
          backgroundGradientFrom: "transparent",
          backgroundGradientTo: "transparent",

          decimalPlaces: 0,
          color: () => "#fff",
          labelColor: () => "rgba(255,255,255,0.7)",

          propsForDots: {
            r: "3",
            strokeWidth: "1",
            stroke: "#fff",
          },
        }}
        style={{
          marginVertical: 15,
          borderRadius: 12,
        }}
      />

      <FlatList
        data={data}
        keyExtractor={(item) => item.date}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "transparent",
  },

  location: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },

  subLocation: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    marginBottom: 10,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "rgba(255,255,255,0.85)",
    padding: 12,
    borderRadius: 12,
    marginVertical: 6,
  },

  date: {
    fontWeight: "bold",
    width: 90,
    color: "#000",
  },

  temp: {
    fontWeight: "600",
    color: "#000",
  },

  desc: {
    color: "#333",
    fontSize: 12,
    maxWidth: 120,
  },
});