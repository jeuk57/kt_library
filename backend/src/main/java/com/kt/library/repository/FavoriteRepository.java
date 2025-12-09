package com.kt.library.repository;

import com.kt.library.domain.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    // 특정 사용자가 특정 책을 찜했는지 여부
    Optional<Favorite> findByUserIdAndBookId(Long userId, Long bookId);

    // 책의 찜 개수
    Long countByBookId(Long bookId);

    // 특정 사용자가 찜한 책 목록
    List<Favorite> findByUserId(Long userId);
}
