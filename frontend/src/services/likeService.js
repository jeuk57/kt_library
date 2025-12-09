import axios from "axios";
const API = "http://localhost:8080";

export function toggleLike(bookId) {
    return axios.post(
        `${API}/likes/${bookId}`,
        {},
        { withCredentials: true }
    ).then(res => res.data);
}
export function getLikeCount(bookId) {
    return axios.get(`${API}/likes/${bookId}/count`)
        .then(res => res.data);
}