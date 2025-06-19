import { Tag, FileText, BadgeDollarSign, Layers, Package, Image, PlusCircle, Trash2 } from "lucide-react";
import InputField from "../common/InputField";

function CreateProductForm({
    title,
    name,
    description,
    price,
    category,
    imageUrls,
    stockQty,
    setName,
    setDescription,
    setPrice,
    setCategory,
    setImageUrls,
    setStockQty,
    handleSubmit,
    error,
    success,
    buttonText,
}) {
    const handleImageChange = (index, value) => {
        const newImageUrls = [...imageUrls];
        newImageUrls[index] = value;
        setImageUrls(newImageUrls);
    };

    const handleAddImageField = () => {
        setImageUrls([...imageUrls, ""]);
    };

    const handleRemoveImageField = (index) => {
        const newImageUrls = imageUrls.filter((_, i) => i !== index);
        setImageUrls(newImageUrls);
    };

    return (
        <div className="max-w-md mx-auto mt-22 mb-10 p-4">
            <h2 className="text-3xl mb-6 font-semibold text-gray-700">{title}</h2>

            {error && <p className="text-red-600 mb-4">{error}</p>}
            {success && <p className="text-green-600 mb-4">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <LabeledField icon={Tag} label="Nome">
                    <InputField value={name} onChange={(e) => setName(e.target.value)} required />
                </LabeledField>

                <LabeledField icon={FileText} label="Descrição">
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full pl-2 pr-3 py-2 resize-none border border-gray-700 rounded-lg focus:ring-black"
                        rows={4}
                        required
                    />
                </LabeledField>

                <LabeledField icon={BadgeDollarSign} label="Preço (R$)">
                    <InputField
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </LabeledField>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        URLs das Imagens
                    </label>

                    {imageUrls.map((url, idx) => (
                        <div key={idx} className="flex items-center gap-2 mb-2 ">
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => handleImageChange(idx, e.target.value)}
                                placeholder={`URL da imagem ${idx + 1}`}
                                className="flex-grow border border-gray-700 rounded-md px-3 py-3"
                            />
                            {imageUrls.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImageField(idx)}
                                    className="text-red-600 hover:text-red-800"
                                    aria-label="Remover imagem"
                                    title="Remover imagem"
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={handleAddImageField}
                        className="mt-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Adicionar nova imagem
                    </button>
                </div>

                <LabeledField icon={Layers} label="Categoria">
                    <InputField
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </LabeledField>

                <LabeledField icon={Package} label="Estoque">
                    <InputField
                        type="number"
                        value={stockQty}
                        onChange={(e) => setStockQty(e.target.value)}
                    />
                </LabeledField>

                <button
                    type="submit"
                    className="w-full bg-gray-800 text-white mt-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition duration-200"
                >
                    {buttonText}
                </button>
            </form>
        </div>
    );
}

function LabeledField({ icon: Icon, label, children }) {
    return (
        <div>
            <label className="flex mb-1 font-medium text-gray-700">
                <Icon className="text-gray-400 w-5 h-5" />
                <span className="pl-1">{label}</span>
            </label>
            {children}
        </div>
    );
}

export default CreateProductForm;
