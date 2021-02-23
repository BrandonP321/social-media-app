import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faUser } from '@fortawesome/free-solid-svg-icons'
import { faHomeLgAlt, faSearch as solidSearch } from '@fortawesome/pro-solid-svg-icons'
import { faSearch } from '@fortawesome/pro-regular-svg-icons'

export default function Footer(props) {
    let history = useHistory();

    const handleUserIconClick = () => {
        // check for jwt in local storage, indicating user is logged in
        const token = localStorage.getItem('token')
        // if there is a token, send user to their profile page
        if (token) {
            // have server validate token
        } else {
            // else send user to login page
            history.push('/login')
        }
    }

    return (
        <footer>
            <Link to='#' aria-label='search' className='footer-nav-link'>
                <FontAwesomeIcon icon={solidSearch} />
            </Link>
            <Link to='/' aria-label='home' className='footer-nav-link'>
                <FontAwesomeIcon icon={faHomeLgAlt} />
            </Link>
            <button aria-label='messages' className='footer-nav-link' onClick={handleUserIconClick}>
                <FontAwesomeIcon icon={faUser} />
            </button>
        </footer>
    )
}
