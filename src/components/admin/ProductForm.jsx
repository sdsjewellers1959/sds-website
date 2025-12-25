import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { apiClient } from '../../lib/api';

const ProductForm = ({ product, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        category: 'Rings',
        image: '',
        description: '',
        purity_percent: 92.5,
        weight: '',
        gemstone_charge: 0,
        hallmark_charge: 0,
        polishing_charge: 0,
        packaging_charge: 0,
        in_stock: true
    });
    const [settings, setSettings] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSettingsAndData = async () => {
            try {
                const [settingsData, categoriesData] = await Promise.all([
                    apiClient.getSettings(),
                    apiClient.getCategories()
                ]);
                setSettings(settingsData);
                setCategories(categoriesData);

                if (product) {
                    setFormData({
                        name: product.name,
                        price: product.price || 0,
                        category: product.category,
                        image: product.image,
                        description: product.description || '',
                        purity_percent: product.purity_percent || 92.5,
                        weight: product.weight || '',
                        gemstone_charge: product.gemstone_charge || 0,
                        hallmark_charge: product.hallmark_charge || 0,
                        polishing_charge: product.polishing_charge || 0,
                        packaging_charge: product.packaging_charge || 0,
                        in_stock: product.in_stock
                    });
                } else if (categoriesData.length > 0) {
                    setFormData(prev => ({ ...prev, category: categoriesData[0].name }));
                }
            } catch (err) {
                console.error("Failed to load settings or categories", err);
            }
        };
        fetchSettingsAndData();
    }, [product]);

    // Calculate Price logic
    useEffect(() => {
        if (settings && formData.weight > 0) {
            const weight = parseFloat(formData.weight) || 0;
            const purity = (parseFloat(formData.purity_percent) || 0) / 100;
            const silverPrice = parseFloat(settings.silver_price) || 0;

            const baseValue = weight * purity * silverPrice;
            const additionalCharges =
                (parseFloat(formData.gemstone_charge) || 0) +
                (parseFloat(formData.hallmark_charge) || 0) +
                (parseFloat(formData.polishing_charge) || 0) +
                (parseFloat(formData.packaging_charge) || 0);

            const subtotal = baseValue + additionalCharges;
            const labour = subtotal * (parseFloat(settings.labour_charge_percent || 0) / 100);
            const taxableAmount = subtotal + labour;
            const gst = taxableAmount * (parseFloat(settings.gst_percent || 0) / 100);
            const otherCharges = parseFloat(settings.other_charges_flat || 0);

            const total = taxableAmount + gst + otherCharges;

            setFormData(prev => ({ ...prev, price: Math.round(total) }));
        }
    }, [
        formData.weight,
        formData.purity_percent,
        formData.gemstone_charge,
        formData.hallmark_charge,
        formData.polishing_charge,
        formData.packaging_charge,
        settings
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Clean data before sending to Supabase
            const dataToSave = {
                ...formData,
                price: parseFloat(formData.price),
                weight: parseFloat(formData.weight) || 0,
                purity_percent: parseFloat(formData.purity_percent) || 0,
                gemstone_charge: parseFloat(formData.gemstone_charge) || 0,
                hallmark_charge: parseFloat(formData.hallmark_charge) || 0,
                polishing_charge: parseFloat(formData.polishing_charge) || 0,
                packaging_charge: parseFloat(formData.packaging_charge) || 0,
            };

            if (product) {
                await apiClient.updateProduct(product.id, dataToSave);
            } else {
                await apiClient.createProduct(dataToSave);
            }
            onSave();
            onClose();
        } catch (error) {
            console.error("Failed to save product", error);
            // More descriptive error
            alert(`Failed to save product: ${error.message || 'Unknown error'}. Check console for details.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold">{product ? 'Edit Product' : 'Add New Product'}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                            <input type="text" required className="w-full border p-2 rounded-sm" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select className="w-full border p-2 rounded-sm" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Weight (grams)</label>
                            <input type="number" step="0.001" required className="w-full border p-2 rounded-sm" value={formData.weight} onChange={e => setFormData({ ...formData, weight: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Purity (%)</label>
                            <input type="number" step="0.1" required className="w-full border p-2 rounded-sm" value={formData.purity_percent} onChange={e => setFormData({ ...formData, purity_percent: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gemstone Charge (₹)</label>
                            <input type="number" className="w-full border p-2 rounded-sm" value={formData.gemstone_charge} onChange={e => setFormData({ ...formData, gemstone_charge: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Hallmark Charge (₹)</label>
                            <input type="number" className="w-full border p-2 rounded-sm" value={formData.hallmark_charge} onChange={e => setFormData({ ...formData, hallmark_charge: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Polishing Charge (₹)</label>
                            <input type="number" className="w-full border p-2 rounded-sm" value={formData.polishing_charge} onChange={e => setFormData({ ...formData, polishing_charge: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Packaging Charge (₹)</label>
                            <input type="number" className="w-full border p-2 rounded-sm" value={formData.packaging_charge} onChange={e => setFormData({ ...formData, packaging_charge: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Calculated Price (₹)</label>
                            <input type="number" disabled className="w-full border p-2 rounded-sm bg-gray-50 font-bold text-website-primary" value={formData.price} />
                            <p className="text-[10px] text-gray-500 mt-1">Automatically calculated based on settings.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                            <input type="text" className="w-full border p-2 rounded-sm" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea className="w-full border p-2 rounded-sm h-32" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="instock" checked={formData.in_stock} onChange={e => setFormData({ ...formData, in_stock: e.target.checked })} />
                        <label htmlFor="instock" className="text-sm font-medium text-gray-700">In Stock</label>
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-website-primary text-white py-3 font-medium rounded-sm hover:bg-black transition-colors disabled:opacity-50 flex justify-center items-center gap-2">
                        <Save size={18} />
                        {loading ? 'Saving...' : 'Save Product'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
