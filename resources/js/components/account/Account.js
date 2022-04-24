import React, {useContext, useLayoutEffect, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import {Grid, Typography} from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";

const Account = () => {

    const [infos, setInfos] = useState([]);
    let {auth} = useContext(AuthContext)
    let navigate = useNavigate()

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
        event.preventDefault();
        let data = new FormData(event.currentTarget);
        let coucou = Object.fromEntries(data)


        console.log(Object.fromEntries(data))
        try {
            let response = await axios.post('/api/auth/register', coucou)
            if (response.data.success) {
                localStorage.setItem('apiBearerToken', response.data.data.token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`
            }
        } catch (e) {
        }
    };


    useLayoutEffect(() => {
        const checkAuth = async () => {
            try {
                let response = await axios.get("/api/is-auth", {headers: {Accept: 'application/json'}})
                if (response.data.success) {

                } else {
                    navigate('/')
                }
            } catch (e) {
                console.log(e.response.data.errors)
                return navigate('/')
            }
        }
        checkAuth()
        retrieveInfos()
    }, [auth])

    return (
        <div className="rounded-3 bg-dark p-6 text-white">
            <p>Voici mon compte</p>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h3">
                        Vos infromations de compte
                    </Typography>
                </Grid>
                <Grid container item xs={12}>
                    <Grid xs={4} className='text-[5]' alignItems="center" justifyContent="center">
                        <AccountCircleOutlinedIcon fontSize='lg' style={{aspectRatio: '1/1', minHeight: '100%'}}/>
                    </Grid>
                    <Grid item xs={8}>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstname"
                                        required
                                        fullWidth
                                        id="firstname"
                                        label="Prénom"
                                        autoFocus
                                        value={infos.firstname}
                                        InputLabelProps={{shrink: true}}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastname"
                                        label="Nom de famille"
                                        name="lastname"
                                        value={infos.lastname}
                                        InputLabelProps={{shrink: true}}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="username"
                                        label="Pseudonyme"
                                        name="username"
                                        value={infos.username}
                                        InputLabelProps={{shrink: true}}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="phone_number"
                                        label="Numéro de téléphone"
                                        name="phone_number"
                                        value={infos.phone_number}
                                        InputLabelProps={{shrink: true}}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Adresse email"
                                        name="email"
                                        value={infos.email}
                                        InputLabelProps={{shrink: true}}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error
                                        required
                                        fullWidth
                                        name="password"
                                        label="Mot de passe"
                                        type="password"
                                        id="password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={true}
                                        required
                                        fullWidth
                                        name="password_confirmation"
                                        label="Mot de passe"
                                        type="password"
                                        id="password"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                S'inscrire
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link to="/auth/login">
                                        Vous avez déjà un compte ? Connectez-vous
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>

            </Grid>
        </div>
    );
};

export default Account;
