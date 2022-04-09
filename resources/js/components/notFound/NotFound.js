import React from "react";
import { NavLink } from "react-router-dom";


function NotFound() {

    return (
        <div onLoad={setTimeout(function () { window.location.replace("/"); }, 5000)}
            className="h-full w-full flex flex-col justify-center items-center space-y-2 " >
            <div>
                <h1>Uh Oh, Il n'y a rien à voir ici.</h1>
            </div>
            <div>
                <p>Vous allez être redirigé</p>
            </div>


            <div className="flex space-x-2 bg-black p-3 hover:p-4 ease-in-out rounded-lg">
                <NavLink className="no-underline text-lg font-bold leading-relaxed inline-block mr-1 py-2 whitespace-nowrap uppercase text-white"
                    to="/">
                    Retour à la page d'accueil
                </NavLink>

                <NavLink className="no-underline text-lg font-bold leading-relaxed inline-block hover:text-orange-300 mr-1 py-2 whitespace-nowrap uppercase text-orange-300"
                    to="/">
                    ici
                </NavLink>
            </div>
        </div >
    );
}

export default NotFound;

/* <div className="h-full w-full flex flex-col justify-center items-center ">
            PUTE
            <div className="flex space-x-2 bg-black">
                <NavLink className="no-underline text-xl font-bold leading-relaxed inline-block mr-1 py-2 whitespace-nowrap uppercase text-white"
                    to="/">
                    Retour à la page d'accueil
                </NavLink>

                <NavLink className="no-underline text-xl font-bold leading-relaxed inline-block mr-1 py-2 whitespace-nowrap uppercase text-orange-300"
                    to="/">
                    ici
                </NavLink>
            </div>
        </div> */