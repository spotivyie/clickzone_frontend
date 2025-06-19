import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useCategoryFilters() {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);

    const [filters, setFilters] = useState({
        category: query.get("category") || "",
        name: query.get("name") || "",
        minPrice: query.get("minPrice") || "",
        maxPrice: query.get("maxPrice") || "",
    });

    const [page, setPage] = useState(Number(query.get("page")) || 1);

    useEffect(() => {
        setFilters({
            category: query.get("category") || "",
            name: query.get("name") || "",
            minPrice: query.get("minPrice") || "",
            maxPrice: query.get("maxPrice") || "",
        });
        setPage(Number(query.get("page")) || 1);
    }, [location.search]);

    useEffect(() => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, val]) => val && params.append(key, val));
        if (page !== 1) params.append("page", page);
        navigate(`/category?${params.toString()}`, { replace: true });
    }, [filters, page]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "category" && { name: "" }),
        }));
        setPage(1);
    };

    return { filters, setFilters, page, setPage, handleFilterChange };
}
