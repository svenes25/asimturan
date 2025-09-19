"use client"
import { ShoppingCart, Star, Phone} from 'lucide-react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter()
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
            inStock: true
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
            inStock: true
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
            inStock: false
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
            inStock: true
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
            inStock: true
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
            inStock: true
        }
    ];
    return(

    <div>
        <Header />
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-8xl font-bold mb-6">Asım Turan</h1>
                <h1 className="text-5xl font-bold mb-6">KAĞIT AMBALAJ VE TEMİZLİK ÜRÜNLERİ İMLS</h1>
            </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.slice(0, 3).map(product => (
                        <div key={product.id}
                             className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                                <div className="flex items-center mb-2">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16}
                                                  fill={i < Math.floor(product.rating) ? "currentColor" : "none"}/>
                                        ))}
                                    </div>
                                    <span className="text-gray-600 text-sm ml-2">({product.reviews})</span>
                                </div>
                                <p className="text-2xl font-bold text-blue-600 mb-4">${product.price}</p>
                                <button
                                    onClick={() => router.push(`/products/${product.id}`)}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6">
                        <div
                            className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ShoppingCart className="text-blue-600" size={32}/>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
                        <p className="text-gray-600">Free shipping on all orders over $100</p>
                    </div>
                    <div className="p-6">
                        <div
                            className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Star className="text-blue-600" size={32}/>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
                        <p className="text-gray-600">30-day money-back guarantee</p>
                    </div>
                    <div className="p-6">
                        <div
                            className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Phone className="text-blue-600" size={32}/>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                        <p className="text-gray-600">Round-the-clock customer support</p>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </div>
    )
};