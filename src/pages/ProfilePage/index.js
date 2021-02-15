import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import './index.css'

export default function Profilepage() {
    const [user, setUser] = useState({
        username: '',
        name: '',
        profileImg: '',
        bio: '',
        followersCount: 0,
        followingCount: 0
    })

    const [posts, setPosts] = useState([])

    const [currentUserIsSameAsProfile, setCurrentUserIsSameAsProfile] = useState(true)
    const [isFollowingUser, setIsFollowingUser] = useState(false)

    useEffect(() => {
        setUser({
            username: 'brandonp321',
            name: "Brandon Phillips",
            profileImg: '',
            bio: 'I am a super cool dude trying to make this bio as long as I can so that it will take up more than a single line on the page.',
            followersCount: 99,
            followingCount: 99
        })

        setPosts([
            {
                src: 'https://i.imgur.com/UdfqVIu.png'
            },
            {
                src: 'https://i.imgur.com/MG941od.png'
            },
            {
                src: 'https://i.imgur.com/9zZBflg.png'
            },
            {
                src: 'https://i.imgur.com/L82ZKnI.png'
            },
            {
                src: 'https://i.imgur.com/UdfqVIu.png'
            },
            {
                src: 'https://i.imgur.com/MG941od.png'
            },
            {
                src: 'https://i.imgur.com/9zZBflg.png'
            },
            {
                src: 'https://i.imgur.com/L82ZKnI.png'
            },
            {
                src: 'https://i.imgur.com/UdfqVIu.png'
            },
            {
                src: 'https://i.imgur.com/MG941od.png'
            },
            {
                src: 'https://i.imgur.com/9zZBflg.png'
            },
            {
                src: 'https://i.imgur.com/L82ZKnI.png'
            },
            {
                src: 'https://i.imgur.com/UdfqVIu.png'
            },
            {
                src: 'https://i.imgur.com/MG941od.png'
            },
            {
                src: 'https://i.imgur.com/9zZBflg.png'
            },
            {
                src: 'https://i.imgur.com/L82ZKnI.png'
            }
        ])
    }, [])

    // function to determine if a post thumbnail will show up in the 1st, 2nd, or 3rd column of displayed post thumbnails
    const getColOfThumbnail = number => {
        // if number passed is 1, 2, or 3, return that value since it corresponds to the correct column
        if (number === 1 || number === 2 || number === 3) {
            return number
        } else {
            // else subtract 3 from the number to keep moving back 1 row until at the first row
            return getColOfThumbnail(number - 3)
        }
    }

    return (
        <>
            <Header />
            <div className='content-header-footer-offset'>
                <div className='content-main-responsive'>
                    <div className='profile-info-wrapper'>
                        <h1>{user.username}</h1>
                        <div className='row top'>
                            <div className='flex-group left'>
                                <div className='profile-img-wrapper'>
                                    <img src={user.profileImg || 'https://i.imgur.com/dCc7ake.png'} alt='user profile picture' />
                                </div>
                                <div className='user-name-wrapper'>
                                    {user.name}
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
                                        <button>Edit Profile</button>
                                        <button>Logout</button></> :
                                        isFollowingUser ?
                                            <button>Unfollow</button> :
                                            <button>Follow</button>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='row bottom'>
                            <p className='profile-bio'>{user.bio || ''}</p>
                        </div>
                    </div>
                    <div className='profile-posts-wrapper'>
                        {posts.map((post, index) => {
                            // get column that thumbnail will show up in (add 1 to index to indicate column 1)
                            const col = getColOfThumbnail(index + 1)
                            return (
                                <div className={`profile-post-thumb${col === 1 ? ' first-col' : ''}${col === 3 ? ' third-col': ''}`}>
                                    <img src={post.src} alt='thumbnail of post' />
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
