import { faGameConsoleHandheld } from '@fortawesome/pro-solid-svg-icons'
import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import API from '../../utils/API'
import './index.css'

export default function Profilepage() {
    let history = useHistory()

    let { username: profilePageUsername } = useParams()

    const [user, setUser] = useState({
        username: '',
        name: '',
        profileImg: '',
        bio: '',
        followersCount: 0,
        followingCount: 0
    })

    const [posts, setPosts] = useState([])

    const [currentUserIsSameAsProfile, setCurrentUserIsSameAsProfile] = useState(false)
    const [isFollowingUser, setIsFollowingUser] = useState(false)

    useEffect(() => {
        // setPosts([
        //     {
        //         src: 'https://i.imgur.com/UdfqVIu.png'
        //     },
        //     {
        //         src: 'https://i.imgur.com/MG941od.png'
        //     },
        //     {
        //         src: 'https://i.imgur.com/9zZBflg.png'
        //     },
        //     {
        //         src: 'https://i.imgur.com/L82ZKnI.png'
        //     },
        //     {
        //         src: 'https://i.imgur.com/UdfqVIu.png'
        //     },
        //     {
        //         src: 'https://i.imgur.com/MG941od.png'
        //     },
        //     {
        //         src: 'https://i.imgur.com/9zZBflg.png'
        //     },
        //     {
        //         src: 'https://i.imgur.com/L82ZKnI.png'
        //     },
        //     {
        //         src: 'https://i.imgur.com/UdfqVIu.png'
        //     },
        //     {
        //         src: 'https://i.imgur.com/MG941od.png'
        //     },
        //     {
        //         src: 'https://i.imgur.com/9zZBflg.png'
        //     },
        //     {
        //         src: 'https://i.imgur.com/L82ZKnI.png'
        //     },
        //     {
        //         src: 'https://i.imgur.com/UdfqVIu.png'
        //     },
        //     {
        //         src: 'https://i.imgur.com/MG941od.png'
        //     },
        //     {
        //         src: 'https://i.imgur.com/9zZBflg.png'
        //     },
        //     {
        //         src: 'https://i.imgur.com/L82ZKnI.png'
        //     }
        // ])
    }, [])

    // function to handle info from server if user is logged in
    const handleTokenInfo = data => {
        const { username } = data

        // first make request to server for info of profile page user
        API.getUser(profilePageUsername, username)
            .then(response => {
                const userObj = response.data
                console.log(response.data)
                // update state with user info
                setIsFollowingUser(userObj.isFollowing || false)

                // remove 'isFollowing' prop from obj
                if (userObj.isFollowing) delete userObj.isFollowing

                setUser(userObj)

                // now that we have the user's id, get all the posts by that user
                API.getUserPosts(userObj.id)
                    .then(response => {
                        console.log(response.data)
                        // add posts array to state
                        setPosts(response.data)
                    })
            })
            .catch(err => {
                // if any error shows up, redirect back to home page
                history.push('/')
            })            

        console.log(username, profilePageUsername)
        // check if logged in user's username matches username of current profile page
        if (username === profilePageUsername) {
            console.log('match')
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

    return (
        <>
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
                                        <button className='blue-btn'>Edit Profile</button>
                                        <button className='blue-btn'>Logout</button></> :
                                        isFollowingUser ?
                                            <button className='blue-btn'>Unfollow</button> :
                                            <button className='blue-btn'>Follow</button>
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
                                    <button className='blue-btn'>Edit Profile</button>
                                    <button className='blue-btn'>Logout</button></> :
                                    isFollowingUser ?
                                        <button className='blue-btn'>Unfollow</button> :
                                        <button className='blue-btn'>Follow</button>
                                }
                            </div>
                            <p className='profile-bio'>{user.bio || ''}</p>
                        </div>
                    </div>
                    <div className='profile-posts-wrapper'>
                        {/* if user is viewing their own profile page and they have atleast one post, make the first post a button to create a new post */}
                        {currentUserIsSameAsProfile && posts.length > 0 ?
                            <div className='profile-post-thumb new-post-btn'>
                                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62.75 62.75"><defs><style></style></defs><circle class="cls-1" cx="31.38" cy="31.38" r="31" /><line className="cls-2" x1="31.38" y1="20.38" x2="31.38" y2="42.37" /><line className="cls-2" x1="42.37" y1="31.38" x2="20.38" y2="31.38" /></svg>
                            </div> : currentUserIsSameAsProfile ? 
                                // else if user is viewing their own page but have no posts, display btn to create first post
                                <div></div> :
                                ''}
                        {posts.map((post, index) => {
                            // get column that thumbnail will show up in (add 1 to index to start counting at 1)
                            const col = getColOfThumbnail(index + 1)
                            return (
                                <div className={`profile-post-thumb${col === 1 ? ' first-col' : ''}${col === 3 ? ' third-col' : ''}`}>
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
