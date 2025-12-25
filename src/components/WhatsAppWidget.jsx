import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { apiClient } from '../lib/api';

const WhatsAppWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await apiClient.getSettings();
                setSettings(data);
            } catch (err) {
                console.error("Error fetching settings for WhatsApp widget", err);
            }
        };
        fetchSettings();
    }, []);

    const handleChat = () => {
        if (!settings?.contact_phone) return;
        const phone = settings.contact_phone.replace(/\D/g, '');
        const message = "Hi! I'm interested in your jewelry. Could you help me?";
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="bg-white rounded-lg shadow-2xl p-6 mb-4 w-72 border border-gray-100"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                                <MessageCircle size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">SDS Jewellers</h4>
                                <p className="text-xs text-green-500 font-medium">Online • Typical reply: 5m</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                            Hello! How can we help you today? Feel free to ask about our collections or custom designs.
                        </p>
                        <button
                            onClick={handleChat}
                            className="w-full bg-green-500 text-white py-2 rounded-sm font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                        >
                            <MessageCircle size={18} />
                            Start WhatsApp Chat
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 ${isOpen ? 'bg-gray-900' : 'bg-green-500 hover:scale-110 rotate-0'}`}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={30} />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
                    </span>
                )}
            </button>
        </div>
    );
};

export default WhatsAppWidget;
