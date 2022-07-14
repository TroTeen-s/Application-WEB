import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DateTime } from "luxon";

const Notifications = () => {

    const initialValues = {
        title: "",
        message: ""
    };

    const [state, setState] = useState(initialValues);

    const { title, message } = state;

    const [data, setData] = useState([]);

    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "title", headerName: "Nom de la notification", width: 200 },
        { field: "content", headerName: "Contenu", flex: 1 },
        {
            field: "created_at",
            headerName: "Créé le",
            width: 200,
            renderCell: ({ row }) => DateTime.fromSQL(row.created_at).setLocale("fr-FR").toLocaleString({
                weekday: "short",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            })
        }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("nom: " + name + " et valeur: " + value);
        if (name === "file") {
            setState({ ...state, [name]: e.target.files[0] });

        } else {
            setState({ ...state, [name]: value });
        }
    };

    const addNotification = async () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("message", message);

        try {
            let response = await axios.post("/api/notifs/all", formData);

            if (response.data.success) {
                setData(data => [...data, response.data.data]);
                toast.success(response.data.message);


            }
        } catch (e) {
            toast.error("Erreur dans la programmationd de la notification, veuillez réessayer.");
        }


    };

    const retrieveNotifications = async () => {
        try {
            let response = await axios.get("/api/notifs/all");

            if (response.data.data) {
                console.log(response);
                setData(response.data.data);

            } else {
                toast();
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(async () => {
        await retrieveNotifications();
    }, []);


    return (
        <div className="col-sm-8 mr-2 ml-1 offset-sm-1">
            <Toaster />
            <Typography
                sx={{ mt: 4 }}
                variant="h4"
            >
                Ajouter une notification
            </Typography>

            <div className="">
                <br />

                <br />
                <label htmlFor="title">Nom de la notification (pas affiché)</label>
                <input id="title" type="text" name="title" className="form-control" onChange={handleChange}
                       placeholder="Titre de la notification" />
                <br />
                <label htmlFor="message">Message de la notification</label>
                <textarea id="message" name="message" className="form-control" onChange={handleChange}
                          placeholder="Contenu de la notification" />
                <br />
                <button onClick={addNotification}
                        className="bg-orange-300 text-gray-800 font-semibold py-2 px-4 rounded shadow"> Ajouter un
                    abonnement
                </button>

            </div>

            <div className="mt-5 mb-5" style={{ height: 370, width: "100%" }}>
                <h3> Liste des notifications envoyées à tous </h3>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>

        </div>
    );
};

export default Notifications;
