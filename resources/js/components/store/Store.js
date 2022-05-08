import React from "react";
import Header from "../header/Header";
import Button from "@mui/material/Button";


function Store() {
    const packages = [
        {
            id: 1,
            price: 19.99,
            name: 'basique',
            student_offer: false,
            cycle: 'jour'
        },
        {
            id: 2,
            price: 44.99,
            name: 'deluxe',
            student_offer: true,
            cycle: 'mois'
        },
        {
            id: 3,
            price: 79.99,
            name: 'premium',
            student_offer: false,
            cycle: 'mois'
        }
    ]

    const handleClick = async (name) => {
        try {
            let response = await axios.post('/api/checkout-sub', {name});
            if (response.data.data) {
                console.log(response.data.data)
                if(response.data.data.redirect){
                    window.location.replace(response.data.data.redirect)
                }
            }
        } catch
            (e)
            {
                if (e.request) {
                    console.log(e.request)
                }
                if (e.message) {
                    console.log(e.message)
                }
            }
        }
        return (
            <div className="h-full w-full">
                <div className="flex justify-center space-x-2 items-end">
                    <div className="text-black text-sm"><p>Nos</p></div>
                    <div className="text-orange-300 text-2xl"><p>Forfaits d'abonnement</p></div>
                </div>
                <ul className='flex justify-around mt-12 h-full w-full'>
                    {packages.map(({id, price, student_offer, cycle, name}) => (
                        <li key={id} className='bg-black-trot text-white h-2/3 w-1/5 p-5'>
                            <div className="flex flex-col py-4 h-full justify-between items-center">
                                <div>
                                    <div className="text-xl text-center font-bold">
                                        {price + "€/" + cycle}
                                    </div>
                                    <div className='text-xs text-center'>{student_offer ? "Offre étudiante" : ""}</div>
                                </div>
                                <div
                                    className='bg-gray-200 text-black flex flex-row justify-center items-center w-full px-4 py-2 rounded-md cursor-pointer hover:bg-gray-300 ease-in-out duration-300'>
                                    <Button onClick={() => {
                                        handleClick(name)
                                    }}>Souscrire</Button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    export default Store;
