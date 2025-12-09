import axios from "axios";

const API = "http://localhost:8080";

// 회원가입
export async function signup(data) {
    return axios.post(`${API}/users/signup`, data, {
        withCredentials: true
    });
}

// 로그인
export async function login(data) {
    const response = await axios.post(`${API}/users/login`, data, {
        withCredentials: true
    });

    // 로그인 성공 시 표시만
    if (response.data) {
        localStorage.setItem('isLoggedIn', 'true');
    }

    return response;
}

// 로그아웃
export async function logout() {
    try {
        await axios.post(`${API}/users/logout`, {}, {
            withCredentials: true
        });
        localStorage.removeItem('isLoggedIn');
    } catch (error) {
        console.error('로그아웃 실패:', error);
        localStorage.removeItem('isLoggedIn');
        throw error;
    }
}

// 로그인 상태 확인
export function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}