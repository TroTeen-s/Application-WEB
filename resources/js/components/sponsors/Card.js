import React from 'react';



const Card = ({ id, brand, description, end }) => {

    const getCode = async (id) => {
        try {
            let response = await axios.get('/api/code/?id=' + id, {
                headers: {
                    'Accept': 'application/json'
                }
            })

            if (response.data.data) {
                console.log(response)


            }
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div className='bg-black-trot text-white p-8 h-96 flex flex-col justify-between rounded-md hover:shadow-xl hover:shadow-orange-300/70 transition duration-150'>
            <div className='flex flex-col justify-center items-center'>
                <div className='text-center text-xl'>{brand}</div>
                <img className='text-center p-2 rounded-[20px]' src='https://picsum.photos/100'></img>
                <div className='mb-4 text-center'>{description}</div>
            </div>
            <div onClick={getCode} id={"code-" + id} className='bg-orange-300 text-white cursor-pointer p-2 rounded-md text-center'>Obtenir mon code</div>
        </div>
    );
}

export default Card;
