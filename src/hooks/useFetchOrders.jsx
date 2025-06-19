import { useEffect, useState } from "react";
import axios from "axios";

function useFetchOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrders(res.data);
        } catch (err) {
            setError(
                err.response?.data?.msg || "Erro ao carregar pedidos. Tente novamente."
            );
        } finally {
            setLoading(false);
        }
        };

        fetchOrders();
    }, []);

    return { orders, setOrders, loading, error };
}

export default useFetchOrders;
