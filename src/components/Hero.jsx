import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  // Carousel Slides
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?q=80&w=1600&auto=format&fit=crop",
      subtitle: "ESTD 1995 • PUNE",
      title: "Timeless Silver",
      titleAccent: "Elegance",
      text: "Discover our exquisite collection of handcrafted sterling silver jewelry, where tradition meets modern sophistication."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1600&auto=format&fit=crop",
      subtitle: "PURE & CERTIFIED",
      title: "Crafted for",
      titleAccent: "Perfection",
      text: "Every piece tells a story of artistry and purity. Verified 925 Sterling Silver for the connoisseur in you."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1600&auto=format&fit=crop",
      subtitle: "NEW ARRIVALS",
      title: "Modern",
      titleAccent: "Statement",
      text: "Bold designs for the contemporary era. Elevate your style with our latest exclusive collection."
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative h-[60vh] md:h-[85vh] flex items-center justify-center overflow-hidden bg-gray-900">
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].image}
            alt="Hero Banner"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto mt-16">
        <AnimatePresence mode='wait'>
          <motion.div
            key={slides[currentSlide].id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-sm md:text-lg font-light tracking-[0.3em] mb-4 text-website-secondary uppercase">{slides[currentSlide].subtitle}</h2>
            <h1 className="text-5xl md:text-8xl font-serif font-bold mb-6 leading-tight">
              {slides[currentSlide].title} <br /> <span className="text-website-accent italic">{slides[currentSlide].titleAccent}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              {slides[currentSlide].text}
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center"
        >
          <Link
            to="/category"
            className="bg-white text-website-primary px-8 py-3 md:px-10 md:py-4 font-medium hover:bg-website-accent hover:text-white transition duration-500 shadow-xl text-xs md:text-sm tracking-widest uppercase rounded-sm border border-transparent"
          >
            Shop Collection
          </Link>
          <Link
            to="/category"
            className="border border-white/30 backdrop-blur-sm text-white px-8 py-3 md:px-10 md:py-4 font-medium hover:bg-white hover:text-white transition duration-500 text-xs md:text-sm tracking-widest uppercase rounded-sm"
          >
            Explore Categories
          </Link>
        </motion.div>
      </div>

      {/* Carousel Dots */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 transition-all duration-500 rounded-full ${index === currentSlide ? "w-12 bg-website-accent" : "w-2 bg-white/30 hover:bg-white/60"}`}
          />
        ))}
      </div>
    </div>
  );
};
export default Hero;
