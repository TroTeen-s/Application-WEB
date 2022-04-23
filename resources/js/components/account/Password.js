import React, { useContext, useLayoutEffect, useState } from 'react';
import { AuthContext } from "../context/AuthContext";
import { Grid, Typography } from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import NavAccount from './NavAccount';

const Password = () => {

    let error_new_password = false
    let error_confirm_new_password = false
    let error_password = false

    const [infos, setInfos] = useState([]);
    let { auth } = useContext(AuthContext)
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
                let response = await axios.get("/api/is-auth", { headers: { Accept: 'application/json' } })
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

        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h3">
                    Modification de Mot de passe
                </Typography>
            </Grid>
            <Grid container item xs={12}>
                <Grid xs={4} className='text-[5]' alignItems="center" justifyContent="center">
                    <NavAccount selLink="password" />
                </Grid>
                <Grid item xs={8}>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    error={error_new_password}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Nouveau mot de passe"
                                    type="password"
                                    id="password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={error_confirm_new_password}
                                    required
                                    fullWidth
                                    name="password_confirmation"
                                    label="Confirmation du nouveau mot de passe"
                                    type="password"
                                    id="password"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    error={error_password}
                                    required
                                    fullWidth
                                    name="password_confirmation"
                                    label="Mot de passe"
                                    type="password"
                                    id="password"
                                />
                            </Grid>

                            <Grid item xs={24} sm={12}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    value={infos.email}
                                    InputProps={{
                                        readOnly: true,
                                        hidden: true
                                    }}

                                />
                            </Grid>


                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Changer de mot de passe
                        </Button>

                    </Box>
                </Grid>

            </Grid>
        </Grid>


    );
};

export default Password;
