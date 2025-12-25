import React from 'react';
import FadeIn from '../components/FadeIn';

const Terms = () => {
    return (
        <div className="bg-white min-h-screen">
            <div className="bg-website-primary text-white py-16 text-center">
                <FadeIn>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Terms & Privacy</h1>
                    <p className="text-gray-400">Our commitment to transparency and your security.</p>
                </FadeIn>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-gray-600 space-y-12">
                <FadeIn>
                    <section>
                        <h2 className="text-2xl font-serif font-bold mb-4 text-website-primary uppercase tracking-wider">Terms of Service</h2>
                        <p className="leading-relaxed mb-4">
                            By accessing SDS Jewellers, you agree to comply with and be bound by the following terms and conditions of use. Our product pricing is subject to change based on current silver market rates.
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>All designs are intellectual property of SDS Jewellers.</li>
                            <li>Order confirmation is subject to availability and payment verification.</li>
                            <li>Custom orders require a non-refundable deposit.</li>
                        </ul>
                    </section>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <section>
                        <h2 className="text-2xl font-serif font-bold mb-4 text-website-primary uppercase tracking-wider">Privacy Policy</h2>
                        <p className="leading-relaxed mb-4">
                            We value your privacy. Your personal information is only used to fulfill your orders and enhance your shopping experience.
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>We do not sell your data to third parties.</li>
                            <li>All payment transactions are processed through secure, encrypted gateways (Razorpay).</li>
                            <li>We use cookies only to maintain your shopping cart and improve site performance.</li>
                        </ul>
                    </section>
                </FadeIn>

                <FadeIn delay={0.4}>
                    <section>
                        <h2 className="text-2xl font-serif font-bold mb-4 text-website-primary uppercase tracking-wider">Contact for Legal Inquiries</h2>
                        <p>
                            For any questions regarding our terms or privacy practices, please reach out to us at:
                            <br />
                            <strong>Email:</strong> sdsjewellers1959@gmail.com
                            <br />
                            <strong>Address:</strong> Shree Data Shah jewellers Pratap nagar, Borkhera, Kota, Rajasthan 324002
                        </p>
                    </section>
                </FadeIn>
            </div>
        </div>
    );
};

export default Terms;
