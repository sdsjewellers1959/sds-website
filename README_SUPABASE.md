# Supabase Connection Guide

To connect your project to Supabase, follow these steps:

## 1. Get Your Supabase Credentials
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Create a new project or select an existing one.
3. In your project settings, go to **Project Settings > API**.
4. Copy the **Project URL** and the **publishable key** (formerly known as the `anon` key).

## 2. Update Environment Variables
Open the `.env` file in the root of your project and paste your credentials:

```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_publishable_key_here
```

## 3. Set Up the Database
Go to the **SQL Editor** in your Supabase dashboard and run the following script to create the necessary tables and policies:

[View SQL Setup Script](file:///Users/ankushsinghgandhi/.gemini/antigravity/brain/015f4bba-4e93-4e3b-b987-1d7bfcd4b5a4/supabase_setup.sql)

> [!NOTE]
> Make sure to enable RLS and set up appropriate policies for production. For development, the script provided includes permissive policies.

## 4. Verify Tables
Ensure the following tables are created:
- `products`
- `categories`
- `settings`
- `offers`
- `orders`

The `settings` table should have a default row with `id=1` to store your shop's configuration like Silver Price and Contact details.
