import { useState } from "react";
import axios from "axios";

function useReviewActions(reviews, setReviews, userId, token) {
    const [editingReview, setEditingReview] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(5);

    const handleDelete = async (id) => {
        if (!token) return alert("Você precisa estar logado para deletar um comentário.");

        try {
        await axios.delete(`http://localhost:5000/api/reviews/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(reviews.filter((r) => r._id !== id));
        } catch {
        alert("Erro ao deletar comentário.");
        }
    };

    const handleEdit = (review) => {
        setEditingReview(review._id);
        setNewComment(review.comment);
        setNewRating(review.rating);
    };

    const handleUpdate = async (id) => {
        if (!token) return alert("Você precisa estar logado para editar um comentário.");

        try {
        const res = await axios.put(
            `http://localhost:5000/api/reviews/${id}`,
            { comment: newComment, rating: newRating },
            { headers: { Authorization: `Bearer ${token}` } }
        );
            setReviews(reviews.map((r) => (r._id === id ? res.data.review : r)));
            setEditingReview(null);
        } catch {
            alert("Erro ao atualizar comentário.");
        }
    };

    return {
        editingReview,
        newComment,
        newRating,
        setEditingReview,
        setNewComment,
        setNewRating,
        handleDelete,
        handleEdit,
        handleUpdate,
    };
}

export default useReviewActions;
