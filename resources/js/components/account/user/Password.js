import React, { useContext, useLayoutEffect, useState } from "react";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import NavAccount from './NavAccount';
import { styled } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { AuthContext } from "../../context/AuthContext";

const StyledTextField = styled(TextField)({
    [`& .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: "black"
    },
    [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: "black"
    },
    [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: "black"
    },
    [`& .${outlinedInputClasses.input}`]: {
      color: "black"
    },
    [`&:hover .${outlinedInputClasses.input}`]: {
      color: "black"
    },
    [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.input}`]: {
      color: "black"
    },
    [`& .${inputLabelClasses.outlined}`]: {
      color: "black"
    },
    [`&:hover .${inputLabelClasses.outlined}`]: {
      color: "black"
    },
    [`& .${inputLabelClasses.outlined}.${inputLabelClasses.focused}`]: {
      color: "black"
    }
  });


const Password = () => {

    let error_new_password = false
    let error_confirm_new_password = false


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
            let response = await axios.post('/api/auth/update_password', coucou)
            if (response.data.success) {
                localStorage.setItem('apiBearerToken', response.data.data.token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`
            }
        } catch (e) {
        }
    };

    useLayoutEffect(() => {
        retrieveInfos()
    }, [auth])


    return (

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <StyledTextField
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
                    <StyledTextField
                        error={error_confirm_new_password}
                        required
                        fullWidth
                        name="password_confirmation"
                        label="Confirmation du nouveau mot de passe"
                        type="password"
                        id="password"
                    />
                </Grid>


                <Grid item xs={24} sm={12}>
                    <StyledTextField
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
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
            >
                Changer de mot de passe
            </Button>

        </Box>


    );
};

export default Password;
