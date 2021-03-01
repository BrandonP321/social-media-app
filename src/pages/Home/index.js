import React, { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import PostCard from '../../components/PostCard'
import PreLoader from '../../components/PreLoader'
import API from '../../utils/API'
import './index.css'

export default function Home() {
    let history = useHistory();

    const [isPageLoaded, setIsPageLoaded] = useState(false)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        // get all recent posts of people the user followers
        API.getHomePagePosts()
            .then(response => {
                // iterate over array of posts
                for (let post of response.data.posts) {
                    // if user has liked the post, set hasLiked to true
                    if (post.likedBy.includes(response.data.user.id)) {
                        post.hasLiked = true
                    } else {
                        // set hasLiked to false
                        post.hasLiked = false
                    }
                }
                // set array of posts to state
                setPosts(response.data.posts)
            })
            .catch(err => {
                console.log(err)
            }).
            finally(() => {
                console.log('page is loaded')
                setIsPageLoaded(true)
            })
    }, [])

    return (
        <>
            <PreLoader show={!isPageLoaded} />
            <div className='home-page-wrapper'>
                <Header />
                <div className='content-header-footer-offset'>
                    <div className='content-main-responsive'>
                        {posts.map(post => {
                            return (
                                <PostCard
                                    user={post.creator}
                                    post={post} />
                            )
                        })}
                        {/* if no posts, tell user to follow owners account */}
                        {posts.length === 0 ? 
                            <div className='new-account-msg'>
                                <p className='heading'>No Posts</p>
                                <p className='msg'>To view the full functionality of the app, go <Link to='/user/brandonp321'>follow the creator's account.</Link></p>
                            </div> : ''
                        }
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}
