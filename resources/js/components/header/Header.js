import "../../../css/app.css";
import React from "react";

import { NavLink } from "react-router-dom";

function Header() {

    return (
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3">
            <div className="container px-4 mx-auto flex flex-wrap items-center -between">
                <div className="w-full relative flex md:w-auto md:static md:block md:justify-start">
                    <NavLink className="no-underline text-xl font-bold leading-relaxed inline-block mr-1 py-2 whitespace-nowrap uppercase text-white"
                        to="/">
                        Easy
                    </NavLink>

                    <NavLink className="no-underline text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase hover:text-orange-300 text-orange-300"
                        to="/">
                        Scooter
                    </NavLink>
                </div>
                <div
                    className={"md:flex flex-grow items-center"}
                    id="example-navbar-danger"
                >
                    <ul className="flex flex-col  md:flex-row mb-0  list-none md:ml-auto">
                        <li className="nav-item">
                            <NavLink className="no-underline px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75"
                                to="/need_help">
                                <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i>
                                <span className="ml-2">Besoin d'aide</span>
                            </NavLink>

                        </li>

                        <li className="nav-item">
                            <NavLink className="no-underline px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75"
                                to="/store">
                                <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i>
                                <span className="ml-2">Nos abonnements</span>
                            </NavLink>

                        </li>
                        <li className="nav-item">
                            <a
                                className="no-underline px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75"
                                href="#pablo"
                            >
                                <i className="fab fa-twitter text-xl leading-lg text-white opacity-75"></i>
                                <span className="ml-2">Connexion</span>
                            </a>
                        </li>
                        <li className="nav-item" onClick={() => setShowModal(true)}>
                            <a
                                className="no-underline px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75"
                                href="#pablo"
                            >
                                <i className="fab fa-pinterest text-xl leading-lg text-white opacity-75"></i>
                                <span
                                    type="button"
                                    className="ml-2"
                                >
                                    Inscription
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}


export default Header;