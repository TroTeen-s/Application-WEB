import React, {useEffect, useState} from 'react';
// import {DataGrid} from '@mui/x-data-grid';
import Button from "@mui/material/Button";

const Users = () => {

    const [infos, setInfos] = useState();

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
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{marginLeft: 16}}
                    >
                        Open
                    </Button>
                </strong>
            )

        }

    ];

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

        retrieveInfos()
    }, [])


    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid
                rows={infos}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
            />
        </div>
    );

};

export default Users;
