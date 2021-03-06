import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinnerThird } from '@fortawesome/pro-solid-svg-icons'
import './index.css'

export default function HeaderSearchResults(props) {
    let history = useHistory();

    return (
        <div className={`header-search-results-wrapper${props.show ? '' : ' hide'}`}>
            <FontAwesomeIcon 
                icon={faSpinnerThird} 
                className={`search-results-spinner${props.isLoading ? '' : ' hide'}`}/>
            {props.results.map(user => {
                return (
                    <div className='search-result'>
                        <div className='profile-img'>
                            <img
                                src={user.profilePicture || 'https://i.imgur.com/dCc7ake.png'}
                                alt='user profile picture'
                                onClick={() => history.push('/user/' + user.username)}/>
                        </div>
                        <p 
                            className='username'
                            onClick={() => history.push('/user/' + user.username)}
                            >{user.username}</p>
                    </div>
                )
            })}
        </div>
    )
}
