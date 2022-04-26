import "../../../css/app.css";
import React, { useContext } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';


import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Header() {


    let { auth, setAuth } = useContext(AuthContext);

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
        <li className="nav-item">
            <NavLink
                className="no-underline px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white duration-200 hover:text-orange-300"
                to="/auth/login">
                <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i>
                <span className="ml-2 duration-200 hover:text-orange-300">Connexion</span>
            </NavLink>
        </li>
        <li className="nav-item" onClick={() => setShowModal(true)}>
            <NavLink
                className="no-underline px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white duration-200 hover:text-orange-300"
                to="/auth/register">
                <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i>
                <span className="ml-2 duration-200 hover:text-orange-300">Inscription</span>
                <LoginIcon className="pl-2" style={{ fontSize: 'large' }} />

            </NavLink>
        </li>
    </>;

    let loggedIn = <>
        <li className="nav-item">
            <NavLink
                className="no-underline px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white duration-200 hover:text-orange-300"
                to="/admin">
                <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i>
                <span className="ml-2 duration-200 hover:text-orange-300">Admin</span>
            </NavLink>
        </li>
        <li className="nav-item">
            <NavLink
                className="no-underline px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white duration-200 hover:text-orange-300"
                to="/account">
                <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i>
                <span className="ml-2 duration-200 hover:text-orange-300">Mon compte</span>
            </NavLink>
        </li>
        <li className="nav-item">
            <NavLink
                className="no-underline px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white duration-200 hover:text-orange-300"
                to="#"
                onClick={doLogout}>
                <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i>
                <span className="ml-2 duration-200 hover:text-orange-300">Déconnexion</span>
                <LogoutIcon className="pl-2 duration-200 hover:text-orange-300" style={{ fontSize: 'large' }} />
            </NavLink>
        </li>
    </>;

    return (
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3">
            <div className="container px-4 mx-auto flex flex-wrap items-center -between">
                <div className="w-full relative flex md:w-auto md:static md:block md:justify-start">
                    <NavLink
                        className="no-underline text-xl font-bold leading-relaxed inline-block mr-1 py-2 whitespace-nowrap uppercase text-white"
                        to="/">
                        Easy
                    </NavLink>

                    <NavLink
                        className="no-underline text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase duration-200 hover:text-orange-300 text-orange-300"
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
                            <NavLink
                                className="no-underline px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white duration-200 hover:text-orange-300"
                                to="/need_help">
                                <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i>
                                <span className="ml-2 duration-200 hover:text-orange-300">Besoin d'aide</span>
                            </NavLink>

                        </li>

                        <li className="nav-item">
                            <NavLink
                                className="no-underline px-3 py-2 flex items-center text-s uppercase font-bold leading-snug text-white duration-200 hover:text-orange-300"
                                to="/store">
                                <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i>
                                <span className="ml-2 duration-200 hover:text-orange-300">Nos abonnements</span>
                            </NavLink>

                        </li>
                        {auth ? loggedIn : loggedOut}
                    </ul>
                </div>
            </div>
        </nav>
    );
}


export default Header;
