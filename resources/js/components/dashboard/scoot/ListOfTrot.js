import React, { useContext, useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import { LinearProgress } from '@mui/material';
import { AuthLoadingContext } from '../../context/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';
import ElectricScooterIcon from '@mui/icons-material/ElectricScooter';

import toast, { Toaster } from 'react-hot-toast';

export default function ListOfTrot() {

  const notify = () => toast.success('+1 Trotinette ajouté');
  const SendToFix = (event) => toast(`Trotinette ID : ${event} envoyé en réparation !`, {
    icon: '💤',
  });

  const SendToMaintenance = (event) => toast(`Trotinette ID : ${event} envoyé en maintenance !`, {
    icon: '💬',
  });

  const Service = (event) => toast(`Trotinette ID : ${event} remis en service !`, {
    icon: '👏',
  });
  

  const [infos, setInfos] = useState();
  
  let { loaded } = useContext(AuthLoadingContext)

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 40
    },
    {
      field: 'model_serie',
      headerName: 'Modele de Serie',
      width: 220,
      editable: false,
    },
    {
      field: 'mileage',
      headerName: 'Kilometrage',
      width: 100,
      editable: false,
    },

    { field: 'maintenance', type: 'boolean', width: 120 },

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
                      HandleMaintenance(params.row.id);
                    }}
                >
                    Envoyer
                </Button>
            </strong >
        )

      },

    { field: 'fixing', headerName: 'fixing', type: 'boolean', width: 120 },

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
                  HandleFixing(params.row.id);
                }}
            >
                Envoyer
            </Button>
        </strong >
    )

    },

    {
      field: 'none',
      type: 'actions',
      headerName: 'Service',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<ElectricScooterIcon />}
          onClick={() => {
            HandleService(params.row.id)}
          }
        />,
      ],
    },
    
    {
      field: 'actions',
      type: 'actions',
      width: 50,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            DeleteScoot(params.row.id)}
          }
        />,
      ],
    },

  ]

  const HandleFixing = async (event) => {
         
      let response = await axios.get(`/api/dashboard/api/scooters/fixing/newstatus/${event}`);

      if (response.data.data) {
        console.log(response.data.data)
        setInfos(response.data.data)
        SendToFix(event)
      }

  };

  const HandleMaintenance = async (event) => {

    let response = await axios.get(`/api/dashboard/api/scooters/maintenance/newstatus/${event}`);

    if (response.data.data) {
      setInfos(response.data.data)
      SendToMaintenance(event)
    }

  };

  const DeleteScoot = async (event) => {

    let response = await axios.get(`/api/dashboard/api/dashboard/api/scooters/delete/${event}`);

    if (response.data.data) {
      console.log(response.data.data)
      setInfos(response.data.data)
    }

  };

  
  const AddScoot = async () => {

    let response = await axios.get(`/api/dashboard/api/scooters/add`);

    if (response.data.data) {
      setInfos(response.data.data);
      notify();
    }

  };

  const HandleService = async (event) => {

    let response = await axios.get(`/api/dashboard/api/scooters/service/newstatus/${event}`);

    if (response.data.data) {
      setInfos(response.data.data)
      Service(event)
    }

  };


  const retrieveInfos = async () => {
    try {
      let response = await axios.get('/api/dashboard/scooters/list', {
        headers: {
          'Accept': 'application/json'
        }
      })

      if (response.data.data) {
        console.log(response.data.data)
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

    <Toaster/>


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

     <button onClick={AddScoot}
      className="bg-orange-300 text-gray-800 font-semibold py-2 px-9 rounded shadow ml-4 mt-7"> Ajouter une trotinette
     </button>

    </div>
    
    </>

  );

}
