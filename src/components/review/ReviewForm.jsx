import { Star } from "lucide-react";

function ReviewForm({ rating, comment, onChange, onSubmit, success, error }) {
    const handleStarClick = (value) => {
        onChange({ target: { name: "rating", value } });
    };

    return (
        <form onSubmit={onSubmit} className="mt-6 border-t border-gray-200 p-4 md:p-0 md:pt-6 rounded">
            <h3 className="text-lg font-semibold mb-4">Deixe sua avaliação</h3>

            <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => handleStarClick(star)}
                        className="text-yellow-500"
                    >
                        <Star
                            size={24}
                            fill={star <= rating ? "currentColor" : "none"}
                            strokeWidth={1.5}
                        />
                    </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                    {rating} estrela{rating > 1 ? "s" : ""}
                </span>
            </div>

            <textarea
                name="comment"
                value={comment}
                onChange={onChange}
                className="w-full h-24 px-4 py-2 border border-gray-200 rounded-md shadow-sm resize-none mb-3"
                placeholder="Avalie o produto e ajude outros clientes..."
                required
            />

            <button
                type="submit"
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
                Enviar
            </button>

            {success && <p className="text-green-600 mt-3">{success}</p>}
            {error && <p className="text-red-600 mt-3">{error}</p>}
        </form>
    );
}

export default ReviewForm;
