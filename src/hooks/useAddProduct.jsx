import { useState, useEffect } from "react";
import axios from "axios";

function useAddProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrls, setImageUrls] = useState([""]);
    const [category, setCategory] = useState("");
    const [stockQty, setStockQty] = useState(0);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isAdmin, setIsAdmin] = useState(true);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.isAdmin) setIsAdmin(false);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!name || !description || !price || !category || stockQty < 0 || imageUrls.some((url) => !url)) {
            return setError("Preencha todos os campos corretamente.");
        }

        try {
            const token = localStorage.getItem("token");

            await axios.post(`${import.meta.env.VITE_API_URL}/api/products`, {
                name,
                description,
                price: parseFloat(price),
                image: imageUrls, 
                category,
                stock: Number(stockQty),
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setSuccess("Produto adicionado com sucesso!");
            setName("");
            setDescription("");
            setPrice("");
            setImageUrls([""]);
            setCategory("");
            setStockQty(0);
        } catch (err) {
            setError(err.response?.data?.msg || "Erro ao adicionar produto.");
        }
    };

    return {
        name, description, price, imageUrls, category, stockQty,
        setName, setDescription, setPrice, setImageUrls, setCategory, setStockQty,
        error, success, isAdmin, handleSubmit
    };
}

export default useAddProduct;
