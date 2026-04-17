export type Location = {
  type: "city" | "geo";
  lat: number;
  lon: number;
  label: string;
  city?: City;
};

export type City = {
  id: number;
  name: string;
  admin1: string;
  country: string;
  latitude: number;
  longitude: number;
};

export type WeatherData = {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
  };
};

export type GeoResult = 
  | { lat: number; lon: number }
  | { error: string };
