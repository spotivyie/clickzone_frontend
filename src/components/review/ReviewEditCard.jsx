import React, { useState } from 'react';
import axios from 'axios';

function ReviewEditCard({ review, token, onUpdated, onCancel }) {
    const [rating, setRating] = useState(review.rating);
    const [comment, setComment] = useState(review.comment);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleUpdate = async () => {
        setLoading(true);
        setMessage('');
        try {
        await axios.put(
            `${import.meta.env.VITE_API_URL}/api/reviews/${review._id}`,
            { rating, comment },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage('Comentário atualizado com sucesso!');
            if (onUpdated) onUpdated();  // para atualizar a lista após edição
        } catch (err) {
            setMessage('Erro ao atualizar: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border p-4 rounded mb-4">
        <h3 className="font-bold mb-2">Editar Comentário</h3>

        <label className="block mb-2">
            Nota:
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="border p-1 ml-2">
                {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
        </label>

        <label className="block mb-2">
            Comentário:
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="border p-2 w-full"
            />
        </label>

        <div className="flex space-x-2">
            <button
                onClick={handleUpdate}
                disabled={loading}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
                {loading ? 'Salvando...' : 'Salvar'}
            </button>
            <button
                onClick={onCancel}
                disabled={loading}
                className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
            >
                Cancelar
            </button>
        </div>

        {message && <p className="mt-2 text-sm">{message}</p>}
        </div>
    );
}

export default ReviewEditCard;
