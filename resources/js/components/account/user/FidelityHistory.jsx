import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { DateTime } from "luxon";
import { DataGrid } from "@mui/x-data-grid";
import './style.css';
import {useTranslation} from 'react-i18next';

const FidelityHistory = () => {

    const {t, i18n} = useTranslation();

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
                    <Grid item alignItems={"center"} sx={{ mb: 2 }}>
                        <Typography variant="h5"
                                    component={"span"} className="black-trot">{t('Your loyalty balance')}</Typography>
                    </Grid>

                    <Grid container item xs={12} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12} md={3}>
                            <div>{t('Current points:')} {userInfos?.fidelity_points}</div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div>{t('Points generated in total:')} {userInfos?.fidelityTotal}</div>
                        </Grid>
                    </Grid>

                    <Grid container item xs={12}>
                        <h2 className="black-trot mt-4">{t('History of your loyalty balance:')}</h2>
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

