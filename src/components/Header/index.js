import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faUser } from '@fortawesome/free-solid-svg-icons'
import { faHomeLgAlt, faSearch as solidSearch } from '@fortawesome/pro-solid-svg-icons'
import { faSearch } from '@fortawesome/pro-regular-svg-icons'
import API from '../../utils/API'
import './index.css'
import HeaderSearchResults from '../HeaderSearchResults'

export default function Header(props) {
    let history = useHistory();
    let location = useLocation();

    const searchInput = useRef()
    const searchInputWrapper = useRef()
    const searchInputAndResultsWrapper = useRef();

    const [isFocusedOnSearch, setIsFocusedOnSearch] = useState(false)

    const [searchResults, setSearchResults] = useState([])
    const [showSearchResults, setShowSearchResults] = useState(false)
    const [isGettingSearchResults, setIsGettingSearchResults] = useState(false)

    const [loggedInUsername, setLoggedInUsername] = useState(null)

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
                    // update state with user's username
                    setLoggedInUsername(response.data.username)
                }
            })
            .catch(err => {
                // if token could not be validated, send user to login page
                history.push('/login')
            })

        // create click event listener to hide results when user click off of results ele
        document.addEventListener('click', e => {
            const target = e.target

            // if target isn't part of search bar/results, update state to hide search results
            if (searchInputAndResultsWrapper.current && !searchInputAndResultsWrapper.current.contains(target)) {
                setShowSearchResults(false)
            }
        })
    }, [])

    const handleSearchFormSubmit = (e) => {
        e.preventDefault()

        const query = searchInput.current.value;

        // update state to show loading spinner while getting results
        setIsGettingSearchResults(true)
        setShowSearchResults(true);

        // get results from server
        API.getSearchResults(query).
            then(response => {
                console.log(response)
                // update state with search results
                setSearchResults(response.data)
            }).
            catch(err => {
                console.log(err.response)
            }).
            finally(() => {
                setIsGettingSearchResults(false)
            })
    }

    const handleUserIconClick = useCallback(() => {
        // if user has been validated and their username is in state, send to profile page
        if (loggedInUsername) {
            history.push('/user/' + loggedInUsername)
        } else {
            // else send user to login page
            history.push('/login')
        }
    }, [loggedInUsername])

    return (
        <header>
            <div className='header-flex'>
                <div className='flex-item-group'>
                    <Link to='/' className='brand'><h1>Title</h1></Link>
                </div>
                <div 
                    className={`flex-item-group search${props.isLoginPage ? ' hide' : ''}`}
                    ref={searchInputAndResultsWrapper}>
                    <form ref={searchInputWrapper}
                        className={`header-search-wrapper${isFocusedOnSearch ? ' focused' : ''}${showSearchResults ? ' hide-bottom-border' : ''}`}
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
                    <HeaderSearchResults
                        results={searchResults}
                        show={showSearchResults}
                        setShow={setShowSearchResults}
                        isLoading={isGettingSearchResults} />
                </div>
                <div className={`flex-item-group link-icons${props.isLoginPage ? ' hide' : ''}`}>
                    <Link to='#' aria-label='search' className='nav-link search'>
                        <FontAwesomeIcon icon={solidSearch} />
                    </Link>
                    <Link to='/' aria-label='home' className='nav-link'>
                        <FontAwesomeIcon icon={faHomeLgAlt} />
                    </Link>
                    {/* <Link to='#' aria-label='messages' className='nav-link messages'>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </Link> */}
                    <button aria-label='profile page' className='nav-link' onClick={handleUserIconClick}>
                        <FontAwesomeIcon icon={faUser} />
                    </button>
                </div>
            </div>
        </header>
    )
}
