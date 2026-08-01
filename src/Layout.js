import React from 'react';
import { Outlet } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import './css/Common.css'



function Layout() {
  return (
    <div className="wrapper">
    <div id="snackbar"></div>
    <Header />
    <main className="">
      <Outlet />
    </main>


    <footer className="">
      <Footer />
    </footer>
  </div>
  )
}

export default Layout;