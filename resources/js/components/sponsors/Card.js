import React, { useContext, useLayoutEffect, useState } from 'react';




const Card = ({ id, brand, description, end }) => {




    const getCode = async () => {

        if (document.getElementById('code-' + id).innerHTML == "Obtenir mon code") {
            document.getElementById('code-' + id).innerHTML = ""
            document.getElementById('code-' + id).className = "w-4 h-4 border-y-2 border-white rounded-full animate-spin"
            try {
                let response = await axios.get('/api/code/' + id, {
                    headers: {
                        'Accept': 'application/json'
                    }
                })





                if (response.data.success != 'false') {
                    if (response.data.data) {


                        document.getElementById('code-' + id).innerHTML = response.data.data.code.code
                        document.getElementById('code-' + id).className = ""

                    } else {
                        document.getElementById('code-' + id).innerHTML = "Aucun code disponible"
                        document.getElementById('code-' + id).className = ""

                    }
                } else {
                    document.getElementById('code-' + id).innerHTML = "Aucun code disponible"
                    document.getElementById('code-' + id).className = ""

                }
            } catch (e) {
                console.log(e)
            }
        }
    }

    const initCode = async () => {
        try {
            let response = await axios.get('/api/initCode/' + id, {
                headers: {
                    'Accept': 'application/json'
                }
            })


            if (response.data.success) {
                if (response.data.data) {


                    document.getElementById('code-' + id).innerHTML = response.data.data.code.code
                    document.getElementById('code-' + id).className = ""

                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    initCode()
    return (
        <div className='bg-black-trot text-white p-8 h-96 flex flex-col justify-between rounded-md hover:shadow-xl hover:shadow-orange-300/70 transition duration-150'>
            <div className='flex flex-col justify-center items-center'>
                <div className='text-center text-xl'>{brand}</div>
                <img className='text-center p-2 rounded-[20px]' src='https://picsum.photos/100'></img>
                <div className='mb-4 text-center'>{description}</div>
            </div>
            <div onClick={getCode} className='bg-orange-300 text-white cursor-pointer p-2 rounded-md flex justify-center'><div id={"code-" + id}>Obtenir mon code</div></div>
        </div>
    );
}

export default Card;
