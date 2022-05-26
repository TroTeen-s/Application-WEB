import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { DateTime } from "luxon";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router";

const Subscriptions = () => {

    let navigate = useNavigate();

    let [data, setData] = useState([]);

    const retrieveData = async () => {
        let response = await axios.get("/api/subscription");

        if (response.data.success) {
            console.log(data);
            setData(response.data.data);
        }
    };

    const currentPeriod = (cellValues) => {
        let { row } = cellValues;

        if (!row.active) {
            return <div className="center-text w-full">N/D</div>;
        }

        let start = DateTime.fromSQL(row.current_period_start).setLocale("fr-FR").toLocaleString();
        let end = DateTime.fromSQL(row.current_period_end).setLocale("fr-FR").toLocaleString();

        let cell = "du " + start + " au " + end;


        return (<p>{cell}</p>);
    };

    useEffect(() => {
        retrieveData();

    }, []);

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "last_payment",
            headerName: "Dernier paiment",
            editable: false,
            flex: 2
        },
        {
            field: "active",
            headerName: "Actif",
            width: 150,
            editable: false,
            flex: 1
        },
        {
            field: "current_period",
            headerName: "Période actuelle",
            width: 150,
            editable: false,
            flex: 2,
            renderCell: currentPeriod
        },
        {
            field: "package_name",
            headerName: "Abonnement",
            width: 150,
            editable: false,
            flex: 1
        },
        {
            field: "trip_number",
            headerName: "Nombre de trajets",
            type: "number",
            editable: false,
            flex: 2
        },
        {
            field: "informations",
            headerName: "Informations",
            description: "This column has a value getter and is not sortable.",
            sortable: false,
            width: 160,
            align: "center",
            renderCell: (cellValues) => {
                return (
                    <Chip
                        label="Détails"
                        color="success"
                        onClick={() => {
                            console.log(cellValues.row);
                            navigate(`${cellValues.row.id}`);
                        }}
                    />
                );
            }
        }
    ];


    return (
        <>
            <Container>
                <h1>Voici la liste de vos abonnements : </h1>
                <div style={{ height: 400, width: "100%" }}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                    />
                </div>
            </Container>
        </>
    );
};

export default Subscriptions;
