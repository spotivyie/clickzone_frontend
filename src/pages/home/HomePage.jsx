import React from 'react'
// components
import Slider from '../../components/common/Slider'
import ProductSlider from '../../components/products/ProductSlider'
import NewProducts from '../../components/products/NewProducts'
import ProductsList from '../../components/products/ProductsList'

const Home = () => {
    return (
        <div className='space-y-8 lg:space-y-20'>
            <Slider />
            <div className='max-w-6xl mx-auto p-4 xl:p-0'>
                <h1 className='text-3xl mb-10 font-bold'>Produtos Novos</h1>
                <NewProducts />
            </div>
            <div className='p-4 xl:p-0'>
                <ProductSlider />
            </div>
            <div className='max-w-6xl mx-auto p-4 xl:p-0 mb-20'>
                <h1 className='text-3xl mb-10 scroll-todos font-bold'>Produtos</h1>
                <ProductsList />
            </div>
        </div>
    )
}

export default Home
