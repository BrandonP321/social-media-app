import React from 'react'
import { useHistory } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import PostCard from '../../components/PostCard'
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

    

    return (
        <div className='home-page-wrapper'>
            <Header />
            <div className='content-header-footer-offset'>
                <div className='content-main-responsive'>
                    <PostCard
                        user={user}
                        post={{ ...post, userHasLiked: false }}
                    />
                    <PostCard
                        user={user}
                        post={post}
                    />
                    <PostCard
                        user={user}
                        post={{ ...post, userHasLiked: false }}
                    />
                    <PostCard
                        user={user}
                        post={post}
                    />
                    <PostCard
                        user={user}
                        post={{ ...post, userHasLiked: false }}
                    />
                    <PostCard
                        user={user}
                        post={post}
                    />
                    <PostCard
                        user={user}
                        post={{ ...post, userHasLiked: false }}
                    />
                    <PostCard
                        user={user}
                        post={post}
                    />
                </div>
            </div>
            <Footer />
        </div>
    )
}
