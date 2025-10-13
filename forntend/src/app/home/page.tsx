"use client"
import { ShoppingCart, Star, Phone } from 'lucide-react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import React, {useEffect, useState} from "react";
import {useCategories} from "@/lib/categories";
import {useProducts} from "@/lib/products";
import {useCampaigns} from "@/lib/campaign";

export default function HomePage() {
    const router = useRouter();
    const {categories} = useCategories()
    const { campaigns } = useCampaigns()
    const {productsRead:products} = useProducts()
    const topSellingProducts = [...products].sort((a, b) => b.sold - a.sold);
    const topRatedProducts = [...products].sort((a, b) => b.rating - a.rating);
    const [campaignItems, setCampaignItems] = useState([]);
    useEffect(() => {
        if (campaigns && campaigns.length > 0) {
            const allItems = campaigns.flatMap(c => [
                ...(c.products || []),
                ...(c.categories || [])
            ]);
            setCampaignItems(allItems);
        }
    }, [campaigns]);
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

            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">İndirimli Ürünler</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {campaignItems.map((item) => {
                            const productForCategory = products.find(p =>
                                p.categories?.some(c => c.name === item.name)
                            );
                            return (
                                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                    <img
                                        src={
                                            item?.image_url
                                                ? `http://localhost:8000${item.image_url}`
                                                : `http://localhost:8000${productForCategory?.image_url}`
                                        }
                                        alt={item.name}
                                        className="w-full h-48 object-cover"
                                    />

                                    <div className="p-6">
                                        <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                                        {item.image_url && (
                                            <>
                                                <div className="flex items-center mb-2 justify-center">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={16} fill={i < Math.floor(item.rating || 0) ? "currentColor" : "none"} />
                                                    ))}
                                                    <span className="text-gray-600 text-sm ml-2">({item.reviews || 0})</span>
                                                </div>
                                                <div className="mb-4">
                                                    {item.image_url && (
                                                        (() => {
                                                            const campaign = campaigns.find(c =>
                                                                c.products?.some(p => p.id === item.id)
                                                            );

                                                            let discountedPrice = item.price;

                                                            if (campaign) {
                                                                if (campaign.type === "Sabit") {
                                                                    discountedPrice = item.price - campaign.price;
                                                                } else if (campaign.type === "Yüzde") {
                                                                    discountedPrice = item.price * (1 - campaign.price / 100);
                                                                }
                                                            }

                                                            return (
                                                                <>
                                                                    {campaign && (
                                                                        <span className="text-gray-400 line-through text-lg mr-2">
                                                                        {item.price}₺
                                                                    </span>
                                                                    )}
                                                                    <span className="text-2xl font-bold text-blue-600">
                                                                        {discountedPrice.toFixed(2)}₺
                                                                    </span>
                                                                </>
                                                            );
                                                        })()
                                                    )}
                                                </div>
                                            </>
                                        )}
                                        <button
                                            onClick={() => {
                                                if (item.image_url) {
                                                    router.push(`/products/${item.id}`);
                                                } else {
                                                    router.push(`/products?category=${item.id}`);
                                                }
                                            }}
                                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Detayları Gör
                                        </button>

                                    </div>
                                </div>
                            );
                        })}
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
