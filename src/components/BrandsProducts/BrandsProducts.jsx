import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import { param } from 'jquery'
import { Link, useParams } from 'react-router-dom'


export default function () {

    const { id } = useParams()

    const [BrandsProductss, setBrandsProductss] = useState(null)

    async function getBrandProducts() {

        try {

            const { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/products', { params: { 'brand': id } })
            setBrandsProductss(data.data);

        } catch (error) {
            console.log('error', error);
        }
    }


    useEffect(function () { getBrandProducts() }, []);


    return <>

        {BrandsProductss ? <div className="container">

            <div className="row">
                {BrandsProductss.length == 0 ? <h2>nooooo</h2> : BrandsProductss.map(function (proooo) {
                    return <div className="col-md-3">
                        <Link to={`/ProductsDetails/${proooo.id}`}><div className="items bg-primary text-center">
                            <img className='w-100' src={proooo.imageCover} alt={proooo.subcategory.name} />
                            <h6>{proooo.title}</h6>
                            <h6>{proooo.price}</h6>
                            <h6>{proooo.quantity}</h6>
                        </div></Link>
                    </div>
                })}
            </div>
        </div> : <LoadingScreen />}


    </>
}
