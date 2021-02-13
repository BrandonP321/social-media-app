import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faUser } from '@fortawesome/free-solid-svg-icons'
import { faHomeLgAlt } from '@fortawesome/pro-solid-svg-icons'
import { faSearch } from '@fortawesome/pro-regular-svg-icons'
import './index.css'

export default function Header() {
    const searchInput = useRef()
    const searchInputWrapper = useRef()

    const [isFocusedOnSearch, setIsFocusedOnSearch] = useState(false)

    const handleSearchFormSubmit = (e) => {
        e.preventDefault()
    }  

    return (
        <header>
            <div className='header-flex'>
                <div className='flex-item-group'>
                    <Link to='/' className='brand'><h1>Title Goes Here</h1></Link>
                </div>
                <div className='flex-item-group'>
                    <form ref={searchInputWrapper}
                        className={`header-search-wrapper${isFocusedOnSearch ? ' focused' : ''}`}
                        onSubmit={handleSearchFormSubmit}
                    >
                        <input ref={searchInput}
                            className='search-bar'
                            placeholder='search'
                            onFocus={() => setIsFocusedOnSearch(true)}
                            onBlur={() => setIsFocusedOnSearch(false)}
                        />
                        <button className='search-icon-btn'>
                            <FontAwesomeIcon icon={faSearch}/>
                        </button>
                    </form>
                    <div className='search-results-wrapper'></div>
                </div>
                <div className='flex-item-group link-icons'>
                    <Link to='/' aria-label='home' className='nav-link'>
                        <FontAwesomeIcon icon={faHomeLgAlt} />
                    </Link>
                    <Link to='#' aria-label='messages' className='nav-link'>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </Link>
                    <Link to='#' aria-label='messages' className='nav-link'>
                        <FontAwesomeIcon icon={faUser}/>
                    </Link>
                </div>
            </div>
        </header>
    )
}
