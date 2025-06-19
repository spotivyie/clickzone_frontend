import { useEffect, useState } from "react";
import axios from "axios";

export function useProductCategories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
        .get(`${import.meta.env.VITE_API_URL}/api/products`)
        .then(({ data }) => {
            const unique = [...new Set(data.products.map((p) => p.category))].filter(Boolean);
            setCategories(unique);
        })
        .catch((err) => console.error("Erro ao carregar categorias:", err));
    }, []);

    return categories;
}
