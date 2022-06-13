import React, {useContext} from 'react';
import {AuthContext} from "../context/AuthContext";
import {CircularProgress} from "@mui/material";
import {Outlet} from "react-router";
import verifyAuth from "../auth/verifyAuth";
import './style.css'

const Account = () => {
    let {auth} = useContext(AuthContext)
    verifyAuth()

    return (

        <section id="sectionAccount">
          <div className="m-auto text-center md:w-8/12">
              <h2 className="text-2xl text-black-trot font-bold md:text-4xl">Voici <span
                  className="text-orange-300">mon compte</span>
            </h2>
              <h3 className="text-xl font-medium mb-10 pt-4">
              Modification d'information personnelles
              </h3>
          </div>

          <div className="mt-20 container bg-white-background text-black-trot">

                {/* <ProductsList /> */}
                {(auth) ? <Outlet/> : <CircularProgress/>}

      </div>
    </section>



        // <div className="rounded-3 bg-dark p-6 text-white">
        //     <p>Voici mon compte</p>
        //     {(auth) ? <Outlet/> : <CircularProgress/>}
        // </div>
    );
};

export default Account;
