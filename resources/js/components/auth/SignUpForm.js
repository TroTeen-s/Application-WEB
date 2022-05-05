import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import LockOpenIcon from '@mui/icons-material/LockOpen';

export default function SignUpForm() {
    let [firstnameError, setFirstnameError] = useState({ error: false, helper: '' });
    let navigate = useNavigate();
    let { setAuth } = useContext(AuthContext)

    const handleSubmit = async (event) => {
        event.preventDefault();
        let data = new FormData(event.currentTarget);
        let coucou = Object.fromEntries(data);

        let firstname = data.get('firstname');
        if (firstname.trim() === '') {
            setFirstnameError({ error: true, helper: 'Champs vide' });
        } else if (firstname.trim().length < 6 || firstname.trim().length > 50) {
            setFirstnameError({ error: true, helper: 'trop court / trop long' });
        }

        console.log(Object.fromEntries(data));
        try {
            let response = await axios.post('/api/auth/register', coucou);
            if (response.data.success) {
                localStorage.setItem('apiBearerToken', response.data.data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`;
                setAuth(true)
            }
        } catch (e) {
        }
    };


    return (
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
                sx={{
                    my: 8,
                    mx: 4,
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOpenIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Inscrivez-vous
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={firstnameError.error}
                                autoComplete="given-name"
                                name="firstname"
                                required
                                fullWidth
                                id="firstname"
                                label="Prénom"
                                helperText={firstnameError.helper}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastname"
                                label="Nom de famille"
                                name="lastname"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                label="Pseudonyme"
                                name="username"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="phone_number"
                                label="Numéro de téléphone"
                                name="phone_number"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Adresse email"
                                name="email"
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
                        variant="outlined"
                        sx={{ mt: 3, mb: 2 }}
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
            </Box>
        </Grid>
    );
}

