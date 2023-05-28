import { ListItem, ListItemButton, ListItemText, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import { List } from "@mui/material";

export function SavedCities(props: any) {
    return (
        <Paper elevation={3} style={{ width: "60%", height: "600px", padding: "15px", maxWidth: "500px" }}>
            <Stack
                spacing={2}
                alignItems={"center"}
            >
                <h1>Saved Cities</h1>
                <List>
                    {props.savedCities.map((city: string) => {
                        return (
                            <ListItem>
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