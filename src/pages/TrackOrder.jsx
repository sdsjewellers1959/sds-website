import React, { useState } from 'react';
import { Search, Package, Check, AlertTriangle, CreditCard, Truck, Users, XCircle, MessageCircle } from 'lucide-react';
import { apiClient } from '../lib/api';
import SEO from '../components/SEO';

const TrackOrder = () => {
    const [orderId, setOrderId] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Modification Request State
    const [modType, setModType] = useState(''); // 'cancel', 'address', 'phone'
    const [modValue, setModValue] = useState('');

    const handleWhatsAppRequest = () => {
        if (!modValue.trim()) return alert("Please provide details.");

        const typeLabels = {
            'cancel': 'Request Cancellation',
            'address': 'Update Address',
            'phone': 'Update Phone Number'
        };

        const message = `Hello SDS Jewellers,
I want to request a change for Order #${order.id}.
Request Type: ${typeLabels[modType]}
Details: ${modValue}

Link: ${window.location.href}`;

        const url = `https://wa.me/918302287914?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        setModType('');
        setModValue('');
    };

    const handleTrack = async (e) => {
        e.preventDefault();
        if (!orderId.trim() || !mobileNumber.trim()) {
            setError('Please enter both Order ID and Mobile Number');
            return;
        }

        setLoading(true);
        setError('');
        setOrder(null);

        try {
            const data = await apiClient.getOrder(orderId.trim(), mobileNumber.trim());
            if (data) {
                // Normalize statuses for frontend
                const normalizedOrder = {
                    ...data,
                    // Use new fields if available, else legacy fallback
                    _payment_status: data.payment_status || (['Paid', 'Processing', 'Shipped', 'Delivered', 'Price Mismatch'].includes(data.status) ? 'Paid' : 'Pending'),
                    _order_status: data.order_status || data.status || 'Placed'
                };
                setOrder(normalizedOrder);
            } else {
                setError('Order not found. Please check your details and try again.');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const StatusStep = ({ status, currentStatus, paymentStatus, label, icon: Icon }) => {
        // Define status hierarchy
        const statusOrder = ['Pending Payment', 'Paid', 'Processing', 'Shipped', 'Delivered'];

        // Determine completion based on status type
        let isCompleted = false;
        if (status === 'Pending Payment') isCompleted = true; // Always true if order exists
        else if (status === 'Paid') isCompleted = paymentStatus === 'Paid';
        else {
            // For post-payment statuses, check the order status hierarchy
            // Map 'Placed' and 'Confirmed' to early stages
            const currentIdx = statusOrder.indexOf(currentStatus === 'Placed' || currentStatus === 'Confirmed' ? 'Paid' : currentStatus);
            const thisIdx = statusOrder.indexOf(status);
            isCompleted = thisIdx <= currentIdx && paymentStatus === 'Paid' && !['Cancelled', 'Price Mismatch', 'Rejected', 'Refunded'].includes(currentStatus);
        }

        const isCurrent = status === currentStatus || (status === 'Paid' && currentStatus === 'Confirmed') || (status === 'Pending Payment' && currentStatus === 'Placed');

        // Handle special statuses that don't fit the linear flow
        const isError = ['Cancelled', 'Price Mismatch', 'Rejected'].includes(currentStatus) && status === currentStatus;

        let colorClass = 'text-gray-400 border-gray-300';
        if (isCompleted) colorClass = 'text-green-600 border-green-600';
        if (isCurrent) colorClass = 'text-website-primary border-website-primary';
        if (isError) colorClass = 'text-red-500 border-red-500';

        return (
            <div className={`flex flex-col items-center flex-1`}>
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2 bg-white ${colorClass}`}>
                    <Icon size={20} />
                </div>
                <span className={`text-xs text-center font-medium ${isCurrent || isCompleted || isError ? 'text-gray-800' : 'text-gray-400'}`}>
                    {label}
                </span>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <SEO title="Track Your Order" description="Check the status of your order with SDS Jewellers." />

            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Track Your Order</h1>
                    <p className="text-gray-600">Enter your Order ID and Mobile Number to track your order.</p>
                </div>

                {/* Search Box */}
                <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                    <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Order ID"
                            className="flex-1 border border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:border-website-primary"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Mobile Number"
                            className="flex-1 border border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:border-website-primary"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-website-primary text-white px-6 py-2 rounded-sm hover:bg-black transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Tracking...' : 'Track'}
                        </button>
                    </form>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>

                {/* Order Details */}
                {order && (
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-fade-in">
                        {/* Header */}
                        <div className="bg-gray-50 border-b border-gray-100 p-6 flex justify-between items-center flex-wrap gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Order ID</p>
                                <p className="font-bold text-lg">#{order.id}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Total Amount</p>
                                <p className="font-bold text-lg text-website-primary">₹{order.total_amount?.toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Status Timeline */}
                        <div className="p-8">
                            {/* Special Status Banners */}
                            {order._order_status === 'Price Mismatch' && (
                                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-8">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <AlertTriangle className="h-5 w-5 text-orange-500" />
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-orange-800">Action Required: Price Update</h3>
                                            <div className="mt-2 text-sm text-orange-700">
                                                <p>The silver spot price changed during your transaction. The new price is <strong>₹{order.price_mismatch_details?.new_price?.toLocaleString()}</strong> (Difference: ₹{order.price_mismatch_details?.difference}).</p>
                                                <div className="mt-4 flex gap-3">
                                                    <button
                                                        onClick={() => alert("Payment Gateway Integration Pending.\nPlease contact support to pay the difference: +91 83022 87914")}
                                                        className="bg-orange-600 text-white px-4 py-2 rounded-sm text-xs font-medium hover:bg-orange-700"
                                                    >
                                                        Pay Difference (₹{order.price_mismatch_details?.difference})
                                                    </button>
                                                    <button
                                                        onClick={async () => {
                                                            if (window.confirm("Are you sure you want to cancel this order?")) {
                                                                try {
                                                                    await apiClient.updateOrder(order.id, {
                                                                        status: 'Cancelled',
                                                                        order_status: 'Cancelled'
                                                                    });
                                                                    setOrder({ ...order, status: 'Cancelled', _order_status: 'Cancelled' });
                                                                } catch (e) {
                                                                    alert("Failed to cancel order");
                                                                }
                                                            }
                                                        }}
                                                        className="bg-white text-orange-600 border border-orange-600 px-4 py-2 rounded-sm text-xs font-medium hover:bg-orange-50"
                                                    >
                                                        Cancel & Refund
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {(order._order_status === 'Refunded' || order._order_status === 'Cancelled') && (
                                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
                                    <p className="text-blue-700 text-sm">
                                        Your order has been cancelled and refunded. The amount will reflect in your account within 7 working days.
                                    </p>
                                </div>
                            )}

                            {/* Linear Status Bar */}
                            {['Placed', 'Pending Payment', 'Paid', 'Confirmed', 'Processing', 'Shipped', 'Delivered'].includes(order._order_status) && (
                                <div className="relative flex justify-between mb-8">
                                    {/* Connectivity Lines */}
                                    <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 -z-10" />

                                    <StatusStep status="Pending Payment" currentStatus={order._order_status} paymentStatus={order._payment_status} label="Placed" icon={CreditCard} />
                                    <StatusStep status="Paid" currentStatus={order._order_status} paymentStatus={order._payment_status} label="Confirmed" icon={Check} />
                                    <StatusStep status="Processing" currentStatus={order._order_status} paymentStatus={order._payment_status} label="Processing" icon={Package} />
                                    <StatusStep status="Shipped" currentStatus={order._order_status} paymentStatus={order._payment_status} label="Shipped" icon={Truck} />
                                    <StatusStep status="Delivered" currentStatus={order._order_status} paymentStatus={order._payment_status} label="Delivered" icon={Users} />
                                </div>
                            )}

                            {/* Courier Info */}
                            {order._order_status === 'Shipped' && order.tracking_info && (
                                <div className="bg-gray-50 p-4 rounded-md mt-6">
                                    <h4 className="font-bold text-gray-900 mb-2">Tracking Information</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-500 block">Courier Partner</span>
                                            <span className="font-medium">{order.tracking_info.courier}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 block">Tracking Number</span>
                                            <span className="font-medium">{order.tracking_info.tracking_number}</span>
                                        </div>
                                        <div>
                                            <a
                                                href={order.tracking_info.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-website-primary underline hover:text-black"
                                            >
                                                Track Shipment &rarr;
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Order Modification Actions (Non-Shipped Orders Only) */}
                        {['Placed', 'Pending Payment', 'Paid', 'Confirmed', 'Processing'].includes(order._order_status) && (
                            <div className="border-t border-gray-100 p-6 bg-blue-50">
                                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <MessageCircle size={20} className="text-website-primary" />
                                    Need Help with your Order?
                                </h3>

                                {!modType ? (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <button
                                            onClick={() => setModType('cancel')}
                                            className="bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
                                        >
                                            Request Cancellation
                                        </button>
                                        <button
                                            onClick={() => setModType('address')}
                                            className="bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
                                        >
                                            Update Address
                                        </button>
                                        <button
                                            onClick={() => setModType('phone')}
                                            className="bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
                                        >
                                            Update Phone Number
                                        </button>
                                    </div>
                                ) : (
                                    <div className="bg-white p-4 rounded-lg shadow-sm animate-fade-in border border-blue-100">
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="font-semibold text-sm">
                                                {modType === 'cancel' && 'Request Order Cancellation'}
                                                {modType === 'address' && 'Update Delivery Address'}
                                                {modType === 'phone' && 'Update Contact Number'}
                                            </h4>
                                            <button onClick={() => { setModType(''); setModValue(''); }} className="text-gray-400 hover:text-gray-600">
                                                <XCircle size={18} />
                                            </button>
                                        </div>

                                        <div className="mb-3">
                                            {modType === 'cancel' && (
                                                <textarea
                                                    className="w-full border border-gray-300 rounded-sm p-3 text-sm focus:outline-none focus:border-website-primary"
                                                    rows="3"
                                                    placeholder="Please tell us why you want to cancel (Optional but helpful)..."
                                                    value={modValue}
                                                    onChange={(e) => setModValue(e.target.value)}
                                                />
                                            )}
                                            {modType === 'address' && (
                                                <textarea
                                                    className="w-full border border-gray-300 rounded-sm p-3 text-sm focus:outline-none focus:border-website-primary"
                                                    rows="3"
                                                    placeholder="Enter your new complete address with Pincode..."
                                                    value={modValue}
                                                    onChange={(e) => setModValue(e.target.value)}
                                                />
                                            )}
                                            {modType === 'phone' && (
                                                <input
                                                    type="text"
                                                    className="w-full border border-gray-300 rounded-sm p-3 text-sm focus:outline-none focus:border-website-primary"
                                                    placeholder="Enter new phone number..."
                                                    value={modValue}
                                                    onChange={(e) => setModValue(e.target.value)}
                                                />
                                            )}
                                        </div>

                                        <button
                                            onClick={handleWhatsAppRequest}
                                            className="w-full bg-[#25D366] text-white py-2 rounded-sm font-medium hover:bg-[#128C7E] transition-colors flex justify-center items-center gap-2"
                                        >
                                            <MessageCircle size={18} />
                                            Send Request via WhatsApp
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Order Items Preview (Optional but nice) */}
                        <div className="border-t border-gray-100 p-6">
                            <h3 className="font-bold mb-4">Items Ordered</h3>
                            <div className="space-y-4">
                                {order.items && (typeof order.items === 'string' ? JSON.parse(order.items) : order.items).map((item, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-sm" />
                                        <div>
                                            <p className="font-medium text-gray-900">{item.name}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            <p className="text-sm font-medium">₹{item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackOrder;
