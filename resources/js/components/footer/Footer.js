import "../../../css/app.css";
import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Header() {
    return (
        <footer class="p-4 bg-black-trot shadow md:px-6 md:py-8 dark:bg-gray-800 block" >
            <div class="sm:flex sm:items-center sm:justify-between">
                <a class="flex items-center mb-4 sm:mb-0 no-underline">
                    <img />
                    <span class="mt-4 mf-4 self-center text-2xl font-semibold whitespace-nowrap  text-white dark:text-white">
                        EASYSCOOTER
                    </span>
                </a>
                <ul class="no-underline flex flex-wrap items-center mb-6 text-sm text-white sm:mb-0 dark:text-gray-400">
                    <li>
                        <a  class="text-white no-underline mr-4 hover:underline md:mr-6 ">
                            About
                        </a>
                    </li>
                    <li>
                        <a class="text-white no-underline mr-4 hover:underline md:mr-6">
                            Privacy Policy
                        </a>
                    </li>
                    <li>
                        <a class="text-white no-underline mr-4 hover:underline md:mr-6 ">
                            Licensing
                        </a>
                    </li> 
                    <li>
                        <a class="text-white no-underline hover:underline">
                            Contact
                        </a>
                    </li>
                </ul>
            </div>
            <hr class="my-6 border-white sm:mx-auto lg:my-8" />
            <span class="block text-sm text-white sm:text-center dark:text-gray-400">
                © 2022{" "}
                <a href="/" class="hover:underline ">
                    EasyScooter™
                </a>
                . All Rights Reserved.
            </span>
        </footer>
    );
}

export default Header;
