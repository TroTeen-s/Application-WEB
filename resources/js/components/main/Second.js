import * as React from "react";
// import { Container, createTheme, ThemeProvider, Grid, Item } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import Map from './Images/Europe.png'

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

            <Parallax translateY={[0, 10]}>
            <Grid
                container
                direction={{ xs: "column", md: "row" }}
                justifyContent="center"
                alignItems="center"
                spacing={10}
            >
                <Grid item>

                <div className="grid grid-cols-2 gap-x-8">
                    <div>
                        <div>
                            <p> Où nous trouver ?</p>
                        </div>
                            <p>Dites adieu aux embouteillages, aux métros, au bus et à la voiture  !</p>
                        <div>


                        </div>

                    </div>
                    <div>
                        <img className="Europe" src={Map}/>
                    </div>
                </div>



                </Grid>


            </Grid>
            </Parallax>

    );
}

export default First;
