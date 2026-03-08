import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'


function StudentDashboard() {
     
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

    return (
        <div>
            <div>
                <label htmlFor='name'>Student Name : </label>
                <h3 id='name'>{student.name}</h3>
            </div>

             <div>
                <label htmlFor='enrollment'>Student Enrollment Number : </label>
                <h3 id='enrollment'>{student.enrollment}</h3>
            </div>

             <div>
                <label htmlFor='email'>Student Email : </label>
                <h3 id='email'>{student.email}</h3>
            </div>
        </div>
    )
}

export default StudentDashboard
