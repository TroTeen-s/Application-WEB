import React, { useContext, useLayoutEffect, useState } from 'react';
import { AuthContext } from "../context/AuthContext";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

import { Outlet } from "react-router";

const Users = () => {


    const [infos, setInfos] = useState([]);

    let { auth } = useContext(AuthContext)


    const retrieveInfos = async () => {
        try {
            let response = await axios.get('/api/users', {
                headers: {
                    'Accept': 'application/json'
                }
            })
            if (response.data.data) {
                setInfos(response.data.data)
            }
            console.log(response.data)

        } catch (e) {
        }
    }

    retrieveInfos()

    console.log(infos)


    return (
        <>
            <p>Tous les users</p>
        </>

    );
};

export default Users;