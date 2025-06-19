import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from "lucide-react";

const SearchBar = () => {
    const navigate = useNavigate()
    
    const handleSearch = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name")?.toString().trim();

        if (name) {
            navigate(`/category?name=${encodeURIComponent(name)}`);
        }
    }

    return (
        <form 
            className='flex bg-white text-black rounded-md overflow-hidden w-full' 
            onSubmit={handleSearch}
        >
            <input 
                type="text" 
                name='name'
                placeholder='Pesquisar' 
                className='flex-1 bg-transparent outline-none w-20 text-sm sm:text-base pl-3'
            />
            <button 
                type="submit"
                className="p-3 bg-orange-500 hover:bg-orange-400 rounded-r-md h-full flex items-center justify-center"
            >
                <Search size={18} className="text-white" />
            </button>
        </form>
    )
}

export default SearchBar
