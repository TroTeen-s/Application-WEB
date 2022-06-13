import React, { useContext, useLayoutEffect, useState } from 'react';

import { AuthContext } from "../context/AuthContext";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import NavAccount from './NavAccount';
import { useNavigate } from "react-router";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const Delete = () => {

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
                <Grid item xs={12}>
                    {/* <Typography ClassName="text-black-trot" variant="h2">
                        Supprimer votre compte
                    </Typography> */}
                </Grid>
                <Grid container item xs={12}>
                    <Grid xs={4} className='text-[5]' alignItems="center" justifyContent="center">
                        <NavAccount selLink='delete' />
                    </Grid>
                    <Grid item xs={8}>

                        <Grid container spacing={2}>


                            <Grid item xs={24} sm={12}>
                                <div className='text-lg'>
                                    <p>En selectionnant ce bouton vous supprimerez votre compte Easy Scooter</p>
                                    <p>Cette action est définitive vous serez alors déconnecter et ne pourrez plus vous connecter avec vos identifiant actuel </p>
                                </div>

                            </Grid>





                        </Grid>
                        <Button

                            color='error'
                            fullWidth
                            variant="outlined"
                            onClick={handleClickOpen}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Supprimer votre compte
                        </Button>


                    </Grid>
                </Grid >

            </Grid >

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >

                <DialogTitle>{"Supprimer votre compte ?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Êtes vous sur de vouloir supprimer votre compte ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Ne pas Supprimer</Button>
                    <Button color='error' variant="contained" onClick={handleSubmit}>Supprimer</Button>
                </DialogActions>

            </Dialog>
        </>

    );
};

export default Delete;
