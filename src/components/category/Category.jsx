import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

function Category() {
    const [categories, setCategories] = useState([]);
    // const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/products/`)
            .then((res) => {
                const products = res.data.products;
                console.log(products.map(p => p.category));

                const uniqueCategories = [...new Set(products.map((p) => p.category))].filter(Boolean);
                setCategories(uniqueCategories);
            })
            .catch((err) => console.error(err));
    }, []);

    // Scroll para a seção com a classe fornecida
    const scrollToClass = (className) => {
        const section = document.querySelector(`.${className}`);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="bg-gray-800 sm:px-8 lg:px-18 fixed top-20 left-0 right-0 shadow-sm">
            <div className="max-w-6xl mx-auto h-14 hidden md:flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        to="/category"
                        className="px-2 py-1 bg-white text-sm font-semibold text-gray-800 rounded border border-gray-300 hover:bg-gray-900 hover:text-white transition"
                    >
                        Todas as categorias
                    </Link>
                    <button
                        onClick={() => scrollToClass("scroll-todos")}
                        className="px-2 py-1 bg-gray-600 text-white text-sm font-semibold  rounded border border-gray-500 hover:bg-gray-500 transition cursor-pointer"
                    >
                        Todos os produtos
                    </button>
                </div>
                <div className="hidden lg:flex items-center gap-8">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => navigate(`/category?category=${encodeURIComponent(cat)}`)}
                            className="text-sm font-medium text-white cursor-pointer"
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Category;
