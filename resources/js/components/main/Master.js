import * as React from "react";
// import { Container, createTheme, ThemeProvider, Grid, Item } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Container, createTheme, ThemeProvider } from "@mui/material";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import "./styles.css";
import LeftFirstImage from "/Images/LeftFirstImage.png"

import First from "./First";
import Second from "./Second";

function Main() {
    return (
        <>
           <div class="mt-40 flex flex-nowrap justify-between items-center" onClick={() => setShowModal(false)} >
                <div id="Left" class="w-300">
                    <img id="img" src="Images/LeftFirstImage.png"></img>
                </div>

           <div id="Right-Phone" class="">
             <div class="">
               <a
                 className="text-7xl font-bold leading-relaxed inline-block mr-1 py-2 whitespace-nowrap text-white no-underline"

               >
                 Easy
               </a>
               <a
                 id="OrangePaper"
                 className="text-7xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap no-underline "

               >
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
               <button
                 id="buttonOrange"
                 class="mt-10 font-bold py-2 px-8 rounded inline-flex items-center"
               >
                 <span>Télécharger l'Application </span>
               </button>
             </div>

             <div></div>
           </div>


         </div>
        </>
    );
}

export default Main;
