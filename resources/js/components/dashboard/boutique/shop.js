import React, {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {Chip} from "@mui/material";
import toast, {Toaster} from "react-hot-toast";

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

    const [data, setData] = useState([]);

    const {name, quantity, file, price, description} = state;

    const columns = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'name', headerName: 'Nom', width: 200},
        {field: 'description', headerName: 'Description', width: 250},
        {field: 'active', headerName: 'Disponible', flex: 0},
        {
            field: 'Activer / Désactiver', headerName: 'Disponible', flex: 0, renderCell: (cellValues) => {
                return (
                    <Chip
                        label={cellValues.row.active ? "Désactiver" : "Activer"}
                        color="success"
                        onClick={() => {
                            changeActiveStatus(cellValues.row.id, cellValues.row.active ? 0 : 1);
                        }}
                    />
                );
            }
        },
        {field: 'in_stock_available', headerName: 'Stock', flex: 0},
        {field: 'image_path', headerName: 'Image (chemin)', width: 250},
        {field: 'created_at', headerName: 'Créé le', width: 200},
        {field: 'updated_at', headerName: 'Mis à jour le', width: 200},
    ];


    const HandleChange = (e) => {
        const {name, value} = e.target;
        console.log(name + value);
        if (name === 'file') {
            setState({...state, [name]: e.target.files[0]});

        } else {
            setState({...state, [name]: value});
        }
    };

    const retrieveProducts = async () => {
        try {
            let response = await axios.get('/api/dashboard/products');

            if (response.data.data) {
                console.log(response);
                setData(response.data.data);

            } else {
                toast();
            }
        } catch (e) {
            console.log(e);
        }
    };

    const addProduct = async () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('price', price);
        formData.append('name', name);
        formData.append('quantity', quantity);
        formData.append('description', description);

        try {
            let response = await axios.post("http://localhost:8000/api/dashboard/addproduct", formData);

            if (response.data.success) {
                setData(data => [...data, response.data.data]);
                toast.success("Produit bien ajouté au catalogue !");

            }
        } catch (e) {
            toast.error("Erreur dans l'ajout du produit, veuillez réessayer.");
        }


    };

    const changeActiveStatus = async (productId, active) => {

        try {
            let response = await axios.patch(`/api/dashboard/products/${productId}`, {
                active: active
            });

            if (response.data.success) {
                let message = "Stock du produit mis à jour avec succès";
                toast.success(`Trotinette ID : ${productId}, ${message} !`);
            } else {
                let message = "Erreur dans la mise à jour du statut du produit";
                toast.error(`Trotinette ID : ${productId}, ${message} !`);
            }
        } catch (e) {
            let message = "Erreur dans la mise à jour du statut du produit";
            toast.error(`Trotinette ID : ${productId}, ${message} !`);
        }
        await retrieveProducts();

    };

    useEffect(async () => {
        await retrieveProducts();
    }, []);


    return (
        <div className="col-sm-8 mr-2 ml-1 offset-sm-1">
            <Toaster/>
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
                <h3> Liste des produits </h3>
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
