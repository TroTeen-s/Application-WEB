import Header from "./header/Header";
import React from "react";
import { Container, createTheme, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router";
import AuthProvider from "./context/AuthContext";


const MainApp = () => {
    /*let [token, setToken] = useState()
    useEffect(() => {
        let bearer = localStorage.getItem('apiBearerToken')
        if (bearer) {
            console.log("on y est et il est de " + bearer)
            setToken(bearer)
            axios.defaults.headers.common['Authorization'] = `Bearer ${bearer}`
        }
    }, [])*/

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                light: '#1D1D1D',
                main: '#1D1D1D',
                dark: '#1D1D1D',
                contrastText: '#1D1D1D',
            },
            secondary: {
                light: '#FF9900',
                main: '#FF9900',
                dark: '#FF9900',
                contrastText: '#FF9900',
            },
        },
    })

    return (
        <AuthProvider>
            <ThemeProvider theme={darkTheme}>
                <div className="bg-black-trot h-full w-full">
                    <Header />
                    <Container componen={'main'} className={' py-4 flex justify-center w-full h-full'}>
                        <Outlet />
                    </Container>
                </div>
            </ThemeProvider>
        </AuthProvider>
    )
}

export default MainApp

