import React, {useContext, useEffect, useState} from 'react';
import {DataGrid, GridActionsCellItem} from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import {LinearProgress} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from "@mui/material/Paper";
import { Box, Typography } from '@mui/material';
import {AuthLoadingContext} from "../context/AuthContext";
import Container from '@mui/material/Container';

const Customers = () => {

    const [infos,
        setInfos] = useState();

    let {loaded} = useContext(AuthLoadingContext)

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 40
        }, {
            field: 'firstname',
            headerName: 'firstname',
            width: 110,
            editable: false
        }, {
            field: 'lastname',
            headerName: 'lastname',
            width: 150,
            editable: false
        }, {
            field: 'username',
            headerName: 'username',
            width: 110,
            editable: false
        }, {
            field: 'email',
            headerName: 'email',
            width: 200,
            editable: false
        }, {
            field: 'admin',
            headerName: 'admin',
            type: 'boolean',
            width: 70
        }, {
            field: 'fidelity_points',
            headerName: 'fidelity_points',
            width: 110,
            editable: false
        }, {
            field: 'active',
            headerName: 'active',
            width: 150,
            editable: false,
            renderCell: (params) => (

                <div id={"is-active-" + params.row.id}>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        style={{
                        marginLeft: 16
                    }}
                        onClick={() => {
                        {
                            params.row.active
                                ? HandleDesactive(params.row.id)
                                : HandleActive(params.row.id)
                        }
                    }}
                        className={params.row.active
                        ? "m-0 text-primary"
                        : "m-0 text-black"}>
                        {params.row.active
                            ? "Desactiver"
                            : "Activer"}
                    </Button>
                </div >
            )

        }, {
            field: 'role',
            headerName: 'admin',
            width: 80,
            editable: false,
            renderCell: (params) => (

                <div id={"is-active-" + params.row.id}>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        style={{
                        marginLeft: 16
                    }}
                        onClick={() => {
                        {
                            params.row.role === "admin"
                                ? HandleUser(params.row.id)
                                : HandleAdmin(params.row.id);
                        }
                    }}
                        className={params.row.role === "admin"
                        ? "m-0 text-primary"
                        : "m-0 text-black"}>
                        {params.row.role === "admin"
                            ? "Admin"
                            : "User"}
                    </Button>
                </div >
            )

        }, {
            field: 'actions',
            type: 'actions',
            width: 50,
            getActions: (params) => [< GridActionsCellItem icon = { < DeleteIcon />
                }
                label = "Delete" onClick = {
                    () => {
                        DeleteUser(params.row.id)
                    }
                } />]
        }
    ];

    const HandleActive = async(event) => {

        try {

            let response = await axios.get(`/api/user/active/${event}`);

            if (response.data.data) {
                console.log(response.data.data)
                setInfos(response.data.data)
            }

        } catch (error) {
            console.log(error)
        }

    };

    const HandleAdmin = async(event) => {

        try {

            let response = await axios.post(`/api/user/putadmin/${event}`);

            if (response.data.data) {
                console.log(response.data.data)
                setInfos(response.data.data)
            }

        } catch (error) {
            console.log(error)
        }

    };

    const HandleUser = async(event) => {

        try {

            let response = await axios.post(`/api/user/putuser/${event}`);

            if (response.data.data) {
                console.log(response.data.data)
                setInfos(response.data.data)
            }

        } catch (error) {
            console.log(error)
        }

    };

    const HandleDesactive = async(event) => {

        try {

            let response = await axios.get(`/api/user/desactive/${event}`);

            if (response.data.data) {
                console.log(response.data.data)
                setInfos(response.data.data)
            }

        } catch (error) {
            console.log(error)
        }

    };

    const DeleteUser = async(event) => {

        try {

            let response = await axios.post(`/api/dashboard/users/delete/${event}`);

            if (response.data.data) {
                console.log(response.data.data)
                setInfos(response.data.data)
            }

        } catch (error) {
            console.log(error)
        }

    };

    const retrieveInfos = async() => {
        try {
            let response = await axios.get('/api/users', {
                headers: {
                    'Accept': 'application/json'
                }
            })

            if (response.data.data) {
                setInfos(response.data.data)
            }
        } catch (e) {}
    }

    useEffect(() => {

        if (loaded) {
            retrieveInfos()
        }
    }, [loaded])

    return (

      <Box
      component="main"
      sx={{
          backgroundColor: (theme) =>
              theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
      }}
  >

<Container className="overflow-hidden" sx={{ mt: 1, mb: 1 }}>


        <Paper
            sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            paddingBottom: 5,
            marginTop: "5rem"
        }}>

            <Box
                sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                my: 3
            }}>
                <Typography variant="h4">
                    Ensemble des utilisateurs
                </Typography>
                </Box>
                <div
                    style={{
                    height: 400,
                    width: '100%',
                    paddingBottom: 10
                }}>
                    <DataGrid
                        components={{
                        LoadingOverlay: LinearProgress
                    }}
                        rows={infos}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        loading={!infos}/>
                </div>

            </Paper>
          </Container>
      </Box>
);


}

export default Customers;