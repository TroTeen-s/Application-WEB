import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ACTIONS, CartContext } from "../context/CartContext";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';


const Product = () => {

    let { dispatch } = useContext(CartContext);

    const addToCart = (id) => {
        dispatch({ type: ACTIONS.CART_ADD_UNIQUE, payload: { id: id } });
    };


    const { id } = useParams();

    const [product, setProduct] = useState([]);

    const retrieveProductInfos = async () => {
        let response = await axios.get(`/api/product/${id}`);

        if (response.data.success) {
            setProduct(response.data.data);
        }
    };

    useEffect(() => {

        retrieveProductInfos();
    }, []);
    if (product)
        return (

            <section className="bg-white-background">
                <div className="flex mt-5 ml-12">
                    <NavLink className="no-underline" to="/shop" style={{ color: "black", textDecoration: "none !important" }}>
                    <button class="px-4 py-3 flex items-center space-x-4 rounded-md text-black-trot group">
                    <ThreeSixtyIcon />
                        <span class="group-hover:text-gray-700">Retour</span>
                    </button>
                    </NavLink>
                </div>

                <div className="py-16 bg-green-50 mt-12 pt-5 ">
                    <div className="container m-auto px-6 space-y-8 md:px-12 lg:px-20">
                        <div className="gap-16 md:text-left md:flex mb-5">
                            <div className="order-last mb-6 space-y-6 md:mb-0 md:w-7/12 lg:w-6/12 mr-6 pr-12">
                                <h1 className="font-bold uppercase text-3xl mb-5">{product?.name}
                                </h1>
                                <p className="text-lg text-gray-600">{product?.description}</p>
                                <div className="align-bottom">
                                    <span
                                        className="font-bold text-5xl leading-none align-baseline pt-2">{product?.price}</span>
                                    <span className="font-bold text-5xl leading-none align-baseline pl-2">€</span>

                                </div>
                                    <span class="text-black-trot opacity-70 font-semibold">
                                        Taxes et TVA compris
                                    </span>
                                <div className="flex flex-wrap justify-center gap-4 lg:gap-6 md:justify-start">
                           

                                    <button    onClick={() => addToCart(product?.id)} class="block w-full mt-5 py-3 px-6 text-center rounded-xl transition bg-orange-300">
                                        <span class="text-white font-semibold">
                                        Ajouter au panier
                                        </span>
                                    </button>

                                </div>
                            </div>
                            <img src={"/" + product.image_path} width="400" height="400"
                                 className="md:w-5/12 m-auto" alt="mobility_illustration" />
                        </div>
                    </div>
                </div>
                         

            </section>
        );
};

export default Product;
