import React from 'react'
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
    return (
        <div className='home-page-wrapper'>
            <div className='content-header-offset'>
                <div className='feed-wrapper'>
                    <PostCard
                        user={user}
                        post={{...post, userHasLiked: false}}
                    />
                    <PostCard
                        user={user}
                        post={post}
                    />
                    <PostCard
                        user={user}
                        post={post}
                    />
                    <PostCard
                        user={user}
                        post={post}
                    />
                </div>
            </div>
        </div>
    )
}
