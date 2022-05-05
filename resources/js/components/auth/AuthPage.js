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
        <Grid container component="main">
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(/images/trotinette.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Outlet/>
        </Grid>

    );
};

export default AuthPage;
