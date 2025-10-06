"use client";
import React, {useEffect, useState} from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Sidebar from "@/components/sidebar";
import {useContactInfo} from "@/lib/contacts";

export default function ProductsManagement() {
    const { contactInfo: contact, fetchContactInfo, updateContactInfo } = useContactInfo();

    const [contactInfo, setContactInfo] = useState({
        address: "",
        tel: "",
        mail: "",
        time: ""
    });
    useEffect(() => {
        if (contact) {
            setContactInfo({
                address: contact.address,
                tel: contact.tel,
                mail: contact.mail,
                time: contact.time
            });
        }
    }, [contact]);
    const [isSaving, setIsSaving] = useState(false);
    useEffect(() => {
        const getContactInfo = async () => {
            try {
                const data = await fetchContactInfo();
                setContactInfo(data);
            } catch (err) {
                console.error("İletişim bilgisi alınamadı:", err);
            }
        };
        getContactInfo()
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            console.log(contactInfo)
            await updateContactInfo(contactInfo);
            alert("İletişim bilgisi güncellendi!");
        } catch (err) {
            console.error("Güncelleme hatası:", err);
            alert("Güncelleme başarısız oldu.");
        } finally {
            setIsSaving(false);
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
                            <div className="bg-white shadow-md rounded-xl p-6">
                                <div className="flex justify-between items-center border-b pb-3 mb-4">
                                    <h2 className="text-2xl font-bold text-gray-800">İletişim Bilgisi</h2>
                                    <button
                                        onClick={() => handleSave()}
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
                                    >
                                        Kaydet
                                    </button>
                                </div>

                                <div className="grid gap-4">
                                    <input
                                        type="text"
                                        value={contactInfo?.address || ""}
                                        onChange={(e) =>
                                            setContactInfo({ ...contactInfo, address: e.target.value })
                                        }
                                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                                        placeholder="Adres"
                                    />
                                    <input
                                        type="text"
                                        value={contactInfo?.tel || ""}
                                        onChange={(e) =>
                                            setContactInfo({ ...contactInfo, tel: e.target.value })
                                        }
                                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                                        placeholder="Telefon"
                                    />
                                    <input
                                        type="email"
                                        value={contactInfo?.mail || ""}
                                        onChange={(e) =>
                                            setContactInfo({ ...contactInfo, mail: e.target.value })
                                        }
                                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                                        placeholder="Email"
                                    />
                                    <input
                                        type="text"
                                        value={contactInfo?.time || ""}
                                        onChange={(e) =>
                                            setContactInfo({ ...contactInfo, time: e.target.value })
                                        }
                                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                                        placeholder="Çalışma Saatleri"
                                    />
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
