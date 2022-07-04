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

const Partenaires = () => {

    const [open, setOpen] = React.useState(false);


    const defaultValues = {
        code: "",
        id: ""
    };

    const [formValues, setFormValues] = useState(defaultValues);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        console.log(formValues);
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

    const handleSubmit = async (event) => {

        console.log("test")
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

    const [infos, setInfos] = useState();

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
            headerName: 'Send to maintenance',
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
                        Envoyer
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

                <h3> Liste des Partenaires </h3>
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
                                Veuillez renseigner les codes promotionnelle de la maniere suivante:<br />
                                XXXX-XXX-XXXX <br />
                                XXXX-XXX-XXXX <br />
                                XXXX-XXX-XXXX <br />
                                <br />
                            </DialogContentText>

                            <TextField
                                id="code"
                                label="Multiline"
                                name="code"
                                multiline
                                rows={4}
                                defaultValue={defaultValues.code}
                                onChange={handleInputChange}
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Subscribe</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>

        </>

    );


}

export default Partenaires;