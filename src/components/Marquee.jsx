import React from 'react';
import { motion } from 'framer-motion';

const Marquee = ({ text, className = "" }) => {
    return (
        <div className={`overflow-hidden whitespace-nowrap py-4 flex ${className}`}>
            <motion.div
                className="flex gap-8"
                animate={{ x: "-50%" }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 20
                }}
            >
                {/* Repeat text multiple times to ensure seamless loop */}
                {[...Array(4)].map((_, i) => (
                    <span key={i} className="text-4xl md:text-7xl font-serif font-bold uppercase tracking-widest px-4 opacity-30 text-transparent stroke-text">
                        {text}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

export default Marquee;
