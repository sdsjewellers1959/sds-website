import React from 'react';
import FadeIn from '../components/FadeIn';

const FAQ = () => {
    const faqs = [
        {
            question: "Is your jewelry hallmarked?",
            answer: "Yes, 100% of our silver jewelry is BIS Hallmarked, ensuring the highest standards of purity (925 Sterling Silver)."
        },
        {
            question: "How long does shipping take?",
            answer: "We typically ship orders within 24-48 hours. Delivery usually takes 3-7 business days depending on your location in India."
        },
        {
            question: "Do you offer customization?",
            answer: "Yes, we specialize in custom silver jewelry. Please contact us via WhatsApp or visit our store in Kota to discuss your requirements."
        },
        {
            question: "What is your return policy?",
            answer: "We offer a 7-day hassle-free return policy for unused items in their original packaging. Please refer to our Shipping & Returns section for details."
        },
        {
            question: "How do I track my order?",
            answer: "Once your order is shipped, you will receive a tracking ID via email and SMS to monitor your package's progress."
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            <div className="bg-website-primary text-white py-16 text-center">
                <FadeIn>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Frequently Asked Questions</h1>
                    <p className="text-gray-400">Everything you need to know about SDS Jewellers.</p>
                </FadeIn>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="space-y-12">
                    {faqs.map((faq, index) => (
                        <FadeIn key={index} delay={index * 0.1}>
                            <div className="border-b border-gray-100 pb-8">
                                <h3 className="text-xl font-serif font-bold mb-4 text-website-primary">{faq.question}</h3>
                                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
