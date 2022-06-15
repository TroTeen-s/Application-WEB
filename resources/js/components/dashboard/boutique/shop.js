import React, {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';

const shop = () => {
    const initialValues = {
        name: '',
        quantity: '',
        file: '',
        price: '',
        description: '',
        data: '',
    };

    const [state, setState] = useState(initialValues);

    const {name, quantity, file, price, description} = state;

    const HandleChange = (e) => {
        const {name, value} = e.target;
        console.log(name + value);
        if (name === 'file') {
            setState({...state, [name]: e.target.files[0]});

        } else {
            setState({...state, [name]: value});
        }
    };

    const addProduct = async () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('price', price);
        formData.append('name', name);
        formData.append('quantity', quantity);
        formData.append('description', description);

        let response = await axios.post("http://localhost:8000/api/dashboard/addproduct", formData);

        if (response.data.success) {
            setData(data => [...data, response.data.data]);
        }


    };


    const [data, setData] = useState([]);
    useEffect(async () => {
        let result = await fetch("http://localhost:8000/api/dashboard/list");
        result = await result.json();
        setData(result);
    }, []);


    const columns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'name', headerName: 'Name', width: 200},
        {field: 'description', headerName: 'Description', width: 250},
        {field: 'in_stock_available', headerName: 'Quantity', width: 100},
        {field: 'image_path', headerName: 'Image Path', width: 250},
        {field: 'created_at', headerName: 'created_at', width: 200},
        {field: 'updated_at', headerName: 'updated_at', width: 200},
    ];


    return (
        <div className="col-sm-8 mr-2 ml-1 offset-sm-1">
            <div className="">
                <br/>
                <input type="text" name="name" className="form-control" onChange={HandleChange} placeholder="Name"/>
                <br/>
                <input type="file" name="file" className="form-control" onChange={HandleChange}
                       placeholder="file"/> <br/>
                <input type="text" name="price" className="form-control" onChange={HandleChange} placeholder="price"/>
                <br/>
                <input type="text" name="quantity" className="form-control" onChange={HandleChange}
                       placeholder="quantity"/> <br/>
                <input type="text" name="description" className="form-control" onChange={HandleChange}
                       placeholder="description"/> <br/>
                <button onClick={addProduct}
                        className="bg-orange-300 text-gray-800 font-semibold py-2 px-4 rounded shadow"> Ajouter un
                    produit
                </button>

            </div>


            <div className="mt-5 mb-5" style={{height: 370, width: '100%'}}>
                <h3> Product Lists </h3>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[10]}
                />
            </div>
        </div>
    );


};

export default shop;
