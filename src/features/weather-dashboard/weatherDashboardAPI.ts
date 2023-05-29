import { API_KEY, API_URL } from "../../index";

export function fetchCurrentWeather(cityName: string) {
    return fetch(`${API_URL}/data/2.5/weather?q=${cityName}&APPID=${API_KEY}`)
        .then((response) => response.json());
}

// (use q instead of lat and lon, somehow it works)
export function fetchForecast(cityName: string) {
    return fetch(`${API_URL}/data/2.5/forecast?q=${cityName}&APPID=${API_KEY}`)
        .then((response) => response.json());
}

export function fetchCities(query: string) {
    return fetch(`${API_URL}/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`)
        .then((response) => response.json());
}