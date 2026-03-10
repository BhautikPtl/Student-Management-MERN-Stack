import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function StudentDashboard() {
    const navigate = useNavigate()
     
    const [student, setStudent] = useState([])

    useEffect(() => {

    const fetchStudent = async () => {

        try {

            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/student-dashboard`,
                { withCredentials: true }
            )
            setStudent(data.student)

        } catch (error) {

            console.log(error)

        }
    }
    fetchStudent()
}, [])
 const handlelogout = async () => {
    try {

        await axios.get(
            `${import.meta.env.VITE_API_URL}/logout`,
            { withCredentials: true }
        )

      
        navigate("/")

    } catch (error) {

        console.log(error)
        

    }
}

    return (
        <div className='container'>
            <div className='bg-blue-600 py-4 px-4 m-4 rounded shadow-md text-center text-white flex justify-between items-center'> 
                <h1 className='text-3xl'>Student Dashboard</h1>
                <button onClick={handlelogout} className='bg-white text-blue-600 py-2 px-4 rounded hover:bg-gray-200 cursor-pointer'>
                    Logout
                </button>
            </div>
            <div className='bg-gray-200 py-4 px-4 m-4 rounded shadow-md flex  gap-2'>
                <label htmlFor='name' >Student Name : </label>
                <h3 id='name'>{student.name}</h3>
            </div>

             <div className='bg-gray-200 py-4 px-4 m-4 rounded shadow-md  flex  gap-2'>
                <label htmlFor='enrollment'>Student Enrollment Number : </label>
                <h3 id='enrollment'>{student.enrollment}</h3>
            </div>

             <div className='bg-gray-200 py-4 px-4 m-4 rounded shadow-md flex  gap-2'>
                <label htmlFor='email'>Student Email : </label>
                <h3 id='email'>{student.email}</h3>
            </div>
        </div>
    )
}

export default StudentDashboard
