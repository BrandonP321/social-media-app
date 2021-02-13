import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
// import { faHomeLgAlt } from '@fortawesome/pro-solid-svg-icons'
import { faHeart as lightHeart } from '@fortawesome/pro-regular-svg-icons'
import './index.css'
import API from '../../utils/API'

export default function PostCard(props) {
    const [postIsLiked, setPostIsLiked] = useState(props.post.userHasLiked)
    const isUpdatingLikeStatus = useRef(false)

    // update status for post being liked by user when user clicks like button
    const handleLikeBtnClick = useCallback((e) => {
        // if status is currently being updated on server, don't allow user to change status now
        if (isUpdatingLikeStatus.current) return

        // send new status to server
        // API.updatePostLikeStatus(props.post.id, postIsLiked)
        //     .then(response => {
        //         console.log(response)
        //     })

        // update state to new status
        setPostIsLiked(!postIsLiked)
    }, [postIsLiked])

    return (
        <div className='post-card'>
            <div className='user-info'>
                <div className='profile-img-wrapper'>
                    <img src={props.user.profileImg} alt='User profile picture' />
                </div>
                <Link to='#' className='username'>{props.user.username}</Link>
            </div>
            <div className='post-content'>
                <div className='post-img-wrapper'>
                    <img src={props.post.src} alt='post image' />
                </div>
                <div className='post-details'>
                    <div className='likes-wrapper'>
                        <FontAwesomeIcon 
                            icon={postIsLiked ? solidHeart : lightHeart} 
                            className={`heart-icon${postIsLiked ? ' liked' : ''}`} 
                            onClick={() => handleLikeBtnClick(props.post.id)}
                        />
                        <p className='likes-number'>{props.post.likes}</p>
                    </div>
                    <div className='caption-wrapper'>
                        {props.post.caption}
                    </div>
                </div>
            </div>
        </div>
    )
}
