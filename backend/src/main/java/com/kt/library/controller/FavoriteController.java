package com.kt.library.controller;

import com.kt.library.dto.response.UserResponse;
import com.kt.library.exception.UnAuthorizedException;
import com.kt.library.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;

    // 찜 토글
    @PostMapping("/{bookId}")
    public void toggleFavorite(

            @PathVariable Long bookId,
            @SessionAttribute(name = "loginUser", required = false) UserResponse loginUser
    ) {
        if (loginUser == null) {
            throw new UnAuthorizedException("로그인이 필요합니다.");
        }
        // 서비스 호출 - 순서: userId, bookId
        favoriteService.toggleFavorite(loginUser.getId(), bookId);
    }

    // 현재 책의 찜 개수 조회
    @GetMapping("/{bookId}/count")
    public Long getFavoriteCount(@PathVariable Long bookId) {
        return favoriteService.getFavoriteCount(bookId);
    }
}
