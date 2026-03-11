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
        <div className='relative min-h-screen overflow-hidden bg-[url("/university-logo-bg.svg")] bg-cover bg-center bg-no-repeat p-4 md:p-8'>
            <div className='pointer-events-none absolute inset-0 bg-white/55 backdrop-blur-[1px]' />

            <div className='relative mx-auto w-full max-w-5xl'>
                <div className='mb-6 flex flex-col items-start justify-between gap-3 rounded-3xl bg-gradient-to-r from-sky-600 to-blue-700 px-6 py-5 text-white shadow-2xl shadow-blue-200/70 md:flex-row md:items-center'>
                    <div>
                        <h1 className='text-2xl font-black tracking-tight md:text-3xl'>Student Dashboard</h1>
                        <p className='mt-1 text-sm text-blue-100'>Your academic profile at a glance.</p>
                    </div>
                    <button onClick={handlelogout} className='rounded-xl bg-white px-4 py-2 font-semibold text-blue-700 shadow transition duration-300 hover:-translate-y-0.5 hover:bg-slate-100'>
                        Logout
                    </button>
                </div>

                <div className='mb-6 rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xl backdrop-blur'>
                    <div className='flex items-center gap-4'>
                        <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-2xl font-black text-blue-700'>
                            {student?.name ? student.name.charAt(0).toUpperCase() : 'S'}
                        </div>
                        <div>
                            <h2 className='text-xl font-black text-slate-800'>{student.name || 'Student Name'}</h2>
                            <p className='text-sm text-slate-500'>{student.email || 'student@email.com'}</p>
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                    <div className='rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-md backdrop-blur'>
                        <p className='text-xs font-semibold uppercase tracking-wider text-slate-500'>Student Name</p>
                        <h3 id='name' className='mt-2 text-base font-bold text-slate-700'>{student.name}</h3>
                    </div>

                    <div className='rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-md backdrop-blur'>
                        <p className='text-xs font-semibold uppercase tracking-wider text-slate-500'>Enrollment Number</p>
                        <h3 id='enrollment' className='mt-2 text-base font-bold text-slate-700'>{student.enrollment}</h3>
                    </div>

                    <div className='rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-md backdrop-blur'>
                        <p className='text-xs font-semibold uppercase tracking-wider text-slate-500'>Email Address</p>
                        <h3 id='email' className='mt-2 break-all text-base font-bold text-slate-700'>{student.email}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentDashboard
