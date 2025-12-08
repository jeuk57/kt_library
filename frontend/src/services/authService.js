import axios from "axios";

const API_BASE = "http://localhost:8080";

// ✅ 회원가입 API 호출
// Signup.jsx에서 넘기는 dto 형태:
// { name, username, password, email }
export const signup = async (dto) => {
  // 백엔드 UserSignupRequest:
//  loginId, password, name, email
  const payload = {
    name: dto.name,
    loginId: dto.username,   // 🔥 username → loginId로 매핑
    password: dto.password,
    email: dto.email,
  };

  const res = await axios.post(`${API_BASE}/users/signup`, payload);
  return res.data;
};

// (필요하면 나중에 로그인도 여기서)
// export const login = async (dto) => {
//   const res = await axios.post(`${API_BASE}/users/login`, dto, {
//     withCredentials: true,  // 세션 쓰면 필요
//   });
//   return res.data;
// };
