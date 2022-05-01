import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';


const User = () => {
    let { email } = useParams
    return (
        <>{email}</>
    )

};
export default User;
