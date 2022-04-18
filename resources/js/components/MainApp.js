import Header from "./header/Header";
import React, {createContext, useContext, useEffect, useState} from "react";
import {Container, createTheme, ThemeProvider} from "@mui/material";
import {Outlet} from "react-router";
import AuthProvider, {AuthContext} from "./context/AuthContext";

export const BearerContext = createContext({
    token: '',
    setToken: () => {
    },
})


const MainApp = () => {
    let [token, setToken] = useState()
    useEffect(() => {
        let bearer = localStorage.getItem('apiBearerToken')
        if (bearer) {
            console.log("on y est et il est de " + bearer)
            setToken(bearer)
            axios.defaults.headers.common['Authorization'] = `Bearer ${bearer}`
        }
    }, [])
    let {auth, setAuth} = useContext(AuthContext)

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    })

    return (
        <AuthProvider>
            <BearerContext.Provider value={token}>
                <ThemeProvider theme={darkTheme}>
                    <div className="bg-black-trot h-full w-full">
                        <Header/>
                        <Container componen={'main'} className={' py-4'}>
                            <Outlet/>
                        </Container>
                    </div>
                </ThemeProvider>
            </BearerContext.Provider>
        </AuthProvider>
    )
}

export default MainApp

