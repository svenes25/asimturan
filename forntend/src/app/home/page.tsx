"use client"
import { ShoppingCart, Star, Phone } from 'lucide-react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import React from "react";
import {useCategories} from "@/lib/categories";
import {useProducts} from "@/lib/products";

export default function HomePage() {
    const router = useRouter();
    const {categories} = useCategories()
    // const categories = [
    //     { id: 1, name: "Kâğıt Ürünleri", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop" },
    //     { id: 2, name: "Ambalaj Ürünleri", image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop" },
    //     { id: 3, name: "Temizlik Ürünleri", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop" },
    // ];

    // const products = [
    //     {
    //         id: 1,
    //         name: "Premium Wireless Headphones",
    //         price: 299.99,
    //         image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    //         rating: 4.8,
    //         reviews: 124,
    //         description: "Kristal net ses kalitesi sunan premium kablosuz kulaklık. Aktif gürültü engelleme, 30 saat pil ömrü, konforlu kulak yastıkları.",
    //         features: ["Aktif Gürültü Engelleme", "30 saat pil", "Bluetooth 5.0", "Hızlı şarj (15dk = 3sa)"],
    //         inStock: true,
    //         sold: 150,
    //         categories:5,
    //     },
    //     {
    //         id: 2,
    //         name: "Smart Fitness Watch",
    //         price: 199.99,
    //         image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=400&fit=crop",
    //         rating: 4.6,
    //         reviews: 89,
    //         description: "Fitness hedeflerinizi takip edin. Kalp ritmi izleme, GPS, 7 gün pil ömrü.",
    //         features: ["Kalp ritmi ölçer", "GPS takibi", "Su geçirmez", "7 gün pil"],
    //         inStock: true,
    //         sold: 220
    //     },
    //     {
    //         id: 3,
    //         name: "Laptop Stand Pro",
    //         price: 79.99,
    //         image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    //         rating: 4.7,
    //         reviews: 156,
    //         description: "Ergonomik alüminyum laptop standı. Yükseklik ve açı ayarlı.",
    //         features: ["Alüminyum yapı", "Ayarlanabilir yükseklik", "Isı dağılımı", "Taşınabilir"],
    //         inStock: false,
    //         sold: 90
    //     },
    //     {
    //         id: 4,
    //         name: "Wireless Charging Pad",
    //         price: 49.99,
    //         image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
    //         rating: 4.4,
    //         reviews: 67,
    //         description: "Hızlı kablosuz şarj pad’i. LED gösterge ve kaymaz yüzey.",
    //         features: ["Hızlı şarj", "Qi uyumlu", "LED gösterge", "Kaymaz yüzey"],
    //         inStock: true,
    //         sold: 180
    //     }
    // ];
    const {productsRead:products} = useProducts()
    const topSellingProducts = [...products].sort((a, b) => b.sold - a.sold);
    const topRatedProducts = [...products].sort((a, b) => b.rating - a.rating);

    return (
        <div>
            <Header />
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-9xl font-bold mb-4">ASIM TURAN</h1>
                    <h2 className="text-4xl font-semibold">KAĞIT, AMBALAJ VE TEMİZLİK ÜRÜNLERİ</h2>
                </div>
            </section>

            {/* Kategoriler */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Popüler Kategoriler</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {categories.map(cat => {
                            // Kategoriye ait ürünleri filtrele
                            const productForCategory = products.find(p =>
                                p.categories?.some(c => c.name === cat.name)
                            );
                            return (
                                <div
                                    key={cat.id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg cursor-pointer"
                                    onClick={() => router.push(`/products?category=${cat.id}`)}
                                >
                                    <img
                                        src={`http://localhost:8000${productForCategory?.image_url}`}
                                        alt={cat.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6 text-center">
                                        <h3 className="text-xl font-semibold">{cat.name}</h3>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* En Çok Satan Ürünler */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Öne Çıkan Ürünler</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {topSellingProducts.slice(0, 3).map(product => (
                            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                <img
                                    src={`http://localhost:8000${product?.image_url}`}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                                    <div className="flex items-center mb-2 justify-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                                        ))}
                                        <span className="text-gray-600 text-sm ml-2">({product.reviews})</span>
                                    </div>
                                    <p className="text-2xl font-bold text-blue-600 mb-4">{product.price}₺</p>
                                    <button
                                        onClick={() => router.push(`/products/${product.id}`)}
                                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Detayları Gör
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* En Çok Puan Alan Ürünler */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">İndirimli Ürünler</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {topRatedProducts.slice(0, 3).map(product => (
                            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                <img
                                    src={`http://localhost:8000${product?.image_url}`}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                                    <div className="flex items-center mb-2 justify-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                                        ))}
                                        <span className="text-gray-600 text-sm ml-2">({product.reviews})</span>
                                    </div>
                                    <div className="mb-4 ">
                                                <span className="text-gray-400 line-through text-lg mr-2">{product.price}₺</span>
                                                <span className="text-2xl font-bold text-blue-600">250₺</span>
                                    </div>
                                    <button
                                        onClick={() => router.push(`/products/${product.id}`)}
                                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Detayları Gör
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Beğenilen Ürünler</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {topRatedProducts.slice(0, 3).map(product => (
                            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                <img
                                    src={`http://localhost:8000${product?.image_url}`}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                                    <div className="flex items-center mb-2 justify-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                                        ))}
                                        <span className="text-gray-600 text-sm ml-2">({product.reviews})</span>
                                    </div>
                                    <p className="text-2xl font-bold text-blue-600 mb-4">{product.price}₺</p>
                                    <button
                                        onClick={() => router.push(`/products/${product.id}`)}
                                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Detayları Gör
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
