import React from 'react';
import FadeIn from '../components/FadeIn';
import { MapPin, Phone, Clock } from 'lucide-react';
import SEO from '../components/SEO';

const Locate = () => {
    const stores = [
        {
            id: 1,
            name: "HEAD OFFICE - KOTA",
            address: "Shree Data Shah jewellers Pratap nagar, Borkhera, Kota, Rajasthan 324002",
            phone: "+91 83022 87914",
            hours: "11:00 AM - 9:00 PM (Mon-Sat)"
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            <SEO
                title="Store Locator | Find Us in Kota"
                description="Visit Shree Data Shah Jewellers in Borkhera, Kota. Find directions, contact details, and store hours to experience our silver collections in person."
            />
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
                                    <a
                                        href="https://maps.app.goo.gl/4NPfn9KgvJJ2gW4t7"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-6 block w-full border border-black text-black py-3 font-medium hover:bg-black hover:text-white transition duration-300 uppercase tracking-widest text-sm text-center"
                                    >
                                        Get Directions
                                    </a>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    {/* Real Google Map Embed */}
                    <FadeIn delay={0.3}>
                        <div className="h-[600px] bg-gray-100 rounded-sm relative overflow-hidden shadow-inner border border-gray-100">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.7892485232364!2d75.88557089999999!3d25.176593099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396f9ab19efd48b7%3A0xed5fa6c7082e1f6b!2z4KS24KWN4KSw4KWAIOCkpuCkvuCkpOCkviDgpLjgpL7gpIMg4KSc4KWN4KS14KWI4KSy4KSw4KWN4KS4!5e0!3m2!1sen!2sin!4v1766698490214!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="SDS Jewellers Kota Map"
                                className="grayscale hover:grayscale-0 transition-all duration-700"
                            ></iframe>
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
