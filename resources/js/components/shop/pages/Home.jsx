import React from "react";

import Products from "../components/Products";


const Home = () => {
  return (
    <div className="mt-6 pt-24">
      <div class="m-auto text-center md:w-8/12">
            <h2 class="text-2xl text-black-trot font-bold md:text-4xl">Notre boutique <span class="text-orange-300">contribue</span> à votre bonheur </h2>
            <h3 class="text-xl font-medium mb-10 pt-4">
                        Lorem ipsum dolor sit amet consectetur
                        adipisicing elit repellat dignissimos laboriosam
                        odit accusamus porro
            </h3>        
      </div>

      <div className="mt-20 container bg-white-background">

        <Products/>

      </div>
    </div>
  );
};

export default Home;
