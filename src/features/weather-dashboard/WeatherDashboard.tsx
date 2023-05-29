import { SearchAppBar } from "./search-bar-app/SearchBarApp";
import { CurrentWeather } from "./current-weather/CurrentWeather";
import { CityForecast } from "./city-forecast/CityForecast";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import { BottomNav } from "./BottomNav";
import { SavedCities } from "./SavedCities";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchForecastAsync, fetchWeatherAsync, selectIdx, setIdx } from "./weatherDashboardSlice";

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
  const dispatch = useAppDispatch();
  // const currentWeather = useAppSelector(selectCurrentWeather);
  // const savedCities = useAppSelector(selectSavedCities);
  const idx = useAppSelector(selectIdx);

  // demo data
  useEffect(() => {
    const demoCity = "London,uk";
    getCityWeather(demoCity);
  }, []);

  const getCityWeather = (cityName: string) => {
    dispatch(fetchWeatherAsync(cityName));  // get current weather
    dispatch(fetchForecastAsync(cityName)); // get forecast
    dispatch(setIdx(0)); // view current weather
  };

  // const onToggleSave = (saving: boolean) => {
  //   const cityName = currentWeather?.name;
  //   if (saving) {
  //     // add current city to saved cities
  //     dispatch(saveCity(cityName));
  //   } else {
  //     // remove current city from saved cities
  //     dispatch(unsaveCity(cityName));
  //   }
  // }

  // const onClick = (idx: number) => {
  //   dispatch(setIdx(idx));
  // }

  return (
    <>
      <SearchAppBar onSelect={getCityWeather} />
      <Stack
        spacing={2}
        style={{ marginTop: "48px" }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {idx === 0 &&
          <>
            <CurrentWeather />
            <CityForecast />
          </>
        }
        {idx === 1 &&
          <SavedCities />
        }
      </Stack>
      <BottomNav />
    </>
  );
}