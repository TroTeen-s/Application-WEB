import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../context/AuthContext';
import French_flag from '../../../../data/flag/french_flag';
import Uk_flag from '../../../../data/flag/Uk_flag';


const Flag = () => {



    const [infos, setInfos] = useState();

    let { language } = useContext(LanguageContext)


    console.log(language)

    switch (language) {
        case "fr":
            return (
                <French_flag />
            );

        case "en":
            return (
                <Uk_flag />
            );

        default:
            return (
                <French_flag />
            );

    }


};

export default Flag;
