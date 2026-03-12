import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';

function View() {

    const {id} = useParams();
    const [user, setUser] = useState(null)

    useEffect(()=>{
        const usestudent =async ()=>{
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/view/${id}`,{ withCredentials: true })

            setUser(data.student)
            
        }
        usestudent()
    },[id])
    
    return (
        <div className='relative min-h-screen overflow-hidden bg-[url("/university-logo-bg.svg")] bg-cover bg-center bg-no-repeat p-4 md:p-8'>
            <div className='pointer-events-none absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]' />

            <div className='relative mx-auto w-full max-w-4xl'>
                <div className='mb-6 rounded-3xl bg-gradient-to-r from-sky-600 to-blue-700 px-6 py-5 text-white shadow-2xl shadow-blue-300/50'>
                    <h1 className='text-2xl font-black tracking-tight md:text-3xl'>Student Details</h1>
                    <p className='mt-1 text-sm text-blue-100'>Profile information for the selected student.</p>
                </div>

                {user ? (
                    <div className='rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-xl backdrop-blur'>
                        <div className='mb-6 flex items-center gap-4'>
                            <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-2xl font-black text-blue-700'>
                                {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
                            </div>
                            <div>
                                <h2 className='text-xl font-black text-slate-800'>{user.name}</h2>
                                <p className='text-sm text-slate-500'>Enrolled Student</p>
                            </div>
                        </div>

                        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                            <div className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'>
                                <p className='text-xs font-semibold uppercase tracking-wider text-slate-500'>Name</p>
                                <h3 className='mt-2 text-base font-bold text-slate-700'>{user.name}</h3>
                            </div>

                            <div className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'>
                                <p className='text-xs font-semibold uppercase tracking-wider text-slate-500'>Email</p>
                                <h3 className='mt-2 break-all text-base font-bold text-slate-700'>{user.email}</h3>
                            </div>

                            <div className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'>
                                <p className='text-xs font-semibold uppercase tracking-wider text-slate-500'>Enrollment</p>
                                <h3 className='mt-2 text-base font-bold text-slate-700'>{user.enrollment}</h3>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='rounded-3xl border border-slate-200/80 bg-white/95 p-8 text-center shadow-xl backdrop-blur'>
                        <p className='text-sm font-medium text-slate-600'>Loading student details...</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default View
