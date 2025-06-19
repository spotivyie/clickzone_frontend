import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

import logo from "../../assets/clickzone.png"

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-sm text-white">
            <div className="py-20 px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-64">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between gap-16">
                    {/* Left */}
                    <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-6">
                        <Link to="/" className="text-3xl font-semibold text-black tracking-wide">
                            <img src={logo} alt="ClickZone Logo" className="h-14 w-auto"/>
                        </Link>
                        <p className="text-white-500">2025 Local</p>
                        <span className="font-medium">hello@algo.dev</span>
                        <span className="font-medium">(99) 99999-9999</span>
                        <div className="flex gap-4 mt-2 text-white-600">
                            <Facebook size={20} className="hover:text-black cursor-pointer" />
                            <Instagram size={20} className="hover:text-black cursor-pointer" />
                            <Youtube size={20} className="hover:text-black cursor-pointer" />
                            <Twitter size={20} className="hover:text-black cursor-pointer" />
                        </div>
                    </div>

                    {/* Center */}
                    <div className="hidden lg:flex justify-between w-1/2">
                        {[
                            {
                                title: 'COMPANIA',
                                links: ['Sobre nós', 'Carreiras', 'Afiliados', 'Blog', 'Contate nós'],
                            },
                            {
                                title: 'LOJA',
                                links: ['Novos Produtos', 'Headset', 'Monitor', 'Teclado', 'Todos os Produtos'],
                            },
                            {
                                title: 'AJUDA',
                                links: ['Atendimento Personalizado', 'Minha Conta', 'Encontre uma Loja', 'Vale-Presente', 'Termos de Privacidade'],
                            },
                        ].map((section) => (
                            <div key={section.title} className="flex flex-col gap-4">
                                <h2 className="font-semibold text-base text-white">{section.title}</h2>
                                {section.links.map((link) => (
                                    <Link to="#" key={link} className="hover:underline text-white">
                                        {link}
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Right */}
                    <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-6">
                        <h2 className="font-semibold text-base text-white">ASSINE NOSSA NEWSLETTER</h2>
                        <p className="text-white">Seja o primeiro a receber as últimas notícias sobre tendências, promoções e mais!</p>
                        <div className="flex rounded overflow-hidden border">
                            <input
                                type="email"
                                placeholder="Seu email"
                                className="flex-1 p-3 outline-none text-white"
                            />
                            <button className="bg-gray-100 text-gray-800 px-4 text-sm font-medium hover:bg-gray-400">ENTRAR</button>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-16 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-white">
                    <div>© 2025 CLICKZONE</div>
                    <div className="flex flex-col md:flex-row gap-6 text-sm">
                        <div>
                            <span className="mr-2 text-white">Linguagem:</span>
                            <span className="font-medium text-white">Português (Brasil)</span>
                        </div>
                        <div>
                            <span className="mr-2 text-white">Moeda:</span>
                            <span className="font-medium text-white">BRL (R$)</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
