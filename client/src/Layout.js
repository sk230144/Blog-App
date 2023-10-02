import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './footer/Footer'
import Foot from './Foot'

const Layout = () => {
  return (
  <main>
    <Header/>
    <Outlet/>
    <Foot/>
 </main>
  )
}

export default Layout
