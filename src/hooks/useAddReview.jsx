import { useState } from "react";
import axios from "axios";

function useAddReview(productId, token, onReviewAdded) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "rating") setRating(Number(value));
        else if (name === "comment") setComment(value);
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
        const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/reviews`,
            { product: productId, rating, comment },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        // Use o objeto retornado pelo backend diretamente:
        const reviewFromBackend = res.data;

        onReviewAdded(reviewFromBackend);
        setSuccess("Comentário adicionado com sucesso!");
        setComment("");
        setRating(5);
    } catch (err) {
        setError(err.response?.data?.message || "Erro ao adicionar comentário.");
    }
};

    return {
        rating,
        comment,
        success,
        error,
        handleChange,
        handleSubmit,
    };
}

export default useAddReview;
