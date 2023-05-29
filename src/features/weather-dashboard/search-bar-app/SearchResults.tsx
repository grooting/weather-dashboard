import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { styled, alpha } from "@mui/material/styles";
import { useEffect } from "react";
import { useState } from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchCitiesAsync, fetchForecastAsync, fetchWeatherAsync, setCurrentCity, setIdx } from "../weatherDashboardSlice";

export interface City {
  name: string;
  country: string;
  state: string;
  lat: number;
  lon: number;
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export function SearchResults() {
  const [query, setQuery] = useState<string>("");
  const dispatch = useAppDispatch();
  const cities = useAppSelector((state) => state.weatherDashboard.cityResults);

  useEffect(() => {
    if (query.length > 1) {
      dispatch(fetchCitiesAsync(query));
    }
  }, [query]);


  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <Autocomplete
          freeSolo
          autoComplete
          options={cities.map((city) => `${city.name}, ${city.state}, ${city.country}`)}
          onChange={(event, value) => {
            if (value) {
              const trimmed = value.replaceAll(" ", "");
              dispatch(fetchWeatherAsync(trimmed));  // get current weather
              dispatch(fetchForecastAsync(trimmed)); // get forecast
              dispatch(setCurrentCity(trimmed)); // set current city
              dispatch(setIdx(0)); // view current weather
            }
          }}
          onInputChange={(event, value) => {
            setQuery(value.replaceAll(" ", ""));
          }}
          renderInput={(params) => (
            <StyledInputBase
              key={params.id}
              ref={params.InputProps.ref}
              placeholder="Search by city name"
              inputProps={params.inputProps}
              autoFocus
            />
          )}
        />
      </Search>
    </Stack>
  );
}