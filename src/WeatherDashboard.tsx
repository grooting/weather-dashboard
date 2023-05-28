import { SearchAppBar } from "./SearchBarApp";
import { CurrentWeather } from "./CurrentWeather";
import { CityForecast } from "./CityForecast";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useEffect } from "react";
import { API_KEY, API_URL } from "./index";
import { BottomNav } from "./BottomNav";
import { SavedCities } from "./SavedCities";

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
  date: string;
};

export function WeatherDashboard() {
  const [currentWeather, setCurrentWeather] = useState<Weather>();
  const [forecast, setForecast] = useState<WeatherPreview[]>([]);
  const [savedCities, setSavedCities] = useState<string[]>([]);
  const [idx, setIdx] = useState<number>(0);

  // demo data
  useEffect(() => {
    getCityWeather("London,uk");
  }, []);

  const getCityWeather = (cityName: string) => {
    // use city name to get current weather
    fetch(`${API_URL}/data/2.5/weather?q=${cityName}&APPID=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setCurrentWeather({
          name: data.name,
          temp: data.main.temp,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          weather: data.weather[0].main,
          icon: data.weather[0].icon,
        });
      });

    // get forecast (use q instead of lat and lon, somehow it works)
    fetch(`${API_URL}/data/2.5/forecast?q=${cityName}&APPID=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setForecast(
          data.list.map((item: any) => ({
            maxTemp: item.main.temp_max,
            minTemp: item.main.temp_min,
            weather: item.weather[0].main,
            icon: item.weather[0].icon,
            date: item.dt_txt.split(" ")[0].split("-").splice(1, 2).join("-"),
          }))
        );
      }
      );
    setIdx(0); // view current weather
  };

  const onToggleSave = (saving: boolean) => {
    const cityName = currentWeather?.name;
    if (saving) {
      // add current city to saved cities
      if (cityName && !savedCities.includes(cityName)) {
        setSavedCities([...savedCities, currentWeather?.name]);
      }
    } else {
      // remove current city from saved cities
      if (cityName && savedCities.includes(cityName)) {
        setSavedCities(savedCities.filter((city) => city !== cityName));
      }
    }
  }

  const onClick = (idx: number) => {
    setIdx(idx);
  }

  return (
    <>
      <SearchAppBar onSelect={getCityWeather} />
      {idx === 0 &&
        <Stack
          spacing={2}
          style={{ marginTop: "48px" }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CurrentWeather weather={currentWeather} onSave={onToggleSave} />
          <CityForecast forecast={forecast} />
        </Stack>
      }
      {idx === 1 &&
        <SavedCities savedCities={savedCities} />
      }
      <BottomNav onClick={onClick} idx={idx} />
    </>
  );
}