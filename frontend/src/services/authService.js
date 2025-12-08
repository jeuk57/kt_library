import axios from "axios";

const API = "http://localhost:8080";

export async function signup(data) {
  return axios.post(`${API}/users/signup`, data, {
    withCredentials: true
  });
}

export async function login(data) {
  return axios.post(`${API}/users/login`, data, {
    withCredentials: true
  });
}
