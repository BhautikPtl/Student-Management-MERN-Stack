import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function AdminDashboard() {
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [enrollment, setEnroll] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [student, setStudent] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

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

    const handledelete = async (id) => {

        try {
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/delete-student/${id}`,
                { withCredentials: true }
            )
            fetchStudent()
            setMessage("Student deleted successfully")
            setTimeout(() => {
                setMessage("")
            }, 1000)

        }
        catch (error) {
            setMessage(error.response.data.message)
        }

    }

    const handleview = async (id)=>{
        try {
            navigate(`/view/${id}`)
        } catch (error) {
            setMessage(error)
        }
    }

    return (
        <div className='relative min-h-screen overflow-hidden bg-[url("/university-logo-bg.svg")] bg-cover bg-center bg-no-repeat p-4 md:p-8'>
           

            {message && (
                <div className='absolute right-4 top-4 z-50 md:right-8 md:top-8 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 ring-1 ring-red-200 shadow'>
                    <p className='rounded-lg px-3 py-2 text-md font-medium text-red-600 '>
                        {message}
                    </p>
                </div>
            )}

            <div className='relative mx-auto w-full max-w-6xl'>
                <div className='mb-6 flex flex-col items-start justify-between gap-4 rounded-3xl bg-gradient-to-r from-sky-600 to-blue-700 px-6 py-5 text-white shadow-2xl shadow-blue-300/60 md:flex-row md:items-center'>
                    <div>
                        <h1 className='text-2xl font-black tracking-tight md:text-3xl'>Admin Dashboard</h1>
                        <p className='mt-1 text-sm text-blue-100'>Manage student records with a clean and modern control panel.</p>
                    </div>
                    <button onClick={handlelogout} className='rounded-xl bg-white px-4 py-2 font-semibold text-blue-700 shadow transition duration-300 hover:-translate-y-0.5 hover:bg-slate-100'>
                        Logout
                    </button>
                </div>

                <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 justify-content flex items-center gap-4 rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xl backdrop-blur'>
                    <div className='flex flex-col gap-2'>
                        <p className='text-xs font-semibold uppercase tracking-wider text-slate-500'>Total Students</p>
                        <h2 className='mt-2 text-3xl font-black text-blue-700'>{student.length}</h2>
                    </div>
                </div>

                <div className='grid grid-cols-1 gap-6 xl:grid-cols-12'>
                    <div className='rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xl backdrop-blur xl:col-span-5'>
                        <h2 className='mb-4 text-lg font-bold text-slate-800'>Register New Student</h2>
                        <div className='grid grid-cols-1 gap-3'>
                            <input
                                type="text"
                                className='w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100'
                                placeholder='Enter Your Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <input
                                type="email"
                                className='w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100'
                                placeholder='Enter Your Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <input
                                type="number"
                                className='w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100'
                                placeholder='Enter Your Enrollment'
                                value={enrollment}
                                onChange={(e) => setEnroll(e.target.value)}
                            />

                            <input
                                type="password"
                                className='w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100'
                                placeholder='Enter Your Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className='mt-4 space-y-3'>
                            <button onClick={handleregistar} className='w-full rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-200 hover:from-sky-600 hover:to-blue-700'>
                                Register
                            </button>

                        </div>
                    </div>

                    <div className='rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xl backdrop-blur xl:col-span-7'>
                        <input type="text"
                            className='mb-4 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 shadow-sm transition placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100'
                            placeholder='Search Student by Name'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} />


                        <div>
                            {student.filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((s) => (
                                <div key={s._id} className='mb-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm md:grid md:grid-cols-[1fr_1fr_1fr_auto] md:items-center md:gap-3 '>
                                    <h1 className='text-sm font-bold text-slate-800 md:text-base'>
                                        <span className='md:hidden'>Name: </span>
                                        <span className='font-medium text-slate-600'>{s.name}</span>
                                    </h1>
                                    <h2 className='mt-2 text-sm font-semibold text-slate-700 md:mt-0'>
                                        <span className='md:hidden'>Email: </span>
                                        <span className='font-medium text-slate-600'>{s.email}</span>
                                    </h2>
                                    <h3 className='mt-2 text-sm font-semibold text-slate-700 md:mt-0'>
                                        <span className='md:hidden'>Enrollment: </span>
                                        <span className='font-medium text-slate-600'>{s.enrollment}</span>
                                    </h3>
                                    <button className='mt-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow transition duration-300 hover:bg-red-700 md:mt-0 md:justify-self-end cursor:pointer'
                                        onClick={() => handledelete(s._id)}>
                                        Delete
                                    </button>
                                    <button className='mt-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow transition duration-300 hover:bg-red-700 md:mt-0 md:justify-self-end cursor:pointer'
                                    onClick={()=> handleview(s._id)}>
                                        View Details
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
