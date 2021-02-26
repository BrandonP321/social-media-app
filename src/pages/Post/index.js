import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import PostCard from '../../components/PostCard'
import API from '../../utils/API'

export default function Post() {
    let history = useHistory();
    let { id: postId } = useParams()

    const [post, setPost] = useState(null)
    const [loggedInUser, setLoggedInUser] = useState(null)

    useEffect(() => {
        // get post data from db
        API.getPost(postId).
            then(response => {
                const post = response.data.post
                const user = response.data.user
                console.log(response)
                // determine whether or not user has liked the post
                if (post.likedBy.includes(user.id)) {
                    console.log('has liked')
                    // user has liked this post
                    post.hasLiked = true
                } else {
                    console.log('has not liked')
                    // else user has not liked this post
                    post.hasLiked = false
                }

                // update state with new post
                setPost(post)
                setLoggedInUser(user)
            }).
            catch(err => {
                console.log(err.response)
                if (err.response.status) {
                    switch (err.response.status) {
                        case 401:
                        case 403:
                            // user's token is no longer valid, redirect to login
                            alert('Session has timed out')
                            history.push('/login')
                            break;
                    }
                }
            })
    }, [])

    return (
        <>
            <Header />
            <div className='content-header-footer-offset'>
                <div className='content-main-responsive'>
                    {post ?
                        <PostCard 
                            post={post} 
                            user={post.creator} 
                            loggedInUser={loggedInUser}
                            isPostPage={true}/> :
                        ''}
                </div>
            </div>
            <Footer />
        </>
    )
}
