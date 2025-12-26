import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Phone } from 'lucide-react';
import { cn } from '../lib/utils';
import LivePrice from './LivePrice';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { cartCount, setIsCartOpen } = useCart();

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-yellow-600/20 transition-all duration-300">
            <div className="bg-website-primary text-white text-[10px] md:text-xs py-2 px-4 text-center tracking-widest uppercase">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <span>Free Shipping on Orders above ₹5000</span>
                    <div className="flex items-center gap-4">
                        <a href="tel:+918302287914" className="flex items-center gap-1 hover:text-website-accent transition"><Phone size={12} /> +91 83022 87914</a>
                        <LivePrice />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20 md:h-24 transition-all">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex flex-col items-center group leading-none">
                        <span className="font-serif text-3xl font-bold tracking-widest text-website-primary group-hover:text-website-accent transition duration-300">SDS</span>
                        <span className="text-[10px] tracking-[0.3em] font-bold text-gray-400 group-hover:text-website-accent transition duration-300 -mt-1 uppercase">Jewellers</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8 font-medium">
                        <Link to="/" className="hover:text-website-accent transition text-xs tracking-[0.15em] uppercase font-bold text-gray-800">Home</Link>
                        <Link to="/category" className="hover:text-website-accent transition text-xs tracking-[0.15em] uppercase font-bold text-gray-800">Collections</Link>
                        <Link to="/about" className="hover:text-website-accent transition text-xs tracking-[0.15em] uppercase font-bold text-gray-800">Our Legacy</Link>
                        <Link to="/locate" className="hover:text-website-accent transition text-xs tracking-[0.15em] uppercase font-bold text-gray-800">Locate Us</Link>
                        <Link to="/contact" className="hover:text-website-accent transition text-xs tracking-[0.15em] uppercase font-bold text-gray-800">Contact</Link>
                        <Link to="/track-order" className="hover:text-website-accent transition text-xs tracking-[0.15em] uppercase font-bold text-gray-800">Track Order</Link>
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button className="text-gray-700 hover:text-website-accent">
                            <Search size={20} />
                        </button>
                        <button
                            className="text-gray-700 hover:text-website-accent relative"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <ShoppingCart size={20} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-website-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>
                            )}
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-website-primary focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center py-4 bg-gray-50">
                        <Link to="/" className="block px-3 py-3 text-gray-900 border-b border-gray-200 w-full text-center font-medium tracking-wide" onClick={() => setIsOpen(false)}>HOME</Link>
                        <Link to="/category" className="block px-3 py-3 text-gray-900 border-b border-gray-200 w-full text-center font-medium tracking-wide" onClick={() => setIsOpen(false)}>COLLECTIONS</Link>
                        <Link to="/about" className="block px-3 py-3 text-gray-900 border-b border-gray-200 w-full text-center font-medium tracking-wide" onClick={() => setIsOpen(false)}>OUR LEGACY</Link>
                        <Link to="/locate" className="block px-3 py-3 text-gray-900 border-b border-gray-200 w-full text-center font-medium tracking-wide" onClick={() => setIsOpen(false)}>LOCATE US</Link>
                        <Link to="/contact" className="block px-3 py-3 text-gray-900 w-full text-center font-medium tracking-wide" onClick={() => setIsOpen(false)}>CONTACT</Link>
                        <Link to="/track-order" className="block px-3 py-3 text-gray-900 border-t border-gray-100 w-full text-center font-medium tracking-wide" onClick={() => setIsOpen(false)}>TRACK ORDER</Link>

                        <div className="flex gap-6 mt-6 pb-4">
                            <button className="text-gray-900 p-2 bg-white rounded-full shadow-sm"><Search size={20} /></button>
                            <button
                                className="text-gray-900 relative p-2 bg-white rounded-full shadow-sm"
                                onClick={() => { setIsOpen(false); setIsCartOpen(true); }}
                            >
                                <ShoppingCart size={20} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-website-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
