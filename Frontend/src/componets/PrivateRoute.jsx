import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

const PrivateRoute = ({ children, url }) => {

    const [isauth, setIsauth] = useState(null)
    const params = useParams()

    useEffect(() => {

        let finalUrl = url
        if (params.id) {
            finalUrl = url.replace(":id", params.id)
        }

        axios
            .get(`${import.meta.env.VITE_API_URL}/${finalUrl}`, { withCredentials: true })
            .then(() => setIsauth(true))
            .catch(() => setIsauth(false))

    }, [url, params])


    if (isauth === null) return <h3>loading.....</h3>

    return isauth ? children : <Navigate to="/" />

}

export default PrivateRoute
