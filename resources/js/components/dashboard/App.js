import * as React from "react";
import { useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";


import Sidebar from "./Sidebar";
import { CircularProgress } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import verifyAuth from "../auth/verifyAuth";


const mdTheme = createTheme();

export default function App() {
    const [open, setOpen] = React.useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    let { auth } = useContext(AuthContext);
    verifyAuth();

    return (

        <ThemeProvider theme={mdTheme}>
            <Box className="overflow-y-hidden h-100" sx={{ display: "flex" }}>

                <Sidebar />
                {(auth) ?
                    <Outlet />

                    :
                    <CircularProgress />
                }

            </Box>
    </ThemeProvider>
    )
}
