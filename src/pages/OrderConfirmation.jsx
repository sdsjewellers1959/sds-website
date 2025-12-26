import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, MapPin, Phone, Mail } from 'lucide-react';
import { apiClient } from '../lib/api';
import SEO from '../components/SEO';

const OrderConfirmation = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                // Determine if ID is UUID or Integer to use correct lookup strategy
                // But specifically for confirmation page, we likely have the ID returned from creation
                // which might be integer. getOrder handles both now.
                const data = await apiClient.getOrder(orderId);
                if (data) {
                    setOrder(data);
                } else {
                    setError('Order not found.');
                }
            } catch (err) {
                console.error(err);
                setError('Failed to load order details.');
            } finally {
                setLoading(false);
            }
        };

        if (orderId) {
            fetchOrder();
        }
    }, [orderId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-website-primary"></div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
                <div className="text-red-500 mb-4 text-xl">⚠️ {error || 'Order not found'}</div>
                <Link to="/" className="text-website-primary hover:underline">Return to Home</Link>
            </div>
        );
    }

    const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <SEO title="Order Confirmed" description="Your order has been successfully placed." />

            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                    {/* Success Header */}
                    <div className="bg-green-50 p-8 text-center border-b border-green-100">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                            <CheckCircle className="h-10 w-10 text-green-600" />
                        </div>
                        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Order Confirmed!</h1>
                        <p className="text-gray-600">Thank you for your purchase. Your order has been placed successfully.</p>
                        <p className="text-sm text-gray-500 mt-2">Order ID: <span className="font-mono font-bold text-gray-900">#{order.id}</span></p>
                    </div>

                    {/* Order Details Grid */}
                    <div className="p-6 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Shipping Details</h3>
                                <div className="space-y-1">
                                    <p className="font-medium text-gray-900">{order.customer_name}</p>
                                    <p className="text-gray-600 text-sm whitespace-pre-line">{order.address}</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Contact Info</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                        {order.customer_email}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                        {order.customer_phone}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Items List */}
                        <div className="border border-gray-100 rounded-lg overflow-hidden mb-8">
                            <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
                                <h3 className="font-medium text-gray-900 flex items-center">
                                    <Package className="h-4 w-4 mr-2 text-gray-500" />
                                    Order Summary
                                </h3>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {items && items.map((item, idx) => (
                                    <div key={idx} className="p-4 flex items-center">
                                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <div className="flex justify-between">
                                                <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                                                <p className="text-sm font-medium text-gray-900">₹{item.price?.toLocaleString()}</p>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-gray-50 px-4 py-4 border-t border-gray-100">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-gray-900">Total Amount Paid</span>
                                    <span className="text-xl font-bold text-website-primary">₹{order.total_amount?.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/"
                                className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-sm text-white bg-website-primary hover:bg-black transition-colors"
                            >
                                Continue Shopping
                            </Link>
                            <Link
                                to="/track-order"
                                className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-sm text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Track Order
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
