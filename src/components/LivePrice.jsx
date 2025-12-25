import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { apiClient } from '../lib/api';

const LivePrice = () => {
    const [price, setPrice] = useState(0);
    const [trend, setTrend] = useState('neutral');

    useEffect(() => {
        // Initial fetch
        const fetchPrice = async () => {
            try {
                const data = await apiClient.getSilverPrice();
                setPrice(data.price);
            } catch (error) {
                console.error("Error fetching price", error);
            }
        };
        fetchPrice();

        // Simulate live updates
        const interval = setInterval(() => {
            setPrice(prev => {
                if (prev === 0) return prev;
                const change = (Math.random() - 0.5) * 0.2;
                const newPrice = prev + change;
                setTrend(change > 0 ? 'up' : 'down');
                return newPrice;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center gap-1 text-xs">
            <span className="text-website-accent font-bold">Silver:</span>
            <span className="flex items-center gap-0.5">
                ₹{price.toFixed(2)}/g
                {trend === 'up' && <TrendingUp size={12} className="text-green-500" />}
                {trend === 'down' && <TrendingDown size={12} className="text-red-500" />}
            </span>
        </div>
    );
};

export default LivePrice;
