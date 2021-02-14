import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faUser } from '@fortawesome/free-solid-svg-icons'
import { faHomeLgAlt, faSearch as solidSearch } from '@fortawesome/pro-solid-svg-icons'
import { faSearch } from '@fortawesome/pro-regular-svg-icons'

export default function Footer(props) {
    return (
        <footer>
            <Link to='#' aria-label='search' className='footer-nav-link'>
                <FontAwesomeIcon icon={solidSearch} />
            </Link>
            <Link to='/' aria-label='home' className='footer-nav-link'>
                <FontAwesomeIcon icon={faHomeLgAlt} />
            </Link>
            <button aria-label='messages' className='footer-nav-link' onClick={props.handleUserIconClick}>
                <FontAwesomeIcon icon={faUser} />
            </button>
        </footer>
    )
}
