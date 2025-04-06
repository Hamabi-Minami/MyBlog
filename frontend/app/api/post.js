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