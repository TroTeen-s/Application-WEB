import * as React from "react";
// import { Container, createTheme, ThemeProvider, Grid, Item } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";

function First() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "white" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
        height: 600,
        width: 400,
    }));

    return (

 
            <Parallax translateY={[-20, 20]}>
            <Grid
                container
                direction={{ xs: "column", md: "row" }}
                justifyContent="center"
                alignItems="center"
                spacing={10}
            >
                <Grid item>
                    <Item>Image</Item>
                </Grid>

                <Grid item>
                    <Item> Description </Item>
                </Grid>
            </Grid>
            </Parallax>

    );
}

export default First;
