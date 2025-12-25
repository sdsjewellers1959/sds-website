import { supabase } from './supabase';

export const apiClient = {
    // Products
    getProducts: async (category, search) => {
        let query = supabase.from('products').select('*');

        if (category && category !== 'All') {
            query = query.eq('category', category);
        }

        if (search) {
            query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
        }

        const { data, error } = await query.order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    getProduct: async (id) => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    createProduct: async (productData) => {
        const { data, error } = await supabase
            .from('products')
            .insert([productData])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    updateProduct: async (id, productData) => {
        const { data, error } = await supabase
            .from('products')
            .update(productData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    deleteProduct: async (id) => {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { message: 'Product deleted' };
    },

    // Categories
    getCategories: async () => {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name');

        if (error) throw error;
        return data;
    },

    createCategory: async (categoryData) => {
        const { data, error } = await supabase
            .from('categories')
            .insert([categoryData])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    deleteCategory: async (id) => {
        const { error } = await supabase
            .from('categories')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { message: 'Category deleted' };
    },

    // Settings (Pricing & Contact)
    getSettings: async () => {
        const { data, error } = await supabase
            .from('settings')
            .select('*')
            .eq('id', 1)
            .single();

        if (error) {
            // If settings don't exist, return defaults
            return {
                silver_price: "92.50",
                labour_charge_percent: 18,
                gst_percent: 3,
                additional_tax_percent: 0,
                other_charges_flat: 0,
                contact_email: "sdsjewellers1959@gmail.com",
                contact_phone: "+91 83022 87914"
            };
        }
        return data;
    },

    updateSettings: async (settingsData) => {
        const { data, error } = await supabase
            .from('settings')
            .upsert({ id: 1, ...settingsData })
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Orders
    getOrders: async () => {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    createOrder: async (orderData) => {
        // This will be expanded for Razorpay
        const { data, error } = await supabase
            .from('orders')
            .insert([{ ...orderData, status: 'Pending Payment' }])
            .select()
            .single();

        if (error) throw error;

        // Simulate Razorpay order creation (This would normally be a backend call)
        return {
            order: data,
            razorpay_order_id: `rzp_live_${Math.random().toString(36).substring(7)}`,
            key_id: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_placeholder"
        };
    },

    verifyPayment: async (paymentData) => {
        // Update order status after payment verification
        const { data, error } = await supabase
            .from('orders')
            .update({
                status: 'Paid',
                payment_id: paymentData.razorpay_payment_id,
                payment_signature: paymentData.razorpay_signature
            })
            .eq('razorpay_order_id', paymentData.razorpay_order_id)
            .select()
            .single();

        if (error) throw error;
        return { status: 'success', order: data };
    },

    // Offers
    getOffers: async () => {
        const { data, error } = await supabase
            .from('offers')
            .select('*')
            .eq('active', true);

        if (error) throw error;
        return data;
    },

    createOffer: async (offerData) => {
        const { data, error } = await supabase
            .from('offers')
            .insert([offerData])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    deleteOffer: async (id) => {
        const { error } = await supabase
            .from('offers')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { message: 'Offer deleted' };
    },

    updateOffer: async (id, offerData) => {
        const { data, error } = await supabase
            .from('offers')
            .update(offerData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    }
};
