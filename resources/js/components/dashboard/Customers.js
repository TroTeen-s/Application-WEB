import React, { useContext, useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import { LinearProgress } from '@mui/material';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
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
          field: 'firstname',
          headerName: 'firstname',
          width: 150,
          editable: false,
        },
        {
          field: 'lastname',
          headerName: 'lastname',
          width: 150,
          editable: false,
        },

        {
          field: 'username',
          headerName: 'username',
          width: 150,
          editable: false,
        },

        {
          field: 'email',
          headerName: 'email',
          width: 200,
          editable: false,
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
                  DeleteUser(params.row.id)}
                }
              />,
            ],
          },

  
      ];

    const DeleteUser = async (event) => {

        try{

        let response = await axios.post(`/api/dashboard/users/delete/${event}`);
    
        if (response.data.data) {
          console.log(response.data.data)
          setInfos(response.data.data)
        }

                
        }catch(error){
            console.log(error)
        }
    
    };


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
