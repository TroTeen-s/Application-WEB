import * as React from "react";
import { useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";


import Sidebar from "./Sidebar";
import { CircularProgress } from "@mui/material";
import { AdminContext, AuthContext } from "../context/AuthContext";
import verifyAuth from "../auth/verifyAuth";
import Grid from "@mui/material/Grid";
import verifyAdmin from "../auth/verifyAdmin";


const mdTheme = createTheme();

export default function App() {
    const [open, setOpen] = React.useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    let { auth } = useContext(AuthContext);
    let { admin } = useContext(AdminContext);
    verifyAuth();
    verifyAdmin();

    return (
        <>
            {(admin) ?
                <ThemeProvider theme={mdTheme}>
                    <Box className="overflow-y-hidden h-100" sx={{ display: "flex" }}>

                        <Sidebar />

                        <Outlet />
                    </Box>
                </ThemeProvider>

                :
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: "100vh" }}
                >
                    <Grid item xs={3}>
                        <CircularProgress />
                    </Grid>
                </Grid>
            }
        </>
    )
}
