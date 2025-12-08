import { useState } from "react";
import { createBook } from "../services/bookService";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";

export default function BookCreate() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const data = {
            title,
            content,
            language: "KO",
            genre: "NOVEL"
        };

        await createBook(data);
        navigate("/books");
    };

    return (
        <Box sx={{ maxWidth: 400, mt: 2 }}>
            <h2>도서 등록</h2>

            <TextField
                label="제목"
                fullWidth
                margin="normal"
                onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
                label="내용"
                fullWidth
                margin="normal"
                onChange={(e) => setContent(e.target.value)}
            />

            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
                등록하기
            </Button>
        </Box>
    );
}
