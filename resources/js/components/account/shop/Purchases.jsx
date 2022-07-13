import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { DateTime } from "luxon";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router";
import Button from "@mui/material/Button";

import {useTranslation} from 'react-i18next';

const Purchases = () => {

    const {t, i18n} = useTranslation();

    const navigate = useNavigate();

    let [payments, setPayments] = useState([]);
    let [loading, setLoading] = useState(true);

    const retrieveData = async () => {
        let response = await axios.get("/api/carts");

        if (response.data.success) {
            console.log(response.data.data);
            setPayments(response.data.data);
            setLoading(false);
        }
    };

    const HandlePDF = async (id) => {

        try {

           await axios.get(`/api/documents/pdf/${id}`)
           .then(function (response) {
            console.log(response);
            console.log("Successfully Logged in ");
            window.open(`/api/documents/pdf/${id}`, `_blank`);
      
           })
      
          } catch (error) {
            console.log(error)
          }
      
    }

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
        { field: "id", headerName: "ID", width: 50 },
        {
            field: "payment_date",
            headerName: "Date de Paiment",
            editable: false,
            headerAlign: 'center',
            align: "center",
            flex: 2,
            renderCell: currentPeriod
        },
        {
            field: "total",
            headerName: "Total Payé",
            headerAlign: 'center',
            align: "center",
            width: 150,
            editable: false,
            flex: 1,
            renderCell: ({ row }) => row.payment[0].amount + "€"

        },
        {
            field: "itemNumber",
            headerName: "Nombre d'articles",
            headerAlign: 'center',
            align: "center",
            width: 150,
            editable: false,
            flex: 2
        },
        {
            field: "informations",
            headerName: "Informations",
            headerAlign: 'center',
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
                            navigate(`/account/purchases/${cellValues.row.id}`);
                        }}
                    />
                );
            }
        },
        {
            field: "",
            headerName: "PDF Facture",
            sortable: false,
            headerAlign: 'center',
            align: 'center',
            width: 160,
            renderCell: (params) => (

                <strong>
                    <Button className="text-black" color="secondary" variant="contained" size="small"
                        style={{ marginLeft: 16 }}
                        onClick={async() => {
                          await HandlePDF(params.row.id);
                        }}
                     
                    >
                        Télécharger
                    </Button>
                </strong >
        )
    }

    ];


    return (
        <>
                {/* <h2 className="text-black-trot">Voici la liste de vos achats : </h2> */}
                <div clasName="" style={{ height: 400, width: "100%" }}>
                    <DataGrid
                        rows={payments}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        loading={loading}
                        className="mt-2"
                    />
                </div>
        </>
    );
};

export default Purchases;
