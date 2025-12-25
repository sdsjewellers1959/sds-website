import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Truck, RotateCcw, ArrowRight } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import Hero from '../components/Hero';
import FadeIn from '../components/FadeIn';
import Marquee from '../components/Marquee';
import OffersSection from '../components/OffersSection';
import { Link } from 'react-router-dom';

const Home = () => {
    const parallaxRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: parallaxRef,
        offset: ["start end", "end start"]
    });
    const yTransform = useTransform(scrollYProgress, [0, 1], [-200, 200]);

    // Categories for "Magazine Style" Layout
    const categories = [
        { id: 'rings', name: 'Rings', image: 'https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?q=80&w=800&auto=format&fit=crop' },
        { id: 'necklaces', name: 'Necklaces', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop' },
        { id: 'earrings', name: 'Earrings', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop' },
        { id: 'bracelets', name: 'Bracelets', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop' },
    ];

    return (
        <div>
            <Hero />

            {/* KINETIC TYPOGRAPHY TEASER */}
            <div className="bg-website-primary text-website-accent">
                <Marquee text="PURE SILVER • HANDCRAFTED • TIMELESS •" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">

                {/* TRUST SIGNALS */}
                <FadeIn>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-b border-gray-100">
                        <div className="flex items-center gap-4 justify-center md:justify-start">
                            <ShieldCheck className="text-website-accent" size={32} />
                            <div>
                                <h3 className="font-serif font-bold text-lg">BIS Hallmarked</h3>
                                <p className="text-sm text-gray-500">Certified 925 purity standard</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 justify-center md:justify-start">
                            <Truck className="text-website-accent" size={32} />
                            <div>
                                <h3 className="font-serif font-bold text-lg">Pan India Shipping</h3>
                                <p className="text-sm text-gray-500">Insured delivery to your doorstep</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 justify-center md:justify-start">
                            <RotateCcw className="text-website-accent" size={32} />
                            <div>
                                <h3 className="font-serif font-bold text-lg">Easy Returns</h3>
                                <p className="text-sm text-gray-500">7-day hassle-free return policy</p>
                            </div>
                        </div>
                    </div>
                </FadeIn>

                {/* FEATURED CATEGORIES - MAGAZINE LAYOUT */}
                <section>
                    <FadeIn>
                        <div className="flex justify-between items-end mb-12">
                            <h2 className="text-4xl md:text-6xl font-serif font-bold">Curated <br /> <span className="text-gray-400 italic">Collections</span></h2>
                            <Link to="/category" className="hidden md:flex items-center gap-2 group text-sm font-bold tracking-widest uppercase">
                                View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-auto md:h-[500px]">
                        {categories.map((cat, index) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative group overflow-hidden cursor-pointer rounded-sm ${index === 1 ? 'md:mt-12' : index === 2 ? 'md:-mt-12' : ''}`}
                            >
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-[300px] md:h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h3 className="text-2xl font-serif">{cat.name}</h3>
                                    <span className="text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 mt-2">
                                        Explore <ArrowRight size={12} />
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* LIFESTYLE BANNER */}
                <FadeIn>
                    <div ref={parallaxRef} className="relative h-[60vh] rounded-sm overflow-hidden my-24">
                        <motion.div
                            style={{
                                y: yTransform,
                                height: '160%',
                                top: '-30%'
                            }}
                            className="absolute inset-0 w-full"
                        >
                            <img
                                src="/assets/statement_banner.png"
                                alt="Lifestyle"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white p-6">
                            <h2 className="text-5xl md:text-8xl font-serif font-bold mb-6 stroke-text">STATEMENT PIECES</h2>
                            <p className="text-xl max-w-xl font-light mb-8">Jewelry that speaks before you do. Exploring the bold side of silver.</p>
                            <Link to="/category" className="bg-white text-black px-8 py-3 font-medium hover:bg-black hover:text-white transition duration-300">
                                SHOP THE LOOK
                            </Link>
                        </div>
                    </div>
                </FadeIn>

                {/* OFFERS SECTION */}
                <OffersSection />

                {/* PRODUCT GRID */}
                {/* PRODUCT GRID */}
                <ProductGrid title="Trending Now" />

                {/* BEST SELLERS GRID */}
                <ProductGrid title="Best Sellers" />


            </div>
        </div>
    );
};

export default Home;
