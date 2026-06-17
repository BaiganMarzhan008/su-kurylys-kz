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

    // Process submission...
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
