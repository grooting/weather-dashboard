import { ListItem, ListItemButton, ListItemText, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import { List } from "@mui/material";
import { fetchForecastAsync, fetchWeatherAsync, selectSavedCities, setIdx } from "./weatherDashboardSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

export function SavedCities() {
    const dispatch = useAppDispatch();

    return (
        <Paper elevation={3} style={{ width: "60%", height: "400px", padding: "15px", maxWidth: "500px" }}>
            <Stack
                spacing={2}
                alignItems={"center"}
            >
                <h1>Saved Cities</h1>
                <List>
                    {useAppSelector(selectSavedCities).map((city: string, i: number) => {
                        return (
                            <ListItem key={i} onClick={() => {
                                dispatch(fetchWeatherAsync(city));  // get current weather
                                dispatch(fetchForecastAsync(city)); // get forecast
                                dispatch(setIdx(0)); // view current weather
                            }}>
                                <ListItemButton>
                                    <ListItemText primary={city} />
                                </ListItemButton>
                            </ListItem>);
                    })}
                </List>
            </Stack>
        </Paper>
    );
}