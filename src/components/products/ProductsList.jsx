import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductGrid from './ProductGrid';

function ProductsList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
        .get('http://localhost:5000/api/products')
        .then((res) => setProducts(res.data.products))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Carregando produtos...</p>;

    return <ProductGrid products={products} />;
}

export default ProductsList;
