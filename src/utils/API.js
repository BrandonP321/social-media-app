import axios from 'axios'
import Header from '../components/Header'

// const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000'
const API_ENDPOINT = 'http://localhost:8000'

export default {
    updatePostLikeStatus: function(postId, userLikedPost) {
        return axios.put(`${API_ENDPOINT}/api/post/status/likes`, { id: postId, userLikedPost: userLikedPost })
    },
    getUser: function(profilePageUsername, visitingUser) {
        return axios.get(`${API_ENDPOINT}/api/user/${profilePageUsername}`, { visitingUser: visitingUser })
    },
    getUserPosts: function(id) {
        return axios.get(`${API_ENDPOINT}/api/user/${id}/posts`)
    },
    createUser: function(userObj) {
        return axios.post(`${API_ENDPOINT}/api/user/create`, userObj)
    },
    userLogin: function(userObj) {
        return axios.post(`${API_ENDPOINT}/api/user/login`, userObj)
    },
    userUpdate: function(user) {
        return axios.put(`${API_ENDPOINT}/api/user/update`, user, { 'headers': { 'auth-token': localStorage.getItem('accessToken') } })
    },
    getPost: function(id) {
        return axios.get(`${API_ENDPOINT}/api/post/${id}`, setHeaderToken())
    },
    createPost: function(post) {
        return axios.post(`${API_ENDPOINT}/api/post/create`, post, { 'headers': { 'auth-token': localStorage.getItem('accessToken') } })
    },
    deletePost: function(id) {
        return axios.delete(`${API_ENDPOINT}/api/post/${id}/delete`, setHeaderToken())
    },
    getHomePagePosts: function() {
        return axios.get(`${API_ENDPOINT}/api/posts/following`, { 'headers': { 'auth-token': localStorage.getItem('accessToken') } })
    },
    validateUserLoggedIn: async function() {
        // get jwt from local storage
        const token = localStorage.getItem('accessToken')

        // if no token found, return false
        if (!token) return false

        // make request to server to validate that token is still valid
        return axios.get(`${API_ENDPOINT}/api/auth/token`, { 'headers': { 'auth-token': token } })
    },
    uploadToCloudinary: function(img) {
        return axios.post('https://api.cloudinary.com/v1_1/dka83rgpq/image/upload', { file: img, upload_preset: 'ienclaiw' })
    },
    uploadProfilePic: function(img) {
        return axios.post('https://api.cloudinary.com/v1_1/dka83rgpq/image/upload', { file: img, upload_preset: 'social-profile' })
    },
    likePost: function(postId) {
        return axios.put(`${API_ENDPOINT}/api/post/${postId}/like`, null, setHeaderToken())
    },
    unlikePost: function(postId) {
        return axios.put(`${API_ENDPOINT}/api/post/${postId}/unlike`, null, setHeaderToken())
    }
}

// function that returns obj for header in api request with jwt
function setHeaderToken() {
    // get token from storage
    const token = localStorage.getItem('accessToken')

    const headerObj = {
        'headers': {
            'auth-token': token
        }
    }

    return headerObj
}
