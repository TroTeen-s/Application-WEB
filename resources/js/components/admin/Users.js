import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { AuthContext } from "../context/AuthContext";
import { DataGrid } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import { Outlet } from "react-router";

const Users = () => {

    console.log("test")

    const [infos, setInfos] = useState([]);

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
            console.log(response.data)

        } catch (e) {
        }
    }

    console.log("apres retrieve info")



    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
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
                    {params.value.getFullYear()}
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginLeft: 16 }}
                    >
                        Open
                    </Button>
                </strong>
            )

        }

    ];





    useEffect(() => {
        retrieveInfos()

    }, [infos])


    let i = -1;
    let tmp = infos.slice()

    // while (++i < infos.length) {
    //     tmp[i] = infos[i];
    // }

    for (var j = 0; j < tmp.length; j++) {

        tmp[j]["userLink"] = "user-" + tmp[j]["id"]

    }


    // console.log(infos)






    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={tmp}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
            />
        </div>
    );

};

export default Users;