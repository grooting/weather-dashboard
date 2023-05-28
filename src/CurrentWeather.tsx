import styles from "./CurrentWeather.module.css";
import Paper from '@mui/material/Paper';
import Stack from "@mui/material/Stack";
import { Favorite } from "./Favorite";

export function CurrentWeather(props: any) {

  return (
    <Paper elevation={3} style={{ width: "60%", height: "280px", padding: "15px", maxWidth: "500px" }}>
      <Favorite onSave={props.onSave}/>
      <Stack
        spacing={2}
        alignItems={"center"}
      >
        <img src={props.weather ? `https://openweathermap.org/img/wn/${props.weather?.icon}@2x.png` : ""} alt="weather-icon" className={styles.weatherIcon} />
        <h4>City: {props.weather?.name}<br />
          Weather: {props.weather?.weather}
        </h4>
        <h5>Tempature: {props.weather?.temp}<br />
          Humidity: {props.weather?.humidity}<br />
          Wind Speed: {props.weather?.windSpeed}
        </h5>
      </Stack>
    </Paper>
  );
}