import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";

import { useTranslation } from "react-i18next";

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

    const {t, i18n} = useTranslation();

    let { setAuth } = useContext(AuthContext);
    let navigate = useNavigate();
    const [isFormInvalid, setIsFormInvalid] = useState(false);

    let [emailError, setEmailError] = useState({ error: false, helper: "" });
    let [passwordError, setPasswordError] = useState({
        error: false,
        helper: "",
    });

    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
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
        <section className="h-full bg-black-trot">
            {/* <h4 className="z-40"> Test </h4> */}
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
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
                        <h2 className="mt-6 text-center text-2xl font-extrabold text-white">
                        {t('Sign in to your account')}
                        </h2>
                    </div>
                    <Box className="mt-8 space-y-6" component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        {isFormInvalid ?
                            <div className=" flex items-center justify-between text-orange-300">
                                <span className="m-0 p-0 text-center"> {t('Incorrect credentials')}</span>
                                <span className="cursor-pointer text-center" onClick={removeError}>X</span>
                            </div> :
                            <></>}
                        <StyledTextField

                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label={t('Email adress')}
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
                              label={t('Password')}
                              type="password"
                              id="password"
                              autoComplete="current-password"
                              error={passwordError.error}
                              helperText={passwordError.helper}
                          />



                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-orange-300 hover:bg-orange-300 focus:outline-none"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg
                                        className="h-5 w-5 text-black group-hover:text-black"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                                {t('Sign in')}
                            </button>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                            <span className="h-px w-16 bg-white"></span>
                            <span className="text-white font-normal"> {t('Or')}</span>
                            <span className="h-px w-16 bg-white"></span>
                        </div>
                        <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-white">
                            <span>{t("Don't have an account?")}</span>
                            <Link to="/auth/register">
                                <a className="text-orange-300 hover:text-black no-underline hover:underline cursor-pointer transition ease-in duration-300">
                                {t("Sign up")}</a>
                            </Link>
                        </p>
                    </Box>
                </div>
            </div>
        </section>
    );
}
