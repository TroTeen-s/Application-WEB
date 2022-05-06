import React, { useContext, useLayoutEffect, useState } from 'react';
import { AuthContext } from "../context/AuthContext";
import { Grid, Typography } from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Outlet, useNavigate } from "react-router";
import { NavLink } from 'react-router-dom';

const NavAccount = (selLink) => {

    const selected = (link) => {
        const result = selLink.selLink == link ?
            "no-underline pl-6 py-2 flex items-center text-s uppercase leading-snug text-white  w-min whitespace-nowrap" :
            "transition no-underline px-2 py-2 flex items-center text-s uppercase leading-snug text-white  hover:translate-x-6 ease-in-out  w-min whitespace-nowrap";

        return result
    }





    return (
        <>
            <div className='flex flex-col space-y-3'>
                <NavLink
                    className={selected("informations")}
                    to="/account/informations">
                    <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i>
                    <span className="duration-200 hover:text-orange-300">Mes informations</span>
                </NavLink>
                <NavLink
                    className={selected("password")}
                    to="/account/password">
                    <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i>
                    <span className="duration-200 hover:text-orange-300">Mon mot de passe</span>
                </NavLink>
                <NavLink
                    className={selected("delete")}
                    to="/account/delete">
                    <i className="fab fa-facebook-square text-s leading-lg text-white opacity-75"></i>
                    <span className="duration-200 hover:text-orange-300">Supprimer</span>
                </NavLink>
            </div>
        </>
    );
};

export default NavAccount;