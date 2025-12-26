import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Settings, LogOut, X, Truck, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import ProductForm from '../components/admin/ProductForm';

import { apiClient } from '../lib/api';

const SettingsPage = () => {
    const [activeTab, setActiveTab] = React.useState('general');

    // General Settings
    const [settings, setSettings] = React.useState({
        silver_price: '92.50',
        labour_charge_percent: '18',
        gst_percent: '3',
        additional_tax_percent: '0',
        other_charges_flat: '0',
        contact_email: '',
        contact_phone: ''
    });

    // Categories State
    const [categories, setCategories] = React.useState([]);
    const [newCat, setNewCat] = React.useState({ name: '', image: '', description: '' });

    // Offers State
    const [offers, setOffers] = React.useState([]);
    const [newOffer, setNewOffer] = React.useState({ title: '', description: '', code: '', discount: '', image: '' });

    const [loading, setLoading] = React.useState(false);
    const [msg, setMsg] = React.useState('');

    const loadData = async () => {
        try {
            const [settingsData, catsData, offersData] = await Promise.all([
                apiClient.getSettings(),
                apiClient.getCategories(),
                apiClient.getOffers()
            ]);
            setSettings(prev => ({ ...prev, ...settingsData }));
            setCategories(catsData);
            setOffers(offersData);
        } catch (err) {
            console.error(err);
        }
    };

    React.useEffect(() => {
        loadData();
    }, []);

    const handleSettingsChange = (e) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleSaveSettings = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg('');
        try {
            await apiClient.updateSettings(settings);
            setMsg('Settings updated successfully!');
        } catch (err) {
            setMsg('Failed to update settings.');
        } finally {
            setLoading(false);
        }
    };

    // Category Handlers
    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            await apiClient.createCategory(newCat);
            setNewCat({ name: '', image: '', description: '' });
            loadData();
        } catch (e) { alert("Failed to add category"); }
    };

    const handleDeleteCategory = async (id) => {
        if (window.confirm("Delete this category?")) {
            try { await apiClient.deleteCategory(id); loadData(); } catch (e) { alert("Failed"); }
        }
    };

    // Offer Handlers
    const handleAddOffer = async (e) => {
        e.preventDefault();
        try {
            await apiClient.createOffer(newOffer);
            setNewOffer({ title: '', description: '', code: '', discount: '', image: '' });
            loadData();
        } catch (e) { alert("Failed to add offer"); }
    };

    const handleDeleteOffer = async (id) => {
        if (window.confirm("Delete this offer?")) {
            try { await apiClient.deleteOffer(id); loadData(); } catch (e) { alert("Failed"); }
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Store Settings</h1>

            <div className="flex gap-4 mb-8 border-b border-gray-200 pb-2">
                <button onClick={() => setActiveTab('general')} className={`px-4 py-2 font-medium ${activeTab === 'general' ? 'text-website-primary border-b-2 border-website-primary' : 'text-gray-500'}`}>General</button>
                <button onClick={() => setActiveTab('categories')} className={`px-4 py-2 font-medium ${activeTab === 'categories' ? 'text-website-primary border-b-2 border-website-primary' : 'text-gray-500'}`}>Categories</button>
                <button onClick={() => setActiveTab('offers')} className={`px-4 py-2 font-medium ${activeTab === 'offers' ? 'text-website-primary border-b-2 border-website-primary' : 'text-gray-500'}`}>Offers</button>
            </div>

            {msg && (
                <div className={`p-4 mb-6 rounded-md ${msg.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {msg}
                </div>
            )}

            {activeTab === 'general' && (
                <div className="bg-white p-8 rounded-lg shadow-sm max-w-2xl">
                    <form onSubmit={handleSaveSettings} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Silver Price (per gram)</label>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-500 font-bold">₹</span>
                                    <input type="number" step="0.01" name="silver_price" value={settings.silver_price} onChange={handleSettingsChange} className="w-full border border-gray-300 px-4 py-2 rounded-sm focus:outline-none focus:border-website-primary" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Labour Charge (%)</label>
                                <div className="flex items-center gap-2">
                                    <input type="number" step="0.1" name="labour_charge_percent" value={settings.labour_charge_percent} onChange={handleSettingsChange} className="w-full border border-gray-300 px-4 py-2 rounded-sm focus:outline-none focus:border-website-primary" />
                                    <span className="text-gray-500 font-bold">%</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">GST (%)</label>
                                <div className="flex items-center gap-2">
                                    <input type="number" step="0.1" name="gst_percent" value={settings.gst_percent} onChange={handleSettingsChange} className="w-full border border-gray-300 px-4 py-2 rounded-sm focus:outline-none focus:border-website-primary" />
                                    <span className="text-gray-500 font-bold">%</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Tax (%)</label>
                                <div className="flex items-center gap-2">
                                    <input type="number" step="0.1" name="additional_tax_percent" value={settings.additional_tax_percent} onChange={handleSettingsChange} className="w-full border border-gray-300 px-4 py-2 rounded-sm focus:outline-none focus:border-website-primary" />
                                    <span className="text-gray-500 font-bold">%</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Other Charges (Flat ₹)</label>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-500 font-bold">₹</span>
                                    <input type="number" step="1" name="other_charges_flat" value={settings.other_charges_flat} onChange={handleSettingsChange} className="w-full border border-gray-300 px-4 py-2 rounded-sm focus:outline-none focus:border-website-primary" />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 my-6"></div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                                <input type="email" name="contact_email" value={settings.contact_email} onChange={handleSettingsChange} className="w-full border border-gray-300 px-4 py-2 rounded-sm focus:outline-none focus:border-website-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                                <input type="text" name="contact_phone" value={settings.contact_phone} onChange={handleSettingsChange} className="w-full border border-gray-300 px-4 py-2 rounded-sm focus:outline-none focus:border-website-primary" />
                            </div>
                        </div>
                        <div className="pt-4">
                            <button type="submit" disabled={loading} className="bg-website-primary text-white px-6 py-2 rounded-sm hover:bg-black transition-colors disabled:opacity-50">
                                {loading ? 'Saving...' : 'Save Settings'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {activeTab === 'categories' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="font-bold mb-4">Add New Category</h3>
                        <form onSubmit={handleAddCategory} className="space-y-4">
                            <input type="text" placeholder="Name" required className="w-full border p-2 rounded-sm focus:outline-none focus:border-website-primary" value={newCat.name} onChange={e => setNewCat({ ...newCat, name: e.target.value })} />
                            <input type="text" placeholder="Image URL" className="w-full border p-2 rounded-sm focus:outline-none focus:border-website-primary" value={newCat.image} onChange={e => setNewCat({ ...newCat, image: e.target.value })} />
                            <input type="text" placeholder="Description" className="w-full border p-2 rounded-sm focus:outline-none focus:border-website-primary" value={newCat.description} onChange={e => setNewCat({ ...newCat, description: e.target.value })} />
                            <button type="submit" className="bg-website-primary text-white px-4 py-2 rounded-sm text-sm hover:bg-black transition-colors">Add Category</button>
                        </form>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="font-bold mb-4">Existing Categories</h3>
                        <div className="space-y-4">
                            {categories.map(cat => (
                                <div key={cat.id} className="flex items-center justify-between border-b pb-2">
                                    <div className="flex items-center gap-3">
                                        {cat.image && <img src={cat.image} alt={cat.name} className="w-10 h-10 object-cover rounded-sm" />}
                                        <span className="font-medium">{cat.name}</span>
                                    </div>
                                    <button onClick={() => handleDeleteCategory(cat.id)} className="text-red-500 text-sm hover:underline">Delete</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'offers' && (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[0, 1, 2].map((idx) => {
                            const offer = offers[idx];
                            return (
                                <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                    <h3 className="font-bold mb-4 flex justify-between items-center">
                                        Slot {idx + 1}
                                        {offer && <span className="text-xs font-normal text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Active</span>}
                                    </h3>
                                    <form onSubmit={async (e) => {
                                        e.preventDefault();
                                        const formData = new FormData(e.target);
                                        const data = Object.fromEntries(formData.entries());
                                        try {
                                            if (offer) {
                                                await apiClient.updateOffer(offer.id, data);
                                            } else {
                                                await apiClient.createOffer(data);
                                            }
                                            loadData();
                                            setMsg('Offer updated successfully!');
                                        } catch (err) {
                                            alert("Failed to save offer");
                                        }
                                    }} className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
                                            <input name="title" defaultValue={offer?.title || ''} placeholder="e.g. Wedding Season" className="w-full border p-2 rounded-sm text-sm" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Discount</label>
                                            <input name="discount" defaultValue={offer?.discount || ''} placeholder="e.g. 20% OFF" className="w-full border p-2 rounded-sm text-sm" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                                            <textarea name="description" defaultValue={offer?.description || ''} placeholder="Short description..." className="w-full border p-2 rounded-sm text-sm" rows="2" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Coupon Code</label>
                                            <input name="code" defaultValue={offer?.code || ''} placeholder="e.g. WED20" className="w-full border p-2 rounded-sm text-sm" required />
                                        </div>
                                        <button type="submit" className="w-full bg-website-primary text-white py-2 rounded-sm text-sm hover:bg-black transition-colors">
                                            {offer ? 'Update Slot' : 'Create Slot'}
                                        </button>
                                        {offer && (
                                            <button type="button" onClick={() => handleDeleteOffer(offer.id)} className="w-full text-red-500 text-xs mt-2 hover:underline">
                                                Reset to Default
                                            </button>
                                        )}
                                    </form>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
const Dashboard = () => {
    const [stats, setStats] = React.useState({ sales: 0, orders: 0, products: 0 });

    React.useEffect(() => {
        const fetchStats = async () => {
            try {
                const [ordersData, productsData] = await Promise.all([
                    apiClient.getOrders(),
                    apiClient.getProducts()
                ]);

                const totalSales = ordersData.reduce((sum, order) => sum + (order.total_amount || 0), 0);

                setStats({
                    sales: totalSales,
                    orders: ordersData.length,
                    products: productsData.length
                });
            } catch (error) {
                console.error("Error loading admin stats", error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-gray-500 text-sm font-medium">Total Sales</h3>
                    <p className="text-3xl font-bold mt-2">₹{stats.sales.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
                    <p className="text-3xl font-bold mt-2">{stats.orders}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-gray-500 text-sm font-medium">Total Products</h3>
                    <p className="text-3xl font-bold mt-2">{stats.products}</p>
                </div>
            </div>
        </div>
    );
};

const Products = () => {
    const [products, setProducts] = React.useState([]);
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const [editingProduct, setEditingProduct] = React.useState(null);

    const fetchProducts = async () => {
        try {
            const data = await apiClient.getProducts();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products", error);
        }
    };

    React.useEffect(() => {
        fetchProducts();
    }, []);

    const handleAdd = () => {
        setEditingProduct(null);
        setIsFormOpen(true);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setIsFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await apiClient.deleteProduct(id);
                fetchProducts();
            } catch (err) {
                console.error(err);
                alert("Failed to delete product");
            }
        }
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Products</h1>
                <button onClick={handleAdd} className="bg-website-primary text-white px-4 py-2 rounded-sm text-sm">Add Product</button>
            </div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">In Stock</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-3">
                                    <img src={product.image} className="w-8 h-8 rounded-full object-cover" alt="" />
                                    {product.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{product.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {product.in_stock ? <span className="text-green-600">Yes</span> : <span className="text-red-500">No</span>}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    <button onClick={() => handleEdit(product)} className="text-website-accent hover:text-website-primary">Edit</button>
                                    <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isFormOpen && (
                <ProductForm
                    product={editingProduct}
                    onClose={() => setIsFormOpen(false)}
                    onSave={fetchProducts}
                />
            )}
        </div>
    );
};

const Orders = () => {
    const [orders, setOrders] = React.useState([]);
    const [selectedOrder, setSelectedOrder] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    // Modal State
    const [orderStatus, setOrderStatus] = React.useState('');
    const [tracking, setTracking] = React.useState({ courier: '', tracking_number: '', url: '' });
    const [priceMismatch, setPriceMismatch] = React.useState({ new_price: '' });

    const fetchOrders = async () => {
        try {
            const data = await apiClient.getOrders();
            setOrders(data);
        } catch (error) {
            console.error("Error fetching orders", error);
        }
    };

    React.useEffect(() => {
        fetchOrders();
    }, []);

    const openModal = (order) => {
        setSelectedOrder(order);
        // Fallback for legacy data
        setOrderStatus(order.order_status || order.status || 'Placed');
        setTracking(order.tracking_info || { courier: '', tracking_number: '', url: '' });
        setPriceMismatch(order.price_mismatch_details || { new_price: '' });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!selectedOrder) return;
        setLoading(true);

        try {
            const updates = { order_status: orderStatus };

            // Sync legacy status field for backward compatibility/reporting
            updates.status = orderStatus;

            if (orderStatus === 'Shipped') {
                updates.tracking_info = tracking;
            }

            if (orderStatus === 'Price Mismatch') {
                const oldPrice = selectedOrder.total_amount;
                const newPrice = parseFloat(priceMismatch.new_price);
                updates.price_mismatch_details = {
                    original_price: oldPrice,
                    new_price: newPrice,
                    difference: newPrice - oldPrice
                };
            }

            await apiClient.updateOrder(selectedOrder.id, updates);
            await fetchOrders();
            setSelectedOrder(null);
        } catch (error) {
            alert('Failed to update order');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getPaymentStatus = (order) => {
        if (order.payment_status) return order.payment_status;
        // Inference for legacy orders
        if (['Paid', 'Processing', 'Shipped', 'Delivered', 'Price Mismatch'].includes(order.status)) return 'Paid';
        if (order.status === 'Pending Payment') return 'Pending';
        return 'Unknown';
    };

    const getOrderStatus = (order) => {
        return order.order_status || order.status || 'Placed';
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Orders</h1>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Order Info</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Details</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.length > 0 ? orders.map((order) => {
                                const pStatus = getPaymentStatus(order);
                                const oStatus = getOrderStatus(order);
                                return (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <div className="font-bold text-website-primary">#{order.id}</div>
                                            <div className="text-xs text-gray-400">{new Date(order.created_at).toLocaleDateString()}</div>
                                            <div className="font-bold mt-2">₹{order.total_amount?.toLocaleString()}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            <div className="font-medium text-gray-900">{order.customer_name}</div>
                                            <a href={`mailto:${order.customer_email}`} className="text-xs text-blue-600 hover:underline block">{order.customer_email}</a>
                                            <a href={`tel:${order.customer_phone}`} className="text-xs text-gray-500 hover:text-gray-700 block">{order.customer_phone}</a>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                                            <div className="line-clamp-3" title={order.address}>
                                                {order.address || "N/A"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={cn(
                                                "px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full border",
                                                pStatus === 'Paid' ? "bg-green-50 text-green-700 border-green-200" :
                                                    pStatus === 'Pending' ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                                                        "bg-red-50 text-red-700 border-red-200"
                                            )}>
                                                {pStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={cn(
                                                "px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full border",
                                                oStatus === 'Processing' ? "bg-blue-50 text-blue-700 border-blue-200" :
                                                    oStatus === 'Shipped' ? "bg-purple-50 text-purple-700 border-purple-200" :
                                                        oStatus === 'Delivered' ? "bg-teal-50 text-teal-700 border-teal-200" :
                                                            oStatus === 'Price Mismatch' ? "bg-orange-50 text-orange-700 border-orange-200" :
                                                                oStatus === 'Cancelled' || oStatus === 'Refunded' || oStatus === 'Rejected' ? "bg-red-50 text-red-700 border-red-200" :
                                                                    "bg-gray-100 text-gray-700 border-gray-200"
                                            )}>
                                                {oStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => openModal(order)}
                                                className="text-white bg-website-primary hover:bg-black px-3 py-1.5 rounded-sm text-xs transition-colors shadow-sm"
                                            >
                                                Manage
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">No orders found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Management Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-lg sticky top-0">
                            <div>
                                <h3 className="font-bold text-lg">Manage Order #{selectedOrder.id}</h3>
                                <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">
                                    {new Date(selectedOrder.created_at).toLocaleString()}
                                </p>
                            </div>
                            <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Read-Only Info Grid */}
                            <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-md border border-gray-100">
                                <div>
                                    <span className="block text-gray-500 text-xs">Customer</span>
                                    <span className="font-medium">{selectedOrder.customer_name}</span>
                                </div>
                                <div>
                                    <span className="block text-gray-500 text-xs">Total Amount</span>
                                    <span className="font-medium">₹{selectedOrder.total_amount}</span>
                                </div>
                                <div>
                                    <span className="block text-gray-500 text-xs">Contact</span>
                                    <span className="block">{selectedOrder.customer_phone}</span>
                                </div>
                                <div>
                                    <span className="block text-gray-500 text-xs">Payment Status</span>
                                    <span className="font-medium text-gray-700 flex items-center gap-1">
                                        {getPaymentStatus(selectedOrder) === 'Paid' ? <CheckCircle size={14} className="text-green-600" /> : <AlertTriangle size={14} className="text-yellow-600" />}
                                        {getPaymentStatus(selectedOrder)}
                                    </span>
                                </div>
                                <div className="col-span-2">
                                    <span className="block text-gray-500 text-xs">Address</span>
                                    <span className="block text-gray-700">{selectedOrder.address}</span>
                                </div>
                            </div>

                            <form onSubmit={handleUpdate} className="space-y-6">
                                {/* Order Status Selector */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Order Status (Update)</label>
                                    <select
                                        className="w-full border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:border-website-primary bg-white"
                                        value={orderStatus}
                                        onChange={(e) => setOrderStatus(e.target.value)}
                                    >
                                        <option value="Placed">Placed</option>
                                        <option value="Confirmed">Confirmed</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped (Handed to Courier)</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Price Mismatch">Price Mismatch</option>
                                        <option value="Cancelled">Cancelled</option>
                                        <option value="Rejected">Rejected</option>
                                        <option value="Refunded">Refunded</option>
                                    </select>
                                </div>

                                {/* Conditional Fields: Shipping */}
                                {orderStatus === 'Shipped' && (
                                    <div className="space-y-4 bg-gray-50 p-4 rounded-md border border-gray-100 animate-fade-in">
                                        <h4 className="font-medium text-sm text-gray-900 flex items-center gap-2">
                                            <Truck size={16} /> Shipping Details
                                        </h4>
                                        <input
                                            type="text"
                                            placeholder="Courier Name"
                                            className="w-full border px-3 py-2 rounded-sm text-sm"
                                            value={tracking.courier}
                                            onChange={e => setTracking({ ...tracking, courier: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Tracking Number"
                                            className="w-full border px-3 py-2 rounded-sm text-sm"
                                            value={tracking.tracking_number}
                                            onChange={e => setTracking({ ...tracking, tracking_number: e.target.value })}
                                        />
                                        <input
                                            type="url"
                                            placeholder="Tracking Link"
                                            className="w-full border px-3 py-2 rounded-sm text-sm"
                                            value={tracking.url}
                                            onChange={e => setTracking({ ...tracking, url: e.target.value })}
                                        />
                                    </div>
                                )}

                                {/* Conditional Fields: Price Mismatch */}
                                {orderStatus === 'Price Mismatch' && (
                                    <div className="space-y-4 bg-orange-50 p-4 rounded-md border border-orange-100 animate-fade-in">
                                        <h4 className="font-medium text-sm text-orange-900 flex items-center gap-2">
                                            <AlertTriangle size={16} /> Price Correction
                                        </h4>
                                        <p className="text-xs text-orange-700">Set the new correct price. The user will be asked to pay the difference.</p>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Original Price</label>
                                            <div className="text-sm font-bold">₹{selectedOrder.total_amount}</div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">New Correct Price</label>
                                            <input
                                                type="number"
                                                className="w-full border px-3 py-2 rounded-sm text-sm"
                                                placeholder="Enter new amount"
                                                value={priceMismatch.new_price}
                                                onChange={e => setPriceMismatch({ ...priceMismatch, new_price: e.target.value })}
                                            />
                                        </div>
                                        {priceMismatch.new_price && (
                                            <div className="text-sm text-orange-800 font-medium">
                                                Difference to Pay: ₹{parseFloat(priceMismatch.new_price) - selectedOrder.total_amount}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Submit */}
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-website-primary text-white py-3 rounded-sm hover:bg-black transition-colors disabled:opacity-50 font-medium"
                                    >
                                        {loading ? 'Updating Status...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const AdminLayout = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'Products', path: '/admin/products', icon: Package },
        { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
        { name: 'Settings', path: '/admin/settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-website-primary text-gray-300 flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-gray-700">
                    <h1 className="text-xl font-serif font-bold text-white">SDS Admin</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
                                    isActive ? "bg-website-accent text-white" : "hover:bg-gray-800 text-gray-400"
                                )}
                            >
                                <Icon size={20} />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <button
                        onClick={() => {
                            localStorage.removeItem('adminAuthenticated');
                            window.location.href = '/admin/login';
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                    <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-gray-200 text-xs transition-colors mt-2">
                        Back to Store
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminLayout;
