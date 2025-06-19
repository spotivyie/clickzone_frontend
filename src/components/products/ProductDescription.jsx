import React, { useState } from "react";

function ProductDescription({ description }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => setIsExpanded(!isExpanded);

    const shouldTruncate = description.length > 500;
    const displayText = isExpanded || !shouldTruncate
        ? description
        : description.slice(0, 500) + "...";

    return (
        <div className="text-gray-700 mt-2">
            <p>{displayText}</p>
            {shouldTruncate && (
                <button
                    onClick={toggleDescription}
                    className="text-black hover:underline mt-1 text-sm font-medium mb-4"
                >
                    {isExpanded ? "Ler menos" : "Ler mais"}
                </button>
            )}
        </div>
    );
}

export default ProductDescription;
