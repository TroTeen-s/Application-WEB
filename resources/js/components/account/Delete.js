import React, { useContext, useLayoutEffect, useState } from 'react';

import { AuthContext } from "../context/AuthContext";
import { Grid, Typography } from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import NavAccount from './NavAccount';
import { NavLink } from "react-router-dom";
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

    const [infos, setInfos] = useState([]);
    let { auth } = useContext(AuthContext)
    let navigate = useNavigate()


    const handleChange = (event) => {
        setInfos(event.target.value);
    };

    const retrieveInfos = async () => {
        try {
            let response = await axios.get('/api/me', {
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


    const handleSubmit = async (event) => {
        console.log("test")
        //console.log(Object.fromEntries(data))
        event.preventDefault();
        // let data = new FormData(event.currentTarget);


        try {
            await axios.post('/api/auth/delete')

        } catch (e) {
            console.log(e)
            // return navigate('/account')
        }
    };

    useLayoutEffect(() => {
        const checkAuth = async () => {
            try {
                let response = await axios.get("/api/is-auth", { headers: { Accept: 'application/json' } })
                if (response.data.success) {

                } else {
                    navigate('/')
                }
            } catch (e) {
                console.log(e.response.data.errors)
                return navigate('/account')
            }
        }

        retrieveInfos()

    }, [auth])




    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h3">
                        Supprimer votre compte
                    </Typography>
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
                            variant="contained"
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
