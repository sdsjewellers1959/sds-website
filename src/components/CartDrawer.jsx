import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setIsCartOpen(false)} />

            <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="w-screen max-w-md bg-white shadow-xl flex flex-col h-full transform transition-transform duration-300 ease-in-out">

                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900">Your Cart</h2>
                        <button
                            onClick={() => setIsCartOpen(false)}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        {cart.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
                                <ShoppingBag size={48} />
                                <p>Your cart is empty.</p>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="text-website-primary underline hover:text-website-accent"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        ) : (
                            <ul className="divide-y divide-gray-200">
                                {cart.map((item) => (
                                    <li key={item.id} className="flex py-6">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3>
                                                        <Link to={`/product/${item.id}`} onClick={() => setIsCartOpen(false)}>{item.name}</Link>
                                                    </h3>
                                                    <p className="ml-4">₹{item.price.toLocaleString()}</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <div className="flex items-center border border-gray-300 rounded-sm">
                                                    <button className="p-1 hover:bg-gray-100" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}><Minus size={14} /></button>
                                                    <span className="px-2">{item.quantity}</span>
                                                    <button className="p-1 hover:bg-gray-100" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="font-medium text-website-primary hover:text-website-accent"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}

                    </div>

                    {/* Footer */}
                    {cart.length > 0 && (
                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                                <p>Subtotal</p>
                                <p>₹{cartTotal.toLocaleString()}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500 mb-6">Shipping and taxes calculated at checkout.</p>
                            <Link
                                to="/checkout"
                                onClick={() => setIsCartOpen(false)}
                                className="flex items-center justify-center rounded-md border border-transparent bg-website-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-black transition"
                            >
                                Checkout
                            </Link>
                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                <p>
                                    or{' '}
                                    <button
                                        type="button"
                                        onClick={() => setIsCartOpen(false)}
                                        className="font-medium text-website-primary hover:text-website-accent"
                                    >
                                        Continue Shopping
                                        <span aria-hidden="true"> &rarr;</span>
                                    </button>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;
