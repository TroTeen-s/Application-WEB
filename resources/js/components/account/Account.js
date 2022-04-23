import React, { useContext, useLayoutEffect, useState } from 'react';
import { AuthContext } from "../context/AuthContext";
import { Grid, Typography } from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Outlet, useNavigate } from "react-router";

const Account = () => {

    return (
        <div className="rounded-3 bg-dark p-6 text-white">
            <p>Voici mon compte</p>
            <Outlet />
        </div>
    );
};

export default Account;
