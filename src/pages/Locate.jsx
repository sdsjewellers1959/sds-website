import React from 'react';
import FadeIn from '../components/FadeIn';
import { MapPin, Phone, Clock } from 'lucide-react';

const Locate = () => {
    const stores = [
        {
            id: 1,
            name: "HEAD OFFICE - PUNE",
            address: "123, Laxmi Road, Narayan Peth, Pune, Maharashtra 411030",
            phone: "+91 98765 43210",
            hours: "10:30 AM - 8:30 PM (Mon-Sat)"
        },
        {
            id: 2,
            name: "MUMBAI BRANCH",
            address: "45, Zaveri Bazaar, Kalbadevi, Mumbai, Maharashtra 400002",
            phone: "+91 98765 43211",
            hours: "11:00 AM - 9:00 PM (Mon-Sat)"
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            <div className="bg-black text-white py-16 text-center">
                <FadeIn>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Locate Us</h1>
                    <p className="text-gray-400">Visit our showrooms to experience the elegance in person.</p>
                </FadeIn>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Store List */}
                    <div className="space-y-8">
                        {stores.map((store, index) => (
                            <FadeIn key={store.id} delay={index * 0.1}>
                                <div className="border border-gray-200 p-8 rounded-sm hover:border-website-accent transition duration-300 group">
                                    <h2 className="text-2xl font-serif font-bold mb-4 group-hover:text-website-accent transition">{store.name}</h2>
                                    <div className="space-y-3 text-gray-600">
                                        <div className="flex items-start gap-3">
                                            <MapPin className="mt-1 text-website-accent" size={20} />
                                            <p>{store.address}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Phone className="text-website-accent" size={20} />
                                            <p>{store.phone}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Clock className="text-website-accent" size={20} />
                                            <p>{store.hours}</p>
                                        </div>
                                    </div>
                                    <button className="mt-6 w-full border border-black text-black py-3 font-medium hover:bg-black hover:text-white transition duration-300 uppercase tracking-widest text-sm">
                                        Get Directions
                                    </button>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    {/* Map Placeholder */}
                    <FadeIn delay={0.3}>
                        <div className="h-[600px] bg-gray-100 rounded-sm relative overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1600&auto=format&fit=crop"
                                alt="Map Location"
                                className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 transition duration-700"
                            />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="bg-white/90 p-6 rounded-full shadow-xl animate-bounce">
                                    <MapPin size={40} className="text-website-accent" />
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </div>
    );
};

export default Locate;
