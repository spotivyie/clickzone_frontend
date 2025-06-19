import React from "react";
import { Edit, Trash, Star } from "lucide-react";

function ReviewItem({
    review,
    editingReview,
    newComment,
    newRating,
    setNewComment,
    setNewRating,
    userId,
    onEdit,
    onDelete,
    onUpdate,
    onCancel,
}) {
    const isEditing = editingReview === review._id;
    const isAuthor = String(review.user?._id) === String(userId);

    const handleStarClick = (value) => {
        setNewRating(value);
    };

    return (
        <div className="border border-gray-300 p-4 mb-4 rounded-lg shadow-sm bg-white">
            <div className="flex items-center gap-4 mb-4">
                <img
                    src={
                        review.user?.image
                            ? `${import.meta.env.VITE_API_URL}/${review.user.image.replace(/\\/g, "/")}`
                            : "/default-user.png"
                        }
                    alt="Foto do usuário"
                    className="w-10 h-10 rounded-full object-cover"
                />
                <p className="font-semibold">{review.user?.name || "Usuário"}</p>
            </div>

            {isEditing ? (
                <>
                    {/* Estrelas clicáveis para editar */}
                    <div className="flex items-center gap-1 mt-2 mb-4 text-yellow-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => handleStarClick(star)}
                            >
                                <Star
                                    size={20}
                                    fill={star <= newRating ? "currentColor" : "none"}
                                    strokeWidth={1.5}
                                />
                            </button>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                            {newRating} estrela{newRating > 1 ? "s" : ""}
                        </span>
                    </div>

                    <textarea
                        className="w-full mt-2 p-2 rounded-md bg-gray-50 border-gray-300 shadow-s resize-none focus:outline-none focus:ring-0 border-none"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={4}
                    />
                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={onUpdate}
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                            Salvar
                        </button>
                        <button
                            onClick={onCancel}
                            className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                        >
                            Cancelar
                        </button>
                    </div>
                </>
            ) : (
                <>
                    {/* Estrelas visuais para exibir avaliação */}
                    <div className="flex items-center gap-1 mt-2 mb-4 text-yellow-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={20}
                                fill={star <= review.rating ? "currentColor" : "none"}
                                strokeWidth={1.5}
                            />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                            {review.rating} estrela{review.rating > 1 ? "s" : ""}
                        </span>
                    </div>
                    <p className="mt-3">{review.comment}</p>
                    {isAuthor && (
                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={onEdit}
                                aria-label="Editar"
                                className="text-blue-400 hover:text-blue-800"
                            >
                                <Edit size={20} />
                            </button>
                            <button
                                onClick={onDelete}
                                aria-label="Deletar"
                                className="text-red-400 hover:text-red-800"
                            >
                                <Trash size={20} />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default ReviewItem;
