import { Star } from "lucide-react";

function StaticStars({ rating }) {
    return (
        <div className="flex items-center gap-1 text-yellow-500">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={20}
                    fill={star <= rating ? "currentColor" : "none"}
                    strokeWidth={1.5}
                />
            ))}
            <span className="ml-2 text-sm text-gray-600">
                {rating} estrela{rating > 1 ? "s" : ""}
            </span>
        </div>
    );
}

export default StaticStars