import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const Subscriptions = () => {

    let [data, setData] = useState([]);

    const retrieveData = async () => {
        let response = await axios.get("/api/my-subs");

        if (response.data.success) {
            console.log(data);
            setData(response.data.data);
        }
    };

    useEffect(() => {
        retrieveData();

    }, []);

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "last_payment",
            headerName: "Dernier paiment",
            editable: true
        },
        {
            field: "active",
            headerName: "Actif",
            width: 150,
            editable: true
        },
        {
            field: "trip_number",
            headerName: "Nombre de trajets",
            type: "number",
            editable: true
        },
        {
            field: "fullName",
            headerName: "Full name",
            description: "This column has a value getter and is not sortable.",
            sortable: false,
            width: 160,
            valueGetter: (params) =>
                `${params.row.firstName || ""} ${params.row.lastName || ""}`
        }
    ];
    return (
        <>
            <h1>Voici la liste de vos abonnements : </h1>
            <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </div>
        </>
    );
};

export default Subscriptions;
