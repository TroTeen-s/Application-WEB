import React, { useContext, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import { LinearProgress } from '@mui/material';
import { AuthLoadingContext } from '../../context/AuthContext';

export default function ListOfTrot() {
  const [infos, setInfos] = useState();

  let { loaded } = useContext(AuthLoadingContext)

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90
    },
    {
      field: 'model_serie',
      headerName: 'Modele de Serie',
      width: 250,
      editable: false,
    },
    {
      field: 'mileage',
      headerName: 'Kilometrage',
      width: 150,
      editable: false,
    },

    {
      field: 'maintenance',
      headerName: 'maintenance',
      width: 100,
      editable: false,
      renderCell: (params) => (
        <div id={"is-active-" + params.row.id}>
          <p className='m-0'>
            {params.row.available ? "true" : "false"}
          </p>
        </div >
      )

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
                        showMore(params);
                    }}
                >
                    Envoyer
                </Button>
            </strong >
        )

      },

    {
        field: 'fixing',
        headerName: 'fixing',
        width: 60,
        editable: false,
        renderCell: (params) => (
          <div id={"is-active-" + params.row.id}>
            <p className='m-0'>
              {params.row.available ? "true" : "false"}
            </p>
          </div >
        )

      },



    {
      field: 'FixingLink',
      headerName: 'Send to fixing',
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
                    showMore(params);
                }}
            >
                Envoyer
            </Button>
        </strong >
    )

    }

  ];

  const active = async (params) => {
    console.log(params)
    try {
      let response = await axios.post('/api/scooter/active/', params.row)
      if (response.data.success) {
        console.log("available" + response.data.data.scooter[0])
        console.log(response.data.data.scooter[0])
        retrieveInfos()

      }
    } catch (e) {
      console.log(e)
    }

  }

  const retrieveInfos = async () => {
    try {
      let response = await axios.get('/api/scooters', {
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
    <div style={{ height: 400, width: '100%', paddingBottom: 10 }}>
      <h3> Liste des trotinettes </h3>
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
  );

}
