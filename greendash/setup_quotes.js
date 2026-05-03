import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('d:/greendash - Copy/greendash/.env', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, ...values] = line.split('=');
  if (key && values.length > 0) {
    env[key.trim()] = values.join('=').trim();
  }
});

const supabase = createClient(env['VITE_SUPABASE_URL'], env['VITE_SUPABASE_ANON_KEY']);

async function setupQuotesTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS public.store_quotes (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      customer_name TEXT,
      customer_email TEXT,
      customer_phone TEXT,
      product_title TEXT,
      request_type TEXT,
      status TEXT DEFAULT 'new',
      created_at TIMESTAMPTZ DEFAULT now()
    );

    ALTER TABLE public.store_quotes ENABLE ROW LEVEL SECURITY;

    DO $$ 
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public insert on store_quotes') THEN
        CREATE POLICY "Allow public insert on store_quotes" ON public.store_quotes FOR INSERT WITH CHECK (true);
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow admin select on store_quotes') THEN
        CREATE POLICY "Allow admin select on store_quotes" ON public.store_quotes FOR SELECT USING (true);
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow admin update on store_quotes') THEN
        CREATE POLICY "Allow admin update on store_quotes" ON public.store_quotes FOR UPDATE USING (true);
      END IF;
    END $$;
  `;

  // Note: We'll try to run this via a direct Supabase call if possible, 
  // but if exec_sql isn't available, we'll suggest the user run it in SQL Editor.
  console.log("Please run the following SQL in your Supabase SQL Editor to enable the Quotes table:");
  console.log(sql);
}

setupQuotesTable();
