import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function ProductCategory() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category");

    useEffect(() => {
        if (!category) return;

        axios.get(`http://localhost:5000/api/products?category=${category}`)
            .then(res => setProducts(res.data.products))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [category]);

    if (loading) return <p>Carregando produtos da categoria...</p>;
    if (products.length === 0) return <p>Nenhum produto encontrado nessa categoria.</p>;

    return (
        <div className='p-4 flex flex-wrap gap-4'>
            {products.map(prod => (
                <div key={prod._id} className='border p-4 w-full sm:w-[45%] lg:w-[22%]'>
                    <h2>{prod.name}</h2>
                    <p>R$ {prod.price.toFixed(2)}</p>
                    <button className='mt-2 rounded-md border px-4 py-2 text-sm text-blue-600'>
                        Adicionar ao carrinho
                    </button>
                </div>
            ))}
        </div>
    );
}

export default ProductCategory;
