import React from 'react'
import styles from './Footer.module.css';
export default function Footer() {
    return <>
        <footer>
            <h6>get the Fresh Cart App</h6>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing.</p>

            <div className='container d-flex justify-content-between'>
                <input type="text" placeholder='Enter your Email' className='form-control w-75' />
                <button className='btn btn-danger' >Enter your Email</button>
            </div>

            <div className="container border-bottom border-top border-2 border-dark my-5 py-2 d-flex justify-content-between">

                <div className="leftside">
                    <ul className='list-unstyled d-flex align-items-center '>
                        <li><h6 className='me-3 my-1'> Msh Fakr Maktob Eh</h6></li>
                        <li><i className="fa-brands fa-cc-paypal me-3 text-primary"></i></li>
                        <li><i className="fa-brands fa-cc-mastercard me-3 text-primary"></i></li>
                        <li><i className="fa-brands fa-cc-mastercard me-3 text-primary"></i></li>
                    </ul>

                </div>
                <div className="rightside d-flex align-items-center ">
                    <h6> get Delivery with ay 7aga</h6>
                    <button className='btn btn-dark mx-2'>
                        <i className="fa-brands fa-apple"></i>
                        <span>Avilable on app store</span> </button>

                    <button className='btn btn-dark'>
                        <i className="fa-brands fa-apple"></i>
                        <span>Avilable on app store</span> </button>
                </div>
            </div>
        </footer>

    </>

}
