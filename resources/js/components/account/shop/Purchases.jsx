import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { DateTime } from "luxon";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router";

const Purchases = () => {

    const navigate = useNavigate();

    let [payments, setPayments] = useState([]);
    let [loading, setLoading] = useState(true);

    const retrieveData = async () => {
        let response = await axios.get("/api/carts");

        if (response.data.success) {
            console.log(payments);
            setPayments(response.data.data);
            setLoading(false);
        }
    };

    const currentPeriod = (cellValues) => {
        let { row } = cellValues;

        let paymentDate = DateTime.fromSQL(row.payment[0].payment_date).setLocale("fr-FR").toLocaleString({
            weekday: "short",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        });

        return (<p>{paymentDate}</p>);
    };

    useEffect(() => {
        retrieveData();

    }, []);

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "payment_date",
            headerName: "Date de Paiment",
            editable: false,
            flex: 2,
            renderCell: currentPeriod
        },
        {
            field: "total",
            headerName: "Total Payé",
            width: 150,
            editable: false,
            flex: 1,
            renderCell: ({ row }) => row.payment[0].amount + "€"

        },
        {
            field: "itemNumber",
            headerName: "Nombre d'articles",
            width: 150,
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
                            navigate(`/account/purchase/${cellValues.row.id}`);
                        }}
                    />
                );
            }
        }

    ];


    return (
        <>
            <Container>
                <h1>Voici la liste de vos achats : </h1>
                <div style={{ height: 400, width: "100%" }}>
                    <DataGrid
                        rows={payments}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        loading={loading}
                    />
                </div>
            </Container>
        </>
    );
};

export default Purchases;
