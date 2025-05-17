import Navbar from '@/components/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

function RootLayout() {

  return (
    <div>
        <Navbar/>
        <div >
            <Outlet/>
        </div>
    </div>
  )
}

export default RootLayout