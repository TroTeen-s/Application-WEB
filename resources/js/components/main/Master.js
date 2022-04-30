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
import Map from './Images/Europe.png'

import First from "./First";
import Second from "./Second";
import { HistoryToggleOffRounded } from "@mui/icons-material";

function Main() {
    return (
        <>
        <ParallaxProvider>
            
            <section class="full bg-black-trot">
                <div class="flex relative z-20 py-20 items-center overflow-hidden">
                    <div class="container mx-auto px-6 flex relative py-16">
                        <div class="hidden md:block sm:w-1/6 lg:w-3/6 relative">
                            <img src="/Images/LeftFirstImage.png" class=" max-w-xs md:max-w-sm m-auto"/>
                        </div>
                        <div class="m-4 sm:w-2/3 lg:w-2/5 flex flex-col relative z-20 py-3">
                            {/* <span class="w-20 h-2 bg-gray-800 dark:bg-white mb-12">
                            </span> */}
                            <h1 class="font-bebas-neue uppercase text-4xl sm:text-6xl font-black flex flex-col leading-none text-white">
                                Easy
                                <span class="text-5xl sm:text-7xl text-orange-300">
                                    Scooter
                                </span>
                            </h1>
                            <p class="text-sm sm:text-base xs:hidden text-white lg:text-white dark:text-white">
                                Dimension of reality that makes change possible and understandable. An indefinite and homogeneous environment in which natural events and human existence take place.
                            </p>
                            <div class="flex mt-8">
                                <a href="#" id="buttonOrange" class="no-underline uppercase py-2 px-4 rounded-lg bg-text-orange-300 border-2 border-transparent text-white text-md mr-4 hover:bg-black-trot">
                                    Get started
                                </a>
                                <a href="#" class="no-underline uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-orange-300 text-white dark:text-white hover:bg-black-trot hover:text-white text-md">
                                    Read more
                                </a>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>

            <section class="full bg-white-background">
                <div>
                   <div id="TextEurope" className="m-5">

                        <div className="mb-5">
                        <a class="no-underline text-4xl font-bold  text-orange-300 dark:text-white hover:text-black-trot">
                            Une entreprise née en France
                        </a>
                        </div>


                       
                        <div class="max-w-2xl px-8 py-4 mx-auto bg-black-trot rounded-lg shadow-md dark:bg-gray-800">
                            <div class="flex items-center justify-between">
                                <span class="text-sm font-light text-white dark:text-gray-400">20 Mars, 2022</span>
                            </div>

                            <div class="mt-2">
                                <a class="no-underline text-2xl font-bold text-white dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline"> Ouverture de nos services à Lyon </a>
                                <p class="mt-2 text-white dark:text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!</p>
                            </div>
                            
                        
                        </div>
                    </div>
                    <div id="Europe" className="sm:w-200 md:w-200 lg:w-200 relative object-none">   
                        <img className="max-w-xxl md:max-w-xxl m-auto " src={Map}/>
                    </div>
                </div>
            </section>

            <section class="full bg-white-background">

            <div class="w-full mx-auto bg-white px-5 py-10 text-gray-600 mb-10">

                    <div class="text-center max-w-xl mx-auto">
                        <h1 class="text-5xl md:text-6xl font-bold mb-5">Nos abonnements</h1>
                        <h3 class="text-xl font-medium mb-10">Lorem ipsum dolor sit amet consectetur adipisicing elit repellat dignissimos laboriosam odit accusamus porro</h3>
                    </div>
                    <div class="max-w-4xl mx-auto md:flex">
                        <div class="w-full md:w-1/3 md:max-w-none bg-white px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto md:my-6 rounded-md shadow-lg shadow-gray-600 md:flex md:flex-col">
                            <div class="w-full flex-grow">
                                <h2 class="text-center font-bold uppercase mb-4">PERSONAL</h2>
                                <h3 class="text-center font-bold text-4xl mb-5">5€/Mois</h3>
                                <ul class="text-sm px-5 mb-8">
                                    <li class="leading-tight"><i class="mdi mdi-check-bold text-lg"></i> Lorem ipsum</li>
                                    <li class="leading-tight"><i class="mdi mdi-check-bold text-lg"></i> Dolor sit amet</li>
                                </ul>
                            </div>
                            <div class="w-full">
                                <button class="font-bold bg-gray-600 hover:bg-gray-700 text-white rounded-md px-10 py-2 transition-colors w-full">Buy Now</button>
                            </div>
                        </div>
                        <div class="w-full md:w-1/3 md:max-w-none bg-white px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto md:-mx-3 md:mb-0 rounded-md shadow-lg shadow-gray-600 md:relative md:z-50 md:flex md:flex-col">
                            <div class="w-full flex-grow">
                                <h2 class="text-center font-bold uppercase mb-4">TEAM</h2>
                                <h3 class="text-center font-bold text-4xl md:text-5xl mb-5">20€/Mois</h3>
                                <ul class="text-sm px-5 mb-8">
                                    <li class="leading-tight"><i class="mdi mdi-check-bold text-lg"></i> Lorem ipsum</li>
                                    <li class="leading-tight"><i class="mdi mdi-check-bold text-lg"></i> Dolor sit amet</li>
                                    <li class="leading-tight"><i class="mdi mdi-check-bold text-lg"></i> Consectetur</li>
                                    <li class="leading-tight"><i class="mdi mdi-check-bold text-lg"></i> Adipisicing</li>
                                    <li class="leading-tight"><i class="mdi mdi-check-bold text-lg"></i> Elit repellat</li>
                                </ul>
                            </div>
                            <div class="w-full">
                                <button class="font-bold bg-gray-600 hover:bg-gray-700 text-white rounded-md px-10 py-2 transition-colors w-full">Buy Now</button>
                            </div>
                        </div>
                        <div class="w-full md:w-1/3 md:max-w-none bg-white px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto md:my-6 rounded-md shadow-lg shadow-gray-600 md:flex md:flex-col">
                            <div class="w-full flex-grow">
                                <h2 class="text-center font-bold uppercase mb-4">PRO</h2>
                                <h3 class="text-center font-bold text-4xl mb-5">55€/Mois</h3>
                                <ul class="text-sm px-5 mb-8">
                                    <li class="leading-tight"><i class="mdi mdi-check-bold text-lg"></i> Lorem ipsum</li>
                                    <li class="leading-tight"><i class="mdi mdi-check-bold text-lg"></i> Dolor sit amet</li>
                                    <li class="leading-tight"><i class="mdi mdi-check-bold text-lg"></i> Consectetur</li>
                                    <li class="leading-tight"><i class="mdi mdi-check-bold text-lg"></i> Adipisicing</li>
                                    <li class="leading-tight"><i class="mdi mdi-check-bold text-lg"></i> Much more...</li>
                                </ul>
                            </div>
                            <div class="w-full">
                                <button class="font-bold bg-gray-600 hover:bg-gray-700 text-white rounded-md px-10 py-2 transition-colors w-full">Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </section>
            
            


        </ParallaxProvider>
    </>
    );
}

export default Main;
