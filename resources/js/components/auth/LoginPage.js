import React, {useEffect, useState} from 'react';
import Header from "../header/Header";
import {
    Button,
    Container, createTheme,
    Grid, TextField, ThemeProvider
} from "@mui/material";
import {color} from "tailwindcss/lib/util/dataTypes";

const LoginPage = () => {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    const [bearer, setBearer] = useState('')

    useEffect(() => {
        let token = localStorage.getItem('apiBearerToken')
        if (token) {
            console.log("on y est et il est de " + token)
            setBearer(token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
    }, [])

    console.log("on y olus et il est de " + bearer)

    const instance = axios.create({
        withCredentials: true
    })
    const defaultValues = {
        name: "",
        age: ""
    };
    const [formValues, setFormValues] = useState(defaultValues);
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmitLogin = async (event) => {
        event.preventDefault();
        console.log(formValues);
        try {
            let response = await axios.post("api/auth/login", formValues)
            if (response.data.data.token) {
                console.log('le token est ' + response.data.data.token)
                localStorage.setItem('apiBearerToken', response.data.data.token)
                console.log('le token en localstorage est ' + response.data.data.token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`
            }
        } catch (e) {
            console.log(e.response.data.errors)
        }
    };


    const onClickedt = async () => {
        let response = await axios.post("/api/auth/logout")
        console.log(response.data)
        if (response.data.token) {

        }
    }
    const onClickedtt = async () => {
        console.log("Le bearer est " + bearer)
        try {
            let response = await axios.get("/api/is-auth", { headers: {Accept: 'application/json'}})
        } catch (e) {
            console.log(e.response.data.errors)
        }
    }
    const showLocalToken = async () => {
        let token = localStorage.getItem('apiBearerToken');
        console.log("Le token en localstorage est " + token)
    }

    return (
        <form onSubmit={handleSubmitLogin}>
            <Grid container alignItems="center" justify="center" direction="column">
                <Grid item>
                    <TextField
                        id="name-input"
                        name="email"
                        label="adresse mail"
                        type="email"
                        color="error"
                        value={formValues.email}
                        onChange={handleInputChange}
                        inputLabelPros={{color: "error", disableAnimation: true}}
                        variant="outlined"
                    />
                </Grid>
                <Grid item className={"py-2"}>
                    <TextField
                        id="age-input"
                        name="password"
                        label="Mot de passe"
                        type="password"
                        value={formValues.password}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
                <Button variant="contained" color="primary" onClick={onClickedt}>
                    Submit
                </Button>
                <Button variant="contained" color="primary" onClick={onClickedtt}>
                    cee
                </Button>
                <Button variant="contained" color="primary" onClick={showLocalToken}>
                    voir le localstorage
                </Button>
            </Grid>
        </form>
    );
};

export default LoginPage;
