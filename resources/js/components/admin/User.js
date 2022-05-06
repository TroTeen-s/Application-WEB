import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AuthLoadingContext } from "../context/AuthContext";
import Infos from "./components/Infos"
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";


const User = () => {
    let { id } = useParams()
    let { loaded } = useContext(AuthLoadingContext)
    const [infos, setInfos] = useState();
    let user

    const retrieveInfos = async () => {
        try {
            let response = await axios.get('/api/user/' + id, {
                headers: {
                    'Accept': 'application/json'
                }
            })

            if (response.data.data) {
                console.log(response)
                setInfos(response.data.data)

            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {

        if (loaded) {
            retrieveInfos()


        }
    }, [loaded])


    console.log("test " + infos)

    user = infos

    const active = () => {
        const button = document.getElementById("button-active")

        if (!user.user.active) {
            user.user.active = true

            button.innerHTML = "Désactiver le compte"

            try {
                let response = axios.get('/api/user/active/' + id, {
                    headers: {
                        'Accept': 'application/json'
                    }
                })

                if (response.data.data) {
                    console.log(response)
                    setInfos(response.data.data)

                }
            } catch (e) {
                console.log(e)
            }

        } else {
            user.user.active = false

            button.innerHTML = "Activer le compte"

            try {
                let response = axios.get('/api/user/desactive' + id, {
                    headers: {
                        'Accept': 'application/json'
                    }
                })

                if (response.data.data) {
                    console.log(response)
                    setInfos(response.data.data)

                }
            } catch (e) {
                console.log(e)
            }
        }
    }




    if (user) {
        return (
            <>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        <Infos label={"Adresse email:"} info={user.user.email} />
                    </Grid>
                    <Grid item xs={6}>
                        <Infos label={"Nom:"} info={user.user.lastname} />
                    </Grid>
                    <Grid item xs={6}>
                        <Infos label={"Prénom:"} info={user.user.firstname} />
                    </Grid>

                    <Grid item xs={6}>
                        <Infos label={"Pseudo:"} info={user.user.username} />
                    </Grid>

                    <Grid item xs={6}>
                        <Infos label={"Numéro de téléphone:"} info={user.user.phone_number} />
                    </Grid>

                    <Grid item xs={6}>
                        <Infos label={"Date de validation de l'email:"} info={(user.user.email_verified_at ? user.user.email_verified_at : "-")} />
                    </Grid>

                    <Grid item xs={6}>
                        <Infos label={"Role:"} info={user.user.role} />
                    </Grid>

                    <Grid item xs={6}>
                        <Infos label={"Compte Activé:"} info={(user.user.active ? "Activé" : "Non activé")} />
                    </Grid>

                    <Grid item xs={6}>

                    </Grid>

                    <Grid item xs={6}>
                        <div className='pl-6'>
                            <Button
                                size="large"
                                variant="outlined"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={active}
                                id="button-active"
                            >
                                {(user.user.active ? "Desactiver le compte" : "Activer le compte")}
                            </Button>
                        </div>
                    </Grid>


                </Grid >

            </>
        )
    } else {
        return (
            <> <p>rien</p></>
        )
    }

};
export default User;
