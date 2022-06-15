import React from "react";
import { NavLink } from "react-router-dom";

const NavAccount = (selLink) => {

    const selected = (link) => {
        return selLink.selLink === link ?
            "no-underline pl-6 py-2 flex items-center text-s uppercase leading-snug text-orange-300  w-min whitespace-nowrap" :
            "transition no-underline px-2 py-2 flex items-center text-s uppercase leading-snug text-black-trot hover:translate-x-6 ease-in-out  w-min whitespace-nowrap";
    };





    return (
        <>
            <div className='flex flex-col space-y-3'>
                <NavLink
                    className={selected("informations")}
                    to="/account/informations">
                    <i className="fab fa-facebook-square text-s leading-lg text-black-trot opacity-75"></i>
                    <span className="duration-200 hover:text-black-trot">Mes informations</span>
                </NavLink>
                <NavLink
                    className={selected("password")}
                    to="/account/password">
                    <i className="fab fa-facebook-square text-s leading-lg text-black-trot opacity-75"></i>
                    <span className="duration-200 hover:text-black-trot">Mon mot de passe</span>
                </NavLink>
                <NavLink
                    className={selected("delete")}
                    to="/account/delete">
                    <i className="fab fa-facebook-square text-s leading-lg text-black-trot opacity-75"></i>
                    <span className="duration-200 hover:text-black-trot">Supprimer</span>
                </NavLink>
                <NavLink
                    className={selected("abonnements")}
                    to="/account/subscriptions">
                    <i className="fab fa-facebook-square text-s leading-lg text-black-trot opacity-75"></i>
                    <span className="duration-200 hover:text-black-trot">Mes abonnements</span>
                </NavLink>
                <NavLink
                    className={selected("purchases")}
                    to="/account/purchases">
                    <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i>
                    <span className="duration-200 hover:text-orange-300">Mes achats</span>
                </NavLink>
            </div>
        </>
    );
};

export default NavAccount;
