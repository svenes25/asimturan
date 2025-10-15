"use client";

import { Search } from "lucide-react";
import React, { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Sidebar from "@/components/sidebar";
import Link from "next/link";
import {useOrders} from "@/lib/orders";
export default function OrdersManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const {orders,updateOrder} = useOrders()
    const [selectedOrder, setSelectedOrder] = useState({
        id: "",
        status: "",
        status_detail: "",
    });
    const handleUpdate = async (id: number, status: string, status_detail: string) => {
        try {
            const data = {
                status,
                status_detail,
            };

            await updateOrder(id, data);

            alert("Sipariş başarıyla güncellendi ✅");
        } catch (err) {
            console.error("Sipariş güncellenirken hata:", err);
            alert("Güncelleme sırasında hata oluştu ❌");
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
                                        .map((order) => (
                                            <tr key={order.id}>
                                                {/* Sipariş No */}
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <Link
                                                        href={`/admin/orders/${order.id}`}
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        {order.id}
                                                    </Link>
                                                </td>
                                                {/* İçerik */}
                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                    {order?.detail?.map((p, idx) => (
                                                        <div key={idx}>
                                                            {p.name} <span className="text-gray-500">x{p.piece}</span>
                                                        </div>
                                                    ))}
                                                </td>

                                                {/* Fiyat */}
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {order?.detail?.map((p, idx) => (
                                                        <div key={idx}>
                                                            {p.price}₺
                                                        </div>
                                                    ))}
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
                                                        {/* Durum Seçimi */}
                                                        <select
                                                            value={selectedOrder.id === order.id ? selectedOrder.status : order.status}
                                                            onChange={(e) =>
                                                                setSelectedOrder({
                                                                    id: order.id,
                                                                    status: e.target.value,
                                                                    status_detail: selectedOrder.id === order.id ? selectedOrder.status_detail : order.status_detail,
                                                                })
                                                            }
                                                            className="border rounded px-2 py-1 text-sm w-32"
                                                        >
                                                            <option value="Beklemede">Beklemede</option>
                                                            <option value="Hazırlanıyor">Hazırlanıyor</option>
                                                            <option value="Kargoda">Kargoda</option>
                                                            <option value="Teslim Edildi">Teslim Edildi</option>
                                                            <option value="İptal Edildi">İptal Edildi</option>
                                                        </select>

                                                        {/* Not Alanı */}
                                                        <input
                                                            type="text"
                                                            placeholder="Not"
                                                            value={selectedOrder.id === order.id ? selectedOrder.status_detail : order.status_detail}
                                                            onChange={(e) =>
                                                                setSelectedOrder({
                                                                    id: order.id,
                                                                    status: selectedOrder.id === order.id ? selectedOrder.status : order.status,
                                                                    status_detail: e.target.value,
                                                                })
                                                            }
                                                            className="border rounded px-2 py-1 text-sm w-40"
                                                        />

                                                        {/* Kaydet Butonu */}
                                                        <button
                                                            onClick={() =>
                                                                handleUpdate(
                                                                    order.id,
                                                                    selectedOrder.id === order.id ? selectedOrder.status : order.status,
                                                                    selectedOrder.id === order.id ? selectedOrder.status_detail : order.status_detail
                                                                )
                                                            }
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
