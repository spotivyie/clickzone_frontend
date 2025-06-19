import { Star } from "lucide-react";

function ReviewSummary({ reviews }) {
    const total = reviews.length;
    const avgRating =
        total > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) / total
            : 0;

    // Contar quantidade de avaliações por estrela (1 a 5)
    const starCounts = [1, 2, 3, 4, 5].reduce((acc, star) => {
        acc[star] = reviews.filter((r) => r.rating === star).length;
        return acc;
    }, {});

    // Calcular porcentagens
    const percentages = [5, 4, 3, 2, 1].map((star) => {
        const count = starCounts[star] || 0;
        const percent = total > 0 ? (count / total) * 100 : 0;
        return {
            star,
            percent: percent.toFixed(1),
        };
    });

    return (
        <div className="w-full p-4 md:p-0 md:pt-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Avaliações de clientes</h2>

            {/* Nota média e estrelas */}
            <div className="flex items-center gap-2 text-2xl font-bold mb-1">
                {avgRating.toFixed(1)} de 5
            </div>
            <div className="flex items-center gap-1 text-yellow-500 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        size={20}
                        fill={i < Math.round(avgRating) ? "currentColor" : "none"}
                        strokeWidth={1.5}
                    />
                ))}
            </div>
            <p className="text-sm text-gray-600 mb-4">{total} avaliações globais</p>

            {/* Barras de porcentagem por estrela */}
            <div className="flex flex-col gap-1">
                {percentages.map(({ star, percent }) => (
                    <div key={star} className="flex items-center mb-4 gap-2 text-sm">
                        <span className="text-right">{star} estrela{star > 1 ? "s" : ""}</span>
                        <div className="flex-1 h-3 bg-gray-200 rounded">
                            <div
                                className="h-full bg-yellow-400 rounded"
                                style={{ width: `${percent}%` }}
                            />
                        </div>
                        <span className="w-10 text-gray-600 text-right">{percent}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReviewSummary;
