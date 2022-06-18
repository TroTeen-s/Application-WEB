import React, { useContext } from "react";
import { CircularProgress } from "@mui/material";
import { Outlet } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import verifyAuth from "../../auth/verifyAuth";

const Account = () => {
    let { auth } = useContext(AuthContext);
    verifyAuth();

    return (
        <div className="rounded-3 bg-dark p-6 text-white">
            <p>Voici mon compte</p>
            {(auth) ? <Outlet /> : <CircularProgress />}
        </div>
    );
};

export default Account;
