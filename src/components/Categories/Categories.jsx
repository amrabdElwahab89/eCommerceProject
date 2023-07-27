import React, { useEffect, useState } from 'react'
import styles from './Categories.module.css';
import Categoriescss from  './Categories.module.css'






 export default function Categories({name , age} ) {

    const [counter, setcounter] = useState(0)

    useEffect(function () {

        console.log('componenet get update')
    }, [counter])

    return <>

        <h2 className= {Categoriescss. test }> da l rakam : {age } </h2>
        <h2> da l rakam : {name } </h2>
        <button onClick={function () { setcounter(7) }} className='btn btn-danger '> + </button>
       
    </>

}
