import React, { useState, useEffect } from 'react';
import FadeIn from './FadeIn';
import { apiClient } from '../lib/api';

const OffersSection = () => {
    const [offers, setOffers] = useState([]);

    const defaultOffers = [
        {
            id: 'default-1',
            title: "DIWALI DHAMAKA",
            discount: "20% OFF",
            description: "On all diamond jewelry making charges.",
            code: "DIWALI20",
            bg: "bg-gradient-to-br from-yellow-700 via-yellow-600 to-yellow-800"
        },
        {
            id: 'default-2',
            title: "WEDDING SEASON",
            discount: "FLAT ₹5000 OFF",
            description: "On purchase of bridal sets above ₹1 Lakh.",
            code: "BRIDE5000",
            bg: "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
        },
        {
            id: 'default-3',
            title: "SILVER RUSH",
            discount: "BUY 2 GET 1",
            description: "On all sterling silver toe-rings.",
            code: "TOERING3",
            bg: "bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 text-black"
        }
    ];

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const data = await apiClient.getOffers();
                // Map the dynamic data into the 3 slots, keeping original backgrounds
                const combined = defaultOffers.map((def, idx) => {
                    if (data[idx]) {
                        return {
                            ...def,
                            title: data[idx].title || def.title,
                            discount: data[idx].discount || def.discount,
                            description: data[idx].description || def.description,
                            code: data[idx].code || def.code,
                            id: data[idx].id
                        };
                    }
                    return def;
                });
                setOffers(combined);
            } catch (err) {
                console.error("Error fetching offers", err);
                setOffers(defaultOffers);
            }
        };
        fetchOffers();
    }, []);

    return (
        <section id="offers" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-website-primary">Exclusive Offers</h2>
                        <p className="text-gray-500">Limited time deals for our cherished customers.</p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {offers.map((offer, index) => (
                        <FadeIn key={offer.id || index} delay={index * 0.1}>
                            <div className={`rounded-sm p-8 text-white relative overflow-hidden group shadow-xl ${offer.bg} transform hover:-translate-y-2 transition duration-300`}>
                                {/* Decorative Circles */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-black/10 rounded-full blur-2xl"></div>

                                <h3 className="text-sm tracking-[0.3em] font-bold mb-2 opacity-80 uppercase">{offer.title}</h3>
                                <div className="text-4xl font-serif font-bold mb-4">{offer.discount}</div>
                                <p className="mb-8 opacity-90 text-sm leading-relaxed">{offer.description}</p>

                                <div className="border border-dashed border-white/50 p-4 rounded text-center relative cursor-pointer hover:bg-white/10 transition">
                                    <span className="text-xs absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black px-2 font-bold uppercase tracking-widest">Use Code</span>
                                    <code className="text-xl font-mono font-bold tracking-wider">{offer.code}</code>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                <FadeIn delay={0.4}>
                    <div className="mt-8 text-center text-gray-400 text-xs">
                        <p>* Terms and conditions apply. Offers valid till stocks last.</p>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default OffersSection;
