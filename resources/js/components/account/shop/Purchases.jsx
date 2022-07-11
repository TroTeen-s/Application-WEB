import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { DateTime } from "luxon";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router";
import Button from "@mui/material/Button";

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

    const HandlePDF = async (id) => {

        try {

            let response = await axios.get(`/api/documents/pdf/${id}`);
      
            if (response.data.data) {
              console.log(response.data.data)
              setInfos(response.data.data)
            }
      
      
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
                        onClick={() => {
                          HandlePDF(params.row.id);
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
