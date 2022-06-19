import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { LinearProgress } from "@mui/material";

import { AuthLoadingContext } from "../context/AuthContext";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const Refunds = () => {

    const [infos, setInfos] = useState();

    let { loaded } = useContext(AuthLoadingContext);

    const validate = async (id, validate) => {
        let response = await axios.patch(`/api/refund/${id}`, { validated: validate });

        if (response.data.success) {
            await retrieveInfos();
        }
    };

    const refundPurchase = async (id) => {
        let response = await axios.get(`/api/issue-refund/${id}`);

        if (response.data.success) {
            await retrieveInfos();
        }
    };

    const validatecell = ({ row }) => {
        let actionsButtons = (<strong>
            <Button
                variant="outlined"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={() => {
                    validate(row.id, true);
                }}
            >
                Valider
            </Button>
            <Button
                variant="outlined"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={() => {
                    validate(row.id, false);
                }}
            >
                Refuser
            </Button>
        </strong>);

        if (row.status === "open") {
            return actionsButtons;
        } else {
            return row.validated ? "validé" : "refusé";
        }

    };
    const refundcell = ({ row }) => {
        let actionsButtons = (<strong>
            <Button
                variant="outlined"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={() => {
                    refundPurchase(row.id);
                }}
            >
                Rembourser
            </Button>
        </strong>);

        if (row.status === "open") {
            return "valider la demande pour rembourser";
        } else {
            if (row.refunded) {
                return "remboursé :)";
            }
            if (row.validated) {
                return actionsButtons;
            } else {
                return "demande refusée";
            }
        }
    };


    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 90
        },
        {
            field: "user_email",
            headerName: "Utilisateur",
            minWidth: 90,
            editable: false
        },
        {
            field: "reason",
            headerName: "Raison",
            flex: true,
            editable: false
        },
        {
            field: "amount",
            headerName: "Prix",
            renderCell: (params) => params.row.amount.toFixed(2) + "€"
        },
        {
            field: "cart_id",
            headerName: "Achat n°",
            editable: false
        },
        {
            field: "validated",
            headerName: "Valider",
            flex: true,
            editable: false,
            renderCell: validatecell

        },
        {
            field: "refunded",
            headerName: "Confirmer Remboursement",
            flex: true,
            editable: false,
            renderCell: refundcell

        }

    ];
    const retrieveInfos = async () => {
        try {
            let response = await axios.get("/api/refunds", {
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.data.data) {
                console.log("refresh des infos");
                setInfos(response.data.data);
            }
        } catch (e) {
        }
    };

    useEffect(() => {

        if (loaded) {
            retrieveInfos();
        }
    }, [loaded]);


    return (
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: "100vh"
            }}
        >
            <Toolbar />
            <Container className="overflow-hidden" sx={{ mt: 1, mb: 1 }}>
                <Grid container spacing={3}>
                    <h3>Tous les retours</h3>
                    <Grid item xs={20}>
                        <Paper sx={{ p: 3, display: "flex", flexDirection: "column", paddingBottom: 5 }}>

                            <div style={{ height: 400, width: "100%" }}>
                                <DataGrid
                                    components={{
                                        LoadingOverlay: LinearProgress
                                    }}
                                    rows={infos}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    disableSelectionOnClick
                                    loading={!infos}
                                />
                            </div>
                        </Paper>
                    </Grid>

                </Grid>

            </Container>
        </Box>

    );

};

export default Refunds;
