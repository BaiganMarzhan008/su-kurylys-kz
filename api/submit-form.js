import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    const { name, phone, message } = req.body || {};

    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "Барлық өрістерді толтыру міндетті."
      });
    }

    // Clean input by removing all non-digits
    const cleanPhone = String(phone).replace(/\D/g, '');
    const phoneRegex = /^(7|8)\d{10}$/;
    
    if (!phoneRegex.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        message: "Қате телефон нөмірі. +7 немесе 8-бен басталып, 11 сан болуы тиіс."
      });
    }

    // Check for Supabase environment variables (support VITE_ prefix as well)
    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase environment variables.");
      return res.status(500).json({
        success: false,
        message: "Серверде дерекқор конфигурациясы (Environment Variables) орнатылмаған."
      });
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Insert into Supabase table 'applications'
    const { error } = await supabase
      .from('applications')
      .insert([
        {
          name: name,
          phone: cleanPhone,
          message: message
        }
      ]);

    if (error) {
      console.error('Supabase Insertion Error:', error);
      throw new Error(error.message);
    }

    return res.status(200).json({ 
      success: true, 
      message: "Өтінім сәтті қабылданды!" 
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: "Серверде ішкі қате шықты." 
    });
  }
}
