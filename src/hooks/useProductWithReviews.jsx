import { useState, useEffect } from "react";
import axios from "axios";

function useProductWithReviews(productId) {
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductAndReviews = async () => {
        try {
            const [productRes, reviewsRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_URL}/api/products/${productId}`),
                axios.get(`${import.meta.env.VITE_API_URL}/api/reviews/product/${productId}`)
            ]);
            setProduct(productRes.data);
            setReviews(reviewsRes.data);
        } catch (err) {
            console.error("Erro ao buscar dados do produto ou avaliações:", err);
        } finally {
            setLoading(false);
        }
        };

        if (productId) fetchProductAndReviews();
    }, [productId]);

    return {
        product,
        reviews,
        setReviews,
        loading,
    };
}

export default useProductWithReviews;
