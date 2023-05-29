import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { selectCurrentWeather, selectSavedCities, toggleSavedCity } from '../weatherDashboardSlice';

export function FavoriteToggle() {
    const dispatch = useAppDispatch();
    const weather = useAppSelector(selectCurrentWeather);
    const savedCities = useAppSelector(selectSavedCities);
    const saved = weather ? savedCities.includes(weather.name) : false

    return (
        <IconButton color="primary" style={{ position: "absolute" }} onClick={() => dispatch(toggleSavedCity())} >
            {saved &&
                <FavoriteIcon fontSize="large" />}
            {!saved &&
                <FavoriteBorderIcon fontSize="large" />}
        </IconButton>
    );
} 