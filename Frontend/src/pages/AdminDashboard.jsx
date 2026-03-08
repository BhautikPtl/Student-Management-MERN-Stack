import axios from 'axios'
import React, { useState, useEffect } from 'react'


function AdminDashboard() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [enrollment, setEnroll] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [student, setStudent] = useState([])

    const fetchStudent = async () => {

        try {

            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/admin-dashboard`,
                { withCredentials: true }
            )

            setStudent(data.students)

        } catch (error) {

            console.log(error)

        }
    }

    useEffect(() => {
        fetchStudent()
    }, [])

    const handleregistar = async () => {

        try {

            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/registar`,
                { name, email, enrollment, password },
                { withCredentials: true }
            )

            setMessage(data.message)

            setTimeout(() => {
                setMessage("")
            }, 1000)

            setName('')
            setEmail('')
            setPassword('')
            setEnroll('')

            fetchStudent() // count update

        }
        catch (error) {

            setMessage(error.response.data.message)

        }

    }

    return (
        <div>

            <h1>Register</h1>

            <input
                type="text"
                placeholder='Enter Your Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="email"
                placeholder='Enter Your Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="number"
                placeholder='Enter Your Enrollment'
                value={enrollment}
                onChange={(e) => setEnroll(e.target.value)}
            />

            <input
                type="password"
                placeholder='Enter Your Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleregistar}>Register</button>

            <h3>{message}</h3>

            <h3>Total Student : {student.length}</h3>

            {student.map((s) => (
                <div key={s._id}>
                    <h1>Name : {s.name}</h1>
                    <h2>Email : {s.email}</h2>
                    <h3>Enrollment : {s.enrollment}</h3>
                </div>
            ))}



        </div>
    )
}

export default AdminDashboard
