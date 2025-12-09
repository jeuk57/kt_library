import axios from "axios";

// 📌 API 기본 URL
const API_BASE = "http://localhost:8080";

// axios 기본 설정 (전체 요청에 세션 쿠키 포함)
axios.defaults.withCredentials = true;

// -----------------------------
// 📚 책 목록 가져오기 (GET /books)
// -----------------------------
export const getBooks = async () => {
    try {
        const res = await axios.get(`${API_BASE}/books`);
        return res.data;
    } catch (error) {
        console.error("📕 책 목록 가져오기 실패:", error);
        throw error;
    }
};

// -----------------------------
// 📘 특정 책 1개 조회 (GET /books/{id})
// -----------------------------
export const getBook = async (id) => {
    try {
        const res = await axios.get(`${API_BASE}/books/${id}`);
        return res.data;
    } catch (error) {
        console.error("📘 책 상세 정보 가져오기 실패:", error);
        throw error;
    }
};

// -----------------------------
// ➕ 책 등록 (POST /books)
// -----------------------------
export const createBook = async (data) => {
    try {
        const res = await axios.post(`${API_BASE}/books`, data, {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.error("➕ 책 등록 실패:", error);
        throw error;
    }
};

// -----------------------------
// ✏ 책 수정 (PUT /books/{id})
// -----------------------------
export const updateBook = async (id, data) => {
    try {
        const res = await axios.put(`${API_BASE}/books/${id}`, data, {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.error("✏ 책 수정 실패:", error);
        throw error;
    }
};

// -----------------------------
// ❌ 책 삭제 (DELETE /books/{id})
// -----------------------------
export const deleteBook = async (id) => {
    try {
        const res = await axios.delete(`${API_BASE}/books/${id}`, {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.error("❌ 책 삭제 실패:", error);
        throw error;
    }
};
