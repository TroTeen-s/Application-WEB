import { NavLink } from "react-router-dom";
import React from "react";

function Link({ link, cover }) {

    return (
        <NavLink className="no-underline w-full flex justify-center "
            to={link}>
            <div className="bg-orange-300 w-2/4 whitespace-nowrap p-3 text-black flex justify-center items-center rounded-md text-lg md:w-full ">
                <p className="p-0 m-0">{cover}</p>
            </div>
        </NavLink >

    );
}

export default Link;
