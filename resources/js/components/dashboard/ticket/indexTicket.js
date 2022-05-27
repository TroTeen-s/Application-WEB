import React, { useContext, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import { LinearProgress } from '@mui/material';
import { AuthLoadingContext } from '../../context/AuthContext';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

export default function TrotMaintenance() {
  const [infos, setInfos] = useState();

  let { loaded } = useContext(AuthLoadingContext)

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90
    },
    {
      field: 'firstname',
      headerName: 'First Name',
      width: 150,
      editable: false,
    },
    {
      field: 'lastname',
      headerName: 'Last Name',
      width: 150,
      editable: false,
    },

    {
        field: 'email',
        headerName: 'E Mail',
        width: 250,
        editable: false,
      },

      {
        field: 'message',
        headerName: 'Message',
        width: 350,
        editable: false,
      },

   
  ];

  const retrieveInfos = async () => {
    try {
      let response = await axios.get('/api/support/list', {
        headers: {
          'Accept': 'application/json'
        }
      })

       console.log(response)

      if (response.data) {
        setInfos(response.data)
      }
    } catch (e) {
    }
  }

  useEffect(() => {

    if (loaded) {
      retrieveInfos()
    }
  }, [loaded])

  console.log(infos)

  return (
    <Box
    component="main"
    sx={{
      backgroundColor: (theme) =>
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[900],
      flexGrow: 1,
      height: '100vh',
    }}
  >
    <Toolbar />
    <Container className="overflow-hidden" sx={{ mt: 1, mb: 1 }}>
      <Grid container spacing={3}>

        <Grid item xs={20}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', paddingBottom: 5 }}>
          <div style={{ height: 450, width: '100%', paddingBottom: 10 }}>
                <h3> Ensemble des tickets </h3>
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
          </Paper>
        </Grid>

      </Grid>

    </Container>
  </Box>
  );

  

}