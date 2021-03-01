import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
// import { faHomeLgAlt } from '@fortawesome/pro-solid-svg-icons'
import { faHeart as lightHeart } from '@fortawesome/pro-regular-svg-icons'
import './index.css'
import API from '../../utils/API'

export default function PostCard(props) {
    let history = useHistory();

    const [postIsLiked, setPostIsLiked] = useState(props.post.hasLiked)
    const [numberOfLikes, setNumberOfLikes] = useState(props.post.likedBy.length || 0)
    const [userIsCreator, setUserIsCreator] = useState(false)
    const isUpdatingLikeStatus = useRef(false)

    useEffect(() => {
        // when logged in user state is updated, update state
        setUserIsCreator(props.loggedInUser && props.loggedInUser.id === props.user._id)
    }, [props.loggedInUser])

    // update status for post being liked by user when user clicks like button
    const handleLikeBtnClick = useCallback((e) => {
        // if status is currently being updated on server, don't allow user to change status now
        if (isUpdatingLikeStatus.current) return

        // update like status in state
        setPostIsLiked(!postIsLiked)
        isUpdatingLikeStatus.current = true

        // if user is liking a post, notify server
        if (!postIsLiked) {
            // increment number of likes on page
            setNumberOfLikes(numberOfLikes + 1)

            API.likePost(props.post._id).
                then(response => {
                    console.log(response)
                }).
                catch(err => {
                    console.log(err.response)
                    if (err.response && err.response.status) {
                        switch (err.response.status) {
                            case 500:
                                // 500: error occurred with mongoose while updating
                                // set like status to it's previous
                                setPostIsLiked(!postIsLiked)
                                break;
                            case 401:
                            case 403:
                                // token was no longer valid, send user to login page
                                alert('Your session has timed out')
                                history.push('/login')
                                break
                        }
                    }
                }).
                finally(() => {
                    // allow user to change like status again
                    isUpdatingLikeStatus.current = false
                })
        } else {
            // else tell server to unlike the post

            // decrement number of likes on page
            setNumberOfLikes(numberOfLikes - 1)

            API.unlikePost(props.post._id).
                then(response => {
                    console.log(response)
                }).
                catch(err => {
                    if (err.response.status) {
                        switch (err.response.status) {
                            case 500:
                                // 500: error occurred with mongoose while updating
                                // set like status to it's previous
                                setPostIsLiked(!postIsLiked)
                                break;
                            case 401:
                            case 403:
                                // token was no longer valid, send user to login page
                                alert("Your session has timed out")
                                history.push('/login')
                                break
                        }
                    }
                }).
                finally(() => {
                    // allow user to change like status again
                    isUpdatingLikeStatus.current = false
                })
        }
    }, [postIsLiked, numberOfLikes])

    const handlePostDelete = useCallback(() => {
        // tell server to delete post
        API.deletePost(props.post._id).
            then(response => {
                // send user back to their profile page
                history.push(`/user/${props.loggedInUser.username}`)
            }).
            catch(err => {
                console.log(err.response)
            })
    }, [props.loggedInUser])

    return (
        <div className='post-card'>
            <div className='user-info'>
                <div className='profile-img-wrapper'>
                    <img src={props.user.profilePicture || 'https://i.imgur.com/dCc7ake.png'} alt='User profile picture' />
                </div>
                <Link to={`/user/${props.user.username}`} className='username'>{props.user.username}</Link>
                <FontAwesomeIcon 
                    icon={faTrashAlt} 
                    className={`post-delete-icon${props.isPostPage && userIsCreator ? '' : ' hide'}`}
                    onClick={handlePostDelete}/>
            </div>
            <div className='post-content'>
                <div className='post-img-wrapper'>
                    <img src={props.post.img} alt='post image' />
                </div>
                <div className='post-details'>
                    <div className='likes-wrapper'>
                        <FontAwesomeIcon
                            icon={postIsLiked ? solidHeart : lightHeart}
                            className={`heart-icon${postIsLiked ? ' liked' : ''}`}
                            onClick={() => handleLikeBtnClick(props.post.id)}
                        />
                        <p className='likes-number'>{numberOfLikes}</p>
                    </div>
                    <div className='caption-wrapper'>
                        {props.post.caption}
                    </div>
                </div>
            </div>
        </div>
    )
}
