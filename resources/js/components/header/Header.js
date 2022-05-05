import "../../../css/app.css";
import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Header() {


    let { auth, setAuth } = useContext(AuthContext)


    let loggedOut = <>

            <NavLink
                className="no-underline px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75"
                to="/auth/login">
                <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i>
                <span className="ml-2">Connexion</span>
            </NavLink>


            <NavLink
                className="no-underline px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75"
                to="/auth/register">
                <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i>
                <span className="ml-2">Inscription</span>
            </NavLink>

    </>

    let loggedIn = <>
          <NavLink
                className="no-underline px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75"
                to="/admin">
                <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i>
                <span className="ml-2">Admin</span>
            </NavLink>

            <NavLink
                className="no-underline px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75"
                to="/account">
                <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i>
                <span className="ml-2">Mon Compte</span>
            </NavLink>

            <NavLink
                className="no-underline px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75"
                to="/api/auth/logout">
                <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i>
                <span className="ml-2">Déconnexion</span>
            </NavLink>

    </>

    return (
        <header className="h-30 sm:h-20 pb-2 flex items-center z-20 w-full bg-black-trot">
                    <div className="container mx-auto px-6 flex items-center justify-between">
                        <div className="uppercase font-black text-6xl no-underline">
                            <NavLink
                                className="uppercase text-white font-black text-3xl no-underline"
                                to="/Main">
                                Easy
                            </NavLink>

                            <NavLink
                                className="uppercase text-orange-300 hover:text-white text-3xl no-underline"
                                to="/Main">
                                Scooter
                            </NavLink>
                        </div>
                        <div className="flex items-center mt-4">
                            <nav className="font-sen text-white dark:text-black text-md uppercase lg:flex items-center hidden no-underline">
                            <NavLink
                                className="no-underline px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75"
                                to="/shop">
                                <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i>
                                <span className="ml-2">Notre Boutique</span>
                            </NavLink>
                            <NavLink
                                className="no-underline px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75"
                                to="/store">
                                <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i>
                                <span className="ml-2">Nos abonnements</span>
                            </NavLink>
                            <NavLink
                                className="no-underline px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75"
                                to="/">
                                <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i>
                                <span className="ml-2">Nos partenaires</span>
                            </NavLink>

                                {auth ? loggedIn : loggedOut}
                            </nav>
                            <button className="lg:hidden flex flex-col ml-4">
                                <span className="w-6 h-1 bg-white dark:bg-dark mb-1">
                                </span>
                                <span className="w-6 h-1 bg-white dark:bg-dark mb-1">
                                </span>
                                <span className="w-6 h-1 bg-white dark:bg-dark mb-1">
                                </span>
                            </button>
                        </div>
                    </div>
                </header>
    );
}


export default Header;
