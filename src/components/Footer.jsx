import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, ArrowRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-20 border-t border-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Top Section: CTA */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 border-b border-gray-800 pb-10">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold mb-4">Join the legacy.</h2>
                        <p className="text-gray-400 max-w-md">Subscribe to our newsletter for exclusive drops and silver investment insights.</p>
                    </div>
                    <div className="mt-8 md:mt-0 w-full md:w-auto flex flex-col md:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-transparent border-b border-gray-600 px-4 py-2 focus:outline-none focus:border-white transition w-full md:w-80"
                        />
                        <button className="flex items-center gap-2 group text-white font-medium">
                            SUBSCRIBE <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Middle Section: Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
                    <div>
                        <h4 className="text-xs font-bold tracking-widest text-gray-500 mb-6 uppercase">Collections</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link to="/category" className="hover:text-website-secondary transition">New Arrivals</Link></li>
                            <li><Link to="/category" className="hover:text-website-secondary transition">Best Sellers</Link></li>
                            <li><Link to="/category" className="hover:text-website-secondary transition">Weddings</Link></li>
                            <li><Link to="/category" className="hover:text-website-secondary transition">Gifting</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold tracking-widest text-gray-500 mb-6 uppercase">Support</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link to="/contact" className="hover:text-website-secondary transition">Contact Us</Link></li>
                            <li><Link to="/shipping" className="hover:text-website-secondary transition">Shipping & Returns</Link></li>
                            <li><Link to="/faq" className="hover:text-website-secondary transition">FAQs</Link></li>
                            <li><Link to="/care" className="hover:text-website-secondary transition">Jewelry Care</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold tracking-widest text-gray-500 mb-6 uppercase">Company</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link to="/about" className="hover:text-website-secondary transition">Our Legacy</Link></li>
                            <li><Link to="/locate" className="hover:text-website-secondary transition">Store Locator</Link></li>
                            <li><Link to="/careers" className="hover:text-website-secondary transition">Careers</Link></li>
                            <li><Link to="/terms" className="hover:text-website-secondary transition">Terms & Privacy</Link></li>
                        </ul>
                    </div>

                    <div className="col-span-2 md:col-span-1">
                        <h4 className="text-xs font-bold tracking-widest text-gray-500 mb-6 uppercase">Follow Us</h4>
                        <div className="flex space-x-6">
                            <a href="#" className="hover:text-website-accent transition"><Facebook size={24} /></a>
                            <a href="#" className="hover:text-website-accent transition"><Instagram size={24} /></a>
                            <a href="#" className="hover:text-website-accent transition"><Twitter size={24} /></a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Branding */}
                <div className="flex flex-col md:flex-row justify-between items-end border-t border-gray-900 pt-10 mt-10">
                    <h1 className="text-[18vw] md:text-[12vw] leading-none font-serif font-bold text-gray-800 select-none mx-auto md:mx-0">SDS</h1>
                    <div className="text-center md:text-right w-full md:w-auto mt-8 md:mt-0">
                        <p className="text-gray-600 text-xs md:text-sm mb-2">&copy; {new Date().getFullYear()} SDS Jewellers.</p>
                        <p className="text-gray-600 text-xs md:text-sm">Handcrafted in India with ❤️</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
