import React from "react";
import Header from "../header/Header";
import Link from "./Link";



function NeedHelp() {

    return (
        <div className="bg-black-trot h-full w-full">
            <Header />
            <div className="flex pt-24 justify-around flex-col w-full h-full md:flex-row">

                <div>
                    IMG
                    <div className="flex flex-col text-white text-center">
                        <p>Téléphone: 06 95 55 ** **</p>
                        <a href="mailto:troteensorganisation@gmail.com" className="no-underline text-white hover:text-white cursor-pointer">Adresse mail: troteensorganisation@gmail.com</a>

                    </div>
                </div>

                <div className="flex flex-col items-center md:items-stretch space-y-6">
                    <div className="flex space-x-2 mb-14 justify-center">
                        <h1 className="text-7xl font-bold text-white">Service</h1>
                        <h1 className="text-7xl font-bold text-orange-300">Client</h1>
                    </div>

                    <Link link="/" cover="Probleme Technique" />
                    <Link link="/" cover="Sécurité et Droit" />
                    <Link link="/" cover="Probleme technique" />



                </div>
            </div>
        </div>
    );
}

export default NeedHelp;
