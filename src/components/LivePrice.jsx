import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { apiClient } from '../lib/api';

const LivePrice = () => {
    const [price, setPrice] = useState(0);
    const [trend, setTrend] = useState('neutral');

    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const settings = await apiClient.getSettings();
                setPrice(parseFloat(settings.silver_price) || 0);
            } catch (error) {
                console.error("Error fetching price", error);
            }
        };
        fetchPrice();
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
