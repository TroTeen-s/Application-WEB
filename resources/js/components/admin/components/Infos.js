import React, { useContext, useEffect, useState } from 'react';

const Infos = (items) => {

    console.log(items)

    return (
        <div className='text-white pl-4'>
            <p className='text-2xl text-orange-300 underline'>{items.label}</p>
            <p className='p-2 text-lg'>{items.info}</p>
        </div>
    )

}
export default Infos;