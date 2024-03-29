import React, { useContext, useLayoutEffect, useState } from "react";

import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { styled } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { AuthContext } from "../../context/AuthContext";
import {useTranslation} from 'react-i18next';

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



const Informations = () => {

    const {t, i18n} = useTranslation();

    const [infos, setInfos] = useState([])
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
        event.preventDefault();
        let data = new FormData(event.currentTarget);
        let coucou = Object.fromEntries(data)


        console.log(Object.fromEntries(data))
        try {
            let response = await axios.post('/api/auth/update', coucou)
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
                            <Grid item xs={12} sm={6}>
                                <StyledTextField
                                    autoComplete="given-name"
                                    name="firstname"
                                    required
                                    fullWidth
                                    id="firstname"
                                    label={t('Firstname')}
                                    autoFocus
                                    value={infos.firstname}
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <StyledTextField
                                    required
                                    fullWidth
                                    id="lastname"
                                    label={t('Second name')}
                                    name="lastname"
                                    value={infos.lastname}
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <StyledTextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Pseudo"
                                    name="username"
                                    value={infos.username}
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <StyledTextField
                                    required
                                    fullWidth
                                    id="phone_number"
                                    label={t('Phone Number')}
                                    name="phone_number"
                                    value={infos.phone_number}
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
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
                            {t('Change my personal information')}
                        </Button>

                    </Box>
    );
};

export default Informations;
