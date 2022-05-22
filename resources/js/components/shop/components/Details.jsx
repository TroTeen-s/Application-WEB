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
      <div className="">
        <div className="flex items-center p-2 lg:p-5 mt-5 overflow-hidden relative">
          <div className="w-full max-w-6xl rounded bg-white-background p-20 pt-5 pb-5 lg:p-20 mx-auto text-gray-800 relative md:text-left">
              <div className="md:flex items-center -mx-12">
                  <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                      <div className="relative">
                          <img src="https://pngimg.com/uploads/raincoat/raincoat_PNG53.png" className="w-full relative z-10" alt=""/>
                      </div>
                  </div>
                  <div className="w-full md:w-1/2 px-10">
                      <div className="mb-10">
                          <h1 className="font-bold uppercase text-2xl mb-5">Mens's Ragged <br/> Waterproof Jacket</h1>
                          <p className="text-sm">Lorem ipsum dolor sit, amet consectetur adipisicing, elit. Eos, voluptatum dolorum! Laborum blanditiis consequatur, voluptates, sint enim fugiat saepe, dolor fugit, magnam explicabo eaque quas id quo porro dolorum facilis... 
                          {/* <a href="#" className="opacity-50 text-gray-900 hover:opacity-100 inline-block text-xs leading-none border-b border-gray-900">MORE <i className="mdi mdi-arrow-right"></i></a>*/}
                          </p> 
                      </div>
                      <div>
                          <div className="align-bottom">
                              <span className="font-bold text-5xl leading-none align-baseline">59.00</span>
                              <span className="font-bold text-5xl leading-none align-baseline">€</span>
            
                          </div>
                          
                          <div className="align-bottom mt-5">
                              <button className="bg-orange-300 opacity-75 hover:opacity-100 text-black-trot rounded-full px-10 py-2 font-semibold">
                                <i className="mdi mdi-cart -ml-2 mr-2"></i> 
                                ADD TO CART
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
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