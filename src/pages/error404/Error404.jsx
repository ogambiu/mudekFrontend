import React from 'react'
import { Link } from 'react-router-dom'
import "./error.css"

function Error404() {
    return (
        <div className="d-flex align-items-center justify-content-center error-page text-white">
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3"> <span className="text-danger">Hata!</span> Sayfa Bulunamadı.</p>
                <Link to="/" className='btn btn-dark'>Ana Sayfaya Dön</Link>
            </div>
        </div>
    )
}

export default Error404