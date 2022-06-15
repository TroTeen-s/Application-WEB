import React, { useContext, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import { LinearProgress } from '@mui/material';
import Container from '@mui/material/Container';

import { AuthLoadingContext } from "../context/AuthContext";
import { Navigate } from 'react-router';

const Customers = () => {

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
          width: 150,
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

    const showMore = (params) => {
        //console.log(params.row.email)
        document.location.replace('/user/' + params.row.id)
    }

    const retrieveInfos = async () => {
        try {
            let response = await axios.get('/api/users', {
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

        <Container className="h-full overflow-hidden" sx={{ mt: 4 }}>
        <div style={{ height: 400, width: '100%' }}>
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
    </Container>

    );

};

export default Customers;
