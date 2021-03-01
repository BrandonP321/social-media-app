import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faUser } from '@fortawesome/free-solid-svg-icons'
import { faHomeLgAlt, faSearch as solidSearch } from '@fortawesome/pro-solid-svg-icons'
import API from '../../utils/API'

export default function Footer(props) {
    let history = useHistory();

    // usernames to be used for checking when user is trying to leave one profile page to visit another
    const [profilePageUsername, setProfilePageUsername] = useState()

    const [loggedInUsername, setLoggedInUsername] = useState(null)

    useEffect(() => {
        // get user info by validating their jwt in storage, which returns their username
        API.validateUserLoggedIn()
            .then(response => {
                const username = response.data.username
                setLoggedInUsername(username)
            })
    }, [])

    return (
        <footer>
            <Link to='/search' aria-label='search' className='footer-nav-link'>
                <FontAwesomeIcon icon={solidSearch} />
            </Link>
            <Link to='/' aria-label='home' className='footer-nav-link'>
                <FontAwesomeIcon icon={faHomeLgAlt} />
            </Link>
            <Link
                aria-label='Profile page'
                className='footer-nav-link'
                to={loggedInUsername ? `/user/${loggedInUsername}` : '/login'}>
                <FontAwesomeIcon icon={faUser} />
            </Link>
        </footer>
    )
}
