import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';

export function FavoriteToggle(props: any) {

    const toggleSave = () => {
        props.onSave(!props.saved);
    }

    return (
        <IconButton color="primary" style={{ position: "absolute" }} onClick={toggleSave} >
            {props.saved &&
                <FavoriteIcon fontSize="large" />}
            {!props.saved &&
                <FavoriteBorderIcon fontSize="large" />}
        </IconButton>
    );
} 