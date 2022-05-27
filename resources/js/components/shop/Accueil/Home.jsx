import React from "react";
import ProductsList from "./ProductsList";
import "./style.css"



const Home = () => {
  return (
      <section id="sectionShop">
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
    </section>
  );
};

export default Home;
