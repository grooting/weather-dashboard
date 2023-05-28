import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { useState } from "react";

export function Favorite(props: any) {
    const [saved, setSaved] = useState(false);

    const toggleSave = () => {
        setSaved(!saved);
        props.onSave(!saved);
    }

    return (
        <IconButton color="primary" style={{ position: "absolute" }} onClick={toggleSave} >
            {saved &&
                <FavoriteIcon fontSize="large" />}
            {!saved &&
                <FavoriteBorderIcon fontSize="large" />}
        </IconButton>
    );
} 