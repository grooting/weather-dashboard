import { SearchAppBar } from "./SearchBarApp";
import { CurrentWeather } from "./CurrentWeather";
import { CityForecast } from "./CityForecast";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useEffect } from "react";
import { API_KEY, API_URL } from "./index";

export interface Weather {
  temp: number;
  humidity: number;
  windSpeed: number;
  weather: string;
  icon: string;
  name: string;
};

export interface WeatherPreview {
  maxTemp: number;
  minTemp: number;
  weather: string;
  icon: string;
};

interface WeatherResult {
  weather: Weather;
  forcast: WeatherPreview[];
};

export function WeatherDashboard() {
  const [weatherResult, setWeatherResult] = useState<WeatherResult>();

  // demo data
  useEffect(() => {
    getCityWeather("London,uk");
  }, []);

  const getCityWeather = (cityName: string) => {
    fetch(`${API_URL}/data/2.5/weather?q=${cityName}&APPID=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWeatherResult({
          weather: {
            name: data.name,
            temp: data.main.temp,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            weather: data.weather[0].main,
            icon: data.weather[0].icon,
          },
          forcast: []
        });
      });
  };

  return (
    <>
      <SearchAppBar onSelect={getCityWeather} />
      <Stack
        spacing={2}
        style={{ marginTop: "48px" }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <CurrentWeather weather={weatherResult?.weather} />
        <CityForecast />
      </Stack>
    </>
  );
}
