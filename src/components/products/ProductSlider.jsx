import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "./ProductCard";

function ProductSlider() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
        .get(`${import.meta.env.VITE_API_URL}/api/products`)
        .then((res) => setProducts(res.data.products))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Carregando produtos...</p>;
    if (products.length === 0) return <p>Nenhum produto encontrado.</p>;

    return (
        <div className="relative">
            <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                navigation={{
                    nextEl: ".swiper-button-next-custom",
                    prevEl: ".swiper-button-prev-custom",
                }}
                breakpoints={{
                    640: { slidesPerView: 3 },
                    1024: { slidesPerView: 6 },
                }}
            >
                {products.map((prod) => (
                    <SwiperSlide key={prod._id}>
                        <ProductCard product={prod} />
                    </SwiperSlide>
                ))}
            </Swiper>

            {["prev", "next"].map((dir) => (
                <button
                    key={dir}
                    className={`swiper-button-${dir}-custom absolute top-1/2 ${
                        dir === "prev" ? "left-10" : "right-10"
                    } -translate-y-1/2 bg-white shadow p-2 rounded-full z-10 hover:bg-gray-100`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={
                                dir === "prev"
                                ? "M15 19l-7-7 7-7"
                                : "M9 5l7 7-7 7"
                            }
                        />
                    </svg>
                </button>
            ))}
        </div>
    );
}

export default ProductSlider;
