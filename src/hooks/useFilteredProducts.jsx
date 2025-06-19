import { useEffect, useState } from "react";
import axios from "axios";

export function useFilteredProducts(filters, page) {
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        axios
        .get(`${import.meta.env.VITE_API_URL}/api/products`, {
            params: { ...filters, page, limit: 20 },
        })
        .then(({ data }) => {
            setProducts(data.products);
            setTotalPages(data.pages);
        })
        .catch((err) => console.error("Erro ao carregar produtos:", err));
    }, [filters, page]);

    return { products, totalPages };
}
