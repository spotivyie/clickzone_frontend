import { useState, useEffect } from "react";
import axios from "axios";

function useProductForm(productId, onSuccess) {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: 0,
        image: [""], 
        category: "",
        stock: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${productId}`);
            setProduct({
                ...res.data,
                image: Array.isArray(res.data.image) ? res.data.image : [res.data.image || ""],
            });
        } catch (err) {
            console.error("Erro ao buscar produto:", err);
        } finally {
            setLoading(false);
        }
        };
        fetchProduct();
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "image") {
        setProduct((prev) => ({
            ...prev,
            image: Array.isArray(value) ? value : [value],
        }));
        } else {
        setProduct((prev) => ({
            ...prev,
            [name]: name === "price" || name === "stock" ? Number(value) : value,
        }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/products/${productId}`,
                product,
                { headers: { Authorization: `Bearer ${token}` } }
        );
            alert("Produto atualizado com sucesso!");
            if (onSuccess) onSuccess();
        } catch (err) {
            console.error("Erro ao atualizar produto:", err);
            alert("Erro ao atualizar produto");
        }
    };

    return { product, handleChange, handleSubmit, loading };
}

export default useProductForm;
