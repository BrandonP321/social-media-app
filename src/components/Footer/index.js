import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faUser } from '@fortawesome/free-solid-svg-icons'
import { faHomeLgAlt, faSearch as solidSearch } from '@fortawesome/pro-solid-svg-icons'
import { faSearch } from '@fortawesome/pro-regular-svg-icons'
import API from '../../utils/API'

export default function Footer(props) {
    let history = useHistory();

    const [loggedInUsername, setLoggedInUsername] = useState(null)

    useEffect(() => {
        // get user info by validating their jwt in storage, which returns their username
        API.validateUserLoggedIn()
            .then(response => {
                const username = response.data.username
                setLoggedInUsername(username)
            })
    }, [])

    const handleUserIconClick = () => {
        // if user has been validated and their username is in state, send to profile page
        if (loggedInUsername) {
            history.push('/user/' + loggedInUsername)
        } else {
            // else send user to login page
            history.push('/login')
        }
    }

    return (
        <footer>
            <Link to='/search' aria-label='search' className='footer-nav-link'>
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
