import { useEffect, useState } from "react";
import axios from "axios";

function useOrderDetails(orderId, onSuccess) {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/${orderId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrder(res.data);

            if (onSuccess) onSuccess(res.data); 
        } catch (err) {
            console.error("Erro ao buscar pedido:", err);
        } finally {
            setLoading(false);
        }
        };

        fetchOrder();
    }, [orderId, onSuccess]);

    return { order, loading };
}

export default useOrderDetails;
