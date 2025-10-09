"use client";

import {Edit, Plus, Save, Search, Trash2, X, Package, BarChart3, Tag, Users, Mail, Truck, Phone} from "lucide-react";
import React, {useEffect, useState} from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";
import {useProducts} from "@/lib/products";
import {useCategories} from "@/lib/categories";
export default function ProductsManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const {categories} = useCategories()
    const {
        productsRead:products,
        deleteProduct,
        updateProduct,
        createProduct,
        uploadImage
    } = useProducts();
    const [editingProduct, setEditingProduct] = useState<null>(null);
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: 0,
        description: "",
        imageFile: null as File | null,
        imageUrl: "",
        lower: 0,
        limited_price: 0,
        categoryIds: [] as number[]
    });
    const handleDeleteProduct = async (id: number) => {
        await deleteProduct(id);
    };
    // Örnek ekleme
    const handleCreateProduct = async () => {
        if (!newProduct.name.trim() || newProduct.price <= 0) return;

        let imageUrl = "";
        if (newProduct.imageFile) {
            const uploaded = await uploadImage(newProduct.imageFile);
            imageUrl = uploaded;
        }
        await createProduct({
            name: newProduct.name,
            price: newProduct.price,
            description: newProduct.description,
            image_url:imageUrl,
            lower: newProduct.lower,
            limited_price: newProduct.limited_price,
            categoryIds: newProduct.categoryIds
        });

        setShowAddForm(false);
        setNewProduct({
            name: "",
            description: "",
            price: 0,
            imageFile: null,
            imageUrl: "",
            lower: 0,
            limited_price: 0,
            categoryIds: []
        });
    };
    // Örnek güncelleme
    const handleEditProduct = async () => {
        if (!editingProduct) return;
        let imageUrl = editingProduct.image_url;
        if (editingProduct.imageFile) {
            const uploaded = await uploadImage(editingProduct.imageFile);
            if (uploaded) imageUrl = uploaded;
        }
        await updateProduct({
            id : editingProduct.id,
            name: editingProduct.name,
            price: editingProduct.price,
            description: editingProduct.description,
            image_url:imageUrl,
            lower: editingProduct.lower,
            limited_price: editingProduct.limited_price,
            categoryIds: editingProduct.categoryIds
        });
        setEditingProduct(false)
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
                                                            src={`http://localhost:8000${product.image_url}`}
                                                            alt={product.name}
                                                        />
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {product.name}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    {product.price}₺
                                                </td>
                                                <td>
                                                    {product.lower}
                                                </td>
                                                <td>
                                                    {product.limited_price}₺
                                                </td>
                                                <td>
                                                    {product.categories?.map((c) => c.name).join(", ") || "-"}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                    <button
                                                        onClick={() => {
                                                            setEditingProduct({
                                                                ...product,
                                                                categoryIds: product.categories?.map(c => c.id) || []
                                                            })
                                                        }}
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
            {editingProduct &&(
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Edit Product</h3>
                        <div className="space-y-4">
                            {/* Product Image */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Ürün Resmi</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setEditingProduct({ ...editingProduct, imageFile: e.target.files?.[0] || null })}
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
                            <div>
                                <label className="block text-sm font-medium mb-1">Açıklama</label>
                                <textarea
                                    placeholder="Ürün hakkında detaylı bilgi..."
                                    value={editingProduct.description}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    rows={4}
                                />
                            </div>
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
                                    value={editingProduct.lower || ""}
                                    onChange={(e) =>
                                        setEditingProduct({
                                            ...editingProduct,
                                            lower: parseInt(e.target.value),
                                        })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                                <input
                                    type="number"
                                    placeholder="Toptan Adet Fiyatı"
                                    value={editingProduct.limited_price || ""}
                                    onChange={(e) =>
                                        setEditingProduct({
                                            ...editingProduct,
                                            limited_price: parseFloat(e.target.value),
                                        })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>

                            {/* Categories */}
                            <div>
                                <p className="text-sm font-medium mb-2">Kategoriler</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {categories.map((cat) => (
                                        <label key={cat.id} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                value={cat.id}
                                                checked={editingProduct?.categoryIds?.includes(cat.id) || false}
                                                onChange={(e) => {
                                                    const id = cat.id;
                                                    setEditingProduct((prev) => ({
                                                        ...prev!,
                                                        categoryIds: e.target.checked
                                                            ? [...(prev?.categoryIds || []), id]
                                                            : prev!.categoryIds.filter((cid) => cid !== id)
                                                    }));
                                                }}
                                            />
                                            <span>{cat.name}</span>
                                        </label>
                                    ))}
                                </div>
                    </div>
                </div>

            {/* Buttons */}
            <div className="flex space-x-3 mt-6">
                <button
                    onClick={handleEditProduct}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                >
                    <Save size={16} className="mr-2"/>
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
                                    onChange={(e) => setNewProduct({ ...newProduct, imageFile: e.target.files?.[0] || null })}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>

                            {/* Product Name */}
                            <input
                                type="text"
                                placeholder="Ürün Adı"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                            <div>
                                <label className="block text-sm font-medium mb-1">Açıklama</label>
                                <textarea
                                    placeholder="Ürün hakkında detaylı bilgi..."
                                    value={newProduct.description}
                                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg"
                                    rows={4}
                                />
                            </div>
                            <input
                                type="number"
                                placeholder="Fiyat"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                                className="w-full px-4 py-2 border rounded-lg"
                            />

                            {/* Wholesale Discount */}
                            <div className="grid grid-cols-2 gap-3">
                                {/* Toptan Alt Sınırı */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Toptan Alt Sınırı</label>
                                    <input
                                        type="number"
                                        placeholder="Örn: 100"
                                        value={newProduct.lower}
                                        onChange={(e) =>
                                            setNewProduct({ ...newProduct, lower: parseInt(e.target.value) })
                                        }
                                        className="w-full px-4 py-2 border rounded-lg"
                                    />
                                </div>

                                {/* Toptan Adet Fiyatı */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">Toptan Adet Fiyatı</label>
                                    <input
                                        type="number"
                                        placeholder="Örn: 89.90"
                                        value={newProduct.limited_price}
                                        onChange={(e) =>
                                            setNewProduct({ ...newProduct, limited_price: parseFloat(e.target.value) })
                                        }
                                        className="w-full px-4 py-2 border rounded-lg"
                                    />
                                </div>
                            </div>

                            {/* Categories with Checkboxes */}
                            <div>
                                <p className="text-sm font-medium mb-2">Kategoriler</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {categories.map(
                                        (cat) => (
                                            <label key={cat.id} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    value={cat.id}
                                                    checked={newProduct.categoryIds.includes(cat.id)}
                                                    onChange={(e) => {
                                                        const id = parseInt(e.target.value);
                                                        setNewProduct((prev) => ({
                                                            ...prev,
                                                            categoryIds: e.target.checked
                                                                ? [...prev.categoryIds, id]
                                                                : prev.categoryIds.filter((cid) => cid !== id)
                                                        }));
                                                    }}
                                                    className="form-checkbox"
                                                />
                                                <span>{cat.name}</span>
                                            </label>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={handleCreateProduct}
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
