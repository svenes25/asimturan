"use client";

import {useEffect, useState} from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Star, Minus, Plus, User, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {useProducts} from "@/lib/products";
import {useCart} from "@/lib/cart";

export default function ProductDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(5);
    const [currentSlide, setCurrentSlide] = useState(0);
    const {selectedProduct,fetchProduct} = useProducts()
    useEffect(() => {
        fetchProduct(id)
    }, []);
    const {addToCart} = useCart()
    // const products = [
    //     {
    //         id: 11,
    //         name: "Premium Kablosuz Kulaklık",
    //         price: 299.99,
    //         image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    //         rating: 4.8,
    //         reviews: 124,
    //         description: "Kristal netliğinde ses deneyimi sunan premium kablosuz kulaklık. Aktif gürültü engelleme, 30 saat pil ömrü ve konforlu pedleri ile mükemmel kullanım.",
    //         features: ["Aktif Gürültü Engelleme", "30 saat pil", "Bluetooth 5.0", "Hızlı şarj (15dk = 3saat)"],
    //         inStock: true,
    //         comments: [
    //             { id: 1, user: "John Smith", rating: 5, comment: "Harika ses kalitesi! Gürültü engelleme uçuşlarda mükemmel çalışıyor.", date: "2024-01-15", verified: true },
    //             { id: 2, user: "Sarah Johnson", rating: 4, comment: "Genel olarak çok iyi kulaklık, fakat çantası biraz daha küçük olabilirdi.", date: "2024-01-10", verified: true },
    //             { id: 3, user: "Mike Wilson", rating: 5, comment: "Şimdiye kadar sahip olduğum en iyi kulaklık. Pil ömrü inanılmaz!", date: "2024-01-08", verified: false }
    //         ]
    //     },
    //     {
    //         id: 2,
    //         name: "Akıllı Spor Saati",
    //         price: 199.99,
    //         image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=400&fit=crop",
    //         rating: 4.6,
    //         reviews: 89,
    //         description: "Fitness hedeflerinizi takip edin. Kalp atış hızı ölçümü, GPS takibi ve 7 gün pil ömrü sunar.",
    //         features: ["Kalp atış hızı ölçümü", "GPS takibi", "Suya dayanıklı", "7 gün pil ömrü"],
    //         inStock: true,
    //         comments: [
    //             { id: 1, user: "Emma Davis", rating: 5, comment: "Günlük antrenmanlarım için mükemmel. GPS çok hassas.", date: "2024-01-12", verified: true },
    //             { id: 2, user: "Tom Brown", rating: 4, comment: "İyi bir saat ama uygulama biraz daha kullanıcı dostu olabilirdi.", date: "2024-01-09", verified: true }
    //         ]
    //     },
    //     // Diğer ürünler aynı şekilde çevrilebilir
    // ];

    const [comments, setComments] = useState(selectedProduct?.comments || []);

    const handleAddComment = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            const comment = {
                id: comments.length + 1,
                user: "Mevcut Kullanıcı",
                rating: newRating,
                comment: newComment.trim(),
                date: new Date().toISOString().split('T')[0],
                verified: false
            };
            setComments([comment, ...comments]);
            setNewComment("");
            setNewRating(5);
            setCurrentSlide(0);
        }
    };

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % comments.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + comments.length) % comments.length);
    const goToSlide = (index) => setCurrentSlide(index);

    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' });

    if (!selectedProduct) return <div>Ürün bulunamadı</div>;

    return (
        <div>
            <Header/>
            <div className="py-8">
                <div className="container mx-auto px-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        Ürünlere Geri Dön
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <img
                                src={`http://localhost:8000${selectedProduct.image_url}`}
                                alt={selectedProduct.name}
                                className="w-full h-96 object-cover rounded-lg mb-8"
                            />

                            {/* Yorumlar */}
                            <div className="bg-white">
                                <h3 className="text-2xl font-bold mb-6">Müşteri Yorumları</h3>
                                {comments.length > 0 ? (
                                    <div className="relative">
                                        <div className="overflow-hidden rounded-lg">
                                            <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                                                {comments.map((comment) => (
                                                    <div key={comment.id} className="w-full flex-shrink-0 p-6 bg-white border rounded-lg">
                                                        <div className="flex items-start space-x-4">
                                                            <div className="flex-shrink-0">
                                                                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                                                                    <User size={24} className="text-white" />
                                                                </div>
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="flex items-center space-x-2 mb-2">
                                                                    <h5 className="font-semibold text-lg">{comment.user}</h5>
                                                                    {comment.verified && (
                                                                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                                                            ✓ Doğrulanmış Satın Alma
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <div className="flex items-center space-x-2 mb-3">
                                                                    <div className="flex text-yellow-400">
                                                                        {[...Array(5)].map((_, i) => (
                                                                            <Star key={i} size={18} fill={i < comment.rating ? "currentColor" : "none"} className={i < comment.rating ? "text-yellow-400" : "text-gray-300"} />
                                                                        ))}
                                                                    </div>
                                                                    <span className="text-gray-500 text-sm">{formatDate(comment.date)}</span>
                                                                </div>
                                                                <p className="text-gray-700 text-base leading-relaxed">{comment.comment}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {comments.length > 1 && (
                                            <>
                                                <button onClick={prevSlide} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200">
                                                    <ChevronLeft size={20} className="text-gray-600" />
                                                </button>
                                                <button onClick={nextSlide} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200">
                                                    <ChevronRight size={20} className="text-gray-600" />
                                                </button>

                                                <div className="flex justify-center mt-4 space-x-2">
                                                    {comments.map((_, index) => (
                                                        <button key={index} onClick={() => goToSlide(index)} className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentSlide ? 'bg-blue-600 scale-110' : 'bg-gray-300 hover:bg-gray-400'}`} />
                                                    ))}
                                                </div>

                                                <div className="text-center mt-2 text-sm text-gray-500">
                                                    {currentSlide + 1} / {comments.length} yorum
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <p>Henüz yorum yok. İlk yorumu siz yapın!</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold mb-4">{selectedProduct.name}</h1>

                            <div className="flex items-center mb-4">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={20} fill={i < Math.floor(selectedProduct.rating) ? "currentColor" : "none"} />
                                    ))}
                                </div>
                                <span className="text-gray-600 ml-2">({selectedProduct.reviews} yorum)</span>
                            </div>

                            <p className="text-3xl font-bold text-blue-600 mb-6">{selectedProduct.price}₺</p>

                            <p className="text-gray-700 mb-6">{selectedProduct.description}</p>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4">
                                        <span className="font-semibold">Adet:</span>
                                        <div className="flex items-center space-x-2">
                                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded">
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-12 text-center">{quantity}</span>
                                            <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded">
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <button onClick={() => { addToCart(selectedProduct, quantity); setQuantity(1); }} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                        Sepete Ekle - {(selectedProduct.price * quantity).toFixed(2)}₺
                                    </button>
                                </div>

                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
