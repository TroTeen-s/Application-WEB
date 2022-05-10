import React, { useEffect } from 'react'
import { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';

export default function shop() {

  const [name,setName] = useState("")
  const [file,setFile] = useState("")
  const [price,setPrice] = useState("")
  const [description,setDescription] = useState("")

  async function addProduct(){

    
    console.warn(name,file,price,description)
    const formData = new FormData();
    formData.append('file',file)
    formData.append('price',price)
    formData.append('name',name)
    formData.append('description',description)

    let result = await fetch("http://localhost:8000/api/dashboard/addproduct",{
      method:'POST',
      body: formData
    });
    alert("Data has been saved")


  }


  const [data,setData] = useState([]);
  useEffect( async()=>{
    let result = await fetch("http://localhost:8000/api/dashboard/list");
    result = await result.json();
    setData(result)
  },[])

  
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'description', headerName: 'Description', width: 250 },
  { field: 'in_stock_available', headerName: 'Quantity', width: 100 },
  { field: 'image_path', headerName: 'Image Path', width: 250 },
  { field: 'created_at', headerName: 'created_at', width: 200 },
  { field: 'updated_at', headerName: 'updated_at', width: 200 },
]


  console.warn("result",data)

  return (
    <div className="col-sm-8 mr-2 ml-1 offset-sm-1">
      <div className="">
        <br/>
          <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} placeholder="Name"/> <br/>
          <input type="file" className="form-control" onChange={(e) => setFile(e.target.files[0])} placeholder="file"/> <br/>
          <input type="text" className="form-control" onChange={(e) => setPrice(e.target.value)} placeholder="price"/> <br/>
          <input type="text" className="form-control" onChange={(e) => setPrice(e.target.value)} placeholder="quantity"/> <br/>
          <input type="text" className="form-control" onChange={(e) => setDescription(e.target.value)} placeholder="description"/> <br/>
          <button onClick={addProduct} className="bg-orange-300 text-gray-800 font-semibold py-2 px-4 rounded shadow"> Ajouter un produit </button> 
          
      </div>
     

      <div className="mt-5 mb-5" style={{ height: 370, width: '100%' }}>
        <h3> Product Lists </h3>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[10]}
        />
      </div>
    </div>
  )


  
}
