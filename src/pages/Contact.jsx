import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { apiClient } from '../lib/api';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await apiClient.getSettings();
                setSettings(data);
            } catch (err) {
                console.error("Error fetching settings", err);
            }
        };
        fetchSettings();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const phone = settings?.contact_phone?.replace(/\s+/g, '') || '+919876543210';
        const text = `Hello SDS Jewellers,\n\nI have a query from your website.\n\n*Name:* ${formData.firstName} ${formData.lastName}\n*Email:* ${formData.email}\n*Message:* ${formData.message}`;
        const encodedText = encodeURIComponent(text);
        window.open(`https://wa.me/${phone}?text=${encodedText}`, '_blank');
    };

    return (
        <div className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Contact Us</h1>
                    <div className="w-24 h-1 bg-website-accent mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <h2 className="text-2xl font-serif font-bold text-gray-900">Get in Touch</h2>
                        <p className="text-gray-600">We'd love to hear from you. Whether you have a question about our collections, customized orders, or anything else, our team is ready to answer all your questions.</p>

                        <div className="space-y-6 mt-8">
                            <div className="flex items-start gap-4">
                                <div className="bg-white p-3 shadow-sm rounded-full text-website-accent">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Visit Our Store</h3>
                                    <p className="text-gray-600">123 Silver Market, Main Bazaar,<br /> Mumbai, Maharashtra 400001</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white p-3 shadow-sm rounded-full text-website-accent">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Call Us</h3>
                                    <p className="text-gray-600">{settings?.contact_phone || '+91 98765 43210'}</p>
                                    <p className="text-sm text-gray-500">Mon-Sat, 10am - 8pm</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white p-3 shadow-sm rounded-full text-website-accent">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Email Us</h3>
                                    <p className="text-gray-600">{settings?.contact_email || 'support@sdsjewellers.com'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 shadow-sm rounded-lg">
                        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Send a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input type="text" name="firstName" required className="w-full border border-gray-300 px-4 py-2 rounded-sm focus:outline-none focus:border-website-primary transition" placeholder="John" value={formData.firstName} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input type="text" name="lastName" required className="w-full border border-gray-300 px-4 py-2 rounded-sm focus:outline-none focus:border-website-primary transition" placeholder="Doe" value={formData.lastName} onChange={handleChange} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input type="email" name="email" required className="w-full border border-gray-300 px-4 py-2 rounded-sm focus:outline-none focus:border-website-primary transition" placeholder="john@example.com" value={formData.email} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea rows="4" name="message" required className="w-full border border-gray-300 px-4 py-2 rounded-sm focus:outline-none focus:border-website-primary transition" placeholder="How can we help you?" value={formData.message} onChange={handleChange}></textarea>
                            </div>
                            <button type="submit" className="w-full bg-website-primary text-white py-3 font-medium hover:bg-black transition duration-300">
                                Send Message (via WhatsApp)
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
