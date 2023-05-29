import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCities, fetchCurrentWeather } from './weatherDashboardAPI';
import { fetchForecast } from './weatherDashboardAPI';
import { Weather, WeatherPreview } from './WeatherDashboard';
import { RootState } from '../../app/store';
import { City } from './search-bar-app/SearchResults';

export interface WeatherDashboardState {
    currentWeather: Weather;
    forecast: WeatherPreview[];
    savedCities: string[];
    idx: number;
    cityResults: City[];
    currentCity: string;
};

const initialState: WeatherDashboardState = {
    currentWeather: {} as Weather,
    forecast: [],
    savedCities: [],
    idx: 0,
    cityResults: [],
    currentCity: 'London,England,GB',
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

export const fetchCitiesAsync = createAsyncThunk(
    'weatherDashboard/fetchCities',
    async (query: string) => {
        const response = await fetchCities(query);
        return response;
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
            const cityString = state.currentCity;
            const saved = state.savedCities.includes(cityString);
            if (!saved) { // saving
                if (cityString && !state.savedCities.includes(cityString)) {
                    state.savedCities.push(cityString);
                }
            } else { // un-saving
                if (cityString && state.savedCities.includes(cityString)) {
                    state.savedCities = state.savedCities.filter((city) => city !== cityString);
                }
            }
        },
        setCurrentCity: (state, action: PayloadAction<string>) => {
            state.currentCity = action.payload;
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
            })
            .addCase(fetchCitiesAsync.fulfilled, (state, action: PayloadAction<City[]>) => {
                if (state) {
                    state.cityResults = action.payload;
                }
            });
    }
});

export const selectCurrentWeather = (state: RootState) => state.weatherDashboard.currentWeather
export const selectForecast = (state: RootState) => state.weatherDashboard.forecast
export const selectSavedCities = (state: RootState) => state.weatherDashboard.savedCities
export const selectIdx = (state: RootState) => state.weatherDashboard.idx;
export const selectCurrentCity = (state: RootState) => state.weatherDashboard.currentCity;

export const { setIdx, toggleSavedCity, setCurrentCity } = weatherDashboardSlice.actions;

export default weatherDashboardSlice.reducer;

