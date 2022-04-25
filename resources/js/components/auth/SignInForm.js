import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Outlet, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


export default function SignInForm(props) {
    let { auth, setAuth } = useContext(AuthContext)
    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        let data = new FormData(event.currentTarget);
        let coucou = Object.fromEntries(data)


        try {
            let response = await axios.post('/api/auth/login', coucou)
            if (response.data.success) {
                localStorage.setItem('apiBearerToken', response.data.data.token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`
                setAuth(true)
                navigate("/" + location.search);
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
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Connectez-vous
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Adresse email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mot de passe"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item style={{ flexGrow: 1 }}>
                            <Button
                                type="submit"
                                fullWidth={false}
                                variant="outlined"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Se connecter
                            </Button>
                        </Grid>

                        <Grid item xs>
                            <Link to="#" variant="body2" className='blue-200'>
                                Mot de passe oublié?
                            </Link>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item>
                            <Link to="/auth/register">
                                Vous n'avez pas de compte ? Inscrivez-vous
                            </Link>
                        </Grid>
                    </Grid>
                </Box>

                {/*<Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                 <TextField
                 margin="normal"
                 required
                 fullWidth
                 id="email"
                 label="Email Address"
                 name="email"
                 autoComplete="email"
                 autoFocus
                 />
                 <TextField
                 margin="normal"
                 required
                 fullWidth
                 name="password"
                 label="Password"
                 type="password"
                 id="password"
                 autoComplete="current-password"
                 />
                 <Grid
                 container
                 direction="row"
                 justifyContent="center"
                 alignItems="center"
                 >
                 <Button
                 type="submit"
                 fullWidth={false}
                 variant="contained"
                 sx={{mt: 3, mb: 2}}
                 >
                 Sign In
                 </Button>
                 </Grid>

                 <Grid container>
                 <Grid item xs>
                 <Link href="#" variant="body2">
                 Forgot password?
                 </Link>
                 </Grid>
                 <Grid item>
                 <Link href="#" variant="body2">
                 {"Don't have an account? Sign Up"}
                 </Link>
                 </Grid>
                 </Grid>
                 </Box>*/}
            </Box>
        </Grid>
    )
}

