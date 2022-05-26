import React, { useContext, useEffect, useState } from 'react';
import Card from './Card';
import { AuthLoadingContext } from "../context/AuthContext";
import { LoadScript } from '@react-google-maps/api';

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
                <div class="flex justify-center px-[10%] py-6">
                    <div class="grid grid-cols-3 gap-12">
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

            <div className='h-screen'></div>
        );
    }
}

export default Sponsors;
