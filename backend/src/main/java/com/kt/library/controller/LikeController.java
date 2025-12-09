package com.kt.library.controller;

import com.kt.library.dto.response.UserResponse;
import com.kt.library.exception.UnAuthorizedException;
import com.kt.library.service.LikeService;
import lombok.RequiredArgsConstructor;
import lombok.Generated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/likes")
//@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;

    @PostMapping("/{bookId}")
    public String toggleLike(
            @PathVariable Long bookId,
            @SessionAttribute(name = "loginUser", required = false) UserResponse loginUser) {

        if (loginUser == null) {
            throw new UnAuthorizedException("로그인이 필요합니다.");
        }

        boolean liked = likeService.toggleLike(bookId, loginUser.getId());
        return liked ? "좋아요 추가됨" : "좋아요 취소됨";
    }

    // 좋아요 개수 조회 (프론트에서 필요!)
    @GetMapping("/{bookId}/count")
    public int getLikeCount(@PathVariable Long bookId) {
        return likeService.getLikeCount(bookId);
    }

    @Generated
    public LikeController(final LikeService likeService) {
        this.likeService = likeService;
    }
}
