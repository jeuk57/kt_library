import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBook } from "../services/bookService";

export default function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        getBook(id).then(setBook);
    }, [id]);

    if (!book) return <p>Loading...</p>;

    return (
        <div>
            <h2>{book.title}</h2>
            <p>{book.content}</p>
            <p>언어: {book.language}</p>
            <p>장르: {book.genre}</p>
            <p>생성일: {book.createDate}</p>
        </div>
    );
}
