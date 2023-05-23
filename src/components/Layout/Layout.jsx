import React from 'react'

import styles from './Layout.module.css';
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';



export default function Layout( {crrUser , clearUserData}) {
    return <>
        <Navbar  clearUserData = {clearUserData} crrUser={crrUser}/>
        <div className="container">
            <Outlet></Outlet>
        </div>
        <Footer />
    </>

}
