import React from 'react'
import ReactLoading from 'react-loading';
export default function Loading({ type, color }) {
    return (
        <div>
            <ReactLoading type={type} color={color} height={'20rem'} width={'20rem'} />
            {/* <h1>HELLO</h1> */}
        </div>
    )
}
