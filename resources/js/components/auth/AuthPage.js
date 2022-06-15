import React, {useContext, useLayoutEffect} from 'react';
import Grid from "@mui/material/Grid";
import {Outlet, useNavigate} from "react-router";
import {AuthContext, AuthLoadingContext} from "../context/AuthContext";

const AuthPage = () => {
    let {auth} = useContext(AuthContext);
    let {loaded} = useContext(AuthLoadingContext);
    let navigate = useNavigate();

    useLayoutEffect(() => {
        console.log("loaded est " + loaded)
        console.log("auth est " + auth)
        if (loaded) {
            if (auth) {
                return navigate('/');
            }
        }
    }, [auth, loaded]);


    return (
       <section>
           <Outlet/>
       </section>

    );
};

export default AuthPage;
