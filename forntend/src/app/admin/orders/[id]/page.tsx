"use client";

import React, {useEffect, useState} from "react";
import { useParams } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Sidebar from "@/components/sidebar";
import {useOrders} from "@/lib/orders";

export default function OrderDetailPage() {
    const params = useParams(); // /orders/[id]
    const orderId = Number(params?.id) || 1;
    const { order, fetchOrder } = useOrders();

    useEffect(() => {
        if (orderId) {
            fetchOrder(orderId);
        }
    }, [orderId, fetchOrder]);
    const totalPrice = order?.detail?.reduce((accumulator, currentItem) => {
        // Check if both 'piece' and 'price' are valid numbers
        if (typeof currentItem.piece === 'number' && typeof currentItem.price === 'number') {
            return accumulator + (currentItem.piece * currentItem.price);
        }
        // If a value is missing or invalid, don't add to the total
        return accumulator;
    }, 0);
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
                        <h1 className="text-2xl font-bold">Sipariş Detay #{order?.id}</h1>

                        {/* Genel Bilgiler */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-lg font-semibold mb-4">Genel Bilgiler</h2>
                            <p><span className="font-medium">Müşteri:</span>{order?.user_name + " " + order?.user_surname} ({order?.user_email})</p>
                            <p><span className="font-medium">Adres:</span> {order?.user_address[0].address}</p>
                            <p><span className="font-medium">Tarih:</span> {new Date(order?.time).toLocaleDateString('tr-TR')}</p>
                            <p><span className="font-medium">Durum:</span> {order?.status}</p>
                            <p><span className="font-medium">Toplam:</span> {totalPrice} TL</p>
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
                                {order?.detail?.map((p) => (
                                    <tr key={p?.id}>
                                        <td className="px-4 py-2 border">{p?.name}</td>
                                        <td className="px-4 py-2 border">{p?.piece}</td>
                                        <td className="px-4 py-2 border">{p?.price} TL</td>
                                        <td className="px-4 py-2 border">{p?.price * p?.piece} TL</td>
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
