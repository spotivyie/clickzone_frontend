import React from "react";
import ReviewItem from "./ReviewItem";
import useReviewActions from "../../hooks/useReviewActions";

function ReviewList({ reviews, setReviews, productId, userId, token }) {
    const {
        editingReview,
        newComment,
        newRating,
        setEditingReview,
        setNewComment,
        setNewRating,
        handleDelete,
        handleEdit,
        handleUpdate,
    } = useReviewActions(reviews, setReviews, userId, token);

    if (reviews.length === 0)
        return <p className="text-gray-500 mt-6 text-center">Nenhum comentário ainda.</p>;

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-8">Comentários</h2>
            {reviews.map((review) => (
                <ReviewItem
                    key={review._id}
                    review={review}
                    editingReview={editingReview}
                    newComment={newComment}
                    newRating={newRating}
                    setNewComment={setNewComment}
                    setNewRating={setNewRating}
                    userId={userId}
                    onEdit={() => handleEdit(review)}
                    onDelete={() => handleDelete(review._id)}
                    onUpdate={() => handleUpdate(review._id)}
                    onCancel={() => setEditingReview(null)}
                />
            ))}
        </div>
    );
}

export default ReviewList;
