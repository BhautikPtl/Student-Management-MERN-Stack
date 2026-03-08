import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children, url }) => {

    const [isauth, setIsauth] = useState(null)


    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/${url}`, { withCredentials: true })
            .then(() => {
                setIsauth(true);
            })
            .catch(() => {
                setIsauth(false);
            });
    }, [url]);


    if (isauth === null) return <h3>loading.....</h3>


    return isauth ? children : <Navigate to="/" />

}

export default PrivateRoute
