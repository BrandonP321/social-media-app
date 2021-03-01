import React, { useRef, useEffect } from 'react'
import './index.css'

export default function PreLoader(props) {
    const preloader = useRef()

    // when page is loaded, wait 2s for preloader to fade, then set it's display to none
    useEffect(() => {
        if (props.show === false) {
            preloader.current.classList.add('fade')
            setTimeout(() => {
                preloader.current.classList.add('hide')
            }, 2000)
        }
    }, [props.show])

    return (
        <div ref={preloader} className='preloader'>
            <h2>Vorbi</h2>
            <div className='loading-circles'>
                <div className='circle one'></div>
                <div className='circle two'></div>
                <div className='circle three'></div>
                <div className='circle four'></div>
            </div>
        </div>
    )
}
