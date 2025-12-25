import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { apiClient } from '../lib/api';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        pincode: ''
    });

    if (cart.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <h1 className="text-2xl font-serif mb-4">Your cart is empty</h1>
                <Link to="/" className="text-website-primary underline">Return to Shop</Link>
            </div>
        )
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("Submitting order...");

        try {
            // 1. Create Order on Backend
            const orderData = {
                customer_name: `${formData.firstName} ${formData.lastName}`,
                customer_email: formData.email,
                customer_phone: formData.phone,
                address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.zipCode}`,
                total_amount: cartTotal,
                items: cart
            };

            const data = await apiClient.createOrder(orderData);
            console.log("Order created:", data);

            // 2. Initialize Razorpay
            const options = {
                key: data.key_id,
                amount: data.order.total_amount * 100, // Amount in paise
                currency: "INR",
                name: "SDS Jewellers",
                description: "Purchase from SDS Jewellers",
                order_id: data.razorpay_order_id,
                handler: async function (response) {
                    // 3. Verify Payment
                    try {
                        const verifyData = {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        };
                        const verifyRes = await apiClient.verifyPayment(verifyData);

                        if (verifyRes.status === 'success') {
                            clearCart();
                            alert("Payment Successful! Order Placed.");
                            navigate('/');
                        } else {
                            alert("Payment Verification Failed");
                        }
                    } catch (err) {
                        console.error(err);
                        alert("Payment verification error");
                    }
                },
                prefill: {
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    contact: formData.phone
                },
                theme: {
                    color: "#B8860B"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                alert("Payment Failed: " + response.error.description);
            });
            rzp.open();

        } catch (error) {
            console.error("Checkout failed", error);
            alert("Failed to initiate checkout. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Guest Checkout Form */}
                    <div className="bg-white p-8 rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold mb-6">Contact & Shipping</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Contact Information</h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email / Mobile No.</label>
                                    <input
                                        type="text"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 px-4 py-2 rounded-sm focus:outline-none focus:border-website-primary"
                                        placeholder="Email or Mobile"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">We'll send order updates here. No login required.</p>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Shipping Address</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                        <input type="text" name="firstName" required onChange={handleChange} className="w-full border border-gray-300 px-4 py-2 rounded-sm focus:outline-none focus:border-website-primary" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                        <input type="text" name="lastName" required onChange={handleChange} className="w-full border border-gray-300 px-4 py-2 rounded-sm focus:outline-none focus:border-website-primary" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                    <input type="text" name="address" required onChange={handleChange} className="w-full border border-gray-300 px-4 py-2 rounded-sm focus:outline-none focus:border-website-primary" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                        <input type="text" name="city" required onChange={handleChange} className="w-full border border-gray-300 px-4 py-2 rounded-sm focus:outline-none focus:border-website-primary" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                                        <input type="text" name="pincode" required onChange={handleChange} className="w-full border border-gray-300 px-4 py-2 rounded-sm focus:outline-none focus:border-website-primary" />
                                    </div>
                                </div>
                            </div>

                            <button disabled={loading} type="submit" className="w-full bg-website-primary text-white py-4 font-medium hover:bg-black transition duration-300 mt-6 disabled:opacity-50">
                                {loading ? 'Processing...' : `Pay ₹${cartTotal.toLocaleString()} via Razorpay`}
                            </button>
                            <p className="text-xs text-center text-gray-500">Secure payments by Razorpay</p>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white p-8 rounded-lg shadow-sm h-fit">
                        <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                        <div className="flow-root">
                            <ul className="-my-6 divide-y divide-gray-200">
                                {cart.map((item) => (
                                    <li key={item.id} className="flex py-6">
                                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3>{item.name}</h3>
                                                    <p className="ml-4">₹{item.price.toLocaleString()}</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <p className="text-gray-500">Qty {item.quantity}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="border-t border-gray-200 pt-6 mt-6 space-y-4">
                            <div className="flex justify-between text-sm text-gray-600">
                                <p>Subtotal</p>
                                <p>₹{cartTotal.toLocaleString()}</p>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <p>Shipping</p>
                                <p className="text-green-600">Free</p>
                            </div>
                            <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold text-gray-900">
                                <p>Total</p>
                                <p>₹{cartTotal.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
