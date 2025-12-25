import React from 'react';
import FadeIn from '../components/FadeIn';

const About = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className="relative h-[60vh] flex items-center justify-center bg-gray-900">
                <img
                    src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1600&auto=format&fit=crop"
                    alt="Silver Craftsman"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
                />
                <div className="relative z-10 text-center text-white p-4">
                    <FadeIn>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">Our Legacy</h1>
                        <p className="text-xl font-light tracking-wide max-w-2xl mx-auto">Crafting silver perfection since 1995</p>
                    </FadeIn>
                </div>
            </div>

            {/* Story Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <FadeIn>
                            <img
                                src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=800&auto=format&fit=crop"
                                alt="Jewelry Making"
                                className="w-full h-[500px] object-cover rounded-sm shadow-xl"
                            />
                        </FadeIn>
                        <FadeIn delay={0.2} className="space-y-6">
                            <h2 className="text-4xl font-serif font-bold text-gray-900">A Tradition of Trust</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Founded by the Shah family, SDS Jewellers began as a humble workshop in the heart of Pune. For over two decades, we have been dedicated to the art of silver craftsmanship, blending traditional Indian artistry with contemporary designs.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                We believe that jewelry is more than just an accessory; it is an heirloom, a memory, and a piece of art that stays with you forever. Our commitment to 100% purity and transparent pricing has made us a household name for silver jewelry.
                            </p>
                            <div className="pt-4">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Signature_sample.svg/1200px-Signature_sample.svg.png" alt="Signature" className="h-12 w-auto opacity-60" />
                                <p className="text-sm font-bold mt-2 font-serif">Rajesh Shah, Founder</p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-website-primary text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-serif font-bold mb-4">Why Choose SDS?</h2>
                            <div className="w-24 h-1 bg-website-accent mx-auto"></div>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <FadeIn delay={0.1}>
                            <div className="bg-white/5 p-8 rounded-lg hover:bg-white/10 transition duration-500 border border-white/10">
                                <h3 className="text-2xl font-serif mb-4 text-website-accent">100% Hallmarked</h3>
                                <p className="text-gray-300">Every single piece of jewelry that leaves our store comes with a guarantee of purity, tested and certified standards.</p>
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.2}>
                            <div className="bg-white/5 p-8 rounded-lg hover:bg-white/10 transition duration-500 border border-white/10">
                                <h3 className="text-2xl font-serif mb-4 text-website-accent">Handcrafted</h3>
                                <p className="text-gray-300">We support local artisans. Our intricate designs are handcrafted by master karigars who have inherited the skill over generations.</p>
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.3}>
                            <div className="bg-white/5 p-8 rounded-lg hover:bg-white/10 transition duration-500 border border-white/10">
                                <h3 className="text-2xl font-serif mb-4 text-website-accent">Transparent Prices</h3>
                                <p className="text-gray-300">No hidden charges. Our pricing model is transparent based on current silver rates and a fixed making charge.</p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
