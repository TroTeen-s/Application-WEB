import React, { useContext, useEffect, useState } from "react";
import { AuthLoadingContext } from "../../context/AuthContext";
import Cloudy_day from "../../../../data/weather/Cloudy_day";
import Cloudy from "../../../../data/weather/Cloudy";
import Sunny from "../../../../data/weather/Sunny";
import Rainy_day from "../../../../data/weather/Rainy_day";
import Rainy from "../../../../data/weather/Rainy";
import Snowy from "../../../../data/weather/Snowy";
import Thunder from "../../../../data/weather/thunder";

const Weather = () => {

    const [infos, setInfos] = useState();

    let { loaded } = useContext(AuthLoadingContext)

    const retrieveInfos = async () => {
        try {
            let response = await axios.get('/api/weather', {
                headers: {
                    'Accept': 'application/json'
                }
            })



            if (response.data.success) {

                setInfos(response.data.data)

            }
        } catch (e) {
        }
    }

    useEffect(() => {

        if (loaded) {
            retrieveInfos()

        }
    }, [loaded])

    if(infos != null){

        if (infos.description !== undefined) {


            switch (infos?.description) {
                case "nuageux":
                    return (
                        <Cloudy />
                    );


                case "partiellement nuageux":
                    return (
                        <Cloudy_day />
                    );

                case "peu nuageux":
                    return (
                        <Cloudy_day />
                    );

                case "pluie légere":
                    return (
                        <Rainy_day />
                    );

                case "pluie":
                    return (
                        <Rainy />
                    );

                case "soleil":
                    return (
                        <Sunny />
                    );

                case "orageux":
                    return (
                        <Thunder />
                    );

                case "neigeux":
                    return (
                        <Snowy />
                    );

                default:
                    return (<></>);
            }
        }


    }else{
    return (<> </>)
}


};

export default Weather;
