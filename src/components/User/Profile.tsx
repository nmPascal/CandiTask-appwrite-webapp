import { FC } from "react";

// providers
import { useUserContext } from "../../providers";

// packages
import { Avatar, Box, Divider, Paper, Typography } from "@mui/material";
import { formatDateTime } from "../../helpers";

export const Profile: FC = (): JSX.Element => {
    const { user } = useUserContext();

    const _randomColor = () => {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    };

    if (!user) return <></>;

    return (
        <Paper
            sx={{
                p: 2,
            }}
        >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Profile
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{
                    width: 100,
                    height: 100,
                    mb: 2,
                    bgcolor: _randomColor
                }}>
                    <Typography variant="h3">
                        {user.name.split(" ")[0].charAt(0)}
                        {user.name.split(" ")[1].charAt(0)}
                    </Typography>
                </Avatar>
                <Typography component="h2" variant="h4" color="text.secondary">
                    {user.name}
                </Typography>
                <Typography component="h2" variant="h6" color="text.secondary">
                    {user.email}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography component="h2" variant="h6" color="text.secondary">
                    {formatDateTime(user.registration)}
                </Typography>
            </Box>
        </Paper>
    );
};
