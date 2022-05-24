import * as React from "react";
// import { Container, createTheme, ThemeProvider, Grid, Item } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Container, createTheme, ThemeProvider } from "@mui/material";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import "./styles.css";
import Map from "./Images/Europe.png";
import FirstDraw from "./Images/Drawing.png";

import First from "./First";
import Second from "./Second";
import { HistoryToggleOffRounded } from "@mui/icons-material";

function Main() {
    return (
        <>
            <ParallaxProvider>
                <section class="full bg-black-trot">
                    <div class="flex relative z-20 items-center overflow-hidden">
                        <div class="container mx-auto mt-20 px-6 flex relative pt-20">
                            <div class="hidden md:block sm:w-1/6 lg:w-3/6 relative">
                                <img
                                    src="images/LeftFirstImage.png"
                                    class=" max-w-xs md:max-w-sm m-auto"
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
                                        href="#"
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
                </section>

                <section class="full_second bg-white-background">
                    <div>
                        <div id="Draw" className="sm:w-200 md:w-200 lg:w-200 relative object-none">
                            <img
                                className=""
                                src={FirstDraw}
                            />
                        </div>
                        <div id="TextEurope" className="m-5">
                            <div className="">
                                <a class="no-underline text-4xl md:text-5xl font-bold mb-5 text-gray-600  hover:text-black-trot">
                                    Une entreprise née en France
                                </a>
                            </div>

                            <div class="mt-5 max-w-2xl px-8 py-4 mx-auto bg-white dark:bg-gray-800 rounded-md shadow-lg">
                                <div class="flex items-center justify-between">
                                    <span class="text-sm font-light text-orange-300 dark:text-gray-400">
                                        2 Janvier, 2022
                                    </span>
                                </div>

                                <div class="mt-2">
                                    <a class="no-underline text-2xl font-bold text-gray-600 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">
                                        {" "}
                                        Création de notre entreprise{" "}
                                    </a>
                                    <p class="mt-2 text-gray-600 dark:text-gray-300">
                                        Lorem ipsum dolor sit, amet consectetur
                                        adipisicing elit. Tempora expedita dicta
                                        totam aspernatur doloremque. Excepturi
                                        iste iusto eos enim reprehenderit nisi,
                                        accusamus delectus nihil quis facere in
                                        modi ratione libero!
                                    </p>
                                </div>
                            </div>

                            <div class="mt-5 max-w-2xl px-8 py-4 mx-auto bg-white dark:bg-gray-800 rounded-md shadow-lg">
                                <div class="flex items-center justify-between">
                                    <span class="text-sm font-light text-orange-300 dark:text-gray-400">
                                        20 Mars, 2022
                                    </span>
                                </div>

                                <div class="mt-2">
                                    <a class="no-underline text-2xl font-bold text-gray-600 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">
                                        {" "}
                                        Ouverture de nos services à Lyon{" "}
                                    </a>
                                    <p class="mt-2 text-gray-600 dark:text-gray-300">
                                        Lorem ipsum dolor sit, amet consectetur
                                        adipisicing elit. Tempora expedita dicta
                                        totam aspernatur doloremque. Excepturi
                                        iste iusto eos enim reprehenderit nisi,
                                        accusamus delectus nihil quis facere in
                                        modi ratione libero!
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            id="Europe"
                            className="sm:w-200 md:w-200 lg:w-200 relative object-none"
                        >
                            <img
                                className="max-w-xxl md:max-w-xxl m-auto "
                                src={Map}
                            />
                        </div>
                    </div>
                </section>

                <section class="full_responsive bg-white-background">
                    <div class="w-full mx-auto bg-white px-5 py-10 text-gray-600 mb-10">
                        <div class="text-center max-w-xl mx-auto">
                            <h1 class="text-5xl md:text-6xl font-bold mb-5">
                                Nos abonnements
                            </h1>
                            <h3 class="text-xl font-medium mb-10">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit repellat dignissimos laboriosam
                                odit accusamus porro
                            </h3>
                        </div>
                        <div class="max-w-4xl mx-auto md:flex">
                            <div class="w-full md:w-1/3 md:max-w-none bg-white px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto md:my-6 rounded-md shadow-lg shadow-gray-600 md:flex md:flex-col">
                                <div class="w-full flex-grow">
                                    <h2 class="text-center font-bold uppercase mb-4">
                                        PERSONAL
                                    </h2>
                                    <h3 class="text-center font-bold text-orange-300 text-4xl mb-5">
                                        5€/Mois
                                    </h3>
                                    <ul class="text-sm px-5 mb-8">
                                        <li class="leading-tight">
                                            <i class="mdi mdi-check-bold text-lg"></i>{" "}
                                            Lorem ipsum
                                        </li>
                                        <li class="leading-tight">
                                            <i class="mdi mdi-check-bold text-lg"></i>{" "}
                                            Dolor sit amet
                                        </li>
                                    </ul>
                                </div>
                                <div class="w-full">
                                    <button class="font-bold bg-gray-600 hover:bg-gray-700 text-white rounded-md px-10 py-2 transition-colors w-full">
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                            <div class="w-full md:w-1/3 md:max-w-none bg-white px-8 md:px-10 py-8 md:py-10 mx-auto md:-mx-3  md:mb-0 rounded-md shadow-lg shadow-gray-600 md:relative md:z-50 md:flex md:flex-col">
                                <div class="w-full flex-grow">
                                    <h2 class="text-center font-bold uppercase mb-4">
                                        TEAM
                                    </h2>
                                    <h3 class="text-center font-bold text-orange-300 text-4xl md:text-5xl mb-5">
                                        20€/Mois
                                    </h3>
                                    <ul class="text-sm px-5 mb-8">
                                        <li class="leading-tight">
                                            <i class="mdi mdi-check-bold text-lg"></i>{" "}
                                            Lorem ipsum
                                        </li>
                                        <li class="leading-tight">
                                            <i class="mdi mdi-check-bold text-lg"></i>{" "}
                                            Dolor sit amet
                                        </li>
                                        <li class="leading-tight">
                                            <i class="mdi mdi-check-bold text-lg"></i>{" "}
                                            Consectetur
                                        </li>
                                        <li class="leading-tight">
                                            <i class="mdi mdi-check-bold text-lg"></i>{" "}
                                            Adipisicing
                                        </li>
                                        <li class="leading-tight">
                                            <i class="mdi mdi-check-bold text-lg"></i>{" "}
                                            Elit repellat
                                        </li>
                                    </ul>
                                </div>
                                <div class="w-full">
                                    <button class="font-bold bg-gray-600 hover:bg-gray-700 text-white rounded-md px-10 py-2 transition-colors w-full">
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                            <div class="w-full md:w-1/3 md:max-w-none bg-white px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto mt-3 md:my-6 rounded-md shadow-lg shadow-gray-600 md:flex md:flex-col">
                                <div class="w-full flex-grow">
                                    <h2 class="text-center font-bold uppercase mb-4">
                                        PRO
                                    </h2>
                                    <h3 class="text-center text-orange-300 font-bold text-4xl mb-5">
                                        55€/Mois
                                    </h3>
                                    <ul class="text-sm px-5 mb-8">
                                        <li class="leading-tight">
                                            <i class="mdi mdi-check-bold text-lg"></i>{" "}
                                            Lorem ipsum
                                        </li>
                                        <li class="leading-tight">
                                            <i class="mdi mdi-check-bold text-lg"></i>{" "}
                                            Dolor sit amet
                                        </li>
                                        <li class="leading-tight">
                                            <i class="mdi mdi-check-bold text-lg"></i>{" "}
                                            Consectetur
                                        </li>
                                        <li class="leading-tight">
                                            <i class="mdi mdi-check-bold text-lg"></i>{" "}
                                            Adipisicing
                                        </li>
                                        <li class="leading-tight">
                                            <i class="mdi mdi-check-bold text-lg"></i>{" "}
                                            Much more...
                                        </li>
                                    </ul>
                                </div>
                                <div class="w-full">
                                    <button class="font-bold bg-gray-600 hover:bg-gray-700 text-white rounded-md px-10 py-2 transition-colors w-full">
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="mt-10 full_responsive bg-white-background">
                    <div class="w-full mx-auto bg-white px-5 py-10 pb-5 text-gray-600">
                        <div class="text-center max-w-xl mx-auto pb-10">
                            <h1 class="text-5xl md:text-6xl font-bold mb-10">
                                Notre Boutique{" "}
                            </h1>
                        </div>

                        <div class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-12 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-20 pl-20 pr-20">
                            <a class="no-underline group">
                                <div class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                                    <img
                                        src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg"
                                        alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                                        class="w-full h-full object-center object-cover group-hover:opacity-75"
                                    />
                                </div>
                                <h3 class="mt-4 text-sm text-gray-700">
                                    Earthen Bottle
                                </h3>
                                <p class="mt-1 text-lg font-medium text-orange-300">
                                    $48
                                </p>
                            </a>

                            <a class="no-underline group">
                                <div class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                                    <img
                                        src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg"
                                        alt="Olive drab green insulated bottle with flared screw lid and flat top."
                                        class="w-full h-full object-center object-cover group-hover:opacity-75"
                                    />
                                </div>
                                <h3 class="mt-4 text-sm text-gray-700">
                                    Nomad Tumbler
                                </h3>
                                <p class="mt-1 text-lg font-medium text-orange-300">
                                    $35
                                </p>
                            </a>

                            <a class="no-underline group">
                                <div class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                                    <img
                                        src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg"
                                        alt="Person using a pen to cross a task off a productivity paper card."
                                        class="w-full h-full object-center object-cover group-hover:opacity-75"
                                    />
                                </div>
                                <h3 class="mt-4 text-sm text-gray-700">
                                    Focus Paper Refill
                                </h3>
                                <p class="mt-1 text-lg font-medium text-orange-300">
                                    $89
                                </p>
                                <button>
                                    Ajouter au panier
                                </button>
                            </a>

                            <a class="no-underline group">
                                <div class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                                    <img
                                        src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg"
                                        alt="Hand holding black machined steel mechanical pencil with brass tip and top."
                                        class="w-full h-full object-center object-cover group-hover:opacity-75"
                                    />
                                </div>
                                <h3 class="mt-4 text-sm text-gray-700">
                                    Machined Mechanical Pencil
                                </h3>
                                <p class="mt-1 text-lg font-medium text-orange-300">
                                    $35
                                </p>
                            </a>
                        </div>
                    </div>
                </section>
            </ParallaxProvider>
        </>
    );
}

export default Main;
