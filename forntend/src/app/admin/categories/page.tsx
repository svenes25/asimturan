"use client";

import { Search, Edit, Trash2, Plus, Save, X } from "lucide-react";
import React, { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Sidebar from "@/components/sidebar";
import {useCategories} from "@/lib/categories";

export default function CategoryManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState<{ id: number; name: string } | null>(null);
    const [newCategoryName, setNewCategoryName] = useState("");

    const {
        categories,
        createCategory,
        deleteCategory,
        fetchCategories,
        updateCategory
    } = useCategories();

    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) return;
        await createCategory(newCategoryName.trim());
        setNewCategoryName("");
        setShowAddForm(false);
    };

    const handleEditCategory = async () => {
        if (!editingCategory || !editingCategory.name.trim()) return;
        await updateCategory(editingCategory.id, editingCategory.name.trim());
        setEditingCategory(null);
        fetchCategories();
    };

    const handleDeleteCategory = async (id: number) => {
        const confirmed = window.confirm("Bu kategoriyi silmek istediğinize emin misiniz?");
        if (!confirmed) return;

        await deleteCategory(id);
    }
        return (
        <div>
            <Header />
            <div className="py-8 bg-gray-100 min-h-screen">
                <div className="container mx-auto px-4">
                    {/* Dashboard title */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Admin Paneli</h1>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Sidebar */}
                        <div className="lg:w-1/4">
                            <Sidebar />
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold">Kategori Yönetimi</h2>
                                <button
                                    onClick={() => setShowAddForm(true)}
                                    className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                                >
                                    <Plus size={18} className="mr-2" />
                                    Kategori Ekle
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
                                    placeholder="Kategori ara..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Categories Table */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            İsim
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Bağlı Ürün Sayısı
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Butonlar
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {categories
                                        .filter((c) =>
                                            c.name.toLowerCase().includes(searchTerm.toLowerCase())
                                        )
                                        .map((category) => (
                                            <tr key={category.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {category.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">

                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-3">
                                                    <button
                                                        onClick={() => setEditingCategory(category)}
                                                        className="text-blue-600 hover:text-blue-900 flex items-center"
                                                    >
                                                        <Edit size={16} className="mr-1" />
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteCategory(category.id)}
                                                        className="text-red-600 hover:text-red-900 flex items-center"
                                                    >
                                                        <Trash2 size={16} className="mr-1" />
                                                        Delete
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
            <Footer />

            {/* Add Category Modal */}
            {showAddForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Yeni Kategori Ekle</h3>
                        <input
                            type="text"
                            placeholder="Kategori İsmi"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg mb-4"
                        />
                        <div className="flex space-x-3">
                            <button
                                onClick={handleAddCategory}
                                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                            >
                                <Save size={16} className="mr-2" />
                                Kaydet
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

            {/* Edit Category Modal */}
            {editingCategory && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Kategori Düzenle</h3>
                        <input
                            type="text"
                            placeholder="Kategori İsmi"
                            value={editingCategory.name}
                            onChange={(e) =>
                                setEditingCategory({ ...editingCategory, name: e.target.value })
                            }
                            className="w-full px-4 py-2 border rounded-lg mb-4"
                        />
                        <div className="flex space-x-3">
                            <button
                                onClick={handleEditCategory}
                                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                            >
                                <Save size={16} className="mr-2" />
                                Kaydet
                            </button>
                            <button
                                onClick={() => setEditingCategory(null)}
                                className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 flex items-center justify-center"
                            >
                                <X size={16} className="mr-2" />
                                İptal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
