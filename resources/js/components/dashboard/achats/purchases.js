import * as React from 'react';
import {useState, useEffect, useContext} from 'react';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import {TrotListToolbar} from './partials/trots-list-toolbar';
import {HistoricalListToolBar} from './partials/historical-list-toolbar';
import {columns} from './partials/trots';

import PerfectScrollbar from 'react-perfect-scrollbar';
// import PropTypes from 'prop-types';
import {format} from 'date-fns';
import ElectricScooterIcon from '@mui/icons-material/ElectricScooter';
import EngineeringIcon from '@mui/icons-material/Engineering';
import BuildIcon from '@mui/icons-material/Build';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Avatar,
    Box,
    Card,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    CardContent,
    Grid,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import {AuthLoadingContext} from '../../context/AuthContext';
import toast, {Toaster} from 'react-hot-toast';
import {DataGrid, GridActionsCellItem} from '@mui/x-data-grid';
import {LinearProgress} from '@mui/material';
import Button from "@mui/material/Button";
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import EuroIcon from '@mui/icons-material/Euro';
import DescriptionIcon from '@mui/icons-material/Description';

const drawerWidth = 240;
let listPurchases = 0;
let listPurchasesMaintenance = 0;
let listPurchasesSold = 0;

const getInitials = (name = '') => name
    .replace(/\s+/, ' ')
    .split(' ')
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join('');

export default function purchases() {

    const notify = () => toast.success('+1 Trotinette ajouté');
    const SendToFix = (event) => toast(`Trotinette ID : ${event} envoyé en réparation !`, {icon: '💤'});

    const SendToMaintenance = (event) => toast(`Trotinette ID : ${event} envoyé en maintenance !`, {icon: '💬'});

    const Service = (event) => toast(`Trotinette ID : ${event} remis en service !`, {icon: '👏'});

    const [infos,
        setInfos] = useState();
    const [infos2,
        setInfos2] = useState();
    const [infos3,
        setInfos3] = useState();
    const [status,
        setStatus] = useState(undefined);

    const [infosHistory,
        setInfosHistory] = useState();

    const [pressing,
        needToBePressing] = useState({status: false});

    const [param,
        setParam] = useState();
    const [paramFixing,
        setParamFixing] = useState();

    const [commentary,
        setCommentary] = useState("")
    const [commentary2,
        setCommentary2] = useState("")
    let [commentaryError,
        setCommentaryError] = useState({error: false, helper: ''});

    let {loaded} = useContext(AuthLoadingContext)

    const [openModalMaintenance,
        setOpenMaintenance] = React.useState(false);

    const handleOpenMaintenanceModal = () => {
        setOpenMaintenance(true);
    };

    const handleCloseMaintenanceModal = () => {
        setOpenMaintenance(false);
    };

    const [openModalFixing,
        setOpenFixing] = React.useState(false);

    const handleOpenFixingModal = () => {
        setOpenFixing(true);
    };

    const handleCloseFixingModal = () => {
        setOpenFixing(false);
    };

    const handleSubmit = event => {
        event.preventDefault();

        console.log('form submitted ✅');
    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3
    };

    const columnsHistory = [
        {
            field: 'id',
            headerName: 'ID',
            width: 80,
            headerAlign: 'center',
            align: 'center'
        }, {
            field: 'amount',
            headerName: 'Somme dépensé',
            align: 'center',
            width: 170,
            editable: false,
            headerAlign: 'center'
        }, {
            field: 'payment_date',
            headerName: 'Date de paiement',
            align: 'center',
            width: 270,
            editable: false,
            headerAlign: 'center'
        }, {
            field: 'billing_address_city',
            headerName: 'Ville',
            align: 'center',
            width: 150,
            editable: false,
            headerAlign: 'center'
        }, {
            field: 'billing_address_line',
            headerName: 'Adresse',
            align: 'center',
            width: 300,
            editable: false,
            headerAlign: 'center'
        }, {
            field: 'billing_address_postal_code',
            headerName: 'Code Postal',
            align: 'center',
            width: 150,
            editable: false,
            headerAlign: 'center'
        }, {
            field: `card_number`,
            headerName: '4 Last card number',
            align: 'center',
            width: 250,
            editable: false,
            headerAlign: 'center'
        },{
            field: '',
            headerName: "PDF Facture",
            sortable: false,
            headerAlign: 'center',
            align: 'center',
            width: 160,
            renderCell: (params) => (

                <strong>
                    <Button className="text-white" color="primary" variant="contained" size="small"
                        style={{ marginLeft: 10 }}
                        onClick={async() => {
                            console.log(params)
                          await HandlePDF(params.row.id);
                        }}
                     
                    >
                        Télécharger
                    </Button>
                </strong >
        )
    }
    ];

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


    const RetrieveInfosHistory = async() => {
        try {

            await axios
                .get('/api/dashboard/api/dashboard/api/scooters/history/list', {
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {

                    setInfosHistory(response.data.data)
                    setStatus({type: 'success'});

                })
                .catch(error => console.log(error));

        } catch (error) {
            console.log(error)
        }

    }

    const retrieveInfos = async() => {

        listPurchasesSold = 0;

        try {
            let response = await axios.get('/api/dashboard/purchases/list', {
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                listPurchases = response.data.data.length;
                for (let i = 0; i < listPurchases; i++) {
                    listPurchasesSold += response.data.data[i].amount
                }
                setInfos(response.data.data)
            })
            .catch(error => console.log(error));

        } catch (e) {}
    }

    useEffect(() => {

        if (loaded) {
            retrieveInfos()
            RetrieveInfosHistory()
        }
    }, [loaded])

    return (
        <Box
            component="main"
            sx={{
            backgroundColor: (theme) => theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '200vh'
        }}>

            
            <Toolbar/>
            <Container
                maxWidth={false}
                className="h-full overflow-hidden"
                sx={{
                mb: 1
            }}>
                <Box>
                    <Box
                        sx={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        m: -1
                    }}>
                        <Typography
                            sx={{
                            m: 1
                        }}
                            variant="h4">
                            Achats
                        </Typography>
                        <Box sx={{
                            m: 1
                        }}></Box>
                    </Box>
                </Box>

                <Grid className="mt-2" container spacing={4}>
                    <Grid item xl={6} lg={6} sm={6} xs={6}>
                        <Card>
                            <CardContent>
                                <Grid
                                    container
                                    spacing={3}
                                    sx={{
                                    justifyContent: 'space-between'
                                }}>
                                    <Grid item>
                                        <Typography color="textSecondary" gutterBottom variant="overline">
                                            TOTAL ACHATS
                                        </Typography>
                                        <Typography color="textPrimary" variant="h4">
                                            {listPurchases}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Avatar
                                            sx={{
                                            backgroundColor: 'primary.main',
                                            height: 56,
                                            width: 56
                                        }}>
                                            <DescriptionIcon/>
                                        </Avatar>
                                    </Grid>
                                </Grid>

                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xl={6} lg={6} sm={6} xs={6}>
                        <Card>
                            <CardContent>
                                <Grid
                                    container
                                    spacing={3}
                                    sx={{
                                    justifyContent: 'space-between'
                                }}>
                                    <Grid item>
                                        <Typography color="textSecondary" gutterBottom variant="overline">
                                            CHIFFRES GENERES
                                        </Typography>
                                        <Typography color="textPrimary" variant="h4">
                                            {listPurchasesSold}
                                            €
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Avatar
                                            sx={{
                                            backgroundColor: '#C02CF7',
                                            height: 56,
                                            width: 56
                                        }}>
                                            <EuroIcon/>
                                        </Avatar>
                                    </Grid>
                                </Grid>

                            </CardContent>
                        </Card>

                    </Grid>

                    <Grid item xl={12} lg={12} sm={12} xs={12}>

                        <Box sx={{
                            mt: 3
                        }}>

                            <Card>
                                <div
                                    style={{
                                    height: 400,
                                    width: '100%',
                                    paddingBottom: 10
                                }}>

                                    <Toaster/>

                                    <DataGrid
                                        components={{
                                        LoadingOverlay: LinearProgress
                                    }}
                                        initialState={{
                                        sorting: {
                                            sortModel: [
                                                {
                                                    field: 'id',
                                                    sort: 'desc'
                                                }
                                            ]
                                        }
                                    }}
                                        rows={infos}
                                        columns={columnsHistory}
                                        pageSize={10}
                                        rowsPerPageOptions={[10]}
                                        disableSelectionOnClick
                                        loading={!infosHistory}/>

                                </div>
                            </Card>

                        </Box>
                    </Grid>

                </Grid>

            </Container>
        </Box>

    );
}
