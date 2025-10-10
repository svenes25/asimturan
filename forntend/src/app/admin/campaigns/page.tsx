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
import {useCampaigns} from "@/lib/campaign";
import {useCategories} from "@/lib/categories";
import {useProducts} from "@/lib/products";

export default function CampaignManagment() {
    const [editingCampaign, setEditingCampaign] = useState<null>(null);
    const [showAddForm , setShowAddForm ] = useState(null);
    const {campaigns,createCampaign,deleteCampaign,updateCampaign} = useCampaigns()
    const {categories} = useCategories()
    const {products} = useProducts()
    const [newCampaign, setNewCampaign] = useState({
        name: "",
        price: 0,
        type: "Yüzde",
        startDate: "",
        endDate: "",
        categories: [],
        products: [],
    });
    const handleDeleteCampaign = async (id) => {
        await deleteCampaign(id)
    };
    const handleAddCampaign = async () => {
        try {
            const payload = {
                name: newCampaign.name,
                price: newCampaign.price,
                type: newCampaign.type,
                start_date: newCampaign.startDate,
                end_date: newCampaign.endDate,
                categories: newCampaign.categories.map(Number),
                products: newCampaign.products.map(Number),
            };

            await createCampaign(payload)
            setNewCampaign({
                name: "",
                price: 0,
                type: "Yüzde",
                startDate: "",
                endDate: "",
                categories: [],
                products: [],
            });
        } catch (error) {
            alert("Kampanya eklenirken bir hata oluştu.");
        }
    };
    const handleEditClick = (campaign: any) => {
        setEditingCampaign({
            ...campaign,
            categories: (campaign.categories || []).map((c: any) => {
                const found = categories.find(cat => cat.name === c.name);
                return found?.id;
            }).filter(Boolean),
            products: campaign.products?.map((c: any) => c.id) || [],
        });
    };
    const handleEditCampaign = async () =>{
        try {
            await updateCampaign(editingCampaign)
            setEditingCampaign({
                name: "",
                price: 0,
                type: "Yüzde",
                startDate: "",
                endDate: "",
                categories: [],
                products: [],})
        }
        catch (error) {
            alert("Kampanya Güncellenirken bir hata oluştu.");
        }
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
                            <Sidebar/>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold">Kampanya Yönetimi</h2>
                                <button
                                    onClick={() => {
                                        setNewCampaign({
                                            id: null,
                                            name: "",
                                            price: 0,
                                            type: "Yüzde",
                                            startDate: "",
                                            endDate: "",
                                            products: [],
                                            categories: [],
                                        });
                                        setShowAddForm(true);
                                    }}
                                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center"
                                >
                                    <Plus size={20} className="mr-2" />
                                    Kampanya Oluştur
                                </button>
                            </div>

                            <div className="grid gap-6">
                                {campaigns?.map((campaign) => (
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
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                                    <div>
                                                        <span className="font-medium">İndirim:</span>{" "}
                                                        {campaign.price}
                                                        {campaign.type === "Yüzde" ? "%" : "₺"}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Tür:</span>{" "}
                                                        {campaign.type}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Başlangıç Tarihi:</span>{" "}
                                                        {campaign.start_date}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Bitiş Tarihi:</span>{" "}
                                                        {campaign.end_date}
                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                  <span className="font-medium text-sm">
                                                      Geçerli Alan
                                                  </span>
                                                    <span className="text-sm text-gray-600 ml-1">
                                                        {[
                                                            ...campaign.products?.map((p) => p.name),
                                                            ...campaign.categories?.map((c) => c.name),
                                                        ].join(", ")}

                                                  </span>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleEditClick(campaign)}
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
                                                    value={editingCampaign.price}
                                                    onChange={(e) =>
                                                        setEditingCampaign({ ...editingCampaign, price: parseFloat(e.target.value) })
                                                    }
                                                    className="w-full px-4 py-2 border rounded-lg"
                                                />

                                                {/* Radio Butonlar */}
                                                <div className="flex items-center space-x-4">
                                                    <label className="flex items-center space-x-2">
                                                        <input
                                                            type="radio"
                                                            name="discountTypeEdit"
                                                            value="Yüzde"
                                                            checked={editingCampaign.type === "Yüzde"}
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
                                                            value="Sabit"
                                                            checked={editingCampaign.type === "Sabit"}
                                                            onChange={(e) =>
                                                                setEditingCampaign({ ...editingCampaign, type: e.target.value })
                                                            }
                                                        />
                                                        <span>Fiyat</span>
                                                    </label>
                                                </div>

                                                <input
                                                    type="date"
                                                    value={editingCampaign.start_date}
                                                    onChange={(e) =>
                                                        setEditingCampaign({ ...editingCampaign, start_date: e.target.value })
                                                    }
                                                    className="w-full px-4 py-2 border rounded-lg"
                                                />
                                                <input
                                                    type="date"
                                                    value={editingCampaign.end_date}
                                                    onChange={(e) =>
                                                        setEditingCampaign({ ...editingCampaign, end_date: e.target.value })
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
                                                        {products.map((product) => (
                                                            <label key={product.id} className="flex items-center space-x-2">
                                                                <input
                                                                    type="checkbox"
                                                                    // sadece id kontrolü yapıyoruz artık
                                                                    checked={editingCampaign.products?.includes(product.id) || false}
                                                                    onChange={(e) => {
                                                                        const newProducts = e.target.checked
                                                                            ? [...(editingCampaign.products || []), product.id]
                                                                            : (editingCampaign.products || []).filter((id) => id !== product.id);
                                                                        setEditingCampaign({ ...editingCampaign, products: newProducts });
                                                                    }}
                                                                />
                                                                <span>{product.name}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                            </div>

                                            {/* Butonlar */}
                                            <div className="flex space-x-3 mt-6">
                                                <button
                                                    onClick={handleEditCampaign}
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
                                                    value={newCampaign.price}
                                                    onChange={(e) =>
                                                        setNewCampaign({ ...newCampaign, price: parseFloat(e.target.value) })
                                                    }
                                                    className="w-full px-4 py-2 border rounded-lg"
                                                />

                                                {/* Radio Butonlar */}
                                                <div className="flex items-center space-x-4">
                                                    <label className="flex items-center space-x-2">
                                                        <input
                                                            type="radio"
                                                            name="discountTypeAdd"
                                                            value="Yüzde"
                                                            checked={newCampaign.type === "Yüzde"}
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
                                                            value="Sabit"
                                                            checked={newCampaign.type === "Sabit"}
                                                            onChange={(e) =>
                                                                setNewCampaign({ ...newCampaign, type: e.target.value })
                                                            }
                                                        />
                                                        <span>Sabit</span>
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
                                                <label className="block mb-2 font-medium">Geçerli Olduğu Kategoriler</label>
                                                <div className="flex flex-col space-y-2 max-h-40 overflow-y-auto border px-2 py-1 rounded-lg">
                                                    {categories.map((cat) => (
                                                        <label key={cat.id} className="flex items-center space-x-2">
                                                            <input
                                                                type="checkbox"
                                                                checked={newCampaign.categories?.includes(cat.id) || false}
                                                                onChange={(e) => {
                                                                    const newCategories = e.target.checked
                                                                        ? [...(newCampaign.categories || []), cat.id]
                                                                        : (newCampaign.categories || []).filter((id) => id !== cat.id);
                                                                    setNewCampaign({ ...newCampaign, categories: newCategories });
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
                                                                checked={newCampaign.products?.includes(p.id) || false}
                                                                onChange={(e) => {
                                                                    const newProducts = e.target.checked
                                                                        ? [...(newCampaign.products || []), p.id]
                                                                        : (newCampaign.products || []).filter((id) => id !== p.id);
                                                                    setNewCampaign({ ...newCampaign, products: newProducts });
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
                                                    onClick={handleAddCampaign}
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
