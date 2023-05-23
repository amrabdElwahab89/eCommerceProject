import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import $ from 'jquery'

export default function ProductDetails() {


    async function addMyProduct(id) {

        if (await addProductToCart(id) == true) {
            $('.successMsg').fadeIn(1000, function () {
                setTimeout(() => {
                    $('.successMsg').fadeOut(1000)
                }, 2000);
            })

            $('#delButton').fadeIn(500)
            $('#addButton').fadeOut(500)
        }
    }

    const { addProductToCart, removeCardItem } = useContext(CartContext)


    const { id } = useParams()


    const [productDetails, setproductDetails] = useState(null)


    async function getProductDetails() {

        try {
            const { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
            setproductDetails(data.data)
        }


        catch (error) {
            console.log('error', error)

        }
    }
    useEffect(function () {
        getProductDetails()
    }, [])


    return <>

        {productDetails ? <div className="container">

            <div className="row">


                <div className="col-md-3">
                    <img className='w-100' src={productDetails.imageCover} alt={productDetails.title} />
                </div>

                <div className="col-md-9">
                    <h6> {productDetails.title} </h6>
                    <h6>{productDetails.description}</h6>
                    <h6> Price : {productDetails.price}</h6>
                    <h6>quantity: {productDetails.quantity}</h6>
                    <button onClick={function () { addMyProduct(productDetails.id) }} className='btn btn-danger w-100' id='addButton'>Add Product to cart</button>
                    <button onClick={function () { removeCardItem(productDetails.id) }} style={{ 'display': 'none' }} className='btn btn-danger w-100' id='delButton'> Remove Product from cart</button>

                    <div style={{ 'display': 'none' }} className="alert alert-success text-center successMsg" > Product Added Successfully </div>


                    {console.log(productDetails)}
                </div>

            </div>
        </div> : <LoadingScreen />}



    </>
}
