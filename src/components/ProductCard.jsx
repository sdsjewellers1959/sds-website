import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    return (
        <motion.div
            className="group relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="aspect-square w-full overflow-hidden bg-gray-100 rounded-sm relative">
                <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center"
                />
                {/* Quick Add Button */}
                {/* Quick Add Button - Hidden on mobile, visible on group hover for desktop */}
                <button
                    onClick={() => addToCart(product)}
                    className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-white p-2 md:p-3 rounded-full shadow-md md:translate-y-20 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300 hover:bg-website-primary hover:text-white z-10 lg:block hidden"
                >
                    <ShoppingCart size={18} />
                </button>
                {/* Mobile Add Icon - Always visible on mobile */}
                <button
                    onClick={() => addToCart(product)}
                    className="absolute bottom-2 right-2 bg-white/90 p-2 rounded-full shadow-sm text-website-primary lg:hidden"
                >
                    <ShoppingCart size={16} />
                </button>
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                    <h3 className="text-sm font-medium text-gray-900">
                        <Link to={`/product/${product.id}`}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                        </Link>
                    </h3>
                </div>
                <p className="text-sm font-serif font-bold text-gray-900">₹{product.price.toLocaleString()}</p>
            </div>
            <p className="mt-1 text-xs text-website-accent font-medium">925 Purity • {product.weight}</p>
        </motion.div>
    );
};

export default ProductCard;
