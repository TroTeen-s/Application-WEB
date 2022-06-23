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
            <ParallaxProvider>
                <section className="h-full bg-black-trot">
                    <div className="flex relative z-20 items-center overflow-hidden">
                        <div className="container mx-auto lg:mt-20 md:mt-10 px-6 flex relative md:pt-10 lg:pt-20">
                            <div className="hidden md:block sm:w-1/6 lg:w-3/6 relative">
                                <img
                                    src="images/LeftFirstImage.png"
                                    className=" max-w-xs md:max-w-sm m-auto"
                                />
                            </div>
                            <div className="m-4 sm:w-2/3 lg:w-2/5 flex flex-col relative z-20 py-3">
                                {/* <span className="w-20 h-2 bg-gray-800 dark:bg-white mb-12">
                                 </span> */}
                                <h1 className="font-bebas-neue uppercase text-4xl sm:text-6xl font-black flex flex-col leading-none text-white">
                                    Deplacez vous
                                    <span className="text-5xl sm:text-7xl text-orange-300">
                                        Sans limite
                                    </span>
                                </h1>
                                <p className="text-sm sm:text-base xs:hidden text-white lg:text-white dark:text-white">
                                    Dimension of reality that makes change
                                    possible and understandable. An indefinite
                                    and homogeneous environment in which natural
                                    events and human existence take place.
                                </p>
                                <div className="flex mt-8">
                                    <a
                                        href="#"
                                        id="buttonOrange"
                                        className="no-underline uppercase py-2 px-12 rounded-lg bg-text-orange-300 border-2 border-transparent text-white text-md mr-4 hover:bg-black-trot"
                                    >
                                        Get started
                                    </a>

                                    <a
                                        href="#"
                                        className="no-underline uppercase py-2 px-12 rounded-lg bg-transparent border-2 border-orange-300 text-white dark:text-white hover:bg-black-trot hover:text-white text-md"
                                    >
                                        Read more
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <section className="full bg-white-background">
                 </section> */}

                <Second/>

            </ParallaxProvider>
        </>
    );
}

export default Main;
