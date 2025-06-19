import { Link } from "react-router-dom";

function UserDropdown({ user, onLogout, dropdownRef, open, setOpen }) {
    return (
        <div className="flex flex-col items-start" ref={dropdownRef}>
            <span
                className="text-sm cursor-pointer hover:text-gray-800 pr-5"
                onClick={() => setOpen((prev) => !prev)}
            >
                Olá, {user.name}
            </span>
            {open && (
                <div className="absolute mt-7 bg-white border border-gray-200 rounded-md shadow-lg w-44 z-10 p-2">
                    {user.isAdmin && (
                        <div className="space-y-1">
                            <Link to="/adminDashboard" onClick={() => setOpen(false)} className="block hover:underline">Dashboard</Link>
                            <Link to="/adminOrdersPage" onClick={() => setOpen(false)} className="block hover:underline">Pedidos</Link>
                            <Link to="/admin/products" onClick={() => setOpen(false)} className="block hover:underline pb-1">Produtos</Link>
                        </div>
                    )}
                    <div className="space-y-1">
                        <Link to="/category" onClick={() => setOpen(false)} className="block hover:underline">Categorias</Link>
                        <Link to="/userOrder" onClick={() => setOpen(false)} className="block hover:underline">Meus Pedidos</Link>
                        <Link to="/perfil" onClick={() => setOpen(false)} className="block hover:underline">Atualizar Perfil</Link>
                        <button
                            onClick={() => {
                                setOpen(false);
                                onLogout();
                            }}
                            className="block text-left w-full hover:underline text-red-600"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserDropdown;
