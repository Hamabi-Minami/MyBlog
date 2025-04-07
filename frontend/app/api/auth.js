import axios from "./axios";

export function login(account, password) {
    return axios.post("/auth/login", { account, password });
}

export function register(data) {
    return axios.post("/auth/register", data);
}
