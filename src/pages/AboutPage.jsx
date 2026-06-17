import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  const [activeYear, setActiveYear] = useState('2008');

  const timelineData = [
    {
      year: '2008',
      title: '2008 жыл',
      desc: 'Компанияның құрылуы және алғашқы мемлекеттік лицензияны алу.'
    },
    {
      year: '2015',
      title: '2015 жыл',
      desc: 'Жеке ауыр техника паркін 20 бірлікке дейін ұлғайту, ТЭЦ нысандарымен жұмыс.'
    },
    {
      year: '2022',
      title: '2022 жыл',
      desc: 'Траншеясыз құбыр тарту (санация) бойынша еуропалық технологияларды енгізу.'
    },
    {
      year: '2026',
      title: '2026 жыл',
      desc: 'Астана бойынша 500-ден астам жобаны сәтті аяқтап, жетекші инженерлік кәсіпорынға айналу.'
    }
  ];

  const activeContent = timelineData.find(item => item.year === activeYear);

  return (
    <div className="w-100 bg-light" style={{ fontFamily: "'Montserrat', sans-serif", minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* 1. Hero Background Section */}
      <section className="position-relative d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
        <div 
          className="position-absolute top-0 start-0 w-100 h-100 hero-bg-zoom"
          style={{ 
            backgroundImage: `linear-gradient(rgba(20,23,28,0.75), rgba(20,23,28,0.85)), url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        ></div>
        <div className="container position-relative z-index-1 text-center text-white py-5 fade-in-up">
          <span 
            className="d-inline-block text-uppercase fw-bold px-4 py-2 mb-4 rounded-2 shadow-sm"
            style={{ backgroundColor: '#0b58ca', fontSize: '13px', letterSpacing: '3px' }}
          >
            КОМПАНИЯ ПРОФАЙЛЫ
          </span>
          <h1 className="display-3 fw-bolder mb-4" style={{ letterSpacing: '-1px', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
            БІЗ ТУРАЛЫ — <br className="d-none d-md-block" />ТОО СУ ҚҰРЫЛЫС KZ
          </h1>
        </div>
      </section>

      {/* 2. Interactive Timeline & History Copy */}
      <section className="py-5 bg-white">
        <div className="container py-5" style={{ maxWidth: '1200px' }}>
          <div className="row g-5 align-items-center">
            
            {/* Left: Rich Kazakh Business Copy */}
            <div className="col-lg-5 slide-in-left">
              <h3 className="display-6 fw-bold text-dark mb-4" style={{ letterSpacing: '-0.5px' }}>БІЗДІҢ ТАРИХЫМЫЗ</h3>
              <div className="mx-0 mb-4" style={{ width: '60px', height: '4px', backgroundColor: '#0b58ca', borderRadius: '2px' }}></div>
              <p className="fs-5 text-muted lh-lg mb-0" style={{ fontWeight: '500' }}>
                ТОО "СУ ҚҰРЫЛЫС KZ" іргетасы 2008 жылы Астана қаласында қаланды. Алғашқы күннен бастап біз елорданың ең күрделі су бұру және инженерлік инфрақұрылымдық нысандарында мердігерлік жұмыстарды атқарып келеміз. БИН: 081240011564.
              </p>
            </div>

            {/* Right: Interactive Timeline (WOW Feature) */}
            <div className="col-lg-7 slide-in-right">
              <div className="p-4 p-md-5 rounded-4 bg-light border border-secondary border-opacity-10 shadow-sm timeline-container position-relative">
                
                {/* Horizontal Timeline Nodes */}
                <div className="d-flex justify-content-between position-relative mb-5 z-index-1">
                  {/* Connecting Line */}
                  <div className="position-absolute top-50 start-0 w-100 bg-secondary opacity-25" style={{ height: '3px', transform: 'translateY(-50%)', zIndex: -1 }}></div>
                  
                  {timelineData.map((item) => (
                    <div 
                      key={item.year}
                      className="d-flex flex-column align-items-center timeline-node-wrapper position-relative"
                      onClick={() => setActiveYear(item.year)}
                    >
                      <div 
                        className={`rounded-circle d-flex align-items-center justify-content-center fw-bold transition-all shadow-sm ${activeYear === item.year ? 'bg-primary text-white scale-active' : 'bg-white text-primary border border-primary'}`}
                        style={{ width: '60px', height: '60px', border: activeYear === item.year ? 'none' : '3px solid #0b58ca', cursor: 'pointer', zIndex: 2 }}
                      >
                        {item.year}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Animated Details Box */}
                <div className="p-4 p-md-5 rounded-4 bg-white border border-light shadow-sm premium-hover-card position-relative" key={activeContent.year}>
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px', color: '#0b58ca' }}>
                      <i className="fa-solid fa-clock-rotate-left fs-5"></i>
                    </div>
                    <h4 className="fw-bold mb-0 text-dark">{activeContent.title}</h4>
                  </div>
                  <p className="text-muted lh-lg mb-0" style={{ fontSize: '16.5px' }}>
                    {activeContent.desc}
                  </p>
                </div>

              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 3. Distinct Images Gallery Section */}
      <section className="py-5" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container py-4" style={{ maxWidth: '1200px' }}>
          <div className="text-center mb-5 pb-3">
             <h2 className="display-6 fw-bold text-dark mb-3">Өндірістік Қуаттылық</h2>
             <div className="mx-auto mt-4" style={{ width: '60px', height: '4px', backgroundColor: '#0b58ca', borderRadius: '2px' }}></div>
          </div>
          
          <div className="row g-4">
            {/* Image 1 */}
            <div className="col-lg-4 col-md-6 fade-in-up">
              <div className="rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl bg-white p-3 border border-light h-100 premium-hover-card">
                <div className="rounded-2xl overflow-hidden mb-4 position-relative">
                  <img 
                    src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600" 
                    alt="Engineering Office Blueprint" 
                    className="w-100" 
                    style={{ objectFit: 'cover', height: '240px' }}
                  />
                </div>
                <h5 className="fw-bold text-dark text-center mb-2">Инженерлік Сызбалар</h5>
                <p className="text-muted text-center small mb-2 opacity-75">Engineering Office / Blueprint</p>
              </div>
            </div>
            
            {/* Image 2 */}
            <div className="col-lg-4 col-md-6 fade-in-up" style={{ animationDelay: '0.15s' }}>
              <div className="rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl bg-white p-3 border border-light h-100 premium-hover-card">
                <div className="rounded-2xl overflow-hidden mb-4 position-relative">
                  <img 
                    src="https://semeytany.kz/wp-content/uploads/2026/06/714184667_995628349859569_9024572374550390961_n.jpg"
                    alt="Modern Heavy Equipment Fleet" 
                    className="w-100" 
                    style={{ objectFit: 'cover', height: '240px' }}
                  />
                </div>
                <h5 className="fw-bold text-dark text-center mb-2">Заманауи Техника Паркі</h5>
                <p className="text-muted text-center small mb-2 opacity-75">Modern Heavy Equipment Fleet</p>
              </div>
            </div>
            
            {/* Image 3 */}
            <div className="col-lg-4 col-md-12 fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl bg-white p-3 border border-light h-100 premium-hover-card">
                <div className="rounded-2xl overflow-hidden mb-4 position-relative">
                  <img 
                    src="https://www.xinfatools.com/uploads/THE-1.jpg" 
                    alt="Certified Welding Process" 
                    className="w-100 h-100" 
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h5 className="fw-bold text-dark text-center mb-2">Дәнекерлеу Процесі</h5>
                <p className="text-muted text-center small mb-2 opacity-75">Certified Welding Process</p>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* NATIVE CSS ANIMATIONS */}
      <style>{`
        /* Core Fades */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes heroZoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .hero-bg-zoom {
          animation: heroZoom 25s infinite ease-in-out;
        }

        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .slide-in-left {
          animation: fadeInLeft 0.8s ease-out forwards;
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .slide-in-right {
          animation: fadeInRight 0.8s ease-out forwards;
        }

        /* Hover Classes required by Prompt */
        .transition-all {
          transition: all 0.3s ease;
        }
        .premium-hover-card {
          transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
          box-shadow: 0 4px 6px rgba(0,0,0,0.02) !important;
        }
        /* scale up neatly on mouse hover (transform: translateY(-8px); shadow-lg) */
        .premium-hover-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.08) !important;
          border-color: #0b58ca !important;
        }
        
        .timeline-node-wrapper > div {
          transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
        }
        .timeline-node-wrapper:hover > div {
          transform: translateY(-8px);
          box-shadow: 0 10px 20px rgba(11,88,202,0.2) !important;
          background-color: #0b58ca !important;
          color: white !important;
        }

        /* Timeline Active Scale */
        .scale-active {
          transform: scale(1.15) !important;
          box-shadow: 0 8px 25px rgba(11,88,202,0.35) !important;
        }

        /* Gallery Images */
        .gallery-img {
          transition: transform 0.6s ease;
        }
        .premium-hover-card:hover .gallery-img {
          transform: scale(1.08);
        }

        /* Timeline Content Fade */
        @keyframes fastFade {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .timeline-container .premium-hover-card {
          animation: fastFade 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
