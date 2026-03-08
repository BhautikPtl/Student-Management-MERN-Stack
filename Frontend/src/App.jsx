import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./pages/login"
import PrivateRoute from './componets/PrivateRoute'
import AdminDashboard from './pages/AdminDashboard'
import StudentDashboard from './pages/StudentDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Login />} />

        <Route
          path='/admin-dashboard'
          element={
            <PrivateRoute url={"admin-dashboard"}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path='/student-dashboard'
          element={
            <PrivateRoute url={"student-dashboard"}>
              <StudentDashboard />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App
