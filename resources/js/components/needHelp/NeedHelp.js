import React from "react";
import Header from "../header/Header";
import Link from "./Link";



function NeedHelp() {

    return (
        <div className="bg-black-trot h-full w-full">
            <div className="flex pt-24 justify-around flex-col w-full md:flex-row">

                <div className="flex flex-col items-center space-y-2">
                    <img className="w-3/4 " src="images/telephone-service-client.png" />
                    <div className="flex flex-col text-white text-center">
                        <p>Téléphone: 06 95 55 ** **</p>
                        <a href="mailto:troteensorganisation@gmail.com" className="no-underline text-white hover:text-white cursor-pointer">Adresse mail: troteensorganisation@gmail.com</a>

                    </div>
                </div>

                <div className="flex flex-col items-center md:items-stretch space-y-6 bg-black-trot md:bg-transparent pb-5 pt-10 md:pt-0 md:pb-0">
                    <div className="flex space-x-2 md:mb-14 mb-6  justify-center">
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
