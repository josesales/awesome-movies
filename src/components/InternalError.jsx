import React from 'react'
import ErrorImg from '../assets/error.png'


const InternalError = () => {

    return (
        <div className="internal-error">
            <h1 className="section-title">Ooops!!!</h1>
            <span className="section-span">Something went wrong. Please try again later!</span>
            <img src={ErrorImg} alt="Error" className="internal-error__img" />
        </div>
    );
}

export default InternalError;