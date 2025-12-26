import React, { useState, useEffect } from 'react';
import ProductGrid from '../components/ProductGrid';
import { categories } from '../lib/mockData';
import { apiClient } from '../lib/api';
import { useSearchParams } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { cn } from '../lib/utils';
import SEO from '../components/SEO';

const Category = () => {
    const [searchParams] = useSearchParams();
    const initialCategory = searchParams.get('category') || "All";
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Pass null if 'All' to get all products
                const categoryParam = selectedCategory === "All" ? null : selectedCategory;
                const data = await apiClient.getProducts(categoryParam);
                setProducts(data);
            } catch (error) {
                console.error("Error fetching category products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [selectedCategory]);

    return (
        <div className="pt-8">
            <SEO
                title={`${selectedCategory} Collection`}
                description={`Browse our premium ${selectedCategory.toLowerCase()} collection. Handcrafted silver jewelry for every occasion.`}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Our Collections</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">Explore our wide range of handcrafted silver jewelry, designed to elegance and perfection.</p>
                    <div className="w-24 h-1 bg-website-accent mx-auto mt-4"></div>
                </div>

                {/* Filter - Reusing same style as Home, could be componentized */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                    <span className="flex items-center text-sm font-medium text-gray-500 mr-2 mb-4 md:mb-0"><Filter size={16} className="mr-1" /> Filter by Category:</span>
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 no-scrollbar justify-start md:justify-end px-1">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={cn(
                                    "px-4 py-2 text-sm whitespace-nowrap border rounded-full transition-all duration-300",
                                    selectedCategory === cat
                                        ? "bg-website-primary text-white border-website-primary"
                                        : "bg-white text-gray-600 border-gray-200 hover:border-website-primary hover:text-website-primary"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="h-64 flex items-center justify-center">Loading collections...</div>
                ) : (
                    <ProductGrid products={products} />
                )}
            </div>
        </div>
    );
};

export default Category;
