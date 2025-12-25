import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import WhatsAppWidget from './WhatsAppWidget';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <CartDrawer />
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <WhatsAppWidget />
            <Footer />
        </div>
    );
};

export default Layout;
