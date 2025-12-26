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

    uploadImage: async (file) => {
        const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '-')}`;
        const { data, error } = await supabase.storage
            .from('product-images')
            .upload(fileName, file);

        if (error) throw error;

        const { data: publicUrlData } = supabase.storage
            .from('product-images')
            .getPublicUrl(fileName);

        return publicUrlData.publicUrl;
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
        return {
            ...data,
            contact_phone: "+91 83022 87914"
        };
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
        // 1. Create Order in Supabase with 'Pending Payment'
        const { data: sbOrder, error: sbError } = await supabase
            .from('orders')
            .insert([{
                ...orderData,
                status: 'Pending Payment'
            }])
            .select()
            .single();

        if (sbError) throw sbError;

        try {
            // 2. Call Netlify Function to create real Razorpay Order
            // Note: In development (localhost), you'll need 'netlify dev' or a proxy to hit this.
            // For now, we assume deployed environment or configured proxy.
            const response = await fetch('/.netlify/functions/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: orderData.total_amount * 100, // Amount in paise
                    currency: "INR",
                    receipt: `order_rcptid_${sbOrder.id}`
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create Razorpay order');
            }

            const rzpOrder = await response.json();

            // 3. Update Supabase with real Razorpay Order ID
            const { data: updatedOrder, error: updateError } = await supabase
                .from('orders')
                .update({ razorpay_order_id: rzpOrder.id })
                .eq('id', sbOrder.id)
                .select()
                .single();

            if (updateError) throw updateError;

            return {
                order: updatedOrder,
                razorpay_order_id: rzpOrder.id,
                key_id: import.meta.env.VITE_RAZORPAY_KEY_ID
            };

        } catch (err) {
            console.error("Backend Order Creation Failed:", err);
            // If backend fails, we should probably delete the pending Supabase order or mark it failed
            // For now, re-throwing to let UI handle it
            throw err;
        }
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

    getOrder: async (orderId, phone = null) => {
        // Helper to normalize phone numbers (last 10 digits)
        const normalizePhone = (p) => {
            if (!p) return '';
            const digits = p.replace(/\D/g, '');
            return digits.slice(-10);
        };

        const targetPhone = normalizePhone(phone);

        try {
            // 1. Fetch by ID directly (works for Integer or UUID)
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('id', orderId)
                .single();

            if (error || !data) return null;

            // 2. Security Check: Verify Phone Number
            if (phone) {
                // Ensure customer_phone is string before regex
                const dbPhoneRaw = String(data.customer_phone || '');
                const dbPhone = normalizePhone(dbPhoneRaw);

                // Strict Check: Mismatch fails even if DB phone is missing/invalid
                if (dbPhone !== targetPhone) {
                    console.warn(`Security: Phone mismatch for Order #${orderId}`);
                    // return null means "Order Not Found" (Security through obscurity)
                    return null;
                }
            }

            return data;

        } catch (error) {
            console.error("Error fetching order:", error);
            return null;
        }
    },

    updateOrder: async (id, updates) => {
        const { data, error } = await supabase
            .from('orders')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
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
