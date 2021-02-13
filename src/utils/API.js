import axios from 'axios'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000'

export default {
    updatePostLikeStatus: function(postId, userLikedPost) {
        return axios.put(`${API_ENDPOINT}/api/post/status/likes`, { id: postId, userLikedPost: userLikedPost })
    }
}