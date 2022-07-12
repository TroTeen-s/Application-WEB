import React, { useContext, useEffect, useState } from 'react';
import { AuthLoadingContext } from '../../context/AuthContext';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Typography } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


const Partenaires = () => {

    const [open, setOpen] = React.useState(false);
    const [openNew, setOpenNew] = React.useState(false);
    const [infos, setInfos] = useState();


    const defaultValues = {
        code: "",
        id: ""
    };

    const defaultValuesNew = {
        brand: "",
        description: "",
        end: React.useState(new Date('2022-08-18T21:11:54'))[0],
    };


    const [formValues, setFormValues] = useState(defaultValues);
    const [formValuesNew, setFormValuesNew] = useState(defaultValuesNew);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        console.log(formValues);
    };

    const handleInputChangeNew = (e) => {
        const { name, value } = e.target;
        console.log(name)
        console.log(value)
        setFormValuesNew({
            ...formValuesNew,
            [name]: value,
        });
        console.log(formValuesNew);
    };

    const handleChange = (newValue) => {

        setFormValuesNew({
            ...formValuesNew
            , end: newValue,
        });

    };

    const handleClickOpen = (sid) => {
        setFormValues({
            ['id']: sid,
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleClickOpenNew = (sid) => {
        setOpenNew(true);
    };

    const handleCloseNew = () => {
        setOpenNew(false);
    };


    const handleSubmit = async (event) => {


        event.preventDefault();
        console.log(formValues);

        setOpen(false);

        let codes = formValues.code
        const code_array = codes.split('\n')
        console.log(code_array)

        try {
            let response = await axios.post('/api/add_code', { "id": formValues.id, "codes": code_array })
            if (response.data.success) {

            }
        } catch (e) {
        }
    }

    const handleSubmitNew = async (event) => {


        event.preventDefault();
        setOpenNew(false);



        try {
            let response = await axios.post('/api/add_sponsor', { "brand": formValuesNew.brand, "description": formValuesNew.description, "end": formValuesNew.end.toString().split('(')[0] })

            if (response.data.success) {

                let spons = response.data.data.sponsor
                setInfos(spons);
            }
        } catch (e) {
            console.log(e)
        }
    }



    let { loaded } = useContext(AuthLoadingContext)

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 40
        },
        {
            field: 'brand',
            headerName: 'Marque',
            width: 220,
            editable: false,
        },
        {
            field: 'MaintenanceLink',
            headerName: 'Ajouter des Codes',
            width: 150,
            editable: false,
            renderCell: (params) => (

                <strong>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        style={{ marginLeft: 16 }}
                        onClick={() => {
                            handleClickOpen(params.row.id);
                        }}
                    >
                        Ajouter
                    </Button>
                </strong >
            )



        },
    ]



    const retrieveInfos = async () => {
        try {
            let response = await axios.get('/api/sponsors', {
                headers: {
                    'Accept': 'application/json'
                }
            })

            if (response.data.data) {

                setInfos(response.data.data)
            }
        } catch (e) {
        }
    }

    useEffect(() => {

        if (loaded) {
            retrieveInfos()
        }
    }, [loaded])


    return (
        <>

            <div style={{ height: 400, width: '100%', paddingBottom: 10 }}>

                <Toaster />

                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        m: -1
                    }}
                >
                    <Typography
                        sx={{ m: 1 }}
                        variant="h4"
                    >
                        Partenaires
                    </Typography>
                    <Box sx={{ m: 1 }}>
                        <Button
                            className="bg-color-300"
                            variant="contained"
                            onClick={() => {
                                handleClickOpenNew();
                            }}
                        >
                            Ajouter un partenaire
                        </Button>
                    </Box>
                </Box>

                <DataGrid
                    components={{
                        LoadingOverlay: LinearProgress,
                    }}
                    rows={infos}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    loading={!infos}

                />




            </div>



            <div>

                <Dialog open={open} onClose={handleClose}>
                    <form action="" onSubmit={handleSubmit}>
                        <DialogTitle>Subscribe</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Veuillez renseigner les codes promotionnelles de la maniere suivante:<br />
                                XXXX-XXX-XXXX <br />
                                XXXX-XXX-XXXX <br />
                                XXXX-XXX-XXXX <br />
                                <br />
                            </DialogContentText>

                            <TextField
                                id="code"
                                label="Codes"
                                name="code"
                                multiline
                                rows={4}
                                defaultValue={defaultValues.code}
                                onChange={handleInputChange}
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Annuler</Button>
                            <Button type="submit">Ajouter</Button>
                        </DialogActions>
                    </form>
                </Dialog>


                <Dialog open={openNew} onClose={handleCloseNew}>
                    <form action="" onSubmit={handleSubmitNew}>
                        <div className="flex flex-col space-y-4">
                            <DialogTitle>Subscribe</DialogTitle>
                            <DialogContent>
                                <div className="flex flex-col space-y-4">
                                    <DialogContentText>
                                        Veuillez renseigner les information afin d'ajouter un partenaire:<br />

                                    </DialogContentText>

                                    <TextField
                                        id="marque"
                                        label="Marque"
                                        name="brand"
                                        defaultValue={defaultValuesNew.brand}
                                        onChange={handleInputChangeNew}
                                    />

                                    <TextField
                                        id="description"
                                        label="Description"
                                        name="description"
                                        defaultValue={defaultValuesNew.description}
                                        onChange={handleInputChangeNew}
                                    />
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DesktopDatePicker
                                            label="Date de Fin"
                                            inputFormat="dd/MM/yyyy"
                                            name="end"
                                            onChange={handleChange}
                                            value={formValuesNew.end}
                                            renderInput={(params) => <TextField {...params} />}

                                        />
                                    </LocalizationProvider>
                                </div>


                            </DialogContent>
                        </div>
                        <DialogActions>
                            <Button onClick={handleCloseNew}>Annuler</Button>
                            <Button type="submit">Ajouter</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>

        </>

    );


}

export default Partenaires;