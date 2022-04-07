import React from "react";


function Store() {
    const packages = [
        {
            id: 1,
            price: 2.00,
            student_offer: false,
            cycle: 'jour'
        },
        {
            id: 2,
            price: 20.99,
            student_offer: true,
            cycle: 'mois'
        },
        {
            id: 3,
            price: 27.99,
            student_offer: false,
            cycle: 'mois'
        }
    ]
    return (
        <div className="h-full w-full">
            <div className="flex justify-center space-x-2 items-end">
                <div className="text-black text-sm"><p>Nos</p></div>
                <div className="text-orange-300 text-2xl"><p>Forfaits d'abonnement</p></div>
            </div>
            <ul className='flex justify-around mt-12 h-full w-full'>
                {packages.map(({ id, price, student_offer, cycle }) => (
                    <li key={id} className='bg-black text-white h-2/3 w-1/5 p-5' >
                        <div className="flex flex-col py-4 h-full justify-between items-center">
                            <div>
                                <div className="text-xl text-center font-bold">
                                    {price + "€/" + cycle}
                                </div>
                                <div className='text-xs text-center'>{student_offer ? "Offre étudiante" : ""}</div>
                            </div>
                            <div className='bg-gray-200 text-black flex flex-row justify-end text-center w-min px-4 py-2 rounded-md cursor-pointer hover:bg-gray-300 ease-in-out duration-300'>
                                <p>Souscrire</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Store;