import { faGameConsoleHandheld } from '@fortawesome/pro-solid-svg-icons'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useHistory, useParams, Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinnerThird } from '@fortawesome/pro-regular-svg-icons'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import NewPostModal from '../../components/NewPostModal'
import PreLoader from '../../components/PreLoader'
import API from '../../utils/API'
import './index.css'

export default function Profilepage() {
    let history = useHistory()
    let location = useLocation();

    let { username: profilePageUsername } = useParams()
    // ref storing username of profile visited to detect when the user is trying to visit a different profile page
    let lastProfilePage = useRef(profilePageUsername)

    const [user, setUser] = useState({
        username: '',
        name: '',
        profileImg: '',
        bio: '',
        followersCount: 0,
        followingCount: 0
    })

    const [isPageLoaded, setIsPageLoaded] = useState(false)
    // states indicating if user is in process of following user
    const [isFollowing, setIsFollowing] = useState(false)
    const [isUnfollowing, setIsUnfollowing] = useState(false)

    const [posts, setPosts] = useState([])

    const [currentUserIsSameAsProfile, setCurrentUserIsSameAsProfile] = useState(false)
    const [isFollowingUser, setIsFollowingUser] = useState(false)

    const [showNewPostModal, setShowNewPostModal] = useState(false)

    useEffect(() => {
        // if user is trying to visit another profile page but page won't change due to only 
        // changing a parameter in the url, reload the page
        if (profilePageUsername !== lastProfilePage.current) {
            history.go(0)
        }
    }, [location])

    const followUser = useCallback(() => {
        // disable follow button
        setIsFollowing(true)

        API.followUser(user.id).
            then(response => {
                // reload page
                history.go(0)
            }).
            catch(err => {
                console.log(err.response)
            }).
            finally(() => setIsFollowing(false))
    }, [user.id])

    const unfollowUser = useCallback(() => {
        // disable unfollow button
        setIsUnfollowing(true)

        API.unfollowUser(user.id).
            then(response => {
                // reload page
                history.go(0)
            }).
            catch(err => {
                console.log(err.response)
            }).
            finally(() => {
                setIsUnfollowing(false)
            })
    }, [user.id])

    // function to handle info from server if user is logged in
    const handleTokenInfo = data => {
        const { username } = data

        // first make request to server for info of profile page user
        API.getUser(profilePageUsername, username)
            .then(response => {
                const userObj = response.data
                console.log('userobj', userObj)

                // update state with user info
                setIsFollowingUser(userObj.isFollowing || false)

                // remove 'isFollowing' prop from obj
                if (userObj.isFollowing) delete userObj.isFollowing

                setUser(userObj)

                // now that we have the user's id, get all the posts by that user
                API.getUserPosts(userObj.id)
                    .then(response => {
                        // add posts array to state
                        setPosts(response.data)
                    })
            })
            .catch(err => {
                // if any error shows up, redirect back to home page
                history.push('/')
            })
            .finally(() => {
                setIsPageLoaded(true)
            })

        // check if logged in user's username matches username of current profile page
        if (username === profilePageUsername) {
            // update state
            setCurrentUserIsSameAsProfile(true)
        } else {
            // else user is looking at another user's profile page
        }
    }

    // function to determine if a post thumbnail will show up in the 1st, 2nd, or 3rd column of displayed post thumbnails
    const getColOfThumbnail = number => {
        // if user is viewing their own profile page, a 'new-post' will show up in first slot
        // increase index by 1 to account for this
        if (currentUserIsSameAsProfile) {
            number++
        }

        // if number passed is divisible by 3, that post is in the third column
        if (number % 3 === 0) return 3
        // if number - 2 is divisible by 3, that post is in the 2nd column
        if ((number - 2) % 3 === 0) return 2
        // if number - 1 is divisible by 3, that post is in the 1st column
        if ((number - 1) % 3 === 0) return 1
    }

    const handleNewPostBtnClick = () => {
        // bring up modal for creating a new post
        setShowNewPostModal(true)
        // hide search bar in header
        const searchbar = document.querySelector('.header-search-wrapper')
        searchbar.style.opacity = 0
    }

    const logout = () => {
        // remove token from local storage
        localStorage.removeItem('accessToken')

        // send user to login page
        history.push('/login')
    }

    return (
        <>
            <PreLoader show={!isPageLoaded} />
            <NewPostModal setShow={setShowNewPostModal} show={showNewPostModal} />
            <Header handleTokenInfo={handleTokenInfo} />
            <div className='content-header-footer-offset'>
                <div className='content-main-responsive'>
                    <div className='profile-info-wrapper'>
                        <h1>{user.username}</h1>
                        <div className='row top'>
                            <div className='flex-group left'>
                                <div className='profile-img-wrapper'>
                                    <img src={user.profileImg || 'https://i.imgur.com/dCc7ake.png'} alt='user profile picture' />
                                </div>
                            </div>
                            <div className='flex-group right'>
                                <div className='follows-wrapper'>
                                    <div className='followers'>
                                        <p className='followers-count'>{user.followersCount}</p>
                                        <p>Followers</p>
                                    </div>
                                    <div className='following'>
                                        <p className='following-count'>{user.followingCount}</p>
                                        <p>Following</p>
                                    </div>
                                </div>
                                <div className='profile-option-btns-wrapper'>
                                    {currentUserIsSameAsProfile ? <>
                                        <button className='blue-btn' onClick={() => history.push(`/user/edit/${user.username}`)}>Edit Profile</button>
                                        <button className='blue-btn' onClick={logout}>Logout</button></> :
                                        isFollowingUser ?
                                            <button
                                                className='blue-btn'
                                                onClick={unfollowUser}
                                                disabled={isUnfollowing}>Unfollow <span>
                                                    <FontAwesomeIcon
                                                        icon={faSpinnerThird}
                                                        className={`btn-load-spinner${isUnfollowing ? '' : ' hide'}`} /></span></button> :
                                            <button
                                                className='blue-btn'
                                                onClick={followUser}
                                                disabled={isFollowing}>Follow <span>
                                                    <FontAwesomeIcon
                                                        icon={faSpinnerThird}
                                                        className={`btn-load-spinner${isFollowing ? '' : ' hide'}`} /></span></button>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='row bottom'>
                            <div className='user-name-wrapper'>
                                {user.name}
                            </div>
                            <div className='profile-option-btns-wrapper mobile'>
                                {currentUserIsSameAsProfile ? <>
                                    <button className='blue-btn' onClick={() => history.push(`/user/edit/${user.username}`)}>Edit Profile</button>
                                    <button className='blue-btn' onClick={logout}>Logout</button></> :
                                    isFollowingUser ?
                                        <button
                                            className='blue-btn'
                                            onClick={unfollowUser}
                                            disabled={isUnfollowing}>Unfollow <span>
                                                <FontAwesomeIcon
                                                    icon={faSpinnerThird}
                                                    className={`btn-load-spinner${isUnfollowing ? '' : ' hide'}`} /></span></button> :
                                        <button
                                            className='blue-btn'
                                            onClick={followUser}
                                            disabled={isFollowing}>Follow <span>
                                                <FontAwesomeIcon
                                                    icon={faSpinnerThird}
                                                    className={`btn-load-spinner${isFollowing ? '' : ' hide'}`} /></span></button>
                                }
                            </div>
                            <p className='profile-bio'>{user.bio || ''}</p>
                        </div>
                    </div>
                    <div className='profile-posts-wrapper'>
                        {/* if user is viewing their own profile page and they have atleast one post, make the first post a button to create a new post */}
                        {currentUserIsSameAsProfile && posts.length > 0 ?
                            <div className='profile-post-thumb new-post-btn' onClick={handleNewPostBtnClick}>
                                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62.75 62.75"><defs><style></style></defs><circle class="cls-1" cx="31.38" cy="31.38" r="31" /><line className="cls-2" x1="31.38" y1="20.38" x2="31.38" y2="42.37" /><line className="cls-2" x1="42.37" y1="31.38" x2="20.38" y2="31.38" /></svg>
                            </div> : currentUserIsSameAsProfile ?
                                // else if user is viewing their own page but has no posts, display btn to create first post
                                <button
                                    className='first-post-btn dark-btn'
                                    onClick={handleNewPostBtnClick}>
                                    Create Your First Post
                                </button> :
                                // else user is viewing another's page but user has no posts
                                <div className='no-posts-display'>
                                    User has not posted yet
                                </div>}
                        {posts.map((post, index) => {
                            // get column that thumbnail will show up in (add 1 to index to start counting at 1)
                            const col = getColOfThumbnail(index + 1)
                            return (
                                <div
                                    className={`profile-post-thumb${col === 1 ? ' first-col' : ''}${col === 3 ? ' third-col' : ''}`}
                                    onClick={() => history.push(`/post/${post._id}`)}>
                                    <img src={post.img} alt='thumbnail of post' />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
