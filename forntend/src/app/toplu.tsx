import React, { useState } from 'react';
import { ShoppingCart, Star, Phone, Mail, MapPin, ArrowLeft, Plus, Minus, User, Lock, Eye, EyeOff, CreditCard, Home } from 'lucide-react';

const EcommerceWebsite = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cart, setCart] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Mock user database (in real app, this would be handled by backend)
    const [users, setUsers] = useState([
        {
            id: 1,
            email: 'demo@example.com',
            password: 'demo123',
            firstName: 'Demo',
            lastName: 'User',
            address: {
                street: '123 Main Street',
                city: 'San Francisco',
                state: 'CA',
                zipCode: '94105',
                country: 'United States'
            },
            paymentMethods: [
                {
                    id: 1,
                    type: 'credit',
                    cardNumber: '**** **** **** 1234',
                    expiryDate: '12/26',
                    cardholderName: 'Demo User',
                    isDefault: true
                }
            ]
        }
    ]);

    // Sample product data
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

    const addToCart = (product, quantity = 1) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, quantity }]);
        }
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity === 0) {
            removeFromCart(productId);
        } else {
            setCart(cart.map(item =>
                item.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            ));
        }
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    // Authentication functions
    const login = (email, password) => {
        const foundUser = users.find(u => u.email === email && u.password === password);
        if (foundUser) {
            setUser(foundUser);
            return { success: true };
        }
        return { success: false, error: 'Invalid email or password' };
    };

    const register = (userData) => {
        const existingUser = users.find(u => u.email === userData.email);
        if (existingUser) {
            return { success: false, error: 'Email already registered' };
        }

        const newUser = {
            id: users.length + 1,
            ...userData,
            address: {
                street: '',
                city: '',
                state: '',
                zipCode: '',
                country: ''
            },
            paymentMethods: []
        };
        setUsers([...users, newUser]);
        setUser(newUser);
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        setUserMenuOpen(false);
        setCurrentPage('home');
    };

    // Header Component
    const Header = () => (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-8">
                        <h1
                            className="text-2xl font-bold text-blue-600 cursor-pointer"
                            onClick={() => setCurrentPage('home')}
                        >
                            TechStore
                        </h1>
                        <nav className="hidden md:flex space-x-6">
                            <button
                                onClick={() => setCurrentPage('home')}
                                className={`hover:text-blue-600 transition-colors ${currentPage === 'home' ? 'text-blue-600 font-semibold' : ''}`}
                            >
                                Home
                            </button>
                            <button
                                onClick={() => setCurrentPage('products')}
                                className={`hover:text-blue-600 transition-colors ${currentPage === 'products' ? 'text-blue-600 font-semibold' : ''}`}
                            >
                                Products
                            </button>
                            <button
                                onClick={() => setCurrentPage('contact')}
                                className={`hover:text-blue-600 transition-colors ${currentPage === 'contact' ? 'text-blue-600 font-semibold' : ''}`}
                            >
                                Contact
                            </button>
                            {!user && (
                                <>
                                    <button
                                        onClick={() => setCurrentPage('login')}
                                        className={`hover:text-blue-600 transition-colors ${currentPage === 'login' ? 'text-blue-600 font-semibold' : ''}`}
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage('register')}
                                        className={`hover:text-blue-600 transition-colors ${currentPage === 'register' ? 'text-blue-600 font-semibold' : ''}`}
                                    >
                                        Register
                                    </button>
                                </>
                            )}
                        </nav>
                    </div>

                    <div className="flex items-center space-x-4">
                        {user && (
                            <div className="relative">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    <User size={20} />
                                    <span className="hidden md:inline">Hi, {user.firstName}</span>
                                </button>

                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                                        <div className="p-2">
                                            <button
                                                onClick={() => {
                                                    setCurrentPage('profile');
                                                    setUserMenuOpen(false);
                                                }}
                                                className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                                            >
                                                My Profile
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setCurrentPage('orders');
                                                    setUserMenuOpen(false);
                                                }}
                                                className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                                            >
                                                My Orders
                                            </button>
                                            <hr className="my-2" />
                                            <button
                                                onClick={logout}
                                                className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-red-600"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="relative">
                            <button
                                onClick={() => setCartOpen(!cartOpen)}
                                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <ShoppingCart size={20} />
                                <span>{getTotalItems()}</span>
                            </button>

                            {cartOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg mb-4">Shopping Cart</h3>
                                        {cart.length === 0 ? (
                                            <p className="text-gray-500">Your cart is empty</p>
                                        ) : (
                                            <>
                                                {cart.map(item => (
                                                    <div key={item.id} className="flex items-center justify-between py-2 border-b">
                                                        <div className="flex-1">
                                                            <h4 className="font-medium text-sm">{item.name}</h4>
                                                            <p className="text-gray-600 text-sm">${item.price}</p>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded"
                                                            >
                                                                <Minus size={12} />
                                                            </button>
                                                            <span className="w-8 text-center">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded"
                                                            >
                                                                <Plus size={12} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="mt-4 pt-4 border-t">
                                                    <div className="flex justify-between font-semibold">
                                                        <span>Total: ${getTotalPrice()}</span>
                                                    </div>
                                                    <button className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                                                        Checkout
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
        </header>
);

// Login Page Component
const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (error) setError('');
    };

    const handleSubmit = () => {
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setTimeout(() => {
            const result = login(formData.email, formData.password);
            if (result.success) {
                setCurrentPage('profile');
                setFormData({ email: '', password: '' });
            } else {
                setError(result.error);
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-3xl font-bold text-center mb-8">Login</h1>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                            {error}
                        </div>
                    )}

                    <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-6">
                        <p className="text-sm">Demo credentials:</p>
                        <p className="text-sm"><strong>Email:</strong> demo@example.com</p>
                        <p className="text-sm"><strong>Password:</strong> demo123</p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password *
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? <EyeOff size={20} className="text-gray-400" /> : <Eye size={20} className="text-gray-400" />}
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                                loading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700'
                            } text-white`}
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>

                        <div className="text-center">
                            <p className="text-gray-600">
                                Don't have an account?{' '}
                                <button
                                    onClick={() => setCurrentPage('register')}
                                    className="text-blue-600 hover:text-blue-800 font-semibold"
                                >
                                    Sign up here
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Register Page Component
const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (error) setError('');
    };

    const validateForm = () => {
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
            return 'Please fill in all fields';
        }

        if (formData.password !== formData.confirmPassword) {
            return 'Passwords do not match';
        }

        if (formData.password.length < 6) {
            return 'Password must be at least 6 characters long';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return 'Please enter a valid email address';
        }

        return null;
    };

    const handleSubmit = () => {
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        setTimeout(() => {
            const result = register({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password
            });

            if (result.success) {
                setCurrentPage('profile');
                setFormData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
            } else {
                setError(result.error);
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-3xl font-bold text-center mb-8">Create Account</h1>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                            {error}
                        </div>
                    )}

                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    First Name *
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="First name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Name *
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Last name"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password *
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Create a password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? <EyeOff size={20} className="text-gray-400" /> : <Eye size={20} className="text-gray-400" />}
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">Password must be at least 6 characters</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password *
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} className="text-gray-400" /> : <Eye size={20} className="text-gray-400" />}
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                                loading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700'
                            } text-white`}
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>

                        <div className="text-center">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <button
                                    onClick={() => setCurrentPage('login')}
                                    className="text-blue-600 hover:text-blue-800 font-semibold"
                                >
                                    Sign in here
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Profile Page Component
const ProfilePage = () => {
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
        setUser({ ...user, ...formData });
        setEditing(false);
    };

    if (!user) {
        return (
            <div className="py-8">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
                    <p className="text-gray-600 mb-8">Please log in to view your profile.</p>
                    <button
                        onClick={() => setCurrentPage('login')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">My Profile</h1>

                    <div className="bg-white rounded-lg shadow-md p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">Personal Information</h2>
                            <button
                                onClick={() => editing ? handleSave() : setEditing(true)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                            >
                                {editing ? 'Save Changes' : 'Edit Profile'}
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name
                                    </label>
                                    {editing ? (
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    ) : (
                                        <p className="text-gray-900">{user.firstName}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name
                                    </label>
                                    {editing ? (
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    ) : (
                                        <p className="text-gray-900">{user.lastName}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                {editing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                ) : (
                                    <p className="text-gray-900">{user.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Member Since
                                </label>
                                <p className="text-gray-900">January 2025</p>
                            </div>
                        </div>

                        {editing && (
                            <div className="mt-6 pt-6 border-t">
                                <button
                                    onClick={() => setEditing(false)}
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 mr-4"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Orders Page Component
const OrdersPage = () => {
    const mockOrders = [
        {
            id: 'ORD-001',
            date: '2025-01-15',
            status: 'Delivered',
            total: 299.99,
            items: [
                { name: 'Premium Wireless Headphones', quantity: 1, price: 299.99 }
            ]
        },
        {
            id: 'ORD-002',
            date: '2025-01-20',
            status: 'Shipped',
            total: 279.98,
            items: [
                { name: 'Smart Fitness Watch', quantity: 1, price: 199.99 },
                { name: 'Laptop Stand Pro', quantity: 1, price: 79.99 }
            ]
        }
    ];

    if (!user) {
        return (
            <div className="py-8">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
                    <p className="text-gray-600 mb-8">Please log in to view your orders.</p>
                    <button
                        onClick={() => setCurrentPage('login')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">My Orders</h1>

                <div className="space-y-6">
                    {mockOrders.map(order => (
                        <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold">Order {order.id}</h3>
                                    <p className="text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center py-2">
                                        <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-gray-600">Quantity: {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold">${item.price}</p>
                                    </div>
                                ))}

                                <div className="border-t pt-4 mt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold">Total: ${order.total}</span>
                                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Home Page Component
const HomePage = () => (
    <div>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-5xl font-bold mb-6">Welcome to TechStore</h1>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                    Discover the latest technology products at unbeatable prices. Quality guaranteed.
                </p>
                <button
                    onClick={() => setCurrentPage('products')}
                    className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                    Shop Now
                </button>
            </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.slice(0, 3).map(product => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
                                            <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                                        ))}
                                    </div>
                                    <span className="text-gray-600 text-sm ml-2">({product.reviews})</span>
                                </div>
                                <p className="text-2xl font-bold text-blue-600 mb-4">${product.price}</p>
                                <button
                                    onClick={() => {
                                        setSelectedProduct(product);
                                        setCurrentPage('product');
                                    }}
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
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ShoppingCart className="text-blue-600" size={32} />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
                        <p className="text-gray-600">Free shipping on all orders over $100</p>
                    </div>
                    <div className="p-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Star className="text-blue-600" size={32} />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
                        <p className="text-gray-600">30-day money-back guarantee</p>
                    </div>
                    <div className="p-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Phone className="text-blue-600" size={32} />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                        <p className="text-gray-600">Round-the-clock customer support</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
);

// Products Page Component
const ProductsPage = () => (
    <div className="py-8">
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8">All Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map(product => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
                                        <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                                    ))}
                                </div>
                                <span className="text-gray-600 text-sm ml-2">({product.reviews})</span>
                            </div>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                                <span className={`px-2 py-1 rounded text-xs ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                            </div>
                            <div className="mt-4 space-y-2">
                                <button
                                    onClick={() => {
                                        setSelectedProduct(product);
                                        setCurrentPage('product');
                                    }}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    View Details
                                </button>
                                {product.inStock && (
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                                    >
                                        Add to Cart
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// Product Detail Page Component
const ProductPage = () => {
    const [quantity, setQuantity] = useState(1);

    if (!selectedProduct) return null;

    return (
        <div className="py-8">
            <div className="container mx-auto px-4">
                <button
                    onClick={() => setCurrentPage('products')}
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
                            className="w-full h-96 object-cover rounded-lg"
                        />
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
    );
};

// Contact Page Component
const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-12">Contact Us</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
                        <p className="text-gray-600 mb-8">
                            Have questions about our products or need support? We're here to help!
                            Send us a message and we'll respond as soon as possible.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Phone className="text-blue-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Phone</h3>
                                    <p className="text-gray-600">+1 (555) 123-4567</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Mail className="text-blue-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Email</h3>
                                    <p className="text-gray-600">support@techstore.com</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <MapPin className="text-blue-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Address</h3>
                                    <p className="text-gray-600">123 Tech Street<br />San Francisco, CA 94105</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                            Subject *
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
                            Message *
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
                        Send Message
                    </button>
                </form>
            </div>
        </div>
</div>
</div>
);
};

// Footer Component
const Footer = () => (
    <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4">TechStore</h3>
                    <p className="text-gray-300">
                        Your trusted destination for the latest technology products at competitive prices.
                    </p>
                </div>

                <div>
                    <h4 className="font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><button onClick={() => setCurrentPage('home')} className="text-gray-300 hover:text-white">Home</button></li>
                        <li><button onClick={() => setCurrentPage('products')} className="text-gray-300 hover:text-white">Products</button></li>
                        <li><button onClick={() => setCurrentPage('contact')} className="text-gray-300 hover:text-white">Contact</button></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-4">Customer Service</h4>
                    <ul className="space-y-2 text-gray-300">
                        <li>FAQ</li>
                        <li>Shipping Info</li>
                        <li>Returns</li>
                        <li>Track Order</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-4">Contact Info</h4>
                    <ul className="space-y-2 text-gray-300">
                        <li>+1 (555) 123-4567</li>
                        <li>support@techstore.com</li>
                        <li>123 Tech Street<br />San Francisco, CA 94105</li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-700 pt-8 mt-8 text-center text-gray-300">
                <p>&copy; 2025 TechStore. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

// Main render
return (
    <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="min-h-screen">
            {currentPage === 'home' && <HomePage />}
            {currentPage === 'products' && <ProductsPage />}
            {currentPage === 'contact' && <ContactPage />}
            {currentPage === 'product' && <ProductPage />}
            {currentPage === 'login' && <LoginPage />}
            {currentPage === 'register' && <RegisterPage />}
            {currentPage === 'profile' && <ProfilePage />}
            {currentPage === 'orders' && <OrdersPage />}
        </main>

        <Footer />
    </div>
);
};

export default EcommerceWebsite;