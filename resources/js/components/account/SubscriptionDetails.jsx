import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import { DateTime } from "luxon";
import { Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const SubscriptionDetails = () => {

    const { subscriptionID } = useParams();

    let [subscriptionInfo, setSubscriptionInfos] = useState();

    const retrieveData = async () => {
        let response = await axios.get(`/api/subscription/${subscriptionID}`);

        if (response.data.success) {
            console.log(response.data.data);
            setSubscriptionInfos(response.data.data);
        }
    };

    const currentPeriod = () => {
        let start = DateTime.fromSQL(subscriptionInfo.current_period_start).setLocale("fr-FR").toLocaleString();
        let end = DateTime.fromSQL(subscriptionInfo.current_period_start).setLocale("fr-FR").toLocaleString();

        return "du " + start + " au " + end;
    };

    const columns = [
        // { field: "id", headerName: "ID", width: 90 },
        {
            field: "total_price",
            headerName: "Total",
            editable: false,
            type: "number",
            flex: 1,
            renderCell: (cellValues) => {
                return cellValues.row.amount + "€";
            }
        },
        {
            field: "date",
            headerName: "Date",
            description: "Quand le paiement correspondant à la facture a eu lieu",
            width: 150,
            editable: false,
            sortable: false,
            flex: 1
        },
        {
            field: "card_number",
            headerName: "Carte finissant par",
            width: 150,
            editable: false,
            sortable: false,
            flex: 1
        },
        {
            field: "download",
            headerName: "Télécharger Facture",
            description: "Télécharger la facture correspondante sous forme de pdf.",
            editable: false,
            sortable: false,
            width: 160,
            align: "center",
            renderCell: (cellValues) => {
                return (
                    <Chip
                        label="Télécharger"
                        color="success"
                        onClick={() => {
                            console.log(cellValues.row);
                            $;
                        }}
                    />
                );
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
                    <Grid item alignItems={"center"}>
                        <Typography component={"span"}>{"Votre abonnement actif" + subscriptionID}</Typography>
                    </Grid>

                    <Grid container item xs={12} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12} md={3}>
                            <div>Type de l'abonnement: {subscriptionInfo?.package_name}</div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div>Statut de l'abonnement : {subscriptionInfo?.active ? "actif" : "non actif"}</div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div>Période actuelle de l'abonnement
                                : {subscriptionInfo?.current_period_start ? currentPeriod() : null}</div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div>Nombre de trajets effectués ce mois-ci : {subscriptionInfo?.trip_number}</div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div>Abonnement commencé le : {subscriptionInfo?.created_at}</div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div>Abonnement terminé le
                                : {subscriptionInfo?.active ? "toujours actif" : subscriptionInfo?.canceled_at}</div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div>Points cumulés sur l'abonnement : 674</div>
                        </Grid>
                    </Grid>

                    <Grid container item xs={12}>
                        <h1>Voici la liste de vos factures correspondant à cet abonnement : </h1>
                        <div style={{ height: 400, width: "100%" }}>
                            <DataGrid
                                rows={subscriptionInfo?.invoices}
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

export default SubscriptionDetails;

