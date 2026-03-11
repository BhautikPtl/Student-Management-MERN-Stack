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
        <div className='relative flex min-h-screen items-center justify-center overflow-hidden bg-[url("/university-logo-bg.svg")] bg-cover bg-center bg-no-repeat px-4 py-8'>
            <div className='absolute inset-0 bg-slate-900/45 backdrop-blur-[2px]' />

            <div className='relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/30 bg-white/10 shadow-2xl backdrop-blur-md'>
                <div className='grid grid-cols-1 lg:grid-cols-2'>
                    <div className='hidden flex-col justify-between bg-gradient-to-br from-sky-500/85 via-blue-600/85 to-cyan-500/85 p-10 text-white lg:flex'>
                        <div>
                            <span className='inline-flex rounded-full border border-white/40 bg-white/15 px-3 py-1 text-xs font-semibold tracking-[0.2em] uppercase'>Student Portal</span>
                            <h2 className='mt-6 text-4xl font-black leading-tight'>Welcome Back</h2>
                            <p className='mt-3 max-w-sm text-sm text-blue-50'>Manage students, monitor records, and stay in control with a clean dashboard experience.</p>
                        </div>
                        <p className='text-xs text-blue-100/90'>Secure access for admins and students</p>
                    </div>

                    <div className='bg-white/95 px-6 py-10 sm:px-10'>
                        <div className='mx-auto w-full max-w-md text-center'>
                <h1 className='mb-2 text-3xl font-extrabold tracking-tight text-slate-800'>Login</h1>
                <p className='mb-6 text-sm text-slate-500'>Enter your enrollment and password to continue.</p>

                <input
                    type="number"
                    className='mb-4 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 shadow-sm transition placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100'
                    placeholder='Enter Your Enrollment'
                    value={enrollment}
                    onChange={(e) => setenroll(e.target.value)}
                />

                <input
                    type="password"
                    className='mb-4 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 shadow-sm transition placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100'
                    placeholder='Enter Your Password'
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                />
                <div className='mb-4 min-h-12'>
                    <div className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-all duration-300 ${message ? 'border-red-200 bg-red-50 text-red-600 opacity-100 translate-y-0 motion-safe:animate-pulse' : 'border-transparent bg-transparent text-transparent opacity-0 -translate-y-1'}`}>
                        <svg viewBox='0 0 24 24' className='h-4 w-4 shrink-0' fill='currentColor' aria-hidden='true'>
                            <path d='M12 2a10 10 0 100 20 10 10 0 000-20zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z' />
                        </svg>
                        <span>{message}</span>
                    </div>
                </div>
                <button onClick={handlelogin} className='w-full rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-200 hover:from-sky-600 hover:to-blue-700'>
                    Login
                </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
