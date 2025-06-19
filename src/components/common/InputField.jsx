import React from "react";

function InputField({ label, name, placeholder, value, onChange, type }) {
    return (
        <div className="flex flex-col">
            {label && (
                <label htmlFor={name} className="mb-1 font-semibold text-gray-700">
                    {label}
                </label>
            )}
            <input
                id={name}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                required
            />
        </div>
    );
}

export default InputField;
