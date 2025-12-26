-- Run this in your Supabase SQL Editor to fix the missing column error

-- Add the missing 'address' column
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS address text;

-- Ensure other necessary columns exist (just in case)
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS customer_name text,
ADD COLUMN IF NOT EXISTS customer_email text,
ADD COLUMN IF NOT EXISTS customer_phone text,
ADD COLUMN IF NOT EXISTS items jsonb,
ADD COLUMN IF NOT EXISTS total_amount numeric,
ADD COLUMN IF NOT EXISTS status text DEFAULT 'Pending',
ADD COLUMN IF NOT EXISTS razorpay_order_id text,
ADD COLUMN IF NOT EXISTS payment_id text,
ADD COLUMN IF NOT EXISTS payment_signature text;

-- Verify the table exists
SELECT * FROM orders LIMIT 1;
