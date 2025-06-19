import CreateProductForm from "../../components/products/CreateProductForm";
import useAddProduct from "../../hooks/useAddProduct";

function AddProductPage() {
    const {
        name, description, price, category, imageUrls, stockQty,
        setName, setDescription, setPrice, setCategory, setImageUrls, setStockQty,
        error, success, isAdmin, handleSubmit
    } = useAddProduct();

    if (!isAdmin) {
        return (
            <div className="max-w-md mx-auto mt-10 p-6 text-red-600 font-semibold text-center">
                Acesso negado. Esta página é restrita para administradores.
            </div>
        );
    }

    return (
        <CreateProductForm
            title="Adicionar Produto"
            name={name}
            description={description}
            price={price}
            category={category}
            imageUrls={imageUrls}              
            stockQty={stockQty}
            setName={setName}
            setDescription={setDescription}
            setPrice={setPrice}
            setCategory={setCategory}
            setImageUrls={setImageUrls}        
            setStockQty={setStockQty}
            handleSubmit={handleSubmit}
            error={error}
            success={success}
            buttonText="Adicionar Produto"
        />
    );
}

export default AddProductPage;
