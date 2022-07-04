import * as React from 'react';
import {useState, useEffect, useContext} from 'react';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import ListOfTrot from './ListOfTrot';
import {TrotListToolbar} from './partials/trots-list-toolbar';
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

    const [pressing, needToBePressing] = useState({ status: false });


    const [param,setParam] = useState();
    const [paramFixing, setParamFixing ] = useState();

    const [commentary,setCommentary] = useState("")
    const [commentary2,setCommentary2] = useState("")
    let [commentaryError, setCommentaryError] = useState({ error: false, helper: '' });

    let {loaded} = useContext(AuthLoadingContext)

    const [openModalMaintenance, setOpenMaintenance] = React.useState(false);

    const handleOpenMaintenanceModal = () => {
      setOpenMaintenance(true);
    };

    const handleCloseMaintenanceModal = () => {
      setOpenMaintenance(false);
    };

    const [openModalFixing, setOpenFixing] = React.useState(false);

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

    // if (commentary.trim() === '') {
    //   setCommentaryError({ error: false, helper: 'Champs vide' });
    // } else if (commentary.trim().length < 10) {
    //   setCommentaryError({ error: false, helper: 'Message trop court' });
    // }
    // else {
    //   setCommentaryError({ error: true, helper: '' });
    // }


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
      pb: 3,
    };

    const columns = [
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
            width: 300,
            editable: false,
            headerAlign: 'center'
        }, {
            field: 'mileage',
            headerName: 'Kilometrage',
            align: 'center',
            width: 200,
            editable: false,
            headerAlign: 'center'
        }, {
            field: 'maintenance',
            type: 'boolean',
            width: 200
        }, {
            field: 'MaintenanceLink',
            headerName: 'Send to maintenance',
            headerAlign: 'center',
            align: 'center',
            width: 200,
            editable: false,
            renderCell: (params) => (

                <strong>
                    <Button
                      disabled={params.row?.maintenance == 1 && true}
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
                       {params.row?.maintenance === 1 ? 'ALREADY' : 'Envoyer'}
                    </Button>
                </strong >
            )

        }, {
            field: 'fixing',
            headerName: 'fixing',
            type: 'boolean',
            width: 120,
            headerAlign: 'center',
            align: 'center'
        }, {
            field: 'FixingLink',
            headerName: 'Send to fixing',
            align: 'center',
            headerAlign: 'center',
            align: 'center',
            width: 200,
            editable: false,
            renderCell: (params) => (

                <strong>
                    <Button
                        disabled={params.row?.fixing == 1 && true}
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
                        {params.row?.fixing === 1 ? 'ALREADY' : 'Envoyer'}
                    </Button>
                </strong >
            )

        }, 
        {
            field: 'none',
            type: 'actions',
            headerName: 'Service',
            width: 100,
            headerAlign: 'center',
            align: 'center',   
            
            renderCell: (params) => (
              <strong>
                <Button>
                  < GridActionsCellItem icon = { < ElectricScooterIcon />
                }
                onClick = {
                    () => {
                      params.row?.maintenance === 0 && params.row?.fixing === 0 ? null : HandleService(params.row.id)
                    }
                } />
                 </Button>
              </strong >
            )
        }, 
        {
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

        let response = await axios.get(`/api/dashboard/api/scooters/fixing/newstatus/${event}`);

        if (response.data.data) {
            setInfos(response.data.data)
            SendToFix(event)
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

        handleCloseFixingModal()

    };

    const HandleMaintenance = async(event) => {

    // const formData = new FormData();
    // formData.append('commentary',commentary);

    //       if (commentary.trim() === '') {
    //       setCommentaryError({ error: false, helper: 'Champs vide' });
    //     } else if (commentary.trim().length < 10) {
    //       setCommentaryError({ error: false, helper: 'Message trop court' });
    //     }
    //     else {
    //       setCommentaryError({ error: true, helper: '' });
    //     }

    //     needToBePressing({status : true});

      // if (commentaryError?.error === true) {

        let response = await axios.get(`/api/dashboard/api/scooters/maintenance/newstatus/${event}`);

        if (response.data.data) {
            setInfos(response.data.data)
            SendToMaintenance(event)
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

        handleCloseMaintenanceModal()

    };

    const DeleteScoot = async(event) => {

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

    };

    const HandleService = async(event) => {

        let response = await axios.get(`/api/dashboard/api/scooters/service/newstatus/${event}`);

        if (response.data.data) {
            setInfos(response.data.data)
            Service(event)
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

    };

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
             timeout: 500,
           }}
          >
            <Box sx={{ ...style, width: 400 }}>
              <form action="" className="mx-auto max-w-xl space-y-4" onSubmit={handleSubmit}>
                <h2 id="child-modal-title"> { "ID : " + param + " - Commentaires" } </h2>
                <textarea  type="text" id="commentary"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="This one got a broken wheel">
                </textarea>

                {/* {pressing?.status === true && commentaryError?.error === false && (
                    <div
                        className="p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800"
                        role="alert">
                        <span className="font-medium">Attention ! </span> {commentaryError.helper}
                    </div>
                )} */}

                <button onClick={() => {
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
             timeout: 500,
           }}
          >
            <Box sx={{ ...style, width: 400 }}>
              <form action="" className="mx-auto max-w-xl space-y-4" onSubmit={handleSubmit}>
                <h2 id="child-modal-title">{ "ID : " + paramFixing + " - Commentaires" }</h2>
                <textarea  onChange={(e) => setCommentary(e.target.value)} type="text" id="commentary"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="This one got a broken wheel">
                </textarea>
                  
                <button onClick={() => {
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
                <TrotListToolbar/>

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
                                        rows={infos}
                                        columns={columns}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                        disableSelectionOnClick
                                        loading={!infos}/>

                                </div>
                            </Card>
                        </Box>

                    </Grid>
                </Grid>

                <Box
                    sx={{
                    pt: 4,
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
                        Historique
                    </Typography>

                </Box>

            </Container>
        </Box>

    );
}
