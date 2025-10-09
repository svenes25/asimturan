"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import {useCategories} from "@/lib/categories";
import {useProducts} from "@/lib/products";
import {useCart} from "@/lib/cart";

export default function ProductsPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const {categories} = useCategories()
    const {products} = useProducts()
    const {addToCart} = useCart()
    const toggleCategory = (category: string) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const productCategoryNames = product.categories?.map(c => c.name) || [];
        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.some(cat => productCategoryNames.includes(cat));
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        return matchesSearch && matchesCategory && matchesPrice;
    });


    return (
        <div>
            <Header />
            <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full lg:w-1/4 bg-gray-50 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Filtreler</h2>

                    {/* Arama */}
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Ürün ara..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Kategori */}
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">Kategoriler</h3>
                        {categories.map((cat, idx) => (
                            <label key={idx} className="flex items-center gap-2 mb-1 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(cat.name)}
                                    onChange={() => toggleCategory(cat.name)}
                                    className="w-4 h-4"
                                />
                                <span>{cat.name}</span>
                            </label>
                        ))}
                    </div>

                    {/* Fiyat Aralığı */}
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">Fiyat Aralığı (₺)</h3>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-12">Min:</span>
                            <input
                                type="number"
                                value={priceRange[0]}
                                min={0}
                                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                className="w-20 px-2 py-1 border border-gray-300 rounded-lg text-sm"
                                placeholder="Min"
                            />
                            <input
                                type="range"
                                min={0}
                                max={10000}
                                value={priceRange[0]}
                                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                className="flex-1"
                            />
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-12">Max:</span>
                            <input
                                type="number"
                                value={priceRange[1]}
                                max={10000}
                                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                className="w-20 px-2 py-1 border border-gray-300 rounded-lg text-sm"
                                placeholder="Max"
                            />
                            <input
                                type="range"
                                min={0}
                                max={10000}
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                className="flex-1"
                            />
                        </div>
                        <p className="text-gray-600 text-sm mt-2">
                            Seçilen fiyat aralığı: {priceRange[0]}₺ - {priceRange[1]}₺
                        </p>
                    </div>
                </aside>

                {/* Ürünler */}
                <main className="w-full lg:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.length === 0 ? (
                        <p className="col-span-full text-center text-gray-500">Bu filtreye uygun ürün bulunamadı.</p>
                    ) : (
                        filteredProducts.map(product => (
                            <div
                                key={product.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                <img
                                    src={`http://localhost:8000${product.image_url}`}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                                    <div className="flex items-center mb-2">
                                        <div className="flex text-yellow-400 mr-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={16}
                                                    fill={i < Math.floor(product.star_avg) ? "currentColor" : "none"}
                                                />
                                            ))}
                                        </div>
                                        <span> {product.star_count}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-2xl font-bold text-blue-600">{product.price}₺</span>
                                    </div>
                                    <div className="space-y-2">
                                        <button
                                            onClick={() => router.push(`/products/${product.id}`)}
                                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Detayları Gör
                                        </button>
                                            <button
                                                onClick={() => addToCart(product)}
                                                className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                                            >
                                                Sepete Ekle
                                            </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
}
