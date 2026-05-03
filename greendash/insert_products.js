import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Read .env file directly to get credentials
const envFile = fs.readFileSync('d:/greendash - Copy/greendash/.env', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, ...values] = line.split('=');
  if (key && values.length > 0) {
    env[key.trim()] = values.join('=').trim();
  }
});

const supabase = createClient(env['VITE_SUPABASE_URL'], env['VITE_SUPABASE_ANON_KEY']);

async function insertProducts() {
  const missingProducts = [
    {
      title: 'VELORA Smart 1200mm',
      description: 'WiFi-enabled BLDC fan with Alexa & Google Home compatibility. Schedule, automate, and monitor consumption.',
      category_label: 'VELORA Smart',
      price: '₹4,199',
      price_note: '+ smart hub',
      tags: ['IoT Ready', 'App Control'],
      specs: [{key: 'Wattage', val: '28W'}, {key: 'Warranty', val: '5 Years'}],
      button_text: 'Pre-Order',
      card_color: 'sm',
      is_active: true
    },
    {
      title: 'VELORA Refurb BLDC',
      description: 'Refurbished induction fan + BLDC Retrofit Kit. ISI-grade quality. For MSMEs & budget-first households. 6-month warranty.',
      category_label: '♻ Green Loop Certified',
      price: '₹1,899',
      price_note: '10% below MRP',
      tags: ['Refurbished', 'Eco Choice'],
      specs: [{key: 'After Retrofit', val: '28W'}, {key: 'Warranty', val: '6 Months'}],
      button_text: 'Buy Refurb',
      card_color: 'sm',
      is_active: true
    },
    {
      title: 'BLDC Retrofit Kit',
      description: 'Convert your existing induction fan into a 28W BLDC fan. No new fan needed — just the kit, a technician, and 30 minutes.',
      category_label: 'Retrofit Solution',
      price: '₹1,299',
      price_note: 'kit only',
      tags: ['Convert Existing'],
      specs: [{key: 'Conversion', val: '75W→28W'}, {key: 'Install Time', val: '30 min'}],
      button_text: 'Book Retrofit',
      card_color: 'sm',
      is_active: true
    }
  ];

  for (const product of missingProducts) {
    // check if exists
    const { data: existing } = await supabase.from('store_products').select('id').eq('title', product.title);
    if (existing && existing.length > 0) {
      console.log(`Product ${product.title} already exists.`);
      continue;
    }
    const { error } = await supabase.from('store_products').insert([product]);
    if (error) {
      console.error(`Error inserting ${product.title}:`, error);
    } else {
      console.log(`Successfully inserted ${product.title}`);
    }
  }
}

insertProducts();
