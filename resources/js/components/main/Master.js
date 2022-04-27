import * as React from "react";
// import { Container, createTheme, ThemeProvider, Grid, Item } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Container, createTheme, ThemeProvider } from "@mui/material";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import "./styles.css";

import First from "./First";
import Second from "./Second";

function Main() {
    return (
        <>
            <ParallaxProvider>
                <Container
                    componen={"main"}
                    className={"first py-4 full"}
                >
                    <First />
                </Container>
                <Container
                    componen={"second"}
                    className={"second py-4 full"}
                >
                    <Second />
                </Container>
            </ParallaxProvider>
        </>
    );
}

export default Main;
