import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../Assets/images/freshcart-logo.svg'
import Profile from '../Profile/Profile';



export default function Navbar({ crrUser, clearUserData }) {



    const navigate = useNavigate()

    function logoutUser() {

        clearUserData();
        navigate('/Login');
    }


    return <>
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="" />
                </Link>
                <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav me-auto mt-2 mt-lg-0">

                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/Cart">Cart</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/products">Products</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/categories">Categories</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/brands">Brands</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/AllOrders">All Orders</Link>
                        </li>

                    </ul>

                </div>

                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav ms-auto mt-2 mt-lg-0">

                        {crrUser ? <>
                            <li className="nav-item">
                                <Link className="nav-link" to="Profile">Profile</Link>
                            </li>

                            <li className="nav-item">
                                <span onClick={logoutUser} className="nav-link"> Log out </span>
                            </li>

                        </> : <><li className="nav-item">
                            <Link className="nav-link" to="Login">Log in</Link>
                        </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="Register">Register</Link>
                            </li>

                        </>}

                        <li className="nav-item d-flex align-items-center">
                            <i className='fab fa-facebook mx-1'></i>
                            <i className='fab fa-instagram mx-1'></i>
                            <i className='fab fa-twitter mx-1'></i>
                            <i className='fab fa-youtube mx-1'></i>

                        </li>

                    </ul>

                </div>
            </div>
        </nav>


    </>

}