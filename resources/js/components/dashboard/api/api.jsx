import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function shop() {

    const [name, setName] = useState("");
    const [file, setFile] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");


    const [data, setData] = useState([]);
  useEffect( async()=>{
      try {

          let result = await fetch("api/dashboard/api/weather/list");
          result = await result.json();
          setData(result);

      } catch (error) {
          console.log(error);
      }
  },[])


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'description', headerName: 'Description', width: 130 },
  { field: 'temp', headerName: 'Temp', width: 70 },
  { field: 'feels_like', headerName: 'Feels', width: 100 },
  { field: 'temp_min', headerName: 'Temp Min', width: 100 },
  { field: 'temp_max', headerName: 'Temp Max', width: 100 },
  { field: 'pressure', headerName: 'Pression', width: 100 },
  { field: 'humidity', headerName: 'Humidity', width: 100 },
  { field: 'city', headerName: 'Ville', width: 100 },
  { field: 'country', headerName: 'Pays', width: 100 },
  { field: 'DateTime', headerName: 'DateTime', width: 100 },
]


  console.warn("result",data)

  return (
    <div className="col-sm-8 mr-2 ml-1 offset-sm-1">
      <div className="mt-5 mb-5" style={{ height: 160, width: '100%' }}>
        <h3> Weather List </h3>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[2]}
        />
      </div>
    </div>
  )



}
