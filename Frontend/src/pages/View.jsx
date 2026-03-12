import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';

function View() {

    const {id} = useParams();
    const [user, setUser] = useState([])

    useEffect(()=>{
        const usestudent =async ()=>{
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/view/${id}`,{ withCredentials: true })

            setUser(data.student)
            console.log(student);
            
        }
        usestudent()
    },[id])
    
  return (
    <div>

    </div>
  )
}

export default View
