import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../lib/mockData'; // Keeping for backup or remove if fully unused? 
// Actually, I am fetching related products via API now, so maybe we don't need mockData 'products' anymore?
// But let's import apiClient first.
import { apiClient } from '../lib/api';
import { Minus, Plus, ShoppingCart, Star, Truck, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const [relatedProducts, setRelatedProducts] = useState([]); // Added relatedProducts state

    React.useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);
            try {
                // Fetch single product
                const data = await apiClient.getProduct(id);
                setProduct(data);

                // Fetch related products (simple logic: same category)
                if (data && data.category) {
                    const allProducts = await apiClient.getProducts(data.category);
                    setRelatedProducts(allProducts.filter(p => p.id !== data.id).slice(0, 4));
                }

            } catch (error) {
                console.error("Failed to fetch product", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductData();
    }, [id]);

    // Loading and Error States
    if (loading) {
        return <div className="h-screen flex items-center justify-center text-xl font-serif">Loading...</div>;
    }

    if (!product) {
        return <div className="h-screen flex items-center justify-center text-xl font-serif">Product not found</div>;
    }


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                {/* Product Image */}
                <div className="space-y-4">
                    <div className="aspect-square bg-gray-100 overflow-hidden rounded-sm">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover object-center"
                        />
                    </div>
                </div>

                {/* Product Info */}
                <div>
                    <nav className="text-sm text-gray-500 mb-4">
                        <Link to="/" className="hover:text-website-primary">Home</Link> /
                        <Link to="/category" className="hover:text-website-primary mx-1">{product.category}</Link> /
                        <span className="text-gray-900 mx-1">{product.name}</span>
                    </nav>

                    <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">{product.name}</h1>

                    <div className="flex items-center space-x-2 mb-6">
                        <div className="flex text-yellow-500 text-sm">
                            {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={16} fill="currentColor" />)}
                        </div>
                        <span className="text-sm text-gray-500">(24 Reviews)</span>
                    </div>

                    <p className="text-2xl font-bold text-gray-900 mb-6">₹{product.price.toLocaleString()}</p>

                    <div className="border-t border-b border-gray-200 py-6 mb-6 space-y-4">
                        <p className="text-gray-600 leading-relaxed">{product.description}</p>

                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                            <div className="flex justify-between border-b border-gray-100 py-2">
                                <span>Purity</span>
                                <span className="font-medium text-gray-900">{product.purity} Sterling Silver</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 py-2">
                                <span>Weight</span>
                                <span className="font-medium text-gray-900">{product.weight}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <div className="flex items-center border border-gray-300 rounded-sm">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="p-3 hover:bg-gray-100 transition"
                            >
                                <Minus size={16} />
                            </button>
                            <span className="px-4 py-2 font-medium w-12 text-center">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="p-3 hover:bg-gray-100 transition"
                            >
                                <Plus size={16} />
                            </button>
                        </div>

                        <button
                            onClick={() => addToCart(product, quantity)}
                            className="flex-1 bg-website-primary text-white py-3 px-8 font-medium hover:bg-black transition duration-300 flex items-center justify-center gap-2 rounded-sm shadow-md"
                        >
                            <ShoppingCart size={20} />
                            Add to Cart
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <Truck size={18} />
                            <span>Free shipping on orders over ₹5000</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={18} />
                            <span>Certified Purity Guarantee</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* RELATED PRODUCTS */}
            <div className="mt-24 border-t border-gray-100 pt-16">
                <h2 className="text-3xl font-serif font-bold mb-10 text-center">You May Also Like</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
                    {relatedProducts.map(p => (
                        <div key={p.id} className="group cursor-pointer">
                            <div className="aspect-square bg-gray-100 overflow-hidden relative mb-3 rounded-sm">
                                <Link to={`/product/${p.id}`}>
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        className="h-full w-full object-cover object-center group-hover:scale-110 transition duration-700"
                                    />
                                </Link>
                            </div>
                            <h3 className="font-serif text-lg font-medium group-hover:text-website-accent transition">{p.name}</h3>
                            <p className="text-gray-500 text-sm">₹{p.price.toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
