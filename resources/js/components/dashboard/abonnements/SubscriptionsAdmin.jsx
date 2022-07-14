import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Chip, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { DateTime } from "luxon";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";

const SubscriptionsAdmin = () => {
    const initialValues = {
        name: "",
        frequency: "month",
        max_trips: "",
        price: ""
    };

    const initialValuesDialog = {
        nameDialog: "",
        max_tripsDialog: "",
        priceDialog: ""
    };

    const [id, setId] = useState("");

    const [state, setState] = useState(initialValues);

    const [data, setData] = useState([]);

    const [dialogData, setDialogData] = useState(initialValuesDialog);

    const [open, setOpen] = React.useState(false);


    const { name, frequency, max_trips, price } = state;

    const { nameDialog, max_tripsDialog } = dialogData;

    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "name", headerName: "Nom", width: 200 },
        {
            field: "active",
            headerName: "Disponible",
            flex: 0,
            renderCell: ({ row: { active } }) => active ? "Oui" : "Non"
        },
        {
            field: "Activer / Désactiver", headerName: "Disponible", flex: 0, renderCell: (cellValues) => {
                return (
                    <Chip
                        label={cellValues.row.active ? "Désactiver" : "Activer"}
                        color="success"
                        onClick={() => {
                            console.log("alors le " + cellValues.row.active ? 0 : 1);
                            changeActiveStatus(cellValues.row.id, !cellValues.row.active);
                        }}
                    />
                );
            }
        },
        {
            field: "update", headerName: "modify", flex: 0, renderCell: (cellValues) => {
                return (
                    <Chip
                        label="habibi"
                        color="success"
                        onClick={() => {
                            setId(cellValues.row.id);
                            console.log("alors le " + cellValues.row.active ? 0 : 1);
                            handleClickOpen();
                        }}
                    />
                );
            }
        },
        { field: "price", headerName: "Prix d'abonnement", flex: 0, renderCell: ({ row: { price } }) => price + "€" },
        {
            field: "created_at",
            headerName: "Créé le",
            width: 200,
            renderCell: ({ row }) => DateTime.fromISO(row.created_at).setLocale("fr-FR").toLocaleString({
                weekday: "short",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            })
        },
        {
            field: "updated_at",
            headerName: "Mis à jour le",
            width: 200,
            renderCell: ({ row }) => DateTime.fromISO(row.updated_at).setLocale("fr-FR").toLocaleString({
                weekday: "short",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            })
        }
    ];


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("nom: " + name + " et valeur: " + value);
        if (name === "file") {
            setState({ ...state, [name]: e.target.files[0] });

        } else {
            setState({ ...state, [name]: value });
        }
    };

    const handleCloseUpdate = async () => {
        await updateSubscription(id);

        setOpen(false);


    };

    const handleChangeDialog = (e) => {
        const { name, value } = e.target;
        console.log("nom: " + name + " et valeur: " + value);
        if (name === "file") {
            setDialogData({ ...dialogData, [name]: e.target.files[0] });

        } else {
            setDialogData({ ...dialogData, [name]: value });
        }
    };

    const retrieveSubscriptions = async () => {
        try {
            let response = await axios.get("/api/dashboard/subscriptions");

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

    const addsubscription = async () => {
        const formData = new FormData();
        formData.append("max_trips", max_trips);
        formData.append("price", price);
        formData.append("name", name);
        formData.append("frequency", frequency);

        try {
            let response = await axios.post("/api/dashboard/subscriptions", formData);

            if (response.data.success) {
                setData(data => [...data, response.data.data]);
                toast.success(response.data.message);


            }
        } catch (e) {
            toast.error("Erreur dans l'ajout du produit, veuillez réessayer.");
        }


    };

    const changeActiveStatus = async (subscriptionId, active) => {

        try {
            let response = await axios.patch(`/api/dashboard/subscriptions/${subscriptionId}`, {
                active: active
            });

            if (response.data.success) {
                let message = "Disponibilité de l'abonnement mis à jour avec succès";
                toast.success(`Abonnement ID : ${subscriptionId}, ${message} !`);
            } else {
                let message = "Erreur dans la mise à jour la disponibilité de l'abonnement";
                toast.error(`Abonnement ID : ${subscriptionId}, ${message} !`);
            }
        } catch (e) {
            let message = "Erreur dans la mise à jour du statut de l'abonnement";
            toast.error(`Abonnement ID : ${subscriptionId}, ${message} !`);
        }
        await retrieveSubscriptions();

    };

    const updateSubscription = async (subscriptionId) => {

        const data = {
            max_trips: max_tripsDialog,
            name: nameDialog
        };

        console.log(data);

        try {
            let response = await axios.patch(`/api/dashboard/subscriptions/${subscriptionId}`, data);

            if (response.data.success) {
                let message = "Informations de l'abonnement mis à jour avec succès";
                toast.success(`Abonnement ID : ${subscriptionId}, ${message} !`);
            } else {
                let message = "Erreur dans la mise à jour des informations de l'abonnement";
                toast.error(`Abonnement ID : ${subscriptionId}, ${message} !`);
            }
        } catch (e) {
            let message = "Erreur dans la mise à jour des informations de l'abonnement";
            toast.error(`Abonnement ID : ${subscriptionId}, ${message} !`);
        }
        await retrieveSubscriptions();

    };

    useEffect(async () => {
        await retrieveSubscriptions();
    }, []);


    return (
        <div className="col-sm-8 mr-2 ml-1 offset-sm-1">
            <Toaster />
            <Typography
                        sx={{ mt: 4 }}
                        variant="h4"
                    >
                        Abonnements
                    </Typography>
            <div className="">
                <br />
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Fréquence des paiments</FormLabel>

                    <RadioGroup
                        row
                        name="frequency"
                        value={frequency}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="month" control={<Radio />} label="Mensuel" />
                        <FormControlLabel value="week" control={<Radio />} label="Hebdomadaire" />
                        <FormControlLabel value="day" control={<Radio />} label="Journalier" />
                    </RadioGroup>
                </FormControl>

                <br />
                <input type="text" name="name" className="form-control" onChange={handleChange}
                       placeholder="Nom de l'abonnement" />
                <br />
                <input type="text" name="price" className="form-control" onChange={handleChange}
                       placeholder="Prix de l'abonnement" />
                <br />
                <input type="number" name="max_trips" className="form-control" onChange={handleChange}
                       placeholder="Nombre de trajet" min={0} /> <br />
                <button onClick={addsubscription}
                        className="bg-orange-300 text-gray-800 font-semibold py-2 px-4 rounded shadow"> Ajouter un
                    abonnement
                </button>

            </div>


            <div className="mt-5 mb-5" style={{ height: 370, width: "100%" }}>
                <h3> Liste des abonnements </h3>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>

            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Laisser vide si vous ne voulez pas changer.
                        </DialogContentText>
                        <TextField
                            onChange={handleChangeDialog}
                            autoFocus
                            name="nameDialog"
                            margin="dense"
                            id="name"
                            label="Nom de l'abonnement"
                            type="text"
                            fullWidth
                            variant="filled"
                        />
                        <TextField
                            name="max_tripsDialog"
                            onChange={handleChangeDialog}
                            autoFocus
                            margin="dense"
                            min={0}
                            id="name"
                            label="Nombre de trajets maximum"
                            type="number"
                            variant="filled"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Annuler</Button>
                        <Button onClick={handleCloseUpdate}>Mettre à jour</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );


};

export default SubscriptionsAdmin;
