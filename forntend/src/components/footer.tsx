import Link from "next/link";
import {useContactInfo} from "@/lib/contacts";
import {useEffect, useState} from "react";

export default function Footer() {
    const { contactInfo} = useContactInfo();
    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="container mx-auto px-4 text-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
                    {/* Hakkımızda */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Asım Turan Kâğıt & Ambalaj</h3>
                        <p className="text-gray-300">
                            Uygun fiyatlı, kaliteli kâğıt ve ambalaj ürünlerinde güvenilir adresiniz.
                            İşletmeler için hızlı ve güvenilir çözümler sunuyoruz.
                        </p>
                    </div>

                    {/* Hızlı Menü */}
                    <div>
                        <h4 className="font-semibold mb-4">Hızlı Menü</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/home" className="text-gray-300 hover:text-white">
                                    Anasayfa
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="text-gray-300 hover:text-white">
                                    Ürünler
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-300 hover:text-white">
                                    İletişim
                                </Link>
                            </li>
                            <li>
                                <Link href="/login" className="text-gray-300 hover:text-white">
                                    Giriş Yap
                                </Link>
                            </li>
                            <li>
                                <Link href="/register" className="text-gray-300 hover:text-white">
                                    Kayıt Ol
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* İletişim Bilgileri */}
                    <div>
                        <h4 className="font-semibold mb-4">İletişim Bilgileri</h4>
                        <ul className="space-y-2 text-gray-300">
                            <li>{contactInfo.tel}</li>
                            <li>{contactInfo.mail}</li>
                            <li>{contactInfo.address}</li>
                            <li>{contactInfo.time}</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-8 mt-8 text-center text-gray-300">
                    <p>&copy; 2025 Asım Turan Kâğıt & Ambalaj. Tüm hakları saklıdır.</p>
                </div>
            </div>
        </footer>
    );
}