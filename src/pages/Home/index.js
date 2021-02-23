import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import PostCard from '../../components/PostCard'
import API from '../../utils/API'
import './index.css'

const user = {
    profileImg: 'https://i.imgur.com/JYvi5tN.png',
    username: 'brandonp321'
}

const post = {
    src: 'https://i.imgur.com/UdfqVIu.png',
    caption: 'This is my first post',
    likes: 15,
    userHasLiked: true,
    creationDate: Date.now()
}

export default function Home() {
    let history = useHistory();

    const [posts, setPosts] = useState([])

    useEffect(() => {
        // get all recent posts of people the user followers
        API.getHomePagePosts()
            .then(response => {
                console.log(response)
                // set array of posts to state
                setPosts(response.data)
            })
            .catch(err => {
                console.log(err.response)
            })
    }, [])

    return (
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
                </div>
            </div>
            <Footer />
        </div>
    )
}
