import Cloudy_day from "../../../../data/weather/Cloudy_day";
import Cloudy_night from "../../../../data/weather/Cloudy_night";
import Cloudy from "../../../../data/weather/Cloudy";
import Sunny from "../../../../data/weather/Sunny";
import Night from "../../../../data/weather/Night";
import Rainy_day from "../../../../data/weather/Rainy_day";
import Rainy from "../../../../data/weather/Rainy";
import Snowy from "../../../../data/weather/Snowy";
import Thunder from "../../../../data/weather/thunder";

const Weather = () => {

    switch ('nuageux') {
        case 'nuageux':
            return (
                <Cloudy />
            );

        case 'partiellement nuageux':
            return (
                <Cloudy_day />
            );

        case 'pluie légere':
            return (
                <Rainy_day />
            );

        case 'pluie':
            return (
                <Rainy />
            );

        case 'soleil':
            return (
                <Sunny />
            );

        case 'orageux':
            return (
                <Thunder />
            );

        case 'neigeux':
            return (
                <Snowy />
            );

        default:
            return (<></>)
    }


};

export default Weather;
