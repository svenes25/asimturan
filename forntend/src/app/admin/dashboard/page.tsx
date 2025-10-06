"use client";

import React, { useState } from "react";
import {
    Package,
    Users,
    Tag,
    DollarSign,
    BarChart3,
    Save,
    X,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Sidebar from "@/components/sidebar";
import {useProducts} from "@/lib/products";
import {useOrders} from "@/lib/orders";

export default function AdminDashboard() {
    const {products} = useProducts()
    const {orders} = useOrders()
    return (
        <div>
            <Header/>
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
                            {/* Statistics Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="flex items-center">
                                        <Package className="text-blue-600" size={24} />
                                        <div className="ml-4">
                                            <h3 className="text-2xl font-bold"></h3>
                                            <p className="text-gray-600">Toplam ürün sayısı: {products?.length || 0}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="flex items-center">
                                        <BarChart3 className="text-green-600" size={24} />
                                        <div className="ml-4">
                                            <h3 className="text-2xl font-bold"></h3>
                                            <p className="text-gray-600">Topla Sipariş: {orders.length || 0}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="flex items-center">
                                        <DollarSign className="text-green-600" size={24} />
                                        <div className="ml-4">
                                            <h3 className="text-2xl font-bold"></h3>
                                            <p className="text-gray-600">Total Revenue</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="flex items-center">
                                        <Tag className="text-purple-600" size={24} />
                                        <div className="ml-4">
                                            <h3 className="text-2xl font-bold"></h3>
                                            <p className="text-gray-600">Active Campaigns</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                                <div className="space-y-3">
                                    <div className="flex items-center p-3 bg-gray-50 rounded">
                                        <Package size={16} className="text-blue-600 mr-3" />
                                        <span>New product "Bluetooth Speaker" was added</span>
                                        <span className="ml-auto text-sm text-gray-500">2 hours ago</span>
                                    </div>
                                    <div className="flex items-center p-3 bg-gray-50 rounded">
                                        <Tag size={16} className="text-purple-600 mr-3" />
                                        <span>Summer Sale campaign activated</span>
                                        <span className="ml-auto text-sm text-gray-500">1 day ago</span>
                                    </div>
                                    <div className="flex items-center p-3 bg-gray-50 rounded">
                                        <Users size={16} className="text-green-600 mr-3" />
                                        <span>New administrator added: Sarah Manager</span>
                                        <span className="ml-auto text-sm text-gray-500">3 days ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

/** ------------------------------------------
 *  Small, reusable Product Form component
 *  ------------------------------------------ */
function AddOrEditProductForm({
                                  initialValue = {
                                      name: "",
                                      price: 0,
                                      stock: 0,
                                      category: "",
                                      status: "Active",
                                      image: ""
                                  },
                                  onSubmit,
                                  onCancel
                              }: {
    initialValue?: {
        name: string;
        price: number;
        stock: number;
        category: string;
        status: "Active" | "Out of Stock" | "Discontinued";
        image: string;
    };
    onSubmit: (product: any) => void;
    onCancel: () => void;
}) {
    const [form, setForm] = React.useState(initialValue);

    return (
        <>
            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Product Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={form.price}
                    onChange={(e) =>
                        setForm({ ...form, price: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={form.stock}
                    onChange={(e) =>
                        setForm({ ...form, stock: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                />
                <select
                    value={form.status}
                    onChange={(e) =>
                        setForm({ ...form, status: e.target.value as any })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                >
                    <option value="Active">Active</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Discontinued">Discontinued</option>
                </select>
                <input
                    type="url"
                    placeholder="Image URL"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                />
            </div>

            <div className="flex space-x-3 mt-6">
                <button
                    onClick={() => onSubmit(form)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                    <Save size={16} className="inline mr-2" />
                    Save
                </button>
                <button
                    onClick={onCancel}
                    className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
                >
                    <X size={16} className="inline mr-2" />
                    Cancel
                </button>
            </div>
        </>
    );
}