import React from "react";

function ProductNavigator({ page, totalPages, onPageChange }) {
    return (
        <div className="flex justify-center mt-10 gap-2">
            <button
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
            >
                Anterior
            </button>

            <span className="px-4 py-2 font-semibold">
                Página {page} de {totalPages}
            </span>

            <button
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
            >
                Próximo
            </button>
        </div>
    );
}

export default ProductNavigator;
