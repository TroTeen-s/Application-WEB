import React, {useContext, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Add, Remove } from "@material-ui/icons";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import styled from "styled-components";
import { mobile } from "../responsive";
import { NavLink } from 'react-router-dom'
import "./style.css"

const Product = () => {
    console.log(useParams())

    let { id } = useParams();

    const [showModal, setShowModal] = React.useState(false);

  return (
 
    <section className="bg-white-background">
      {/* <div ClassName="flex mt-5 ml-5">
        <NavLink to="/shop" style={{ color: 'black', textDecoration: 'none !important' }}>
          <div className="align-bottom">
            <ArrowBackIosIcon  className="leading-none align-baseline" style={{ color: 'black', textDecoration: 'none !important' }} fontSize="large"/>
            <h1 className="font-bold uppercase text-2xl mb-5 leading-none align-baseline">Retour</h1>
          </div>
        </NavLink>
      </div> */}
      
    <div class="py-16 bg-green-50 mt-12 pt-5 ">
        <div class="container m-auto px-6 space-y-8 md:px-12 lg:px-20">
            <div class="gap-16 md:text-left md:flex mb-5">
                <div class="order-last mb-6 space-y-6 md:mb-0 md:w-7/12 lg:w-6/12 mr-6 pr-12">
                <h1 className="font-bold uppercase text-3xl mb-5">Mens's Ragged <br/> Waterproof Jacket</h1>
                    <p class="text-lg text-gray-600">Be part of millions people around the world using tailus in modern User Interfaces.</p>
                    <div className="align-bottom">
                              <span className="font-bold text-5xl leading-none align-baseline pt-2">59.00</span>
                              <span className="font-bold text-5xl leading-none align-baseline pl-2">€</span>
            
                          </div>
                    <div class="flex flex-wrap justify-center gap-4 lg:gap-6 md:justify-start">
                        <button className="bg-orange-300 opacity-75 hover:opacity-100 text-black-trot px-10 py-2 font-semibold">
                            <i className="mdi mdi-cart -ml-2 mr-2"></i> 
                                ADD TO CART
                        </button>
                    </div>
                </div>
                <img src="https://pngimg.com/uploads/raincoat/raincoat_PNG53.png" width="400" height="400" class="md:w-5/12 m-auto" loading="lazy" alt="mobility_illustration"/>
            </div>
        </div>
    </div> 
        

    <div class="py-16">  
    <div class="container px-2 text-gray-500 md:px-2 xl:px-12">
        <div class="mx-auto grid ml-2 gap-12 md:w-4/4 lg:w-full lg:grid-cols-3">
            <div class="bg-white rounded-2xl mr-4 ml-4 px-8 py-12 mb-5 sm:px-12 lg:px-8">
                <div class="mb-12 space-y-4">
                    <h3 class="text-2xl font-semibold text-black-trot">Retour gratuit</h3>
                    <p class="mb-6">Obcaecati, quam? Eligendi, nulla numquam natus laborum porro at cum, consectetur ullam tempora ipsa iste officia sed officiis! Incidunt ea animi officiis.</p>
                </div>
                <img src="https://tailus.io/sources/blocks/end-image/preview/images/graphic.svg" class="w-2/3 ml-auto mb-4" alt="illustration" loading="lazy" width="900" height="600"/>
            </div>
            <div class="bg-white rounded-2xl mr-4 ml-4 px-8 py-12 mb-5 sm:px-12 lg:px-8">
                <div class="mb-12 space-y-4">
                    <h3 class="text-2xl font-semibold text-black-trot">Made in France</h3>
                    <p class="mb-6">Obcaecati, quam? Eligendi, nulla numquam natus laborum porro at cum, consectetur ullam tempora ipsa iste officia sed officiis! Incidunt ea animi officiis.</p>
                </div>
                <img src="https://tailus.io/sources/blocks/end-image/preview/images/ui-design.svg" class="w-2/3 ml-auto mb-4" alt="illustration" loading="lazy" width="900" height="600"/>
            </div>
            <div class="bg-white rounded-2xl mr-4 ml-4 px-8 py-12 mb-5 sm:px-12 lg:px-8">
                <div class="mb-12 space-y-4">
                    <h3 class="text-2xl font-semibold text-black-trot">Livraison rapide & gratuite </h3>
                    <p class="mb-6">Obcaecati, quam? Eligendi, nulla numquam natus laborum porro at cum, consectetur ullam tempora ipsa iste officia sed officiis! Incidunt ea animi officiis.</p>
                </div>
                <img src="https://tailus.io/sources/blocks/end-image/preview/images/ux-design.svg" class="w-2/3 ml-auto mb-4 " alt="illustration" loading="lazy" width="900" height="600"/>
            </div>
        </div>
    </div>
</div>

    </section>
  );
};

export default Product;