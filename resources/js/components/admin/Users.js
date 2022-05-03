import React, { useContext, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import { LinearProgress } from '@mui/material';

import { AuthLoadingContext } from "../context/AuthContext";
import { Navigate } from 'react-router';

const Users = () => {

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
            headerName: 'First name',
            width: 150,
            editable: false,
        },
        {
            field: 'lastname',
            headerName: 'Last name',
            width: 150,
            editable: false,
        },
        {
            field: 'email',
            headerName: 'email',
            width: 150,
            editable: false,
        },

        {
            field: 'userLink',
            headerName: 'Show more',
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
                        Open
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
    );

};

export default Users;
