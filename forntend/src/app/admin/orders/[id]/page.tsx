"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Sidebar from "@/components/sidebar";

export default function OrderDetailPage() {
    const params = useParams(); // /orders/[id]
    const orderId = params?.id || 1;

    // Demo sipariş verisi
    const [order, setOrder] = useState({
        id: orderId,
        customerName: "Ahmet Yılmaz",
        email: "ahmet@example.com",
        date: "2025-09-10",
        status: "Hazırlanıyor",
        note: "",
        total: 320,
        products: [
            { id: 1, name: "Kablosuz Kulaklık", quantity: 1, price: 150 },
            { id: 2, name: "Mouse", quantity: 2, price: 85 },
    ]
    });

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
                        <Sidebar />
                        </div>

                    {/* Main */}
                    <div className="flex-1 space-y-6">
                        <h1 className="text-2xl font-bold">Sipariş Detay #{order.id}</h1>

                        {/* Genel Bilgiler */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-lg font-semibold mb-4">Genel Bilgiler</h2>
                            <p><span className="font-medium">Müşteri:</span> {order.customerName} ({order.email})</p>
                            <p><span className="font-medium">Tarih:</span> {order.date}</p>
                            <p><span className="font-medium">Durum:</span> {order.status}</p>
                            <p><span className="font-medium">Toplam:</span> {order.total} TL</p>
                        </div>

                        {/* Ürünler */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-lg font-semibold mb-4">Ürünler</h2>
                            <table className="w-full border">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 border">Ürün</th>
                                    <th className="px-4 py-2 border">Adet</th>
                                    <th className="px-4 py-2 border">Fiyat</th>
                                    <th className="px-4 py-2 border">Toplam Fiyat</th>
                                </tr>
                                </thead>
                                <tbody>
                                {order.products.map((p) => (
                                    <tr key={p.id}>
                                        <td className="px-4 py-2 border">{p.name}</td>
                                        <td className="px-4 py-2 border">{p.quantity}</td>
                                        <td className="px-4 py-2 border">{p.price} TL</td>
                                        <td className="px-4 py-2 border">{p.price * p.quantity} TL</td>
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
