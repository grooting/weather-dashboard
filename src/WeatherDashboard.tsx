import { SearchAppBar } from "./SearchBarApp";
import { City } from "./City";
import { CityForecast } from "./CityForecast";
import Stack from "@mui/material/Stack";

export function WeatherDashboard() {
  // https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude=alerts,minutely,hourly&appid={APIKey}

  return (
    <>
      <SearchAppBar />
      <Stack
        spacing={2}
        style={{ marginTop: "48px" }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <City />
        <CityForecast />
      </Stack>
    </>
  );
}
