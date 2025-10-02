"use client";

import { Search } from "lucide-react";
import React, { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Sidebar from "@/components/sidebar";
import Link from "next/link";
export default function OrdersManagement() {
    const [searchTerm, setSearchTerm] = useState("");

    const sampleOrders = [
        {
            id: 1,
            orderNumber: "ORD-2025-001",
            products: [
                { name: "Premium Wireless Headphones", quantity: 1 },
                { name: "Laptop Stand Pro", quantity: 2 },
            ],
            total: 459.97,
            status: "Hazırlanıyor",
            note: ""
        },
        {
            id: 2,
            orderNumber: "ORD-2025-002",
            products: [
                { name: "Smart Fitness Watch", quantity: 1 },
            ],
            total: 199.99,
            status: "Kargoda",
            note: "Kargo No: 123456"
        }
    ];

    const [orders, setOrders] = useState(sampleOrders);

    const handleUpdate = (id: number, status: string, note: string) => {
        setOrders(prev =>
            prev.map(order =>
                order.id === id ? { ...order, status, note } : order
            )
        );
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
                            <Sidebar />
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold">Sipariş Yönetimi</h2>
                            </div>

                            {/* Search Bar */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Sipariş ara..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Orders Table */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sipariş No</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">İçerik</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fiyat</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durum</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Yönetim</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {orders
                                        .filter(o =>
                                            o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
                                        )
                                        .map((order) => (
                                            <tr key={order.id}>
                                                {/* Sipariş No */}
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <Link
                                                        href={`/admin/orders/${order.id}`}
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        {order.orderNumber}
                                                    </Link>
                                                </td>
                                                {/* İçerik */}
                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                    {order.products.map((p, idx) => (
                                                        <div key={idx}>
                                                            {p.name} <span className="text-gray-500">x{p.quantity}</span>
                                                        </div>
                                                    ))}
                                                </td>

                                                {/* Fiyat */}
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {order.total.toFixed(2)}₺
                                                </td>

                                                {/* Durum */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                            <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                    order.status === "Hazırlanıyor"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : order.status === "Kargoda"
                                            ? "bg-blue-100 text-blue-800"
                                            : order.status === "Teslim Edildi"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                }`}
                            >
                              {order.status}
                            </span>
                                                </td>

                                                {/* Yönetim */}
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <div className="space-y-2">
                                                        <select
                                                            value={order.status}
                                                            onChange={(e) =>
                                                                setOrders(prev =>
                                                                    prev.map(o =>
                                                                        o.id === order.id ? { ...o, status: e.target.value } : o
                                                                    )
                                                                )
                                                            }
                                                            className="border rounded px-2 py-1 text-sm w-32"
                                                        >
                                                            <option value="Hazırlanıyor">Hazırlanıyor</option>
                                                            <option value="Kargoda">Kargoda</option>
                                                            <option value="Teslim Edildi">Teslim Edildi</option>
                                                            <option value="İptal Edildi">İptal Edildi</option>
                                                        </select>

                                                        <input
                                                            type="text"
                                                            placeholder="Not"
                                                            value={order.note}
                                                            onChange={(e) =>
                                                                setOrders(prev =>
                                                                    prev.map(o =>
                                                                        o.id === order.id ? { ...o, note: e.target.value } : o
                                                                    )
                                                                )
                                                            }
                                                            className="border rounded px-2 py-1 text-sm w-40"
                                                        />

                                                        <button
                                                            onClick={() => handleUpdate(order.id, order.status, order.note)}
                                                            className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700"
                                                        >
                                                            Kaydet
                                                        </button>
                                                    </div>
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
        </div>
    );
}
