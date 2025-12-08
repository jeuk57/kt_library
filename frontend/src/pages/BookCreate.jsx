import { useState } from "react";
import { createBook } from "../services/bookService";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";

export default function BookCreate() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async () => {
        const data = {
            title,
            author,
            content,
            language: "KO",
            genre: "NOVEL"
        };

        try {
            await createBook(data);     // ⭐ API로 실제 등록 요청
            alert("도서가 등록되었습니다!");
            navigate("/books");         // ⭐ 등록 후 목록 페이지 이동
        } catch (error) {
            console.error(error);
            alert("등록 중 오류가 발생했습니다.");
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mt: 2 }}>
            <h2>도서 등록</h2>

            <TextField
                label="제목"
                fullWidth
                margin="normal"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
                label="저자"
                fullWidth
                margin="normal"
                variant="outlined"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />

            <TextField
                label="내용"
                fullWidth
                margin="normal"
                variant="outlined"
                multiline
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleSubmit}
            >
                등록하기
            </Button>
        </Box>
    );
}
