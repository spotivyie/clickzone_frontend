import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRef, useState } from "react";
//icons
import { User, Menu, X } from "lucide-react"; 
//components
import Cart from "../cart/Cart.jsx";
import Category from "../category/Category.jsx";
import SearchBar from "../search/SearchBar.jsx";
//hooks
import useScrollShowCategory from "../../hooks/useScrollShowCategory.jsx";
import useUserAuth from "../../hooks/useUserAuth.jsx";
import useDropdownToggle from "../../hooks/useDropdownToggle.jsx";

import logo from "../../assets/clickzone.png"

function HeaderPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useUserAuth();
    const showCategory = useScrollShowCategory();

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    useDropdownToggle(open, setOpen, dropdownRef);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("userChanged"));
        navigate("/login");
    };

    // Mostrar categorias apenas na página inicial
    const showCategoria = location.pathname === "/";

    return (
        <header className="bg-gray-800 shadow p-4 items-center h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 fixed top-0 left-0 right-0 z-50">
            <div className="flex items-center justify-between h-full max-w-6xl mx-auto w-full">
            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0">
                <img src={logo} alt="ClickZone Logo" className="h-8 md:h-12 w-auto" />
            </Link>

            {/* Search Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-4">
                <SearchBar />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4 relative">
                {user ? (
                <div className="relative flex flex-col items-start" ref={dropdownRef}>
                    <button
                        onClick={() => setOpen((p) => !p)}
                        className="flex items-center text-white cursor-pointer pr-3 md:pr-5"
                    >
                        <User className="w-6 h-6 border rounded-2xl mr-2" />
                        Olá, {user.name}
                    </button>
                        {open && (
                            <div className="absolute right-0 mt-8 bg-white border border-gray-200 rounded-md w-44 shadow-lg z-20 p-2">
                                {user.isAdmin && (
                                    <>
                                        <Link to="/adminDashboard" onClick={() => setOpen(false)} className="block hover:bg-gray-100 rounded px-2 py-1">Dashboard</Link>
                                        <Link to="/adminOrdersPage" onClick={() => setOpen(false)} className="block hover:bg-gray-100 rounded px-2 py-1">Pedidos</Link>
                                        <Link to="/admin/products" onClick={() => setOpen(false)} className="block hover:bg-gray-100 rounded px-2 py-1">Produtos</Link>
                                    </>
                                )}
                                <div className="border-gray-300">
                                    <Link to="/category" onClick={() => setOpen(false)} className="block hover:bg-gray-100 rounded px-2 py-1">Categorias</Link>
                                    <Link to="/userOrder" onClick={() => setOpen(false)} className="block hover:bg-gray-100 rounded px-2 py-1">Meus Pedidos</Link>
                                    <Link to="/perfil" onClick={() => setOpen(false)} className="block hover:bg-gray-100 rounded px-2 py-1">Atualizar Perfil</Link>
                                    <button onClick={handleLogout} className="w-full text-left hover:bg-gray-100 rounded px-2 py-1 border-t border-gray-300">Sair</button>
                                </div>
                            </div>
                        )}
                </div>
                ) : (
                    <Link to="/login" className="flex items-center text-white pr-5 cursor-pointer">
                        <User className="w-6 h-6 border rounded-2xl mr-2" />
                        Olá, faça seu login
                    </Link>
                )}
                <Cart />
            </nav>

                {/* Mobile menu button */}
                <div className="md:hidden flex items-center space-x-4">
                    <button onClick={() => setMobileMenuOpen((p) => !p)} aria-label="Abrir menu" className="text-white focus:outline-none">
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <Cart />
                </div>
            </div>
            {mobileMenuOpen && (
                <div className="md:hidden bg-gray-900 text-white rounded px-4 pb-4 space-y-3">
                    <div className="pt-4">
                        <SearchBar />
                    </div>
                    <div className="border-t border-gray-700 pt-3">
                        {user ? (
                            <>
                                <p className="mb-2">Olá, {user.name}</p>
                                {user.isAdmin && (
                                    <>
                                        <Link to="/adminDashboard" onClick={() => setMobileMenuOpen(false)} className="block px-2 py-1 hover:bg-gray-700 rounded">Dashboard</Link>
                                        <Link to="/adminOrdersPage" onClick={() => setMobileMenuOpen(false)} className="block px-2 py-1 hover:bg-gray-700 rounded">Pedidos</Link>
                                        <Link to="/admin/products" onClick={() => setMobileMenuOpen(false)} className="block px-2 py-1 hover:bg-gray-700 rounded">Produtos</Link>
                                    </>
                                )}
                                <Link to="/category" onClick={() => setMobileMenuOpen(false)} className="block px-2 py-1 hover:bg-gray-700 rounded">Categorias</Link>
                                <Link to="/userOrder" onClick={() => setMobileMenuOpen(false)} className="block px-2 py-1 hover:bg-gray-700 rounded">Meus Pedidos</Link>
                                <Link to="/perfil" onClick={() => setMobileMenuOpen(false)} className="block px-2 py-1 hover:bg-gray-700 rounded">Atualizar Perfil</Link>
                                <button onClick={handleLogout} className="w-full text-left hover:bg-gray-700 rounded px-2 py-1 border-t border-gray-700 mt-2">Sair</button>
                            </>
                        ) : (
                            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block px-2 py-1 hover:bg-gray-700 rounded">Faça seu login</Link>
                        )}
                    </div>
                </div>
            )}

            {showCategoria && (
                <div
                    className={`pt-4 transition-all duration-300 ease-in-out overflow-hidden ${
                        showCategory ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <Category />
                </div>
            )}
        </header>
    );
}

export default HeaderPage;
