import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const validatePhone = (phone) => {
    const cleanPhone = phone.replace(/[\s-()]/g, '');
    const regex = /^(\+7|8)\d{10}$/;
    return regex.test(cleanPhone) ? cleanPhone : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccess(false);
    
    if (!formData.name.trim() || !formData.message.trim()) {
      setErrorMsg('Барлық өрістерді толтырыңыз.');
      return;
    }

    const validPhone = validatePhone(formData.phone);
    if (!validPhone) {
      setErrorMsg('Телефон нөмірі қате. +7 немесе 8-бен басталып, 11 сан болуы тиіс (мысалы: +77010000000).');
      return;
    }

    setLoading(true);
    try {
      const newApp = {
        name: formData.name,
        phone: validPhone,
        message: formData.message,
        email: 'Көрсетілмеген',
        date: new Date().toISOString()
      };
      
      // Attempt real Supabase insertion if configured
      if (supabase && import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_URL !== 'https://placeholder.supabase.co') {
        const { error } = await supabase.from('applications').insert([newApp]);
        if (error) throw error;
      } else {
        // Fallback for local dev
        const localData = JSON.parse(localStorage.getItem('applications')) || [];
        newApp.id = Date.now();
        localData.push(newApp);
        localStorage.setItem('applications', JSON.stringify(localData));
      }
      
      setSuccess(true);
      setFormData({ name: '', phone: '', message: '' });
      setTimeout(() => setSuccess(false), 6000); // Hide toast after 6s
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMsg('Жүйеде қате шықты. Кейінірек қайталаңыз немесе қоңырау шалыңыз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-100 bg-light position-relative" style={{ fontFamily: "'Montserrat', sans-serif", minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* SUCCESS OVERLAY TOAST */}
      {success && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050 }}>
          <div className="bg-white rounded-4 shadow-lg p-5 text-center toast-anim" style={{ maxWidth: '500px' }}>
            <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '80px', height: '80px' }}>
              <i className="fa-solid fa-check fs-1"></i>
            </div>
            <h3 className="fw-bolder text-dark mb-3">Өтінім қабылданды!</h3>
            <p className="text-muted fs-5 lh-lg mb-4">
              Сіздің өтініміңіз сәтті қабылданды! ТОО СУ ҚҰРЫЛЫС KZ инженерлері сізбен жақын арада хабарласады.
            </p>
            <button className="btn btn-primary px-5 py-2 fw-bold rounded-pill shadow-sm" onClick={() => setSuccess(false)}>Жабу</button>
          </div>
        </div>
      )}

      {/* Header Section */}
      <section className="bg-dark text-white pt-5 pb-4 border-bottom border-secondary border-opacity-25" style={{ backgroundImage: 'linear-gradient(to right, #14171c, #1a1f26)' }}>
        <div className="container py-4 text-center fade-in-up">
          <span 
            className="d-inline-block text-uppercase fw-bold px-4 py-2 mb-3 rounded-2 shadow-sm"
            style={{ backgroundColor: '#0b58ca', fontSize: '13px', letterSpacing: '3px' }}
          >
            КЕРІ БАЙЛАНЫС
          </span>
          <h1 className="display-4 fw-bolder mb-0" style={{ letterSpacing: '-1px' }}>Бізбен Байланысу</h1>
        </div>
      </section>

      {/* 50/50 Premium Split Layout */}
      <section className="py-5" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container py-4">
          <div className="row g-0 rounded-4 overflow-hidden shadow-lg border border-light form-wrapper-anim" style={{ minHeight: '600px' }}>
            
            {/* Left Side: Deep Navy Slate Card */}
            <div className="col-lg-5 p-5 d-flex flex-column text-white position-relative" style={{ backgroundColor: '#14171c' }}>
              <div className="position-relative z-index-1 flex-grow-1 d-flex flex-column justify-content-center">
                <div className="d-flex align-items-center mb-5" style={{ gap: '16px' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
                    <path d="M17 18h1"/>
                    <path d="M12 18h1"/>
                    <path d="M7 18h1"/>
                  </svg>
                  <h2 className="fw-bolder mb-0" style={{ textShadow: '0 0 15px rgba(255,255,255,0.2)' }}>ТОО "СУ ҚҰРЫЛЫС KZ"</h2>
                </div>
                
                <div className="d-flex flex-column gap-4">
                  <div className="d-flex align-items-start">
                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mt-1 me-4 shadow" style={{ width: '50px', height: '50px', flexShrink: 0 }}>
                      <i className="fa-solid fa-location-dot fs-5"></i>
                    </div>
                    <div>
                      <h6 className="text-uppercase text-primary fw-bold tracking-wider mb-1" style={{ fontSize: '12px' }}>Бас Кеңсе</h6>
                      <p className="mb-0 fs-5 lh-sm opacity-90 fw-medium">Астана қаласы,<br/>Алматы ауданы</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start">
                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mt-1 me-4 shadow" style={{ width: '50px', height: '50px', flexShrink: 0 }}>
                      <i className="fa-solid fa-file-contract fs-5"></i>
                    </div>
                    <div>
                      <h6 className="text-uppercase text-primary fw-bold tracking-wider mb-1" style={{ fontSize: '12px' }}>Ресми Дерек</h6>
                      <p className="mb-0 fs-5 lh-sm opacity-90 fw-medium">БИН: 081240011564</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start">
                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mt-1 me-4 shadow" style={{ width: '50px', height: '50px', flexShrink: 0 }}>
                      <i className="fa-solid fa-phone fs-5"></i>
                    </div>
                    <div>
                      <h6 className="text-uppercase text-primary fw-bold tracking-wider mb-1" style={{ fontSize: '12px' }}>Ресми байланыс телефоны</h6>
                      <p className="mb-0 fs-5 lh-sm opacity-90 fw-medium">+7 (7172) 55-00-11</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start">
                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mt-1 me-4 shadow" style={{ width: '50px', height: '50px', flexShrink: 0 }}>
                      <i className="fa-solid fa-envelope fs-5"></i>
                    </div>
                    <div>
                      <h6 className="text-uppercase text-primary fw-bold tracking-wider mb-1" style={{ fontSize: '12px' }}>Электронды пошта</h6>
                      <p className="mb-0 fs-5 lh-sm opacity-90 fw-medium">info@su-kurylys.kz</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Clean Bootstrap Form */}
            <div className="col-lg-7 bg-white p-5 d-flex flex-column justify-content-center">
              <h3 className="fw-bolder text-dark mb-2">Өтінім Қалдыру</h3>
              <p className="text-muted mb-4 opacity-75">Біздің мамандар жобаңызды талқылау үшін хабарласады.</p>

              {errorMsg && (
                <div className="alert alert-danger d-flex align-items-center border-0 rounded-3 shadow-sm mb-4" role="alert">
                  <i className="fa-solid fa-triangle-exclamation me-3 fs-5"></i>
                  <div className="fw-medium">{errorMsg}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
                <div>
                  <label className="form-label fw-bold text-dark small text-uppercase tracking-wider">Аты-жөніңіз (Немесе компания аты)</label>
                  <input 
                    type="text" 
                    className="form-control form-control-lg bg-light border-0 shadow-none px-4 py-3 fs-6" 
                    placeholder="Мысалы: Арман Серікұлы" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="form-label fw-bold text-dark small text-uppercase tracking-wider">Телефон Нөмірі</label>
                  <div className="input-group">
                    <span className="input-group-text border-0 bg-light px-4"><i className="fa-solid fa-phone text-muted"></i></span>
                    <input 
                      type="text" 
                      className="form-control form-control-lg bg-light border-0 shadow-none py-3 fs-6" 
                      placeholder="+7 (7XX) XXX-XX-XX" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="form-text mt-2 opacity-75">Міндетті: +7 немесе 8-ден басталатын 11 сан.</div>
                </div>

                <div>
                  <label className="form-label fw-bold text-dark small text-uppercase tracking-wider">Қысқаша Хабарлама немесе Сұрақ</label>
                  <textarea 
                    className="form-control form-control-lg bg-light border-0 shadow-none px-4 py-3 fs-6" 
                    rows="4" 
                    placeholder="Жоба туралы мәлімет қалдырыңыз..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg w-100 py-3 mt-2 fw-bold shadow-sm btn-premium d-flex justify-content-center align-items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <><div className="spinner-border spinner-border-sm me-2" role="status"></div> Жіберілуде...</>
                  ) : (
                    <>Өтінімді Жіберу <i className="fa-solid fa-paper-plane ms-2"></i></>
                  )}
                </button>
              </form>
            </div>
            
          </div>
        </div>
      </section>

      {/* Rounded Iframe Map Section */}
      <section className="pb-5 bg-white">
        <div className="container pb-4">
          <div className="text-center mb-4">
            <h3 className="fw-bolder text-dark">Біздің Орналасқан Жеріміз</h3>
            <p className="text-muted">Астана қаласы, Алматы ауданы, әкімшілік орталығы</p>
          </div>
          <div className="rounded-4 overflow-hidden shadow-lg border border-light map-wrapper-anim" style={{ height: '450px' }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d160270.83853110595!2d71.30602882583274!3d51.14798363765103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x424580c47db54609%3A0x97f9148dddb19228!2z0JDQu9C80LDRgtGLINCw0YPQtNCw0L3Riywg0JDRgdGC0LDQvdCw!5e0!3m2!1skk!2skz!4v1714571850123!5m2!1skk!2skz" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Astana Almaty District"
            ></iframe>
          </div>
        </div>
      </section>

      {/* NATIVE CSS ANIMATIONS */}
      <style>{`
        /* Fade Ins */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up {
          animation: fadeInUp 0.7s ease-out forwards;
        }

        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .form-wrapper-anim {
          opacity: 0;
          animation: slideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
        }
        .map-wrapper-anim {
          opacity: 0;
          animation: slideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;
        }

        @keyframes modalPop {
          0% { opacity: 0; transform: scale(0.9) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .toast-anim {
          animation: modalPop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Form Controls */
        .form-control:focus {
          background-color: #ffffff !important;
          border: 2px solid #0b58ca !important;
          box-shadow: 0 0 0 0.25rem rgba(11, 88, 202, 0.15) !important;
        }

        /* Premium Button */
        .btn-premium {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .btn-premium:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(11, 88, 202, 0.3) !important;
          background-color: #084298;
          border-color: #084298;
        }
        .btn-premium:active {
          transform: translateY(1px);
        }

        .tracking-wider {
          letter-spacing: 1px;
        }
      `}</style>
    </div>
  );
}
