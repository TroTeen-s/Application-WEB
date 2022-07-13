import React from "react";
import ProductsList from "./ProductsList";
import "./style.css"

import {useTranslation} from 'react-i18next';

const Home = () => {

    const {t, i18n} = useTranslation();

  return (
      <section id="sectionShop">
          <div className="m-auto text-center md:w-8/12">
              <h2 className="text-2xl text-black-trot font-bold md:text-4xl"> {t('Our shop')} <span
                  className="text-orange-300">{t('contributes')}</span> {t('to your happiness')} </h2>
              <h3 className="text-xl font-medium mb-10 pt-4">
              {t('Our products made in France have been created to your liking !')}
              </h3>
          </div>

          <div className="mt-20 container bg-white-background">

              <ProductsList />

      </div>
    </section>
  );
};

export default Home;
