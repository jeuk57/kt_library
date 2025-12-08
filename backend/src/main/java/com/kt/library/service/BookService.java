package com.kt.library.service;

import com.kt.library.dto.request.BookCreateRequest;
import com.kt.library.dto.request.BookUpdateRequest;
import com.kt.library.dto.response.BookResponse;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

// Book 관련 기능을 모은 interface
public interface BookService {

    // 새로운 책 등록
    @Transactional
    BookResponse createBook(BookCreateRequest request);

    // 책 조회
    BookResponse getBook(Long id);

    // 저장된 책 목록 조회
    List<BookResponse> getAllBooks();

    // 책 정보 수정
    @Transactional
    BookResponse updateBook(Long id, BookUpdateRequest request);

    // 책 삭제
    @Transactional
    void deleteBook(Long id);
}