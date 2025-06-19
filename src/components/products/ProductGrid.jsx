import ProductCard from "./ProductCard";

function ProductGrid({ products }) {
    if (!products || products.length === 0)
        return <p>Nenhum produto encontrado.</p>;

    return (
        <div className="flex flex-wrap gap-4 items-start justify-between">
            {products.map((prod) => (
                <div
                    key={prod._id}
                    className="w-full sm:w-[48%] lg:w-[23.5%]"
                >
                    <ProductCard product={prod} />
                </div>
            ))}
        </div>
    );
}

export default ProductGrid;
