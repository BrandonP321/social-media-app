import React, { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faSpinnerThird } from '@fortawesome/pro-solid-svg-icons'
import './index.css'
import API from '../../utils/API'

export default function Search() {
    let history = useHistory();

    const [query, setQuery] = useState();
    const [isLoading, setIsLoading] = useState(false)
    const [results, setResults] = useState(null)

    const handleInputChange = e => {
        // update state with new query from input element
        const value = e.target.value
        setQuery(value)
    }

    const search = useCallback((e) => {
        e.preventDefault();
        setIsLoading(true)

        // send search query to server to search for users
        API.getSearchResults(query).
            then(response => {
                // update state with new users
                setResults(response.data)
                console.log(response.data)
            }).
            catch(err => {
                console.log(err.response)
            }).
            finally(() => {
                setIsLoading(false)
            })
    }, [query])

    return (
        <>
            <Header />
            <div className='content-header-footer-offset'>
                <div className='content-main-responsive search-page'>
                    <form className='search-form' onSubmit={search}>
                        <input
                            className='dark-input'
                            type='text'
                            name='user'
                            placeholder='Search'
                            value={query}
                            onChange={handleInputChange} />
                        <FontAwesomeIcon
                            icon={faSearch}
                            className='search-icon'
                            onClick={search} />
                    </form>
                    <div className='results'>
                        {results ?
                            results.map(user => {
                                return (
                                    <div className='user'>
                                        <div 
                                            className='profile-img'
                                            onClick={() => history.push(`/user/${user.username}`)}>
                                            <img 
                                                src={user.profilePicture || 'https://i.imgur.com/dCc7ake.png'}
                                                alt='profile picture' />
                                        </div>
                                        <p 
                                            className='username'
                                            onClick={() => history.push(`/user/${user.username}`)}>{user.username}</p>
                                    </div>
                                )
                            }) : isLoading ?
                                <FontAwesomeIcon
                                    icon={faSpinnerThird}
                                    className='results-spinner' /> : ''}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
