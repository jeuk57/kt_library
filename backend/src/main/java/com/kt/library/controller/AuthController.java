package com.kt.library.controller;

import com.kt.library.domain.User;
import com.kt.library.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;

    // 회원가입 요청 DTO
    public static class SignupRequest {
        public String name;
        public String loginId;   // ★ username X → loginId
        public String password;
        public String email;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest req) {

        // 아이디 중복 체크
        if (userRepository.findByLoginId(req.loginId).isPresent()) {
            return ResponseEntity.badRequest().body("이미 존재하는 아이디입니다.");
        }

        // 이메일 중복 체크
        if (userRepository.existsByEmail(req.email)) {
            return ResponseEntity.badRequest().body("이미 존재하는 이메일입니다.");
        }

        User user = new User();
        user.setName(req.name);
        user.setLoginId(req.loginId);    // ★ loginId 저장
        user.setPassword(req.password);  // ⚠ 암호화 필요 (추후)
        user.setEmail(req.email);

        userRepository.save(user);

        return ResponseEntity.ok("회원가입 완료");
    }
}
