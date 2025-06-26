import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//components
import ProductNavigator from "../../components/products/ProductNavigator";
//icons
import { Pencil, Trash2 } from "lucide-react";

const AdminProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const productsPerPage = 6;

    useEffect(() => {
        fetchProducts();
    }, [page]);

    const fetchProducts = () => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/products?page=${page}&limit=${productsPerPage}&sort=newest`)
            .then((res) => {
                console.log("Produtos carregados do backend:", res.data.products);
                setProducts(res.data.products);
                setTotalPages(Math.ceil(res.data.total / productsPerPage));
            })
            .catch((err) => console.error("Erro ao buscar produtos:", err));
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Tem certeza que deseja remover este produto?");
        if (!confirmDelete) return;

        const token = localStorage.getItem("token"); 

        try {
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/products/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setProducts((prev) => prev.filter((product) => product._id !== id));
        } catch (err) {
            console.error("Erro ao remover produto:", err);
            alert("Não foi possível remover o produto. Verifique se você está autenticado.");
        }
    };

    return (
        <div className="mt-22 mb-10 p-4 md:p-0 md:py-4 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Todos os Produtos</h1>

            <div className="flex pb-8">
                <Link to="/createProduct" className="border p-2 bg-gray-800 text-white hover:bg-gray-700 rounded">
                    Criar produto
                </Link>
            </div>

            <ul className="space-y-4">
                {products.map((product) => (
                    <li key={product._id} className="flex justify-between items-center border p-4 rounded gap-6">
                        <div className="flex items-center gap-6">
                            {product.image && (
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-24 h-24 object-contain"
                                />
                            )}
                            <div className="space-y-1">
                                <h2 className="font-semibold text-lg">{product.name}</h2>
                                <p>Categoria: {product.category}</p>
                                <p>Preço: {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                <p>Estoque: {product.stock}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                            <Link
                                to={`/admin/product/${product._id}`}
                                className="flex items-center gap-1 text-black hover:text-blue-600 whitespace-nowrap"
                            >
                                <Pencil size={18} />
                            </Link>
                            <button
                                onClick={() => handleDelete(product._id)}
                                className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <ProductNavigator 
                page={page} 
                totalPages={totalPages} 
                onPageChange={setPage} 
            />
        </div>
    );
};

export default AdminProductListPage;
