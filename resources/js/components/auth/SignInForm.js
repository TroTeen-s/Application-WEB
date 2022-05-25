import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Outlet, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
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

export default function SignInForm() {
    let { setAuth } = useContext(AuthContext);
    let navigate = useNavigate();
    const [isFormInvalid, setIsFormInvalid] = useState(false);

    let [emailError, setEmailError] = useState({ error: false, helper: "" });
    let [passwordError, setPasswordError] = useState({
        error: false,
        helper: "",
    });

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    function removeError() {
        setIsFormInvalid(false);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = new FormData(event.currentTarget);
        let coucou = Object.fromEntries(data);

        let email = data.get("email");
        let password = data.get("password");

        if (email.trim() === "") {
            setEmailError({ error: true, helper: "Champs vide" });
        } else if (!validateEmail(email.trim())) {
            setEmailError({
                error: true,
                helper: "format email demandé (exemple@mail.fr)",
            });
        } else {
            setEmailError({ error: false, helper: "" });
        }

        //password
        if (password.trim() === "") {
            setPasswordError({ error: true, helper: "Champs vide" });
        } else if (password.trim().length < 6 || password.trim().length > 25) {
            setPasswordError({
                error: true,
                helper: "entre 6 et 25 characteres",
            });
        } else {
            setPasswordError({ error: false, helper: "" });
        }

        try {
            let response = await axios.post("/api/auth/login", coucou);
            if (response.data.success) {
                localStorage.setItem(
                    "apiBearerToken",
                    response.data.data.token
                );
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${response.data.data.token}`;
                setAuth(true);
                navigate("/" + location.search);
            } else {
                setIsFormInvalid(true);
            }
        } catch (e) {}
    };


    return (
            <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
                                className="uppercase text-orange-300 hover:text-black text-5xl no-underline"
                                to="/Main"
                            >
                                Scooter
                            </NavLink>
                        </div>
                        <h2 class="mt-6 text-center text-2xl font-extrabold text-white">
                            Sign in to your account
                        </h2>
                    </div>
                    <Box class="mt-8 space-y-6" component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <input type="hidden" name="remember" value="true" />
                        {/* <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input id="email-address" name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address"/>
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password"/>
        </div>
      </div> */}

                        <StyledTextField

                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Adresse email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            error={emailError.error}
                            helperText={emailError.helper}
                        />
                          <StyledTextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mot de passe"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={passwordError.error}
                            helperText={passwordError.helper}
                        />

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
                                class="group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-orange-300 hover:bg-orange-300 focus:outline-none"
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
				            <span>Don't have an account?</span>
                            <Link to="/auth/register">
				            <a class="text-orange-300 hover:text-black no-underline hover:underline cursor-pointer transition ease-in duration-300">Sign up</a>
                            </Link>
                        </p>
                      </Box>
                </div>
            </div>
    );
}
