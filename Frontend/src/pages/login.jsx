import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {

    const [enrollment, setenroll] = useState("")
    const [password, setpassword] = useState("")

    const navigate = useNavigate()

    const handlelogin = async () => {

        try {

            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/login`,
                { enrollment, password },
                { withCredentials: true }
            )

            alert(data.message)

            if (data.role === "admin") {
                navigate("/admin-dashboard")
            } else {
                navigate("/student-dashboard")
            }

            setenroll('')
            setpassword('')

        } catch (error) {

            alert("Login Failed")

        }

    }

    return (
        <div>

            <h1>Login</h1>

            <input
                type="number"
                placeholder='Enter Your Enrollment'
                value={enrollment}
                onChange={(e) => setenroll(e.target.value)}
            />

            <input
                type="password"
                placeholder='Enter Your Password'
                value={password}
                onChange={(e) => setpassword(e.target.value)}
            />

            <button onClick={handlelogin}>Login</button>

        </div>
    )
}

export default Login
