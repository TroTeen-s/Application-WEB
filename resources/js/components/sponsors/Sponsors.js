import React, { useContext, useEffect, useState } from 'react';
import Card from './Card';
import { AuthLoadingContext } from "../context/AuthContext";
import { LanguageContext } from '../context/AuthContext';
import { LoadScript } from '@react-google-maps/api';
import { IosShare } from '@mui/icons-material';

const Sponsors = () => {

    let { loaded } = useContext(AuthLoadingContext)
    const [infos, setInfos] = useState();




    const retrieveInfos = async () => {
        try {
            let response = await axios.get('/api/sponsors/', {
                headers: {
                    'Accept': 'application/json'
                }
            })

            if (response.data.data) {
                console.log(response)
                setInfos(response.data.data)

            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {

        if (loaded) {
            retrieveInfos()


        }
    }, [loaded])

    console.log(infos)


    if (infos) {
        return (


            <div className='bg-white-background'>
                <div className="flex justify-center px-[10%] py-6">
                    <div className="mt-12 grid grid-cols-3 items-center gap-6 md:grid-cols-2 lg:flex lg:space-x-8">
                        {infos.map(({ id, brand, description, end }) => (
                            <Card
                                id={id}
                                brand={brand}
                                description={description}
                                end={end} />
                        ))}
                    </div>
                </div>
            </div>


        );
    } else {
        return (
            <div className='h-screen flex items-center justify-center'>
                <h2>Aucun Partenaire pour le moment</h2>
                <div className='ml-2 h-4 w-4 rounded-full border-2 border-black bg-white'></div>
                <div className='ml-2 h-4 w-4 rounded-full border-2 border-black bg-white'></div>
                <div className='ml-2 h-4 w-4 rounded-full border-2 border-black bg-white'></div>
            </div>
        );
    }
}

export default Sponsors;
