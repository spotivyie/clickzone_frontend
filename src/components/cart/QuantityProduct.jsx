import React, { useEffect, useState } from 'react'
import { useCart } from '../../context/CartContext'

const Add = ({ productId, stockNumber, product, selectedImage  }) => {
    const [quantity, setQuantity] = useState(1)
    const { addToCart } = useCart()

    useEffect(() => {
        setQuantity(1)
    }, [productId])

    const handleQuantity = (type) => {
        if (type === "d" && quantity > 1) {
            setQuantity(prev => prev - 1)
        }
        if (type === "i" && quantity < stockNumber) {
            setQuantity(prev => prev + 1)
        }
    }

    const handleAddToCart = () => {
        addToCart({ ...product, quantity, image: selectedImage })
    }

    if (stockNumber < 1) {
        return (
            <div className='text-red-500 text-sm mt-4'>
                Produto fora de estoque
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-4'>
            <h4 className='font-medium'>Escolha a quantidade</h4>
            <div className='flex justify-between'>
                <div className='flex items-center gap-4'>
                    <div className='bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32'>
                        <button className='cursor-pointer text-xl' onClick={() => handleQuantity("d")}>-</button>
                        {quantity}
                        <button className='cursor-pointer text-xl' onClick={() => handleQuantity("i")}>+</button>
                    </div>
                    <div className='text-xs'>
                        Resta apenas <span className='text-orange-500'>{stockNumber} item{stockNumber > 1 && 's'}</span>
                    </div>
                </div>
                <button 
                    className='w-48 text-sm rounded-3xl ring-1 py-2 px-4 cursor-pointer'
                    onClick={handleAddToCart}
                >
                    Adicionar ao carrinho
                </button>
            </div>
        </div>
    )
}

export default Add
