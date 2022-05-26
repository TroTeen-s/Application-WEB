import React from "react";
import ProductsList from "./ProductsList";



const Home = () => {
  return (
      <div className="mt-6 pt-24">
          <div className="m-auto text-center md:w-8/12">
              <h2 className="text-2xl text-black-trot font-bold md:text-4xl">Notre boutique <span
                  className="text-orange-300">contribue</span> à votre bonheur </h2>
              <h3 className="text-xl font-medium mb-10 pt-4">
                  Lorem ipsum dolor sit amet consectetur
                  adipisicing elit repellat dignissimos laboriosam
                  odit accusamus porro
              </h3>
          </div>

          <div className="mt-20 container bg-white-background">

              <ProductsList />

      </div>
    </div>
  );
};

export default Home;
