"use client";

import { MessageSquare, Eye } from "lucide-react";
import React, { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Sidebar from "@/components/sidebar";
import {useProducts} from "@/lib/products";

export default function ProductsManagement() {
    const {productsComments:comments} = useProducts()
    // const sampleComments = [
    //     {
    //         id: 1,
    //         productName: "Wireless Headphones",
    //         orderNumber: "ORD-20250101",
    //         name: "Alice Johnson",
    //         email: "alice@example.com",
    //         message: "Kulaklık çok kaliteli ama bas seviyesi biraz düşük.",
    //         date: "2025-01-15",
    //         status: "New"
    //     },
    //     {
    //         id: 2,
    //         productName: "Laptop Stand",
    //         orderNumber: "ORD-20250105",
    //         name: "Bob Smith",
    //         email: "bob@example.com",
    //         message: "Siparişim hızlı geldi, ürün beklediğim gibi.",
    //         date: "2025-01-14",
    //         status: "In Progress"
    //     },
    //     {
    //         id: 3,
    //         productName: "Laptop Stand",
    //         orderNumber: "ORD-20250105",
    //         name: "Bob Smith",
    //         email: "bob@example.com",
    //         message: "Siparişim hızlı geldi, ürün beklediğim gibi.",
    //         date: "2025-01-14",
    //         status: "In Progress"
    //     }
    // ];
    console.log(comments)

    return (
        <div>
            <Header />
            <div className="py-8 bg-gray-100 min-h-screen">
                <div className="container mx-auto px-4">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Admin Paneli</h1>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="lg:w-1/4">
                            <Sidebar />
                        </div>

                        <div className="flex-1 space-y-6">
                            <h2 className="text-2xl font-bold">Ürün Yorumları</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {comments.map((comment) => (
                                    <div key={comment.id} className="bg-white p-6 rounded-lg shadow-md">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center mb-2">
                                                    <h3 className="text-lg font-semibold">{comment.productName}</h3>
                                                </div>

                                                <div className="text-sm text-gray-600 mb-2">
                                                    <span className="font-medium">Sipariş No:</span> {comment.orderNumber}
                                                </div>

                                                <div className="text-sm text-gray-600 mb-2">
                                                    <span className="font-medium">Kimden:</span> {comment.user_name} {comment.user_surname} ({comment.email})
                                                </div>

                                                <div className="text-sm text-gray-600 mb-4">
                                                    <span className="font-medium">Tarih:</span> <p>{new Date(comment.date).toLocaleString('tr-TR')}</p>
                                                </div>

                                                <p className="text-gray-700">{comment.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
