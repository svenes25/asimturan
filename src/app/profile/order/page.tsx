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