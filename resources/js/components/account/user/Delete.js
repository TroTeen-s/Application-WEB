import React, { useContext, useLayoutEffect, useState } from 'react';

import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import NavAccount from './NavAccount';
import { useNavigate } from "react-router";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from "@mui/material/Slide";
import { AuthContext } from "../../context/AuthContext";
import {useTranslation} from 'react-i18next';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const Delete = () => {

    const {t, i18n} = useTranslation();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let { auth, setAuth } = useContext(AuthContext);


    const [, setInfos] = useState([]);
    useNavigate();
    const retrieveInfos = async () => {
        try {
            let response = await axios.get("/api/me", {
                headers: {
                    "Accept": "application/json"
                }
            });
            if (response.data.data) {
                setInfos(response.data.data);
            }
            console.log(response.data)

        } catch (e) {
        }
    }


    const handleSubmit = async (event) => {
        console.log("test")
        event.preventDefault();


        try {
            await axios.post("/api/auth/delete");
            setAuth(false);
        } catch (e) {
            console.log(e)
        }
    };

    useLayoutEffect(() => {
        retrieveInfos()

    }, [auth])




    return (
        <>
            <Grid container spacing={2}>


                <Grid item xs={24} sm={12}>
                    <div className="text-lg">
                        <p>{t('By selecting this button you delete your Easy Scooter account')}</p>
                        <p>{t('This action is final, you will then be disconnected and will no longer be able to connect with your current credentials.')} </p>
                    </div>

                </Grid>


            </Grid>
            <Button

                color="error"
                fullWidth
                variant="outlined"
                onClick={handleClickOpen}
                sx={{ mt: 3, mb: 2 }}
            >
                {t('Delete your account')}
            </Button>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >

                <DialogTitle>{t('Delete your account?')}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                    {t('Are you sure you want to delete your account?')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('Do not delete')}</Button>
                    <Button color="error" variant="contained" onClick={handleSubmit}>{t('Delete')}</Button>
                </DialogActions>

            </Dialog>
        </>

    );
};

export default Delete;
