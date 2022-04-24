import Header from "../header/Header";
import React from "react";
import {Container, createTheme, ThemeProvider} from "@mui/material";
import {Outlet} from "react-router";
import AuthProvider from "../context/AuthContext";


const GestionApp = () => {

       return (
  
        <div className="App">
            <p className="bg-white" > Gestion pages </p>
        </div> 
                    
    )
}

export default GestionApp

