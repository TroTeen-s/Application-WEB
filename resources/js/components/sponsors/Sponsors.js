import React, { useContext, useEffect, useState } from 'react';
import Card from './Card';
import { AuthLoadingContext } from "../context/AuthContext";

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


        <section id="sectionShop">
            <div className="m-auto text-center md:w-8/12">
                <h2 className="text-2xl text-black-trot font-bold md:text-4xl">Nos <span
                    className="text-orange-300">partenaires </span> fidélité </h2>
                <h3 className="text-xl font-medium mb-10 pt-4">
                    Pour remercier les utilisateurs d'EasyScooter nous offrons des codes de fidélité.
                </h3>
            </div>
  
            <div className="mt-20 container bg-white-background">
  
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
        </section>

        );
    } else {
        return (


            <section id="sectionShop">
            <div className="m-auto text-center md:w-8/12">
                <h2 className="text-2xl text-black-trot font-bold md:text-4xl">Nos <span
                    className="text-orange-300">partenaires </span> fidélité </h2>
                <h3 className="text-xl font-medium mb-10 pt-4">
                    Pour remercier les utilisateurs d'EasyScooter nous offrons des codes de fidélité.
                </h3>
            </div>
  
            <div className="mt-20 container bg-white-background">
  
            <div className='h-screen flex items-center justify-center'>
                <h2> Chargement ... </h2>
                <div className='ml-2 h-4 w-4 rounded-full border-2 border-black bg-white'></div>
                <div className='ml-2 h-4 w-4 rounded-full border-2 border-black bg-white'></div>
                <div className='ml-2 h-4 w-4 rounded-full border-2 border-black bg-white'></div>
            </div>
            </div>
        </section>

        
        );
    }
}

export default Sponsors;
