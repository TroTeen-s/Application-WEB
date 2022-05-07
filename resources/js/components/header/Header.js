import "../../../css/app.css";
import React, { useContext } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';


import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Header() {


    let { auth, setAuth } = useContext(AuthContext)

    let doLogout = async () => {
        try {
            let response = await axios.post("/api/auth/logout");
            if (response.status === 204) {
                setAuth(false);
            }
        } catch (e) {
            console.log('logout error');
        }
    };

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
                <LoginIcon className="pl-2" style={{ fontSize: 'large' }} />
            </NavLink>

    </>

    let loggedIn = <>
          <NavLink
                className="no-underline px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75"
                to="/Dashboard">
                <button className="bg-orange-300 text-gray-800 font-semibold py-2 px-4 rounded shadow">
                Dashboard
                </button>
            </NavLink>

            <NavLink
                className="no-underline px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75"
                to="/account">
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Mon Compte
                </button>
            </NavLink>

            <NavLink
                className="no-underline px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white hover:opacity-75"
                to="#">
                <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    Déconnexion
                </button>
            </NavLink>

    </>

    return (
        <header className="bg-black-trot z-30">

        <nav id="header" className="w-full z-30 top-0">

          <div className="w-full flex pl-10 pr-10 flex-wrap items-center justify-between mt-0 py-3">

                    <label htmlFor="menu-toggle" className="cursor-pointer md:hidden block">
                        <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                            <title>menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                        </svg>
                    </label>


            <input className="hidden" type="checkbox" id="menu-toggle" />

            <div className="hidden md:flex md:items-center md:w-auto w-full order-2 md:order-1" id="menu">
              <nav>
                <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
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
                </ul>
              </nav>
            </div>

            <div className="order-1 md:order-2">
                <div className="uppercase font-black no-underline pt-2 pl-5">

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
            </div>

            <div className="order-3 md:order-3 flex items-center pt-2" id="nav-content">
            <a  className="uppercase text-white font-black text-3xl no-underline pr-3">
                <svg className="fill-current hover:text-orange-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <circle fill="none" cx="12" cy="7" r="3" />
                  <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z" />
                </svg>
              </a>
                <a  className="uppercase text-white font-black text-3xl no-underline">
                <svg className="fill-current hover:text-orange-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M21,7H7.462L5.91,3.586C5.748,3.229,5.392,3,5,3H2v2h2.356L9.09,15.414C9.252,15.771,9.608,16,10,16h8 c0.4,0,0.762-0.238,0.919-0.606l3-7c0.133-0.309,0.101-0.663-0.084-0.944C21.649,7.169,21.336,7,21,7z M17.341,14h-6.697L8.371,9 h11.112L17.341,14z" />
                  <circle cx="10.5" cy="18.5" r="1.5" />
                  <circle cx="17.5" cy="18.5" r="1.5" />
                  (0)
                </svg>
              </a>
            </div>
          </div>
        </nav>
      </header>
    );
}


export default Header;
