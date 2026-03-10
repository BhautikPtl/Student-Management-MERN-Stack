import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {

    const [enrollment, setenroll] = useState("")
    const [password, setpassword] = useState("")
    const [message, setMessage] = useState("")

    const navigate = useNavigate()

    const handlelogin = async () => {

        try {

            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/login`,
                { enrollment, password },
                { withCredentials: true }
            )
            setMessage(data.message)

            setTimeout(() => {
                setMessage("")
            }, 1000)

            if (data.role === "admin") {
                navigate("/admin-dashboard")
            } else {
                navigate("/student-dashboard")
            }

            setenroll('')
            setpassword('')

        } catch (error) {

           setMessage(error.response.data.message)

            setTimeout(() => {
                setMessage("")
            }, 1000)

        }

    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-200'>

            <div className='bg-white py-6 px-8 rounded shadow-md w-full max-w-md text-center '>
                <h1 className='text-3xl font-bold mb-4'>Login</h1>

                <input
                    type="number"
                    className='border border-gray-300 rounded px-4 py-2 mb-4 w-full max-w-sm app ears-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                    placeholder='Enter Your Enrollment'
                    value={enrollment}
                    onChange={(e) => setenroll(e.target.value)}
                />

                <input
                    type="password"
                    className='border border-gray-300 rounded px-4 py-2 mb-4 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                    placeholder='Enter Your Password'
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                />
                <h3 className='text-red-500 mb-4'>{message}</h3>
                <button onClick={handlelogin} className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer w-full max-w-sm'>
                    Login
                </button>


            </div>
        </div>
    )
}

export default Login
