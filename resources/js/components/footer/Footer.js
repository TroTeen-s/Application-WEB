import "../../../css/app.css";
import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Header() {
    return (
        <footer className="p-4 bg-black-trot shadow md:px-6 md:py-8 block" >
            <div className="sm:flex sm:items-center sm:justify-between">
                <a className="flex items-center mb-4 sm:mb-0 no-underline">
                    <img />
                    <span className="mt-4 mf-4 self-center text-2xl font-semibold whitespace-nowrap  text-white dark:text-white">
                        EASYSCOOTER
                    </span>
                </a>
                <ul className="no-underline flex flex-wrap items-center mb-6 text-sm text-white sm:mb-0 dark:text-gray-400">
                    <li>
                        <a  className="text-white no-underline mr-4 hover:underline md:mr-6 ">
                            About
                        </a>
                    </li>
                    <li>
                        <a className="text-white no-underline mr-4 hover:underline md:mr-6">
                            Privacy Policy
                        </a>
                    </li>
                    <li>
                        <a className="text-white no-underline mr-4 hover:underline md:mr-6 ">
                            Licensing
                        </a>
                    </li>
                    <li>
                        <a className="text-white no-underline hover:underline">
                            Contact
                        </a>
                    </li>
                </ul>
            </div>
            <hr className="my-6 border-white sm:mx-auto lg:my-8" />
            <span className="block text-sm text-white sm:text-center dark:text-gray-400">
                © 2022{" "}
                <a href="/" className="hover:underline ">
                    EasyScooter™
                </a>
                . All Rights Reserved.
            </span>
        </footer>
    );
}

export default Header;
