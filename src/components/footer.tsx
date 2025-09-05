import Link from "next/link";

const Footer = () => (
    <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* About */}
                <div>
                    <h3 className="text-xl font-bold mb-4">Asım Turan</h3>
                    <p className="text-gray-300">
                        Your trusted destination for the latest technology products at competitive prices.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/home" className="text-gray-300 hover:text-white">Home</Link>
                        </li>
                        <li>
                            <Link href="/products" className="text-gray-300 hover:text-white">Products</Link>
                        </li>
                        <li>
                            <Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link>
                        </li>
                    </ul>
                </div>

                {/* Customer Service */}
                <div>
                    <h4 className="font-semibold mb-4">Customer Service</h4>
                    <ul className="space-y-2 text-gray-300">
                        <li>FAQ</li>
                        <li>Shipping Info</li>
                        <li>Returns</li>
                        <li>Track Order</li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="font-semibold mb-4">Contact Info</h4>
                    <ul className="space-y-2 text-gray-300">
                        <li>+1 (555) 123-4567</li>
                        <li>support@asimturan.com</li>
                        <li>123 Tech Street<br />San Francisco, CA 94105</li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-700 pt-8 mt-8 text-center text-gray-300">
                <p>&copy; 2025 Asım Turan. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

export default Footer;
