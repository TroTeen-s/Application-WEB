import * as React from "react";
import { useContext, useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
// import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from "@mui/material";
import { AuthLoadingContext } from "../../context/AuthContext";
import { Toaster } from "react-hot-toast";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import EuroIcon from "@mui/icons-material/Euro";
import DescriptionIcon from "@mui/icons-material/Description";

let listPurchases = 0;
let listPurchasesSold = 0;
export default function purchases() {

    const [infos,
        setInfos] = useState();
    const [status,
        setStatus] = useState(undefined);

    const [infosHistory,
        setInfosHistory] = useState();


    let {loaded} = useContext(AuthLoadingContext)



    const columnsHistory = [
        {
            field: 'id',
            headerName: 'ID',
            width: 80,
            headerAlign: 'center',
            align: 'center'
        }, {
            field: 'amount',
            headerName: 'Somme dépensé',
            align: 'center',
            width: 170,
            editable: false,
            headerAlign: 'center'
        }, {
            field: 'payment_date',
            headerName: 'Date de paiement',
            align: 'center',
            width: 270,
            editable: false,
            headerAlign: 'center'
        }, {
            field: 'billing_address_city',
            headerName: 'Ville',
            align: 'center',
            width: 150,
            editable: false,
            headerAlign: 'center'
        }, {
            field: 'billing_address_line',
            headerName: 'Adresse',
            align: 'center',
            width: 300,
            editable: false,
            headerAlign: 'center'
        }, {
            field: 'billing_address_postal_code',
            headerName: 'Code Postal',
            align: 'center',
            width: 150,
            editable: false,
            headerAlign: 'center'
        }, {
            field: `card_number`,
            headerName: '4 Last card number',
            align: 'center',
            width: 250,
            editable: false,
            headerAlign: 'center'
        },{
            field: '',
            headerName: "PDF Facture",
            sortable: false,
            headerAlign: 'center',
            align: 'center',
            width: 160,
            renderCell: (params) => (

                <strong>
                    <Button className="text-white" color="primary" variant="contained" size="small"
                        style={{ marginLeft: 10 }}
                        onClick={async() => {
                            console.log(params)
                          await HandlePDF(params.row.id);
                        }}

                    >
                        Télécharger
                    </Button>
                </strong >
        )
    }
    ];

    const HandlePDF = async (id) => {

        try {

            await axios.get(`/api/documents/pdf/${id}`)
                .then(function(response) {
                    console.log(response);
                    console.log("Successfully Logged in ");
                    window.open(`/api/documents/pdf/${id}`, `_blank`);

                });

        } catch (error) {
            console.log(error);
        }

    }


    const RetrieveInfosHistory = async() => {
        try {

            await axios
                .get('/api/dashboard/api/dashboard/api/scooters/history/list', {
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {

                    setInfosHistory(response.data.data)
                    setStatus({type: 'success'});

                })
                .catch(error => console.log(error));

        } catch (error) {
            console.log(error)
        }

    }

    const retrieveInfos = async() => {

        listPurchasesSold = 0;

        try {
            let response = await axios.get("/api/dashboard/purchases/list");
            setTimeout(() => {}, 1000);

            if (response.data.data) {
                listPurchases = response.data.data.length;
                for (let i = 0; i < listPurchases; i++) {
                    listPurchasesSold += response.data.data[i].amount;
                }
                setInfos(response.data.data);

            }

        } catch (e) {
            console.log("error achat");
            console.log(e.message);
        }
    }

    useEffect(async() => {

        if (loaded) {
            await retrieveInfos()
            await RetrieveInfosHistory()
        }
    }, [loaded])

    return (
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) => theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: "200vh"
            }}>


            <Toolbar />
            <Container
                maxWidth={false}
                className="h-full overflow-hidden"
                sx={{
                    mb: 1
                }}>
                <Box>
                    <Box
                        sx={{
                            alignItems: "center",
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        m: -1
                    }}>
                        <Typography
                            sx={{
                            m: 1
                        }}
                            variant="h4">
                            Achats
                        </Typography>
                        <Box sx={{
                            m: 1
                        }}></Box>
                    </Box>
                </Box>

                <Grid className="mt-2" container spacing={4}>
                    <Grid item xl={6} lg={6} sm={6} xs={6}>
                        <Card>
                            <CardContent>
                                <Grid
                                    container
                                    spacing={3}
                                    sx={{
                                    justifyContent: 'space-between'
                                }}>
                                    <Grid item>
                                        <Typography color="textSecondary" gutterBottom variant="overline">
                                            TOTAL ACHATS
                                        </Typography>
                                        <Typography color="textPrimary" variant="h4">
                                            {listPurchases}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Avatar
                                            sx={{
                                            backgroundColor: 'primary.main',
                                            height: 56,
                                            width: 56
                                        }}>
                                            <DescriptionIcon/>
                                        </Avatar>
                                    </Grid>
                                </Grid>

                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xl={6} lg={6} sm={6} xs={6}>
                        <Card>
                            <CardContent>
                                <Grid
                                    container
                                    spacing={3}
                                    sx={{
                                    justifyContent: 'space-between'
                                }}>
                                    <Grid item>
                                        <Typography color="textSecondary" gutterBottom variant="overline">
                                            CHIFFRES GENERES
                                        </Typography>
                                        <Typography color="textPrimary" variant="h4">
                                            {listPurchasesSold}
                                            €
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Avatar
                                            sx={{
                                            backgroundColor: '#C02CF7',
                                            height: 56,
                                            width: 56
                                        }}>
                                            <EuroIcon/>
                                        </Avatar>
                                    </Grid>
                                </Grid>

                            </CardContent>
                        </Card>

                    </Grid>

                    <Grid item xl={12} lg={12} sm={12} xs={12}>

                        <Box sx={{
                            mt: 3
                        }}>

                            <Card>
                                <div
                                    style={{
                                    height: 400,
                                    width: '100%',
                                    paddingBottom: 10
                                }}>

                                    <Toaster/>

                                    <DataGrid
                                        components={{
                                        LoadingOverlay: LinearProgress
                                    }}
                                        initialState={{
                                        sorting: {
                                            sortModel: [
                                                {
                                                    field: 'id',
                                                    sort: 'desc'
                                                }
                                            ]
                                        }
                                    }}
                                        rows={infos}
                                        columns={columnsHistory}
                                        pageSize={10}
                                        rowsPerPageOptions={[10]}
                                        disableSelectionOnClick
                                        loading={!infosHistory}/>

                                </div>
                            </Card>

                        </Box>
                    </Grid>

                </Grid>

            </Container>
        </Box>

    );
}
