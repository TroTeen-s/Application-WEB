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
    let [lastnameError, setLastnameError] = useState({ error: false, helper: '' });
    let [usernameError, setUsernameError] = useState({ error: false, helper: '' });
    let [phoneNumberError, setPhoneNumberError] = useState({ error: false, helper: '' });
    let [emailError, setEmailError] = useState({ error: false, helper: '' });
    let [passwordError, setPasswordError] = useState({ error: false, helper: '' });
    let navigate = useNavigate();
    let { setAuth } = useContext(AuthContext)

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }



    const handleSubmit = async (event) => {




        event.preventDefault();
        let data = new FormData(event.currentTarget);
        let coucou = Object.fromEntries(data);

        let firstname = data.get('firstname');
        let lastname = data.get('lastname');
        let username = data.get('username');
        let phone_number = data.get('phone_number');
        let email = data.get('email');
        let password = data.get('password');



        // VERIFICATION DES INPUTS (FRONT)
        //firstname
        if (firstname.trim() === '') {
            setFirstnameError({ error: true, helper: 'Champs vide' });
        } else if (firstname.trim().length < 2 || firstname.trim().length > 50) {
            setFirstnameError({ error: true, helper: 'trop court / trop long' });
        } else {
            setFirstnameError({ error: false, helper: '' });
        }
        //lastname  
        if (lastname.trim() === '') {
            setLastnameError({ error: true, helper: 'Champs vide' });
        } else if (lastname.trim().length < 4 || lastname.trim().length > 50) {
            setLastnameError({ error: true, helper: 'trop court / trop long' });
        }
        else {
            setLastnameError({ error: false, helper: '' });
        }
        //username
        if (username.trim() === '') {
            setUsernameError({ error: true, helper: 'Champs vide' });
        } else if (username.trim().length < 2 || username.trim().length > 50) {
            setUsernameError({ error: true, helper: 'trop court / trop long' });
        }
        else {
            setUsernameError({ error: false, helper: '' });
        }
        //phone_number
        if (phone_number.trim() === '') {
            setPhoneNumberError({ error: true, helper: 'Champs vide' });
        } else if (phone_number.trim().length != 10) {
            setPhoneNumberError({ error: true, helper: '10 chiffres demandés' });
        }
        else {
            setPhoneNumberError({ error: false, helper: '' });
        }
        //email
        if (email.trim() === '') {
            setEmailError({ error: true, helper: 'Champs vide' });
        } else if (!validateEmail(email.trim())) {
            setEmailError({ error: true, helper: 'format email demandé (exemple@mail.fr)' });
        }
        else {
            setEmailError({ error: false, helper: '' });
        }

        //password
        if (password.trim() === '') {
            setPasswordError({ error: true, helper: 'Champs vide' });
        } else if (password.trim().length < 6 || password.trim().length > 25) {
            setPasswordError({ error: true, helper: 'entre 6 et 25 characteres' });
        }
        else {
            setPasswordError({ error: false, helper: '' });
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
                                error={lastnameError.error}
                                required
                                fullWidth
                                id="lastname"
                                label="Nom de famille"
                                name="lastname"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={usernameError.error}
                                required
                                fullWidth
                                id="username"
                                label="Pseudonyme"
                                name="username"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={phoneNumberError.error}
                                required
                                fullWidth
                                id="phone_number"
                                label="Numéro de téléphone"
                                name="phone_number"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={emailError.error}
                                required
                                fullWidth
                                id="email"
                                label="Adresse email"
                                name="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={passwordError.error}
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
                                error={passwordError.error}
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

