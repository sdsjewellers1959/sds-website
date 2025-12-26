const Razorpay = require('razorpay');

exports.handler = async (event, context) => {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const data = JSON.parse(event.body);
    const { amount, currency, receipt } = data;

    if (!amount) {
        return { statusCode: 400, body: JSON.stringify({ error: "Amount is required" }) };
    }

    try {
        const instance = new Razorpay({
            key_id: process.env.VITE_RAZORPAY_KEY_ID, // Can use VITE_ prefix if that's what user set
            key_secret: process.env.RAZORPAY_KEY_SECRET, // The secret key stored in Netlify
        });

        const options = {
            amount: amount, // Amount in paise
            currency: currency || "INR",
            receipt: receipt || `receipt_${Date.now()}`,
        };

        const order = await instance.orders.create(options);

        return {
            statusCode: 200,
            body: JSON.stringify(order),
        };
    } catch (error) {
        console.error("Razorpay Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message || "Something went wrong" }),
        };
    }
};
