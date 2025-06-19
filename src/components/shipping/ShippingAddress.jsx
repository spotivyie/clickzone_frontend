import React from "react";

function ShippingAddress({ address, onChange }) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-3">Endereço de Entrega</h2>
            <div className="space-y-3">
                <input
                    name="street"
                    placeholder="Rua"
                    value={address.street}
                    onChange={onChange}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                />
                <input
                    name="city"
                    placeholder="Cidade"
                    value={address.city}
                    onChange={onChange}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                />
                <input
                    name="state"
                    placeholder="Estado"
                    value={address.state}
                    onChange={onChange}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                />
                <input
                    name="zip"
                    placeholder="CEP"
                    value={address.zip}
                    onChange={onChange}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                />
            </div>
        </div>
    );
}

export default ShippingAddress;
