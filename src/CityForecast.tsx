import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { WeatherPreview } from "./WeatherDashboard";
import styles from "./CityForecast.module.css";

interface CityForecastProps {
  forecast: WeatherPreview[];
}

export function CityForecast(props: CityForecastProps) {

  return (
    <Box sx={{ width: '100%', height: "100vh", maxWidth: 360, bgcolor: 'background.paper' }}>
      <List>
        {
          props.forecast.map((item: WeatherPreview, i: number) => {
            return (
              <ListItem disablePadding key={i}>
                <ListItemButton>
                  <ListItemText primary={item.date} />
                  <ListItemText primary={item.weather} />
                  <img src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`} alt="weather-icon" className={styles.forecastWeatherIcon} />
                  <ListItemText primary={`max: ${item.maxTemp}`} />,
                  <ListItemText primary={`min: ${item.minTemp}`} />
                </ListItemButton>
              </ListItem>
            );
          })
        }
      </List>
    </Box>
  );
}