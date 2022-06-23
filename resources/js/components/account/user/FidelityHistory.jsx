import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { DateTime } from "luxon";
import { DataGrid } from "@mui/x-data-grid";

const FidelityHistory = () => {

    const [userInfos, setUserInfoss] = useState();

    const retrieveData = async () => {
        let response = await axios.get(`/api/my-fidelity/`);

        if (response.data.success) {
            console.log(response.data.data);
            setUserInfoss(response.data.data);
        }
    };

    const columns = [
        { field: "id", headerName: "N°", width: 90 },
        {
            field: "reason",
            headerName: "Raison",
            editable: false,
            type: "text",
            flex: 1
        },
        {
            field: "amount",
            headerName: "Points gagnés",
            description: "Nombre de points gagnés lors de la transaction concernée",
            editable: false,
            sortable: false,
            flex: 1
        },
        {
            field: "date",
            headerName: "Date",
            description: "Quand le paiement correspondant à la facture a eu lieu",
            width: 150,
            editable: false,
            sortable: false,
            flex: 1,
            renderCell: ({ row }) => {
                return DateTime.fromSQL(row.date).setLocale("fr-FR").toLocaleString();
            }
        }
    ];

    useEffect(async () => {
        await retrieveData();

    }, []);


    return (
        <Container>
            <div>
                <Grid container spacing={2}>
                    <Grid item alignItems={"center"} sx={{ m: 2 }}>
                        <Typography variant="h3"
                                    component={"span"}>Historique de votre compte fidélité</Typography>
                    </Grid>

                    <Grid container item xs={12} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12} md={3}>
                            <div>Point actuels: {userInfos?.fidelity_points}</div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div>Points gagnés en tout: {userInfos?.fidelityTotal}</div>
                        </Grid>
                    </Grid>

                    <Grid container item xs={12}>
                        <h1>Historique de votre balance fidélité: </h1>
                        <div style={{ height: 400, width: "100%" }}>
                            <DataGrid
                                rows={userInfos ? userInfos.fidelity : []}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                disableSelectionOnClick
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default FidelityHistory;

