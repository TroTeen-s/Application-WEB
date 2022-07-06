import * as React from 'react';
import {useState, useEffect, useContext} from 'react';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import ListOfTrot from './ListOfTrot';
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

const drawerWidth = 240;
let listLengthTrot = 0;
let listLengthTrotMaintenance = 0;
let listLengthTrotFixing = 0;

const getInitials = (name = '') => name
    .replace(/\s+/, ' ')
    .split(' ')
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join('');

export default function Main() {

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


    const [ infosHistory,
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
            field: 'model_serie',
            headerName: 'Modele de Serie',
            align: 'center',
            width: 330,
            editable: false,
            headerAlign: 'center'
        },
        {
            field: 'scooter_id',
            headerName: 'ID trotinette',
            align: 'center',
            width: 150,
            editable: false,
            headerAlign: 'center'
        },
        {
            field: 'created_at',
            headerName: 'Date',
            align: 'center',
            headerAlign: 'center',
            type: 'Time',
            width: 200,
            valueGetter: ({ value }) => value && new Date(value),
        },
        {
            field: 'history_status',
            headerName: 'History status',
            align: 'center',
            width: 300,
            editable: false,
            headerAlign: 'center'
        },{
            field: 'history_problems',
            headerName: 'History problems',
            align: 'center',
            width: 300,
            editable: false,
            headerAlign: 'center'
        },
    ];


    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 50,
            headerAlign: 'center',
            align: 'center'
        }, {
            field: 'model_serie',
            headerName: 'Modele de Serie',
            align: 'center',
            width: 300,
            editable: false,
            headerAlign: 'center'
        }, {
            field: 'mileage',
            headerName: 'Kilometrage',
            align: 'center',
            width: 100,
            editable: false,
            headerAlign: 'center'
        }, {
            field: 'commentary',
            headerName: 'Commentaire',
            align: 'center',
            width: 410,
            editable: false,
            headerAlign: 'center'
        }, {
            field: 'maintenance',
            headerName: 'Maintenance',
            headerClassName: 'hot',
            type: 'boolean',
            width: 130
        }, {
            field: 'MaintenanceLink',
            headerName: '<',
            headerClassName: 'hot',
            headerAlign: 'center',
            align: 'center',
            width: 150,
            editable: false,
            renderCell: (params) => (

                <strong>
                    <Button
                        disabled={params.row
                        ?.maintenance == 1 && true}
                        variant="outlined"
                        color="primary"
                        size="small"
                        style={{
                        marginLeft: 16
                    }}
                        onClick={() => {
                        setParam(params.row.id);
                        handleOpenMaintenanceModal();
                    }}>
                        {params.row
                            ?.maintenance === 1
                                ? 'ALREADY'
                                : 'Envoyer'}
                    </Button>
                </strong >
            )

        }, {
            field: 'fixing',
            headerName: 'Réparation',
            headerClassName: 'cold',
            type: 'boolean',
            width: 110,
            headerAlign: 'center',
            align: 'center'
        }, {
            field: 'FixingLink',
            headerName: '<',
            headerClassName: 'cold',
            align: 'center',
            headerAlign: 'center',
            align: 'center',
            width: 150,
            editable: false,
            renderCell: (params) => (

                <strong>
                    <Button
                        disabled={params.row
                        ?.fixing == 1 && true}
                        variant="outlined"
                        color="primary"
                        size="small"
                        style={{
                        marginLeft: 16
                    }}
                        onClick={() => {
                        setParamFixing(params.row.id);
                        handleOpenFixingModal();
                    }}>
                        {params.row
                            ?.fixing === 1
                                ? 'ALREADY'
                                : 'Envoyer'}
                    </Button>
                </strong >
            )

        }, {
            field: 'none',
            type: 'actions',
            headerName: 'Service',
            width: 100,
            headerAlign: 'center',
            align: 'center',

            renderCell: (params) => (
                <strong>
                    <Button>
                        <GridActionsCellItem
                            icon={< ElectricScooterIcon />}
                            onClick=
                            { () => { params.row?.maintenance === 0 && params.row?.fixing === 0 ? null : HandleService(params.row.id) } }/>
                    </Button>
                </strong >
            )
        }, {
            field: 'actions',
            type: 'actions',
            headerAlign: 'center',
            align: 'center',
            width: 50,
            getActions: (params) => [< GridActionsCellItem icon = { < DeleteIcon />
                }
                label = "Delete" onClick = {
                    () => {
                        DeleteScoot(params.row.id)
                    }
                } />]
        }
    ]

    const HandleFixing = async(event) => {

        await axios
            .post(`/api/dashboard/api/scooters/fixing/newstatus`, {
                id: "" + event + "",
                commentary: commentary2
        })
            .then(response => {
                console.log(response.data.data)
                setInfos(response.data.data)
                SendToFix(event)
                setStatus({type: 'success'});
            })
            .catch(error => console.log(error));

        let response2 = await axios.get(`/api/dashboard/api/scooters/maintenance/list`);

        if (response2.data.data) {
            listLengthTrotMaintenance = response2.data.data.length;
            setInfos2(response2.data.data)

        }

        let response3 = await axios.get(`/api/dashboard/api/scooters/fixing/list`);

        if (response3.data.data) {
            listLengthTrotFixing = response3.data.data.length;

        }


        handleCloseFixingModal()

        await axios
        .post(`/api/dashboard/api/dashboard/api/scooters/history/fixing`, {
        id: "" + event + "",
    })
        .then(response => {

            console.log(response.data.data)
            setInfosHistory(response.data.data)
            console.log("test")
            setStatus({type: 'success'});

        })
        .catch(error => console.log(error));

    };

    const HandleMaintenance = async(event) => {

        await axios
            .post(`/api/dashboard/api/scooters/maintenance/newstatus`, {
            id: "" + event + "",
            commentary: commentary
        })
            .then(response => {

                console.log(response.data.data)
                setInfos(response.data.data)
                SendToMaintenance(event)
                setStatus({type: 'success'});

            })
            .catch(error => console.log(error));

        let response2 = await axios.get(`/api/dashboard/api/scooters/maintenance/list`);

        if (response2.data.data) {
            listLengthTrotMaintenance = response2.data.data.length;
            setInfos2(response2.data.data)
            console.log(response2.data.data)

        }

        let response3 = await axios.get(`/api/dashboard/api/scooters/fixing/list`);

        if (response3.data.data) {
            listLengthTrotFixing = response3.data.data.length;
            setInfos3(response3.data.data)
        }

        handleCloseMaintenanceModal()


        await axios
            .post(`/api/dashboard/api/dashboard/api/scooters/history/maintenance`, {
            id: "" + event + "",
        })
            .then(response => {

                console.log(response.data.data)
                setInfosHistory(response.data.data)
                console.log("test")
                setStatus({type: 'success'});

            })
            .catch(error => console.log(error));

    };

    const HandleService = async(event) => {

        await axios.post(`/api/dashboard/api/scooters/service/newstatus/`, {
            id: "" + event + "",
            commentary: commentary
        })
        .then(response => {

            console.log(response.data.data)
            setInfos(response.data.data)
            Service(event)
            setStatus({type: 'success'});

        })
        .catch(error => console.log(error));

        let response2 = await axios.get(`/api/dashboard/api/scooters/maintenance/list`);

        if (response2.data.data) {
            listLengthTrotMaintenance = response2.data.data.length;
            setInfos2(response2.data.data)

        }

        let response3 = await axios.get(`/api/dashboard/api/scooters/fixing/list`);

        if (response3.data.data) {
            listLengthTrotFixing = response3.data.data.length;
            setInfos3(response3.data.data)
        }

        await axios
        .post(`/api/dashboard/api/dashboard/api/scooters/history/service`, {
        id: "" + event + "",
    })
        .then(response => {

            console.log(response.data.data)
            setInfosHistory(response.data.data)
            console.log("test")
            setStatus({type: 'success'});

        })
        .catch(error => console.log(error));

    };

    const DeleteScoot = async(event) => {

        await axios
        .post(`/api/dashboard/api/dashboard/api/scooters/history/delete`, {
        id: "" + event + "",
    })
        .then(response => {

            console.log(response.data.data)
            setInfosHistory(response.data.data)
            console.log("test")
            setStatus({type: 'success'});

        })
        .catch(error => console.log(error));





        let response = await axios.get(`/api/dashboard/api/dashboard/api/scooters/delete/${event}`);

        if (response.data.data) {
            setInfos(response.data.data)
        }

    };

    const AddScoot = async() => {

        let response = await axios.get(`/api/dashboard/api/scooters/add`);

        if (response.data.data) {
            setInfos(response.data.data);
            notify();
        }

        await axios
        .post(`/api/dashboard/api/dashboard/api/scooters/history/add`)
        .then(response => {

            console.log(response.data.data)
            setInfosHistory(response.data.data)
            console.log("test")
            setStatus({type: 'success'});

        })
        .catch(error => console.log(error));


    
    };

    const RetrieveInfosHistory = async() => {
        try {

            await axios.get('/api/dashboard/api/dashboard/api/scooters/history/list', {
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {

                setInfosHistory(response.data.data)
                setStatus({type: 'success'});
    
            })
            .catch(error => console.log(error));
    

        }catch(error) { 
            console.log(error) 
        }

    }

    const retrieveInfos = async() => {
        try {
            let response = await axios.get('/api/dashboard/scooters/list', {
                headers: {
                    'Accept': 'application/json'
                }
            })

            if (response.data.data) {
                listLengthTrot = response.data.data.length;
                setInfos(response.data.data)
            }

            let response2 = await axios.get(`/api/dashboard/api/scooters/maintenance/list`);

            if (response2.data.data) {
                listLengthTrotMaintenance = response2.data.data.length;
                setInfos2(response2.data.data)

            }

            let response3 = await axios.get(`/api/dashboard/api/scooters/fixing/list`);

            if (response3.data.data) {
                listLengthTrotFixing = response3.data.data.length;
                setInfos3(response3.data.data)
            }

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

            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={openModalMaintenance}
                onClose={handleCloseMaintenanceModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500
            }}>
                <Box
                    sx={{
                    ...style,
                    width: 400
                }}>
                    <form
                        action="POST"
                        className="mx-auto max-w-xl space-y-4"
                        onSubmit={handleSubmit}>
                        <h2 id="child-modal-title">
                            {"ID : " + param + " - Commentaires"}
                        </h2>
                        <textarea
                            onChange={(e) => setCommentary(e.target.value)}
                            type="text"
                            id="commentary"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="This one got a broken wheel"></textarea>

                        <button
                            onClick={() => {
                            HandleMaintenance(param)
                        }}
                            className="py-2 px-6 rounded bg-orange-300 text-base text-white font-semibold uppercase">ENVOYER EN MAINTENANCE</button>
                    </form>
                </Box>
            </Modal>

            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={openModalFixing}
                onClose={handleCloseFixingModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500
            }}>
                <Box
                    sx={{
                    ...style,
                    width: 400
                }}>
                    <form
                        action="POST"
                        className="mx-auto max-w-xl space-y-4"
                        onSubmit={handleSubmit}>
                        <h2 id="child-modal-title">{"ID : " + paramFixing + " - Commentaires"}</h2>
                        <textarea
                            onChange={(e) => setCommentary2(e.target.value)}
                            type="text"
                            id="commentary"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="This one got a broken wheel"></textarea>

                        <button
                            type="button"
                            onClick={() => {
                            HandleFixing(paramFixing)
                        }}
                            className="py-2 px-6 rounded bg-orange-300 text-base text-white font-semibold uppercase">ENVOYER EN REPARATION</button>
                    </form>
                </Box>
            </Modal>

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
                    }}
                    >
                    <Typography
                        sx={{ m: 1 }}
                        variant="h4"
                    >
                        Trotinettes
                    </Typography>
                    <Box sx={{ m: 1 }}>
                        <Button
                        className="bg-color-300"
                        variant="contained"
                        onClick={() => {
                            AddScoot();
                        }}
                        >
                        Ajouter des trotinettes
                        </Button>
                    </Box>
                    </Box>
                </Box>

                <Grid className="mt-2" container spacing={3}>
                    <Grid item xl={4} lg={4} sm={4} xs={4}>
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
                                            TOTAL TROTINETTES
                                        </Typography>
                                        <Typography color="textPrimary" variant="h4">
                                            {listLengthTrot}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Avatar
                                            sx={{
                                            backgroundColor: 'success.main',
                                            height: 56,
                                            width: 56
                                        }}>
                                            <ElectricScooterIcon/>
                                        </Avatar>
                                    </Grid>
                                </Grid>

                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xl={4} lg={4} sm={4} xs={4}>
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
                                            TOTAL TROTINETTES MAINTENANCE
                                        </Typography>
                                        <Typography color="textPrimary" variant="h4">
                                            {listLengthTrotMaintenance}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Avatar
                                            sx={{
                                            backgroundColor: '#FF9900',
                                            height: 56,
                                            width: 56
                                        }}>
                                            <EngineeringIcon/>
                                        </Avatar>
                                    </Grid>
                                </Grid>

                            </CardContent>
                        </Card>

                    </Grid>

                    <Grid item xl={4} lg={4} sm={4} xs={4}>
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
                                            TOTAL TROTINETTES REPARATION
                                        </Typography>
                                        <Typography color="textPrimary" variant="h4">
                                            {listLengthTrotFixing}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Avatar
                                            sx={{
                                            backgroundColor: '#33AFFF',
                                            height: 56,
                                            width: 56
                                        }}>
                                            <BuildIcon/>
                                        </Avatar>
                                    </Grid>
                                </Grid>

                            </CardContent>
                        </Card>

                    </Grid>

                    <Grid item xl={12} lg={12} sm={12} xs={12}>

                        <Box sx={{
                            mt: 3,
                            '& .cold': {
                                backgroundColor: '#D6E0FC',
                                // color: '#1a3e72',
                              },
                              '& .hot': {
                                backgroundColor: '#FFF3F3',
                                // color: '#000000',
                              },
                        }}>

                            <Card>
                                <div
                                    style={{
                                    height: 450,
                                    width: '100%',
                                    paddingBottom: 10
                                }}>

                                    <Toaster/>

                                    <DataGrid
                                        components={{
                                        LoadingOverlay: LinearProgress
                                    }}
                                        rows={infos}
                                        columns={columns}
                                        pageSize={6}
                                        rowsPerPageOptions={[6]}
                                        disableSelectionOnClick
                                        loading={!infos}
                                        getCellClassName={(params) => {
                                            if (params.field === 'maintenance' || params.field == 'MaintenanceLink') {
                                                return 'hot';
                                            }
                                            if (params.field === 'fixing' || params.field == 'FixingLink') {
                                                return 'cold';
                                            }
                                          }}
                                          />

                                </div>
                            </Card>
                        </Box>

                </Grid>

                <Grid item xl={4} lg={4} sm={4} xs={4}>
                        
                    <HistoricalListToolBar sx={{
                            mt: 3
                        }} />

                </Grid>

                <Grid item xl={12} lg={12} sm={12} xs={12}>

                    <Box sx={{
                            mt: 3
                        }}>

                        <Card>
                                    <div
                                        style={{
                                        height: 800,
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
                                                sortModel: [{ field: 'id', sort: 'desc' }],
                                                },
                                            }}
                                            rows={infosHistory}
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
