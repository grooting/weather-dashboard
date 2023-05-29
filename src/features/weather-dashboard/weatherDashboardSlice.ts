import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCurrentWeather } from './weatherDashboardAPI';
import { fetchForecast } from './weatherDashboardAPI';
import { Weather, WeatherPreview } from './WeatherDashboard';
import { RootState } from '../../app/store';

export interface WeatherDashboardState {
    currentWeather: Weather;
    forecast: WeatherPreview[];
    savedCities: string[];
    idx: number;
};

const initialState: WeatherDashboardState = {
    currentWeather: {} as Weather,
    forecast: [],
    savedCities: [],
    idx: 0
};

export const fetchWeatherAsync = createAsyncThunk(
    'weatherDashboard/fetchCurrentWeather',
    async (cityName: string) => {
        const response = await fetchCurrentWeather(cityName);
        const weather = {
            name: response.name,
            temp: response.main.temp,
            humidity: response.main.humidity,
            windSpeed: response.wind.speed,
            weather: response.weather[0].main,
            icon: response.weather[0].icon,
        };
        return weather;
    }
);

export const fetchForecastAsync = createAsyncThunk(
    'weatherDashboard/fetchForecast',
    async (cityName: string) => {
        const response = await fetchForecast(cityName);
        const forecast = response.list.map((item: any) => ({
            maxTemp: item.main.temp_max,
            minTemp: item.main.temp_min,
            weather: item.weather[0].main,
            icon: item.weather[0].icon,
            date: item.dt_txt.split(" ")[0].split("-").splice(1, 2).join("-"),
        }));
        return forecast;
    }
);

export const weatherDashboardSlice = createSlice({
    name: 'weatherDashboard',
    initialState,
    reducers: {
        setIdx: (state, action: PayloadAction<number>) => {
            state.idx = action.payload;
        },
        toggleSavedCity: (state) => {
            const cityName = state.currentWeather?.name;
            const saved = state.savedCities.includes(cityName);
            if (!saved) { // saving
                if (cityName && !state.savedCities.includes(cityName)) {
                    state.savedCities.push(cityName);
                }
            } else { // un-saving
                if (cityName && state.savedCities.includes(cityName)) {
                    state.savedCities = state.savedCities.filter((city) => city !== cityName);
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeatherAsync.fulfilled, (state, action: PayloadAction<Weather>) => {
                if (state) {
                    state.currentWeather = action.payload;
                }
            })
            .addCase(fetchForecastAsync.fulfilled, (state, action: PayloadAction<WeatherPreview[]>) => {
                if (state) {
                    state.forecast = action.payload;
                }
            });
    }
});

export const selectCurrentWeather = (state: RootState) => state.weatherDashboard.currentWeather
export const selectForecast = (state: RootState) => state.weatherDashboard.forecast
export const selectSavedCities = (state: RootState) => state.weatherDashboard.savedCities
export const selectIdx = (state: RootState) => state.weatherDashboard.idx;

export const { setIdx, toggleSavedCity } = weatherDashboardSlice.actions;

export default weatherDashboardSlice.reducer;

