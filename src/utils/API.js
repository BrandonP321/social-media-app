import axios from 'axios'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000'

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
    validateUserLoggedIn: async function() {
        console.log('checking login')
        // get jwt from local storage
        const token = localStorage.getItem('accessToken')
        console.log(token)

        // if no token found, return false
        if (!token) return false

        // make request to server to validate that token is still valid
        return axios.get(`${API_ENDPOINT}/api/auth/token`, { 'headers': { 'auth-token': token } })
    }
}