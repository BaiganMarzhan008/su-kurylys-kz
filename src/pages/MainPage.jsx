import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function MainPage() {
  const navigate = useNavigate();

  // Calculator State
  const [pipeType, setPipeType] = useState('Магистральды су құбыры');
  const [diameter, setDiameter] = useState('315');
  const [length, setLength] = useState(500);

  // Computed Values
  const computedDays = Math.ceil(length / 120) + (diameter === '800' ? 5 : 2);
  const techClass = diameter === '800' ? 'Күрделі ауыр өнеркәсіптік магистраль' : (pipeType === 'Магистральды су құбыры' ? 'Орташа қысымды қалалық желі' : 'Стандартты су бұру/кәріз желісі');

  const handleSendToManager = () => {
    navigate('/contact');
  };

  return (
    <main className="w-100" style={{ fontFamily: "'Montserrat', sans-serif", overflowX: 'hidden' }}>
      
      {/* SECTION 1: Hero Section with Zoom Effect */}
      <section className="position-relative d-flex align-items-center justify-content-center overflow-hidden" style={{ minHeight: '90vh' }}>
        <div 
          className="position-absolute top-0 start-0 w-100 h-100 hero-bg-zoom"
          style={{ 
            backgroundImage: `linear-gradient(rgba(20,23,28,0.8), rgba(20,23,28,0.85)), url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="container position-relative z-index-1 text-white py-5 fade-in-up">
          <div className="row justify-content-center text-center">
            <div className="col-lg-10">
              <span 
                className="d-inline-block text-uppercase fw-bold px-3 py-1 mb-4 rounded-1 shadow-sm"
                style={{ backgroundColor: '#0b58ca', fontSize: '12px', letterSpacing: '3px' }}
              >
                ТОО СУ ҚҰРЫЛЫС KZ
              </span>
              <h1 className="display-3 fw-bolder mb-4 pulse-text" style={{ letterSpacing: '-1px', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                Астананың инженерлік жүйелерінің <br className="d-none d-lg-block"/> <span style={{ color: '#3b82f6' }}>сенімді кепілі</span>
              </h1>
              <p className="lead opacity-90 mx-auto fs-5 mb-5" style={{ maxWidth: '850px', lineHeight: '1.8' }}>
                2008 жылдан бері ТОО "СУ ҚҰРЫЛЫС KZ" мемлекеттік лицензиялар (ГСЛ №081240011564) мен МЕМСТ (ГОСТ) талаптарына сай күрделі су құбырлары мен кәріз желілерін нөлден бастап іске қосып келеді.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-4">
                <a href="#calculator" className="btn btn-lg px-5 py-3 fw-bold text-white rounded-2 btn-premium">
                  Жобаны Есептеу
                </a>
                <Link to="/projects" className="btn btn-lg px-5 py-3 fw-bold text-white rounded-2 btn-outline-premium">
                  Нысандарды Көру
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Dynamic "Wow" Feature — Interactive Infrastructure Calculator */}
      <section id="calculator" className="py-5" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container py-5 slide-up-on-scroll">
          <div className="text-center mb-5 pb-3">
            <h2 className="display-6 fw-bold text-dark mb-3">Құбыр тарту құнын есептеу калькуляторы</h2>
            <p className="text-muted fs-5">Болжалды жұмыс уақыты мен технологиялық күрделілікті лезде анықтаңыз</p>
          </div>
          
          <div className="row justify-content-center">
            <div className="col-lg-11">
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                <div className="row g-0">
                  
                  {/* Inputs Left */}
                  <div className="col-md-7 p-4 p-lg-5 bg-white">
                    <h4 className="fw-bold mb-4 text-dark">Жоба параметрлері</h4>
                    
                    <div className="mb-4">
                      <label className="form-label fw-bold text-muted small text-uppercase mb-2">Желі түрі (Pipeline Type)</label>
                      <select 
                        className="form-select form-select-lg bg-light border-0 shadow-none fs-6 py-3 fw-medium"
                        value={pipeType}
                        onChange={(e) => setPipeType(e.target.value)}
                      >
                        <option value="Магистральды су құбыры">Магистральды су құбыры</option>
                        <option value="Орталық кәріз жүйесі">Орталық кәріз жүйесі</option>
                        <option value="Өндірістік су бұру">Өндірістік су бұру</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-bold text-muted small text-uppercase mb-3">Құбыр диаметрі (Pipe Diameter)</label>
                      <div className="d-flex flex-wrap gap-2 gap-lg-3">
                        {['315', '500', '800'].map(d => (
                          <div key={d} className="flex-fill">
                            <input 
                              type="radio" 
                              className="btn-check" 
                              name="diameter" 
                              id={`dia-${d}`} 
                              checked={diameter === d}
                              onChange={() => setDiameter(d)}
                            />
                            <label className="btn btn-outline-primary w-100 py-3 rounded-3 fw-bold border-2" htmlFor={`dia-${d}`}>
                              {d} мм
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <label className="form-label fw-bold text-muted small text-uppercase mb-0">Желі ұзындығы (Pipeline Length)</label>
                        <span className="badge bg-primary fs-6 px-3 py-2 rounded-2">{length} метр</span>
                      </div>
                      <input 
                        type="range" 
                        className="form-range custom-range mt-2" 
                        min="0" 
                        max="5000" 
                        step="50"
                        value={length}
                        onChange={(e) => setLength(Number(e.target.value))}
                      />
                      <div className="d-flex justify-content-between text-muted small mt-1 fw-medium opacity-75">
                        <span>0м</span>
                        <span>2500м</span>
                        <span>5000м</span>
                      </div>
                    </div>
                  </div>

                  {/* Results Right */}
                  <div className="col-md-5 p-4 p-lg-5 text-white d-flex flex-column justify-content-center position-relative" style={{ backgroundColor: '#0b58ca' }}>
                    <div className="position-absolute top-0 end-0 p-4 opacity-25">
                       <i className="fa-solid fa-calculator fa-5x"></i>
                    </div>
                    <div className="position-relative z-index-1">
                      <h5 className="text-white opacity-75 mb-4 text-uppercase tracking-wider fs-6">Есептеу нәтижесі:</h5>
                      
                      <div className="mb-4 calc-result-anim" key={length + diameter + 'days'}>
                        <p className="opacity-75 mb-1 small text-uppercase fw-medium">Болжалды орындау мерзімі:</p>
                        <h2 className="display-4 fw-bolder mb-0 text-white">{length > 0 ? computedDays : 0} <span className="fs-5 fw-normal opacity-75">жұмыс күні</span></h2>
                      </div>
                      
                      <div className="mb-5 calc-result-anim" style={{ animationDelay: '0.1s' }} key={pipeType + diameter + 'tech'}>
                        <p className="opacity-75 mb-1 small text-uppercase fw-medium">Технологиялық класс:</p>
                        <h4 className="fw-bold text-white mb-0 lh-base">{length > 0 ? techClass : 'Мәлімет жоқ'}</h4>
                      </div>

                      <button onClick={handleSendToManager} className="btn btn-light btn-lg w-100 py-3 fw-bold text-primary rounded-3 shadow-lg btn-premium-light d-flex align-items-center justify-content-center">
                        Есепті менеджерге жіберу <i className="fa-solid fa-arrow-right ms-2"></i>
                      </button>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Rich Corporate Advantages */}
      <section className="py-5 bg-white">
        <div className="container py-5">
           <div className="text-center mb-5 pb-3">
             <h2 className="display-6 fw-bold text-dark mb-2">Біздің Артықшылықтарымыз</h2>
             <div className="mx-auto mt-4" style={{ width: '60px', height: '4px', backgroundColor: '#0b58ca', borderRadius: '2px' }}></div>
           </div>
           
           <div className="row g-4">
             {/* Adv 1 */}
             <div className="col-lg-4 col-md-6">
               <div className="p-4 p-lg-5 h-100 rounded-4 border border-light bg-light adv-card transition-all">
                 <div className="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm mb-4" style={{ width: '70px', height: '70px', color: '#0b58ca' }}>
                   <i className="fa-solid fa-truck-monster fs-3"></i>
                 </div>
                 <h4 className="fw-bold mb-3 text-dark">Жеке техника паркі</h4>
                 <p className="text-muted lh-lg mb-0" style={{ fontSize: '15px' }}>
                   Компанияның меншігінде 40-тан астам заманауи Hitachi және Caterpillar экскаваторлары мен ХДПЕ құбыр дәнекерлеу аппараттары бар.
                 </p>
               </div>
             </div>
             
             {/* Adv 2 */}
             <div className="col-lg-4 col-md-6">
               <div className="p-4 p-lg-5 h-100 rounded-4 border border-light bg-light adv-card transition-all" style={{ animationDelay: '0.1s' }}>
                 <div className="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm mb-4" style={{ width: '70px', height: '70px', color: '#0b58ca' }}>
                   <i className="fa-solid fa-certificate fs-3"></i>
                 </div>
                 <h4 className="fw-bold mb-3 text-dark">МЕМСТ (ГОСТ) Кепілдігі</h4>
                 <p className="text-muted lh-lg mb-0" style={{ fontSize: '15px' }}>
                   Әрбір тартылған метрлік құбыр гидравликалық қысым сынағынан өтіп, ресми 10 жылдық техникалық кепілдік құжаттарымен тапсырылады.
                 </p>
               </div>
             </div>
             
             {/* Adv 3 */}
             <div className="col-lg-4 col-md-12">
               <div className="p-4 p-lg-5 h-100 rounded-4 border border-light bg-light adv-card transition-all" style={{ animationDelay: '0.2s' }}>
                 <div className="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm mb-4" style={{ width: '70px', height: '70px', color: '#0b58ca' }}>
                   <i className="fa-solid fa-helmet-safety fs-3"></i>
                 </div>
                 <h4 className="fw-bold mb-3 text-dark">Тәжірибелі Инженерлер</h4>
                 <p className="text-muted lh-lg mb-0" style={{ fontSize: '15px' }}>
                   Біздің ұжымда 15 жылдан астам стажы бар, Астана қаласының күрделі топырақ құрылымын бес саусақтай білетін аттестатталған мамандар жұмыс істейді.
                 </p>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* SECTION 4: Diverse Visual Gallery */}
      <section className="py-5" style={{ backgroundColor: '#14171c' }}>
        <div className="container-fluid px-0">
          <div className="text-center mb-5 pt-4">
             <h2 className="display-6 fw-bold text-white mb-2">Біздің Нысандар мен Жабдықтар</h2>
             <p className="text-white opacity-50">Құрылыс барысынан шынайы көріністер</p>
          </div>
          <div className="row g-0">
            {[
              { img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800', title: 'Индустриялық Құбыр Құрастыру' },
              { img: 'https://www.stnd-machinery.com/icms/upload/f7be27704a5311efac3ed114627c9d69/pic/%E4%BA%A7%E5%93%81%E7%AE%A1%E7%90%86-%E4%BA%A7%E5%93%81%E5%9B%BE%E7%89%87/cc302840e55e11f0886e1368349311e9/Directory/%E7%99%BD%E5%BA%95%E5%9B%BE_1767085576388.jpg', title: 'Ауыр Экскаватор Жұмыста' },
              { img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600', title: 'Инженерлік Сызбалар' },
              { img: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=600', title: 'Су Инфрақұрылым Торабы' }
            ].map((item, i) => (
              <div className="col-xl-3 col-md-6" key={i}>
                <div className="position-relative gallery-card rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl" style={{ height: '350px' }}>
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-100" 
                    style={{ objectFit: 'cover', height: '100%' }}
                  />
                  <div className="position-absolute bottom-0 start-0 w-100 p-4 gallery-overlay">
                    <h5 className="text-white fw-bold mb-0">{item.title}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Animated Statistics Counter */}
      <section className="py-5 bg-primary text-white">
        <div className="container py-4">
          <div className="row g-4 text-center">
             <div className="col-md-3 col-6 border-end border-light border-opacity-25">
               <h2 className="display-4 fw-bolder mb-2">15+</h2>
               <p className="text-uppercase fw-semibold mb-0 opacity-75 tracking-wider fs-6">Жыл Тәжірибе</p>
             </div>
             <div className="col-md-3 col-6 border-end-md border-light border-opacity-25">
               <h2 className="display-4 fw-bolder mb-2">500+</h2>
               <p className="text-uppercase fw-semibold mb-0 opacity-75 tracking-wider fs-6">Аяқталған Нысан</p>
             </div>
             <div className="col-md-3 col-6 border-end border-light border-opacity-25">
               <h2 className="display-4 fw-bolder mb-2">0</h2>
               <p className="text-uppercase fw-semibold mb-0 opacity-75 tracking-wider fs-6">Апаттық Жағдай</p>
             </div>
             <div className="col-md-3 col-6">
               <h2 className="display-4 fw-bolder mb-2">24/7</h2>
               <p className="text-uppercase fw-semibold mb-0 opacity-75 tracking-wider fs-6">Техникалық Қолдау</p>
             </div>
          </div>
        </div>
      </section>

      {/* NATIVE CSS ANIMATIONS & UTILS */}
      <style>{`
        /* Hero Zoom & Pulse */
        @keyframes heroZoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .hero-bg-zoom {
          animation: heroZoom 25s infinite ease-in-out;
        }
        @keyframes pulseText {
          0% { opacity: 0.9; transform: scale(0.99); }
          50% { opacity: 1; transform: scale(1); }
          100% { opacity: 0.9; transform: scale(0.99); }
        }
        .pulse-text {
          animation: pulseText 4s infinite ease-in-out;
        }
        
        /* Fade In Up */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }

        /* Buttons */
        .btn-premium {
          background-color: #0b58ca;
          border: 2px solid #0b58ca;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(11, 88, 202, 0.4);
        }
        .btn-premium:hover {
          background-color: #084298;
          border-color: #084298;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(11, 88, 202, 0.6);
        }
        .btn-outline-premium {
          background-color: transparent;
          border: 2px solid rgba(255,255,255,0.4);
          transition: all 0.3s ease;
        }
        .btn-outline-premium:hover {
          background-color: #ffffff;
          color: #000 !important;
          border-color: #ffffff;
          transform: translateY(-2px);
        }
        .btn-premium-light {
          transition: all 0.3s ease;
        }
        .btn-premium-light:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.3) !important;
        }

        /* Calculator Styles */
        .custom-range::-webkit-slider-thumb {
          background: #0b58ca;
          cursor: pointer;
        }
        @keyframes softSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .calc-result-anim {
          animation: softSlideIn 0.4s ease-out forwards;
        }

        /* Advantages Card Hover */
        .transition-all {
          transition: all 0.3s ease;
        }
        .adv-card {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .adv-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.08) !important;
          border-color: #0b58ca !important;
          background-color: #ffffff !important;
        }
        .adv-card:hover i {
          transform: scale(1.15);
          transition: transform 0.3s ease;
        }

        /* Gallery Transitions */
        .gallery-img {
          transition: transform 0.4s ease;
        }
        .gallery-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
          opacity: 0.8;
          transition: opacity 0.3s ease;
        }
        .gallery-card:hover .gallery-img {
          transform: scale(1.05);
        }
        .gallery-card:hover .gallery-overlay {
          opacity: 1;
        }
        
        .tracking-wider {
          letter-spacing: 1px;
        }
        
        /* Utility */
        @media (max-width: 768px) {
          .border-end-md {
            border-right: 0 !important;
          }
        }
      `}</style>
    </main>
  );
}
