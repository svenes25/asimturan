"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Star, Minus, Plus, User, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function ProductDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(5);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Örnek veri — Gerçekte API veya veritabanından çekeceksin
    const products = [
        {
            id: 1,
            name: "Premium Wireless Headphones",
            price: 299.99,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
            rating: 4.8,
            reviews: 124,
            description: "Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort padding.",
            features: ["Active Noise Cancellation", "30-hour battery", "Bluetooth 5.0", "Quick charge (15min = 3hrs)"],
            inStock: true,
            comments: [
                {
                    id: 1,
                    user: "John Smith",
                    rating: 5,
                    comment: "Amazing sound quality! The noise cancellation works perfectly during flights.",
                    date: "2024-01-15",
                    verified: true
                },
                {
                    id: 2,
                    user: "Sarah Johnson",
                    rating: 4,
                    comment: "Great headphones overall, but the case could be smaller for better portability.",
                    date: "2024-01-10",
                    verified: true
                },
                {
                    id: 3,
                    user: "Mike Wilson",
                    rating: 5,
                    comment: "Best headphones I've ever owned. Battery life is incredible!",
                    date: "2024-01-08",
                    verified: false
                }
            ]
        },
        {
            id: 2,
            name: "Smart Fitness Watch",
            price: 199.99,
            image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=400&fit=crop",
            rating: 4.6,
            reviews: 89,
            description: "Track your fitness goals with this advanced smartwatch. Features heart rate monitoring, GPS tracking, and 7-day battery life.",
            features: ["Heart rate monitor", "GPS tracking", "Water resistant", "7-day battery"],
            inStock: true,
            comments: [
                {
                    id: 1,
                    user: "Emma Davis",
                    rating: 5,
                    comment: "Perfect for my daily workouts. GPS tracking is very accurate.",
                    date: "2024-01-12",
                    verified: true
                },
                {
                    id: 2,
                    user: "Tom Brown",
                    rating: 4,
                    comment: "Good watch but the app could be more user-friendly.",
                    date: "2024-01-09",
                    verified: true
                }
            ]
        },
        {
            id: 3,
            name: "Laptop Stand Pro",
            price: 79.99,
            image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
            rating: 4.7,
            reviews: 156,
            description: "Ergonomic aluminum laptop stand designed for comfort and productivity. Adjustable height and angle for optimal viewing.",
            features: ["Aluminum construction", "Adjustable height", "Heat dissipation", "Portable design"],
            inStock: false,
            comments: [
                {
                    id: 1,
                    user: "Alex Chen",
                    rating: 5,
                    comment: "Excellent build quality. Really helps with neck strain during long work sessions.",
                    date: "2024-01-14",
                    verified: true
                }
            ]
        },
        {
            id: 4,
            name: "Wireless Charging Pad",
            price: 49.99,
            image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
            rating: 4.4,
            reviews: 67,
            description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator.",
            features: ["Fast charging", "Qi compatible", "LED indicator", "Non-slip surface"],
            inStock: true,
            comments: [
                {
                    id: 1,
                    user: "Lisa Wang",
                    rating: 4,
                    comment: "Works well with my iPhone. Charging speed is decent.",
                    date: "2024-01-11",
                    verified: true
                }
            ]
        },
        {
            id: 5,
            name: "Bluetooth Speaker",
            price: 129.99,
            image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
            rating: 4.5,
            reviews: 203,
            description: "Portable Bluetooth speaker with 360° sound and waterproof design. Perfect for outdoor adventures.",
            features: ["360° sound", "Waterproof IPX7", "12-hour battery", "Voice assistant"],
            inStock: true,
            comments: [
                {
                    id: 1,
                    user: "David Miller",
                    rating: 5,
                    comment: "Amazing sound for outdoor parties. Waterproof feature really works!",
                    date: "2024-01-13",
                    verified: true
                }
            ]
        },
        {
            id: 6,
            name: "USB-C Hub",
            price: 89.99,
            image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop",
            rating: 4.3,
            reviews: 91,
            description: "Multi-port USB-C hub with HDMI, USB 3.0, and SD card slots. Essential for modern laptops.",
            features: ["7-in-1 design", "4K HDMI output", "USB 3.0 ports", "SD card reader"],
            inStock: true,
            comments: [
                {
                    id: 1,
                    user: "Rachel Green",
                    rating: 4,
                    comment: "Very useful hub. All ports work as expected.",
                    date: "2024-01-07",
                    verified: true
                }
            ]
        }
    ];

    const selectedProduct = products.find((p) => p.id.toString() === id);
    const [comments, setComments] = useState(selectedProduct?.comments || []);

    const addToCart = (product, qty) => {
        console.log("Added to cart:", product, qty);
    };

    const handleAddComment = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            const comment = {
                id: comments.length + 1,
                user: "Current User", // In real app, get from auth
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

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % comments.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + comments.length) % comments.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (!selectedProduct) {
        return <div>Product not found</div>;
    }

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
                        Back to Products
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.name}
                                className="w-full h-96 object-cover rounded-lg mb-8"
                            />

                            {/* Comments Section */}
                            <div className="bg-white">
                                <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
                                {/* Comments List - Slider Format */}
                                {comments.length > 0 ? (
                                    <div className="relative">
                                        {/* Slider Container */}
                                        <div className="overflow-hidden rounded-lg">
                                            <div
                                                className="flex transition-transform duration-300 ease-in-out"
                                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                            >
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
                                                                            ✓ Verified Purchase
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <div className="flex items-center space-x-2 mb-3">
                                                                    <div className="flex text-yellow-400">
                                                                        {[...Array(5)].map((_, i) => (
                                                                            <Star
                                                                                key={i}
                                                                                size={18}
                                                                                fill={i < comment.rating ? "currentColor" : "none"}
                                                                                className={i < comment.rating ? "text-yellow-400" : "text-gray-300"}
                                                                            />
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

                                        {/* Navigation Controls */}
                                        {comments.length > 1 && (
                                            <>
                                                {/* Arrow Navigation */}
                                                <button
                                                    onClick={prevSlide}
                                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
                                                    disabled={comments.length <= 1}
                                                >
                                                    <ChevronLeft size={20} className="text-gray-600" />
                                                </button>
                                                <button
                                                    onClick={nextSlide}
                                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
                                                    disabled={comments.length <= 1}
                                                >
                                                    <ChevronRight size={20} className="text-gray-600" />
                                                </button>

                                                {/* Dot Indicators */}
                                                <div className="flex justify-center mt-4 space-x-2">
                                                    {comments.map((_, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => goToSlide(index)}
                                                            className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                                                index === currentSlide
                                                                    ? 'bg-blue-600 scale-110'
                                                                    : 'bg-gray-300 hover:bg-gray-400'
                                                            }`}
                                                        />
                                                    ))}
                                                </div>

                                                {/* Slide Counter */}
                                                <div className="text-center mt-2 text-sm text-gray-500">
                                                    {currentSlide + 1} of {comments.length} reviews
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <p>No reviews yet. Be the first to review this product!</p>
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
                                <span className="text-gray-600 ml-2">({selectedProduct.reviews} reviews)</span>
                            </div>

                            <p className="text-3xl font-bold text-blue-600 mb-6">${selectedProduct.price}</p>

                            <p className="text-gray-700 mb-6">{selectedProduct.description}</p>

                            <div className="mb-6">
                                <h3 className="font-semibold text-lg mb-3">Features:</h3>
                                <ul className="space-y-2">
                                    {selectedProduct.features.map((feature, index) => (
                                        <li key={index} className="flex items-center">
                                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className={`mb-6 p-3 rounded-lg ${selectedProduct.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {selectedProduct.inStock ? 'In Stock - Ready to ship' : 'Out of Stock'}
                            </div>

                            {selectedProduct.inStock && (
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4">
                                        <span className="font-semibold">Quantity:</span>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-12 text-center">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            addToCart(selectedProduct, quantity);
                                            setQuantity(1);
                                        }}
                                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                    >
                                        Add to Cart - ${(selectedProduct.price * quantity).toFixed(2)}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}