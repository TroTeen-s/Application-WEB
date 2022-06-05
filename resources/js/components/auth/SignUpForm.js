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
import { NavLink } from "react-router-dom";

import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)({
    [`& .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: "white"
    },
    [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: "white"
    },
    [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: "white"
    },
    [`& .${outlinedInputClasses.input}`]: {
      color: "white"
    },
    [`&:hover .${outlinedInputClasses.input}`]: {
      color: "white"
    },
    [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.input}`]: {
      color: "white"
    },
    [`& .${inputLabelClasses.outlined}`]: {
      color: "white"
    },
    [`&:hover .${inputLabelClasses.outlined}`]: {
      color: "white"
    },
    [`& .${inputLabelClasses.outlined}.${inputLabelClasses.focused}`]: {
      color: "white"
    }
  });




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
        <section className="h-auto bg-black-trot">
            <div class="min-h-auto flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div class="max-w-md w-full space-y-8">
                    <div>
                        <div className="text-center uppercase font-black no-underline pt-2 pl-5">
                            <NavLink
                                className="uppercase text-white font-black text-5xl no-underline"
                                to="/Main"
                            >
                                Easy
                            </NavLink>

                            <NavLink
                                className="uppercase text-orange-300 hover:text-white text-5xl no-underline"
                                to="/Main"
                            >
                                Scooter
                            </NavLink>
                        </div>
                        <h2 class="mt-6 text-center text-2xl font-extrabold text-white">
                            Sign up to create an account
                        </h2>
                    </div>
                    <Box class="mt-8 space-y-6" component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <input type="hidden" name="remember" value="true" />

                        <div class="flex items-center justify-center space-x-2">
                            <span class="h-px w-16 bg-white"></span>
                            <span class="text-white font-normal">Personnal Information</span>
                            <span class="h-px w-16 bg-white"></span>
                        </div>

                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={6}>
                            <StyledTextField
                                inputProps={{ style: { color: "red" } }}
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
                            <StyledTextField
                                error={lastnameError.error}
                                required
                                fullWidth
                                id="lastname"
                                label="Nom de famille"
                                name="lastname"
                                helperText={lastnameError.helper}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <StyledTextField
                                error={usernameError.error}
                                required
                                fullWidth
                                id="username"
                                label="Pseudonyme"
                                name="username"
                                helperText={usernameError.helper}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <StyledTextField
                                error={phoneNumberError.error}
                                required
                                fullWidth
                                id="phone_number"
                                label="Numéro de téléphone"
                                name="phone_number"
                                helperText={phoneNumberError.helper}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <StyledTextField
                                error={emailError.error}
                                required
                                fullWidth
                                id="email"
                                label="Adresse email"
                                name="email"
                                helperText={emailError.helper}
                            />
                        </Grid>

                        <Grid item xs={12}>
                        <div class="flex items-center justify-center space-x-2">
                            <span class="h-px w-16 bg-white"></span>
                            <span class="text-white font-normal">Security</span>
                            <span class="h-px w-16 bg-white"></span>
                        </div>
                        </Grid>

                        <Grid item xs={12}>
                            <StyledTextField
                                error={passwordError.error}
                                required
                                fullWidth
                                name="password"
                                label="Mot de passe"
                                type="password"
                                id="password"
                                helperText={passwordError.helper}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <StyledTextField
                                error={passwordError.error}
                                required
                                fullWidth
                                name="password_confirmation"
                                label="Confirmation Mot de passe"
                                type="password"
                                id="password"
                                helperText={passwordError.helper}
                            />
                        </Grid>
                    </Grid>

                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    class="h-4 w-4 text-orange-300 focus:ring-orange-200 border-gray-300 rounded"
                                />
                                <label
                                    for="remember-me"
                                    class="ml-2 block text-sm text-white"
                                >
                                    {" "}
                                    Remember me{" "}
                                </label>
                            </div>

                            <div class="text-sm">
                                <a
                                    href="#"
                                    class="font-medium text-orange-300 hover:text-orange-300"
                                >
                                    {" "}
                                    Forgot your password?{" "}
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                class="group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-orange-300 hover:bg-orange-300"
                            >
                                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg
                                        class="h-5 w-5 text-black group-hover:text-black"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </span>
                                Sign in
                            </button>
                        </div>
                        <div class="flex items-center justify-center space-x-2">
                            <span class="h-px w-16 bg-white"></span>
                            <span class="text-white font-normal">OR</span>
                            <span class="h-px w-16 bg-white"></span>
                        </div>
                        <p class="flex flex-col items-center justify-center mt-10 text-center text-md text-white">
				            <span>Do you have an account?</span>
                            <Link to="/auth/login">
				                <a class="text-orange-300 hover:text-black no-underline hover:underline cursor-pointer transition ease-in duration-300">Sign in</a>
                            </Link>
                        </p>
                      </Box>
                </div>
            </div>
        </section>
    );
}

