"use client";

import {Edit, Plus, Save, Search, Trash2, X, Package, BarChart3, Tag, Users, Mail, Truck, Phone} from "lucide-react";
import React, { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";
export default function ProductsManagement() {
    const sampleProducts = [
        {
            id: 1,
            name: "Premium Wireless Headphones",
            price: 299.99,
            stock: 45,
            category: "Electronics",
            status: "Active",
            image:
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop",
        },
        {
            id: 2,
            name: "Smart Fitness Watch",
            price: 199.99,
            stock: 32,
            category: "Electronics",
            status: "Active",
            image:
                "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=150&h=150&fit=crop",
        },
        {
            id: 3,
            name: "Laptop Stand Pro",
            price: 79.99,
            stock: 0,
            category: "Accessories",
            status: "Out of Stock",
            image:
                "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=150&h=150&fit=crop",
        },
    ];

    const [products, setProducts] = useState(sampleProducts);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingProduct, setEditingProduct] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const handleDeleteProduct = (id) => {
        setProducts(products.filter((p) => p.id !== id));
    };

    return (
        <div>
            <Header />
            <div className="py-8 bg-gray-100 min-h-screen">
                <div className="container mx-auto px-4">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Admin Paneli</h1>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Sidebar */}
                        <div className="lg:w-1/4">
                            <Sidebar/>
                        </div>
                        {/* Main Content */}
                        <div className="flex-1 space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold">Ürün Yönetimi</h2>
                                <button
                                    onClick={() => setShowAddForm(true)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                                >
                                    <Plus size={20} className="mr-2" />
                                    Ürün Ekle
                                </button>
                            </div>

                            {/* Search Bar */}
                            <div className="relative">
                                <Search
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    size={20}
                                />
                                <input
                                    type="text"
                                    placeholder="Ürün ara..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Products Table */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Ürün
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Fiyat
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Toptan Alt Sınır
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Toptan Adet Fiyat
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Kategori
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Butonlar
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {products
                                        .filter((p) =>
                                            p.name.toLowerCase().includes(searchTerm.toLowerCase())
                                        )
                                        .map((product) => (
                                            <tr key={product.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <img
                                                            className="h-12 w-12 rounded object-cover"
                                                            src={product.image}
                                                            alt={product.name}
                                                        />
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {product.name}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {product.price}₺
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {product.stock}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">

                                                </td>
                                                <td>
                                                    {product.category}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                    <button
                                                        onClick={() => setEditingProduct(product)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteProduct(product.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Product Modal */}
            {editingProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Edit Product</h3>
                        <div className="space-y-4">
                            {/* Product Image */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Ürün Görseli</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setEditingProduct({
                                            ...editingProduct,
                                            image: e.target.files[0], // seçilen dosyayı kaydediyoruz
                                        })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>

                            {/* Product Name */}
                            <input
                                type="text"
                                placeholder="Ürün Adı"
                                value={editingProduct.name}
                                onChange={(e) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        name: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-2 border rounded-lg"
                            />

                            {/* Price */}
                            <input
                                type="number"
                                placeholder="Fiyat"
                                value={editingProduct.price}
                                onChange={(e) =>
                                    setEditingProduct({
                                        ...editingProduct,
                                        price: parseFloat(e.target.value),
                                    })
                                }
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                            {/* Wholesale Discount */}
                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    type="number"
                                    placeholder="Toptan İndirim Adeti"
                                    value={editingProduct.wholesaleMin || ""}
                                    onChange={(e) =>
                                        setEditingProduct({
                                            ...editingProduct,
                                            wholesaleMin: parseInt(e.target.value),
                                        })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                                <input
                                    type="number"
                                    placeholder="Toptan Adet Fiyatı"
                                    value={editingProduct.wholesalePrice || ""}
                                    onChange={(e) =>
                                        setEditingProduct({
                                            ...editingProduct,
                                            wholesalePrice: parseFloat(e.target.value),
                                        })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>

                            {/* Categories */}
                            <div>
                                <p className="text-sm font-medium mb-2">Kategoriler</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {["Electronics", "Clothing", "Accessories", "Home & Kitchen", "Beauty", "Sports"].map(
                                        (cat) => (
                                            <label key={cat} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    checked={editingProduct.categories?.includes(cat)}
                                                    onChange={(e) => {
                                                        let newCategories = editingProduct.categories || [];
                                                        if (e.target.checked) {
                                                            newCategories = [...newCategories, cat];
                                                        } else {
                                                            newCategories = newCategories.filter((c) => c !== cat);
                                                        }
                                                        setEditingProduct({
                                                            ...editingProduct,
                                                            categories: newCategories,
                                                        });
                                                    }}
                                                />
                                                <span>{cat}</span>
                                            </label>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={() => {
                                    const updatedProducts = products.map((p) =>
                                        p.id === editingProduct.id ? editingProduct : p
                                    );
                                    setProducts(updatedProducts);
                                    setEditingProduct(null);
                                }}
                                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                            >
                                <Save size={16} className="mr-2" />
                                Kaydet
                            </button>
                            <button
                                onClick={() => setEditingProduct(null)}
                                className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 flex items-center justify-center"
                            >
                                <X size={16} className="mr-2" />
                                İptal
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Product Modal */}
            {showAddForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Ürün Ekle</h3>
                        <div className="space-y-4">
                            {/* Product Image Upload */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Ürün Resmi</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>

                            {/* Product Name */}
                            <input
                                type="text"
                                placeholder="Ürün Adı"
                                className="w-full px-4 py-2 border rounded-lg"
                            />

                            {/* Price */}
                            <input
                                type="number"
                                placeholder="Fiyat"
                                className="w-full px-4 py-2 border rounded-lg"
                            />

                            {/* Wholesale Discount */}
                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    type="number"
                                    placeholder="Toptan Alt Sınırı"
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                                <input
                                    type="number"
                                    placeholder="Toptan Adet Fiyatı"
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>

                            {/* Categories with Checkboxes */}
                            <div>
                                <p className="text-sm font-medium mb-2">Kategoriler</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {["Electronics", "Clothing", "Accessories", "Home & Kitchen", "Beauty", "Sports"].map(
                                        (cat) => (
                                            <label key={cat} className="flex items-center space-x-2">
                                                <input type="checkbox" value={cat} className="form-checkbox" />
                                                <span>{cat}</span>
                                            </label>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={() => setShowAddForm(false)}
                                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                            >
                                <Save size={16} className="mr-2" />
                                Ekle
                            </button>
                            <button
                                onClick={() => setShowAddForm(false)}
                                className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 flex items-center justify-center"
                            >
                                <X size={16} className="mr-2" />
                                İptal
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
