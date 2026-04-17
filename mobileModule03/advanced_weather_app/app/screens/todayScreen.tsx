import React from "react";
import { View, Text, FlatList, StyleSheet, useWindowDimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getWeatherIcon } from "../../utils/weatherCodes";

export default function TodayScreen({
  location,
  weather,
  loading,
  error,
}: any) {
  if (error) return null;
  if (loading) return <Text style={{ color: "#fff" }}>Loading...</Text>;
  if (!weather?.hourly) return <Text>No hourly data</Text>;

  const { width } = useWindowDimensions();

  const { time, temperature_2m, windspeed_10m, weathercode } =
    weather.hourly;

  const today = new Date().toISOString().split("T")[0];

  const data = time
    .map((t: string, index: number) => ({
      time: t,
      temp: temperature_2m[index],
      wind: windspeed_10m[index],
      code: weathercode[index],
    }))
    .filter((item: any) => item.time.startsWith(today));

  const chartData = {
    labels: data.map((d: any) =>
      new Date(d.time).getHours().toString()
    ),
    datasets: [
      {
        data: data.map((d: any) => d.temp),
        color: () => "#ffffff",
        strokeWidth: 2,
      },
    ],
  };

  const renderItem = ({ item }: any) => {
    const hour = new Date(item.time).getHours();

    return (
      <View style={styles.card}>
        <Text style={styles.hour}>
          {hour.toString().padStart(2, "0")}:00
        </Text>

        <Text style={styles.temp}>
          {item.temp}°C
        </Text>

        <Ionicons
          name={getWeatherIcon(item.code)}
          size={20}
          color="#000"
        />

        <Text style={styles.wind}>
          {item.wind} km/h
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

      <View style={styles.chartWrapper}>

        <Text style={styles.yAxisLabel}>°C</Text>
            <LineChart
              data={chartData}
              width={width - 20}
              height={180}
              bezier
              fromZero={false}
              yAxisSuffix="°C"
              formatYLabel={(value) => `${Math.round(Number(value))}`}
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
          <Text style={styles.xAxisLabel}>Hours</Text>
          </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.time}
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
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: "rgba(255,255,255,0.85)",
    padding: 12,
    borderRadius: 12,
    marginVertical: 6,
  },

  hour: {
    fontWeight: "bold",
    width: 50,
  },

  temp: {
    fontWeight: "600",
  },

  wind: {
    color: "#555",
    fontSize: 12,
  },
  chartWrapper: {
  position: "relative",
  alignItems: "center",
  },

  yAxisLabel: {
    position: "absolute",
    left: 0,
    top: 80,
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
  },

  xAxisLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    marginTop: 4,
  },
});