import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { apiClient } from '../lib/api';

const ProductGrid = ({ title, products: propProducts }) => {
    const [products, setProducts] = useState(propProducts || []);
    const [loading, setLoading] = useState(!propProducts);

    useEffect(() => {
        if (!propProducts) {
            const fetchProducts = async () => {
                try {
                    const data = await apiClient.getProducts();
                    // Assuming title 'Trending Now' implies some logic, here we just take first 4 as example or random
                    // For now, if no specific query, getting all.
                    // If title is "Trending Now", we might slice client side for now or add API param.
                    if (title === "Trending Now") {
                        setProducts(data.slice(0, 4));
                    } else if (title === "Best Sellers") {
                        setProducts(data.slice(4, 8));
                    } else {
                        setProducts(data);
                    }
                } catch (err) {
                    console.error("Failed to load products", err);
                } finally {
                    setLoading(false);
                }
            };
            fetchProducts();
        } else {
            setProducts(propProducts);
            setLoading(false);
        }
    }, [propProducts, title]);

    if (loading) return <div className="text-center py-10">Loading products...</div>;

    return (
        <section className="py-10">
            {title && (
                <div className="flex justify-between items-end mb-8 px-2">
                    <h2 className="text-3xl font-serif font-bold text-gray-900">{title}</h2>
                </div>
            )}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-10 text-gray-500">No products found.</div>
                )}
            </div>
        </section>
    );
};

export default ProductGrid;
