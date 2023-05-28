import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { styled, alpha } from "@mui/material/styles";
import { useEffect } from "react";
import { useState } from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

interface City {
  name: string;
  country: string;
  state: string;
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
  const [cities, setCities] = useState<City[]>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    if (query.length > 1) {
      getCitiesAsync();
    }
  }, [query]);

  const getCitiesAsync = () => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const apiUrl = process.env.REACT_APP_WEATHER_API_URL;
    fetch(`${apiUrl}/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCities(data);
      });
  };

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <Autocomplete
          freeSolo
          options={cities.map((city) => `${city.name}, ${city.state}, ${city.country}`)}
          onInputChange={(event, value) => {
            setQuery(value);
          }}
          renderInput={(params) => (
            <StyledInputBase
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
