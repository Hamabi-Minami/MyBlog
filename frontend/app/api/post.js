import axios from "./axios";

export function getPosts() {
    return axios.get("/post");
}

export function getPostById(id) {
    return axios.get(`/post/${id}`);
}

export function publishPost(post) {
    return axios.post("/post/", post);
}

export function getMyPosts(token) {
    return axios.get('/post/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
