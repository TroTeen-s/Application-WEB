import React from 'react'
import { useState } from 'react'

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


  return (
    <div className="col-sm-6 offset-sm-3">
      <br/>
        <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} placeholder="Name"/> <br/>
        <input type="file" className="form-control" onChange={(e) => setFile(e.target.files[0])} placeholder="file"/> <br/>
        <input type="text" className="form-control" onChange={(e) => setPrice(e.target.value)} placeholder="price"/> <br/>
        <input type="text" className="form-control" onChange={(e) => setDescription(e.target.value)} placeholder="description"/> <br/>
        <button onClick={addProduct} className="bg-orange-300 text-gray-800 font-semibold py-2 px-4 rounded shadow"> Ajouter un produit </button> 
        
    </div>
  )
}
