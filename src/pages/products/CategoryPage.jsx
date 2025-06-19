import { Link } from "react-router-dom";
import { useFilteredProducts } from "../../hooks/useFilteredProducts";
import { useProductCategories } from "../../hooks/useProductCategories";
import { useCategoryFilters } from "../../hooks/useCategoryFilters";
import ButtonCart from "../../components/common/ButtonCart";
import ProductNavigator from "../../components/products/ProductNavigator";

function CategoryPage() {
    const { filters, page, setPage, handleFilterChange } = useCategoryFilters();
    const { products, totalPages } = useFilteredProducts(filters, page);
    const categories = useProductCategories();

    return (
        <div className="mt-22 mb-10 p-4 md:p-0 md:py-4 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">
                Resultados {filters.name && `- "${filters.name}"`}
            </h1>

            {/* Filtros */}
            <div className="flex flex-wrap gap-4 mb-10">
                <select name="category" value={filters.category} onChange={handleFilterChange} className="border p-2 rounded border-gray-200">
                    <option value="">Todas as categorias</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                {["minPrice", "maxPrice"].map((name) => (
                    <input
                        key={name}
                        name={name}
                        type="number"
                        placeholder={`Preço ${name === "minPrice" ? "mínimo" : "máximo"}`}
                        value={filters[name]}
                        onChange={handleFilterChange}
                        className="border p-2 rounded border-gray-200"
                    />
                ))}
            </div>

            {/* Produtos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((p) => (
                    <div
                        key={p._id}
                        className="flex flex-col border rounded border-gray-200 p-4 h-full min-h-[450px] justify-between"
                    >
                        <Link to={`/produtos/${p._id}`} className="flex-grow flex flex-col">
                            <div className="aspect-square bg-white rounded overflow-hidden flex items-center justify-center mb-4">
                                <img
                                    src={p.image}
                                    alt={p.name}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                            <div className="flex-grow">
                                <h2 className="text-lg font-bold mb-1 truncate">{p.name}</h2>
                                <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                                    {p.description}
                                </p>
                            </div>
                        </Link>
                        <div className="mt-4">
                            <p className="text-gray-600 font-semibold flex items-baseline gap-1">
                                <span className="text-xs">R$</span>
                                <span className="text-lg">{p.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </p>
                            <ButtonCart product={p} />
                        </div>
                    </div>
                ))}
            </div>

            <ProductNavigator page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
    );
}

export default CategoryPage;
