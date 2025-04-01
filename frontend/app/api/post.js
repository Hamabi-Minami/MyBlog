import axios from "./axios";

export function getPosts() {
    return axios.get("/posts");
}

export function getPostById(id) {
    return axios.get(`/posts/${id}`);
}
