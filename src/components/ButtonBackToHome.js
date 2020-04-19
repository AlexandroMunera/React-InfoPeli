import React from 'react'
import { Link } from 'react-router-dom'

export default function ButtonBackToHome() {
    return (
        <Link to='/' className='button is-info'>
            Volver a la portada
        </Link>
    )
}
