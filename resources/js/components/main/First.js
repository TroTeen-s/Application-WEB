import * as React from "react";
// import { Container, createTheme, ThemeProvider, Grid, Item } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import FirstImageLeft from './Images/LeftFirstImage.png'

function First() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "white" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
        height: 100,
        width: 100,
    }));

    return (


        <Parallax translateY={[-20, 0]}>
        <Grid
            container
            direction={{ xs: "column", md: "row" }}
            justifyContent="center"
            alignItems="center"
            spacing={10}
        >
            
        <>
           <div class="mt-40 flex flex-wrap justify-between items-center">


            <div id="Left" class="md:w-1/6">
                    <img id="img" src="Images/LeftFirstImage.png"></img>
            </div>

           <div id="Right-Phone" class="md:w-1/3">
             <div class="text-7xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap">
               <a className="text-white no-underline" >
                 Easy
               </a>
               <a id="OrangePaper" className="text-7xl no-underline" >
                 Scooter
               </a>
             </div>

             <div id="Slogan" class="text-white text-xl">
               <p>
                 Depuis 2012, Easy Scooter est la première société à proposer la
                 location de trottinettes électriques à Lyon avec des offres
                 diversifiées, capables de répondre à toutes sortes de demandes !
               </p>
             </div>

             <div>
               <button id="buttonOrange" class="mt-10 font-bold py-2 px-8 rounded inline-flex items-center">
                 <span>Télécharger l'Application </span>
               </button>
             </div>

           </div>


         </div>
        </>




            
        </Grid>
        </Parallax>

    );

}

export default First;
