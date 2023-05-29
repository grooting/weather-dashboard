import styles from "./CurrentWeather.module.css";
import Paper from '@mui/material/Paper';
import Stack from "@mui/material/Stack";
import { FavoriteToggle } from "./FavoriteToggle";
import { selectCurrentWeather } from "../weatherDashboardSlice";
import { useAppSelector } from "../../../app/hooks";
import { API_ICON_URL } from "../../..";

export function CurrentWeather() {
  const weather = useAppSelector(selectCurrentWeather);

  return (
    <Paper elevation={3} style={{ width: "60%", height: "280px", padding: "15px", maxWidth: "500px" }}>
      <FavoriteToggle />
      <Stack
        spacing={2}
        alignItems={"center"}
      >
        <img src={weather ? `${API_ICON_URL}/${weather.icon}@2x.png` : ""} alt="weather-icon" className={styles.weatherIcon} />
        <h4>City: {weather?.name}<br />
          Weather: {weather?.weather}
        </h4>
        <h5>Tempature: {weather?.temp}<br />
          Humidity: {weather?.humidity}<br />
          Wind Speed: {weather?.windSpeed}
        </h5>
      </Stack>
    </Paper>
  );
}
