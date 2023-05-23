import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function Sliderr() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };



    return <>

        <h2> Single Item</h2>
        <Slider {...settings}>
            <div>
                <img className='w-100 m-auto ' style={{ 'height': '470px' }} src={require('../../Assets/images/slider-image-1.jpeg')} alt="" />
            </div>
            <div>
                <img className='w-100 m-auto ' style={{ 'height': '470px' }} src={require('../../Assets/images/slider-image-2.jpeg')} alt="" />
            </div>
            <div>
                <img className='w-100 m-auto ' style={{ 'height': '470px' }} src={require('../../Assets/images/slider-image-3.jpeg')} alt="" />
            </div>

        </Slider>





    </>
}
