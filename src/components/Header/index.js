import React, { useEffect, useRef, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faUser } from '@fortawesome/free-solid-svg-icons'
import { faHomeLgAlt, faSearch as solidSearch } from '@fortawesome/pro-solid-svg-icons'
import { faSearch } from '@fortawesome/pro-regular-svg-icons'
import API from '../../utils/API'
import './index.css'

export default function Header(props) {
    let history = useHistory();
    let location = useLocation();

    const searchInput = useRef()
    const searchInputWrapper = useRef()

    const [isFocusedOnSearch, setIsFocusedOnSearch] = useState(false)

    const handleSearchFormSubmit = (e) => {
        e.preventDefault()
    }

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

    useEffect(() => {
        // on page load, validate that user is logged in
        API.validateUserLoggedIn()
            .then(response => {
                // if response is false, no token was found in storage so redirect to login
                if (!response) {
                    return history.push('/login')
                } else {
                    // else send user info to handler function for page if function exists
                    if (props.handleTokenInfo) {
                        props.handleTokenInfo(response.data)
                    }
                }
            })
            .catch(err => {
                // if token could not be validated, send user to login page
                history.push('/login')
            })
    }, [])

    return (
        <header>
            <div className='header-flex'>
                <div className='flex-item-group'>
                    <Link to='/' className='brand'><h1>Title</h1></Link>
                </div>
                <div className={`flex-item-group search${props.isLoginPage ? ' hide' : ''}`}>
                    <form ref={searchInputWrapper}
                        className={`header-search-wrapper${isFocusedOnSearch ? ' focused' : ''}`}
                        onSubmit={handleSearchFormSubmit}
                    >
                        <input ref={searchInput}
                            className='search-bar'
                            placeholder='search'
                            aria-label='search bar'
                            onFocus={() => setIsFocusedOnSearch(true)}
                            onBlur={() => setIsFocusedOnSearch(false)}
                        />
                        <button className='search-icon-btn' aria-label='search'>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </form>
                    <div className='search-results-wrapper'></div>
                </div>
                <div className={`flex-item-group link-icons${props.isLoginPage ? ' hide' : ''}`}>
                    <Link to='#' aria-label='search' className='nav-link search'>
                        <FontAwesomeIcon icon={solidSearch} />
                    </Link>
                    <Link to='/' aria-label='home' className='nav-link'>
                        <FontAwesomeIcon icon={faHomeLgAlt} />
                    </Link>
                    <Link to='#' aria-label='messages' className='nav-link messages'>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </Link>
                    <button aria-label='messages' className='nav-link' onClick={handleUserIconClick}>
                        <FontAwesomeIcon icon={faUser} />
                    </button>
                </div>
            </div>
        </header>
    )
}
