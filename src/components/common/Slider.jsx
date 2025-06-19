import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const slides = [ 
    {
        id: 1,
        title: "Visão de Outro Nível",
        description: "Monitores gamers com 144Hz e 1ms de resposta em oferta!",
        img: "https://images.pexels.com/photos/1714202/pexels-photo-1714202.jpeg",
        url: "/",
    },
    {
        id: 2,
        title: "Tela UltraWide",
        description: "Aumente sua produtividade com monitores panorâmicos.",
        img: "https://images.unsplash.com/photo-1548611716-3000815a5803?q=80&w=1600&auto=format&fit=crop",
        url: "/",
    },
    {
        id: 3,
        title: "Imagens Incríveis",
        description: "Monitores 4K com cores vivas para criadores exigentes.",
        img: "https://images.unsplash.com/photo-1604781109199-ced99b89b0f6?q=80&w=1600&auto=format&fit=crop",
        url: "/",
    },
]

const Slider = () => {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev === slides.length - 1 ? 0 : prev + 1))
        }, 5000) // tempo mais suave

        return () => clearInterval(interval)
    }, [current]) 

    return (
        <div className='relative h-[calc(100vh-80px)] max-h-[600px] overflow-hidden mt-20'>
            <div 
                className='w-max h-full flex transition-transform ease-in-out duration-1000'
                style={{ transform: `translateX(-${current * 100}vw)` }}
            >
                {slides.map(slide => (
                    <div 
                        key={slide.id}
                        className='relative w-screen h-full flex items-center justify-center'
                    >
                        {/* Imagem de fundo */}
                        <img 
                            src={slide.img}
                            alt={slide.title}
                            className='absolute top-0 left-0 w-full h-full object-cover'
                            loading="lazy"
                        />

                        {/* Overlay */}
                        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0" />

                        {/* Conteúdo do texto */}
                        <div className='relative z-10 text-white text-center px-4 flex flex-col items-center gap-4'>
                            <h2 className='text-base sm:text-xl lg:text-2xl'>{slide.description}</h2>
                            <h1 className='text-3xl sm:text-5xl lg:text-6xl font-bold'>{slide.title}</h1>
                            {/* <Link to={slide.url}>
                                <button className='mt-4 bg-white text-black py-2 px-4 rounded-md text-sm sm:text-base'>
                                    COMPRAR AGORA
                                </button>
                            </Link> */}
                        </div>
                    </div>
                ))}
            </div>

            {/* Dots de navegação */}
            <div className='absolute left-1/2 bottom-6 transform -translate-x-1/2 flex gap-3 z-20'>
                {slides.map((_, index) => (
                    <div 
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full ring-1 ring-white cursor-pointer flex items-center justify-center transition-transform ${current === index ? "scale-125" : ""}`} 
                    >
                        {current === index && (
                            <div className='w-2 h-2 bg-white rounded-full'></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Slider
