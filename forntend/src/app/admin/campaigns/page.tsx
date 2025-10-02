"use client";

import {
    Edit,
    Plus,
    Save,
    Trash2,
    X,
} from "lucide-react";
import React, { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Sidebar from "@/components/sidebar";

export default function ProductsManagement() {
    const [editingCampaign, setEditingCampaign] = useState(null);
    const [showAddForm , setShowAddForm ] = useState(null);
    const sampleCampaigns = [
        {
            id: 1,
            name: "Summer Sale 2025",
            discount: 25,
            type: "Percentage",
            startDate: "2025-06-01",
            endDate: "2025-08-31",
            status: "Active",
            products: ["All Electronics"],
        },
        {
            id: 2,
            name: "New Year Special",
            discount: 50,
            type: "Fixed Amount",
            startDate: "2025-01-01",
            endDate: "2025-01-31",
            status: "Expired",
            products: ["Premium Wireless Headphones"],
        },
    ];
    const categories = [
        { id: "1", name: "Elektronik" },
        { id: "2", name: "Giyim" },
        { id: "3", name: "Ev & Yaşam" },
    ];

    const products = [
        { id: "1", name: "Laptop" },
        { id: "2", name: "T-shirt" },
        { id: "3", name: "Masa" },
    ];
    const [campaigns, setCampaigns] = useState(sampleCampaigns);
    const handleDeleteCampaign = (id) => {
        if (confirm("Are you sure you want to delete this campaign?")) {
            setCampaigns(campaigns.filter((c) => c.id !== id));
        }
    };
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
                            <Sidebar/>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold">Kampanya Yönetimi</h2>
                                <button
                                    onClick={() =>
                                        setEditingCampaign({
                                            id: null,
                                            name: "",
                                            discount: 0,
                                            type: "Percentage",
                                            startDate: "",
                                            endDate: "",
                                            status: "Active",
                                            products: [],
                                        })
                                    }
                                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center"
                                >
                                    <Plus size={20} className="mr-2" />
                                    Kampanya Oluştur
                                </button>
                            </div>

                            <div className="grid gap-6">
                                {campaigns.map((campaign) => (
                                    <div
                                        key={campaign.id}
                                        className="bg-white p-6 rounded-lg shadow-md"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center mb-2">
                                                    <h3 className="text-lg font-semibold">
                                                        {campaign.name}
                                                    </h3>
                                                    <span
                                                        className={`ml-3 px-2 py-1 text-xs font-semibold rounded-full ${
                                                            campaign.status === "Active"
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-gray-100 text-gray-800"
                                                        }`}
                                                    >
                                                    {campaign.status}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                                    <div>
                                                        <span className="font-medium">İndirim:</span>{" "}
                                                        {campaign.discount}
                                                        {campaign.type === "Percentage" ? "%" : "$"}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Tür:</span>{" "}
                                                        {campaign.type}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Başlangıç Tarihi:</span>{" "}
                                                        {campaign.startDate}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Bitiş Tarihi:</span>{" "}
                                                        {campaign.endDate}
                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                  <span className="font-medium text-sm">
                                                      Geçerli Alan
                                                  </span>
                                                    <span className="text-sm text-gray-600 ml-1">
                                                    {campaign.products.join(", ")}
                                                  </span>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => setEditingCampaign(campaign)}
                                                    className="text-blue-600 hover:text-blue-900 p-2"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteCampaign(campaign.id)}
                                                    className="text-red-600 hover:text-red-900 p-2"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Modal */}
                                {editingCampaign && (
                                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                                            <h3 className="text-lg font-semibold mb-4">Kampanya Düzenle</h3>
                                            <div className="space-y-4">
                                                {/* Kampanya İsmi */}
                                                <input
                                                    type="text"
                                                    placeholder="Kampanya İsmi"
                                                    value={editingCampaign.name}
                                                    onChange={(e) =>
                                                        setEditingCampaign({ ...editingCampaign, name: e.target.value })
                                                    }
                                                    className="w-full px-4 py-2 border rounded-lg"
                                                />

                                                {/* İndirim Miktarı */}
                                                <input
                                                    type="number"
                                                    placeholder="İndirim Miktarı"
                                                    value={editingCampaign.discount}
                                                    onChange={(e) =>
                                                        setEditingCampaign({ ...editingCampaign, discount: parseFloat(e.target.value) })
                                                    }
                                                    className="w-full px-4 py-2 border rounded-lg"
                                                />

                                                {/* Radio Butonlar */}
                                                <div className="flex items-center space-x-4">
                                                    <label className="flex items-center space-x-2">
                                                        <input
                                                            type="radio"
                                                            name="discountTypeEdit"
                                                            value="Percentage"
                                                            checked={editingCampaign.type === "Percentage"}
                                                            onChange={(e) =>
                                                                setEditingCampaign({ ...editingCampaign, type: e.target.value })
                                                            }
                                                        />
                                                        <span>Yüzde</span>
                                                    </label>
                                                    <label className="flex items-center space-x-2">
                                                        <input
                                                            type="radio"
                                                            name="discountTypeEdit"
                                                            value="Fixed Amount"
                                                            checked={editingCampaign.type === "Fixed Amount"}
                                                            onChange={(e) =>
                                                                setEditingCampaign({ ...editingCampaign, type: e.target.value })
                                                            }
                                                        />
                                                        <span>Fiyat</span>
                                                    </label>
                                                </div>

                                                {/* Tarihler */}
                                                <input
                                                    type="date"
                                                    value={editingCampaign.startDate}
                                                    onChange={(e) =>
                                                        setEditingCampaign({ ...editingCampaign, startDate: e.target.value })
                                                    }
                                                    className="w-full px-4 py-2 border rounded-lg"
                                                />
                                                <input
                                                    type="date"
                                                    value={editingCampaign.endDate}
                                                    onChange={(e) =>
                                                        setEditingCampaign({ ...editingCampaign, endDate: e.target.value })
                                                    }
                                                    className="w-full px-4 py-2 border rounded-lg"
                                                />
                                                    <label className="block mb-2 font-medium">Geçerli Olduğu Kategoriler</label>
                                                    <div className="flex flex-col space-y-2 max-h-40 overflow-y-auto border px-2 py-1 rounded-lg">
                                                        {categories.map((cat) => (
                                                            <label key={cat.id} className="flex items-center space-x-2">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={editingCampaign.categories?.includes(cat.id) || false}
                                                                    onChange={(e) => {
                                                                        const newCategories = e.target.checked
                                                                            ? [...(editingCampaign.categories || []), cat.id]
                                                                            : (editingCampaign.categories || []).filter((id) => id !== cat.id);
                                                                        setEditingCampaign({ ...editingCampaign, categories: newCategories });
                                                                    }}
                                                                />
                                                                <span>{cat.name}</span>
                                                            </label>
                                                        ))}
                                                    </div>


                                                {/* Ürün Seçimi */}
                                                <label className="block mb-2 font-medium">Geçerli Olduğu Ürünler</label>
                                                    <div className="flex flex-col space-y-2 max-h-40 overflow-y-auto border px-2 py-1 rounded-lg">
                                                        {products.map((p) => (
                                                            <label key={p.id} className="flex items-center space-x-2">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={editingCampaign.products?.includes(p.id) || false}
                                                                    onChange={(e) => {
                                                                        const newProducts = e.target.checked
                                                                            ? [...(editingCampaign.products || []), p.id]
                                                                            : (editingCampaign.products || []).filter((id) => id !== p.id);
                                                                        setEditingCampaign({ ...editingCampaign, products: newProducts });
                                                                    }}
                                                                />
                                                                <span>{p.name}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                            </div>

                                            {/* Butonlar */}
                                            <div className="flex space-x-3 mt-6">
                                                <button
                                                    onClick={() => {
                                                        if (editingCampaign.id) {
                                                            setCampaigns((prev) =>
                                                                prev.map((c) => (c.id === editingCampaign.id ? editingCampaign : c))
                                                            );
                                                        } else {
                                                            const newId =
                                                                campaigns.length > 0
                                                                    ? Math.max(...campaigns.map((c) => c.id)) + 1
                                                                    : 1;
                                                            setCampaigns((prev) => [...prev, { ...editingCampaign, id: newId }]);
                                                        }
                                                        setEditingCampaign(null);
                                                    }}
                                                    className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 flex items-center justify-center"
                                                >
                                                    <Save size={16} className="inline mr-2" />
                                                    Kaydet
                                                </button>
                                                <button
                                                    onClick={() => setEditingCampaign(null)}
                                                    className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 flex items-center justify-center"
                                                >
                                                    <X size={16} className="inline mr-2" />
                                                    İptal
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {showAddForm && (
                                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                                            <h3 className="text-lg font-semibold mb-4">Yeni Kampanya Ekle</h3>
                                            <div className="space-y-4">
                                                {/* Kampanya İsmi */}
                                                <input
                                                    type="text"
                                                    placeholder="Kampanya İsmi"
                                                    value={newCampaign.name}
                                                    onChange={(e) =>
                                                        setNewCampaign({ ...newCampaign, name: e.target.value })
                                                    }
                                                    className="w-full px-4 py-2 border rounded-lg"
                                                />

                                                {/* İndirim Miktarı */}
                                                <input
                                                    type="number"
                                                    placeholder="İndirim Miktarı"
                                                    value={newCampaign.discount}
                                                    onChange={(e) =>
                                                        setNewCampaign({ ...newCampaign, discount: parseFloat(e.target.value) })
                                                    }
                                                    className="w-full px-4 py-2 border rounded-lg"
                                                />

                                                {/* Radio Butonlar */}
                                                <div className="flex items-center space-x-4">
                                                    <label className="flex items-center space-x-2">
                                                        <input
                                                            type="radio"
                                                            name="discountTypeAdd"
                                                            value="Percentage"
                                                            checked={newCampaign.type === "Percentage"}
                                                            onChange={(e) =>
                                                                setNewCampaign({ ...newCampaign, type: e.target.value })
                                                            }
                                                        />
                                                        <span>Yüzde</span>
                                                    </label>
                                                    <label className="flex items-center space-x-2">
                                                        <input
                                                            type="radio"
                                                            name="discountTypeAdd"
                                                            value="Fixed Amount"
                                                            checked={newCampaign.type === "Fixed Amount"}
                                                            onChange={(e) =>
                                                                setNewCampaign({ ...newCampaign, type: e.target.value })
                                                            }
                                                        />
                                                        <span>Fiyat</span>
                                                    </label>
                                                </div>

                                                {/* Tarihler */}
                                                <input
                                                    type="date"
                                                    value={newCampaign.startDate}
                                                    onChange={(e) =>
                                                        setNewCampaign({ ...newCampaign, startDate: e.target.value })
                                                    }
                                                    className="w-full px-4 py-2 border rounded-lg"
                                                />
                                                <input
                                                    type="date"
                                                    value={newCampaign.endDate}
                                                    onChange={(e) =>
                                                        setNewCampaign({ ...newCampaign, endDate: e.target.value })
                                                    }
                                                    className="w-full px-4 py-2 border rounded-lg"
                                                />

                                                {/* Kategori Seçimi */}
                                                <div className="mt-4">
                                                    <label className="block mb-2 font-medium">Geçerli Olduğu Kategoriler</label>
                                                    <select
                                                        multiple
                                                        value={newCampaign.categories}
                                                        onChange={(e) => {
                                                            const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                                                            setNewCampaign({ ...newCampaign, categories: selectedOptions });
                                                        }}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    >
                                                        {categories.map((cat) => (
                                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                {/* Ürün Seçimi */}
                                                <div className="mt-4">
                                                    <label className="block mb-2 font-medium">Geçerli Olduğu Ürünler</label>
                                                    <select
                                                        multiple
                                                        value={newCampaign.products}
                                                        onChange={(e) => {
                                                            const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                                                            setNewCampaign({ ...newCampaign, products: selectedOptions });
                                                        }}
                                                        className="w-full px-4 py-2 border rounded-lg"
                                                    >
                                                        {products.map((p) => (
                                                            <option key={p.id} value={p.id}>{p.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Butonlar */}
                                            <div className="flex space-x-3 mt-6">
                                                <button
                                                    onClick={() => {
                                                        const newId =
                                                            campaigns.length > 0
                                                                ? Math.max(...campaigns.map((c) => c.id)) + 1
                                                                : 1;
                                                        setCampaigns([...campaigns, { ...newCampaign, id: newId }]);
                                                        setShowAddForm(false);
                                                        setNewCampaign({
                                                            name: "",
                                                            discount: 0,
                                                            type: "Percentage",
                                                            startDate: "",
                                                            endDate: "",
                                                            categories: [],
                                                            products: [],
                                                        });
                                                    }}
                                                    className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 flex items-center justify-center"
                                                >
                                                    <Save size={16} className="inline mr-2" />
                                                    Kaydet
                                                </button>
                                                <button
                                                    onClick={() => setShowAddForm(false)}
                                                    className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 flex items-center justify-center"
                                                >
                                                    <X size={16} className="inline mr-2" />
                                                    İptal
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
