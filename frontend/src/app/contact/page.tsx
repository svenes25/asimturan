"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {useContactInfo} from "@/lib/contacts";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const {contactInfo} = useContactInfo()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.subject && formData.message) {
            alert("Mesajınız için teşekkürler!");
            setFormData({ name: "", email: "", subject: "", message: "" });
        } else {
            alert("Lütfen tüm zorunlu alanları doldurun.");
        }
    };

    return (
        <div>
            <Header />
            <div className="py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-center mb-12">Bize Ulaşın</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* İletişim Bilgileri */}
                        <div>
                            <h2 className="text-2xl font-semibold mb-6">İletişim</h2>
                            <p className="text-gray-600 mb-8">
                                Ürünlerimiz hakkında sorularınız mı var veya destek mi gerekiyor? Yardımcı olmaktan mutluluk duyarız! Bize mesaj gönderin, en kısa sürede yanıtlayacağız.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Phone className="text-blue-600" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Telefon</h3>
                                        <p className="text-gray-600">{contactInfo.tel}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Mail className="text-blue-600" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">E-posta</h3>
                                        <p className="text-gray-600">{contactInfo.mail}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <MapPin className="text-blue-600" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Adres</h3>
                                        <p className="text-gray-600">
                                            {contactInfo.address}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* İletişim Formu */}
                        <div>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Adınız *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        E-posta *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        Konu *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Mesajınız *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                >
                                    Mesaj Gönder
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
