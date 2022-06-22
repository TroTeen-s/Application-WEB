import * as React from "react";
// import { Container, createTheme, ThemeProvider, Grid, Item } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Container, createTheme, ThemeProvider } from "@mui/material";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import "./styles.css";
import Second from './secondDiv/index';

import { HistoryToggleOffRounded } from "@mui/icons-material";

function Main() {
    return (
        <>
            <div class="relative contain">
                <div class="sticky childy top-0 h-screen flex flex-col items-center justify-center bg-black-trot pb-10">
                <div class="flex relative z-20 items-center overflow-hidden">
                        <div class="container mx-auto px-6 flex relative">
                            <div class="hidden md:block sm:w-1/6 lg:w-3/6 relative">
                                <img
                                    src="images/LeftFirstImage.png"
                                    class=" max-w-xs md:max-w-xs m-auto"
                                />
                            </div>
                            <div class="m-4 sm:w-2/3 lg:w-2/5 flex flex-col relative z-20 py-3">
                                {/* <span class="w-20 h-2 bg-gray-800 dark:bg-white mb-12">
                            </span> */}
                                <h1 class="font-bebas-neue uppercase text-4xl sm:text-6xl font-black flex flex-col leading-none text-white">
                                    Deplacez vous
                                    <span class="text-5xl sm:text-7xl text-orange-300">
                                        Sans limite
                                    </span>
                                </h1>
                                <p class="text-sm sm:text-base xs:hidden text-white lg:text-white dark:text-white">
                                    Dimension of reality that makes change
                                    possible and understandable. An indefinite
                                    and homogeneous environment in which natural
                                    events and human existence take place.
                                </p>
                                <div class="flex mt-8">
                                    <a
                                        href="http://127.0.0.1:5500/index.html"
                                        id="buttonOrange"
                                        class="no-underline uppercase py-2 px-12 rounded-lg bg-text-orange-300 border-2 border-transparent text-white text-md mr-4 hover:bg-black-trot"
                                    >
                                        Get started
                                    </a>

                                    <a
                                        href="#"
                                        class="no-underline uppercase py-2 px-12 rounded-lg bg-transparent border-2 border-orange-300 text-white dark:text-white hover:bg-black-trot hover:text-white text-md"
                                    >
                                        Read more
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>

                <div class="sticky childy top-0 h-full flex flex-col items-center justify-center bg-white-background text-black">
                    <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-12 lg:px-4 lg:py-20">
                        <div class="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                            <div>
                            <p class="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                                Actualités
                            </p>
                            </div>
                            <h2 class="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                            <span class="relative inline-block">
                                <svg viewBox="0 0 52 24" fill="currentColor" class="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block">
                                <defs>
                                    <pattern id="679d5905-e08c-4b91-a66c-84aefbb9d2f5" x="0" y="0" width=".135" height=".30">
                                    <circle cx="1" cy="1" r=".7"></circle>
                                    </pattern>
                                </defs>
                                <rect fill="url(#679d5905-e08c-4b91-a66c-84aefbb9d2f5)" width="52" height="24"></rect>
                                </svg>
                                <span class="relative">
                                Nous déposons nos clés à la ville de Lyon
                                </span>
                            </span>
                            </h2>
                            <p class="text-base text-gray-700 md:text-lg">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque rem aperiam, eaque ipsa quae.
                            </p>
                        </div>
                        <div class="mx-auto lg:max-w-2xl">
                            <div class="relative w-full transition-shadow duration-300 hover:shadow-xl">
                            <img class="object-cover w-full h-56 rounded shadow-lg sm:h-64 md:h-80 lg:h-96" src="https://media.lyon-france.com/1280x852/190527/9124493.jpg" alt="" />
                            {/* <a href="/" aria-label="Play Video" class="absolute inset-0 flex items-center justify-center w-full h-full transition-colors duration-300 bg-gray-900 bg-opacity-50 group hover:bg-opacity-25">
                                <div class="flex items-center justify-center w-16 h-16 transition duration-300 transform bg-gray-100 rounded-full shadow-2xl group-hover:scale-110">
                                <svg class="w-10 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                    d="M16.53,11.152l-8-5C8.221,5.958,7.833,5.949,7.515,6.125C7.197,6.302,7,6.636,7,7v10 c0,0.364,0.197,0.698,0.515,0.875C7.667,17.958,7.833,18,8,18c0.184,0,0.368-0.051,0.53-0.152l8-5C16.822,12.665,17,12.345,17,12 S16.822,11.335,16.53,11.152z"
                                    ></path>
                                </svg>
                                </div>
                            </a> */}
                            </div>
                        </div>
                        </div>



                </div>
            </div>
        </>
    );
}

export default Main;
