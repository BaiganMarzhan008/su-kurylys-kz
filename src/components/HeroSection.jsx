import React from 'react';

export default function HeroSection() {
  return (
    <div className="w-100" style={{ fontFamily: "'Montserrat', sans-serif" }}>

      {/* Main Premium Hero Section */}
      <div 
        className="position-relative d-flex align-items-center" 
        style={{ 
          minHeight: '85vh',
          backgroundImage: `linear-gradient(rgba(20, 23, 28, 0.75), rgba(20, 23, 28, 0.85)), url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container text-white py-5">
          <div className="row">
            <div className="col-lg-8 col-md-10 text-start">
              
              {/* Badge */}
              <div 
                className="d-inline-block text-uppercase fw-bold px-3 py-1 mb-4 rounded-1 text-tracking"
                style={{ 
                  backgroundColor: '#0b58ca', 
                  fontSize: '12px', 
                  letterSpacing: '2px',
                  boxShadow: '0 4px 15px rgba(11, 88, 202, 0.4)'
                }}
              >
                Кәсіби Инженерия & Құрылыс
              </div>

              {/* Main Title */}
              <h1 
                className="display-4 fw-extrabold mb-3 lh-sm"
                style={{ letterSpacing: '-1px', fontWeight: '800 text-shadow: 0 2px 10px rgba(0,0,0,0.5)' }}
              >
                Астана қаласының <br />
                <span style={{ color: '#3b82f6' }}>инженерлік іргетасы</span>
              </h1>

              {/* Subtitle / Rich Text */}
              <p className="lead text-light opacity-90 mb-5 fs-5 max-w-xl" style={{ lineHeight: '1.8', maxWidth: '650px' }}>
                2008 жылдан бері МЕМСТ (ГОСТ) стандарттарына толық сай келетін өнеркәсіптік және азаматтық нысандарға арналған күрделі сумен жабдықтау және кәріз желілерін жобалап, сәтті тартып келеміз. 500-ден астам ірі инфрақұрылымдық жобалар авторы.
              </p>

              {/* Action Buttons */}
              <div className="d-flex flex-wrap gap-3">
                <button 
                  className="btn btn-lg px-4 py-3 fw-bold text-white rounded-2 d-flex align-items-center gap-2"
                  style={{ 
                    backgroundColor: '#0b58ca', 
                    border: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 20px rgba(11, 88, 202, 0.3)'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#0a4eb4'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#0b58ca'}
                >
                  Жобаны бастау 
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
                
                <button 
                  className="btn btn-lg btn-outline-light px-4 py-3 fw-bold rounded-2 text-white bg-transparent"
                  style={{ 
                    border: '2px solid rgba(255,255,255,0.4)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => { e.target.style.background = '#white'; e.target.style.color = '#000'; }}
                  onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#fff'; }}
                >
                  Жобаларды көру
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
