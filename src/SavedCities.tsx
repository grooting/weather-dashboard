import { Stack } from "@mui/system";

export function SavedCities(props: any){
    return (
        <Stack
            spacing={2}
            style={{ marginTop: "48px" }}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <h1>Saved Cities</h1>
            {props.savedCities.map((city: string) => (
                <h3>{city}</h3>
            ))}
        </Stack>
    );
}