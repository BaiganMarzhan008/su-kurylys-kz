import React, { useState } from 'react';

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState(0);

  const servicesData = [
    {
      id: 0,
      title: 'Магистральды су желілері',
      desc: 'Орталықтандырылған ауыз су тораптарын тарту, ХДПЕ (HDPE) құбырларын дәнекерлеу, қысым реттегіш қою.',
      img: 'https://primeminister.kz/assets/media/img-2964.jpeg',
      icon: 'fa-faucet-drip',
      steps: [
        { title: 'Дайындық', detail: 'Топографиялық өлшемдер.' },
        { title: 'Траншея қазу', detail: 'Қауіпсіз тереңдікті қамтамасыз ету.' },
        { title: 'Дәнекерлеу', detail: 'Құбырларды аппаратпен біріктіру.' },
        { title: 'Гидравликалық сынақ', detail: 'Жүйені қысыммен тексеру.' }
      ]
    },
    {
      id: 1,
      title: 'Өнеркәсіптік кәріз жүйелері',
      desc: 'Тереңдігі жоғары кәріз коллекторларын монтаждау, нөсерлік су ағындарын ұйымдастыру және сорғы станцияларын (КНС) орнату.',
      img: 'https://www.gov.kz/uploads/2025/7/2/c1d9dd019cb69f683ea9877228220829_original.336399.jpg',
      icon: 'fa-water',
      steps: [
        { title: 'Жобалау', detail: 'Көлбеу бұрыштарын есептеу.' },
        { title: 'Жер қазу', detail: 'Терең шурфтарды бекітіп қазу.' },
        { title: 'Монтаждау', detail: 'Ауыр салмақты құбырлар орнату.' },
        { title: 'Іске қосу', detail: 'Герметизациясын тексеру.' }
      ]
    },
    {
      id: 2,
      title: 'Реконструкция және Санация',
      desc: 'Ескірген құбырларды жолды бұзбай, траншеясыз әдіспен ішінен жаңарту.',
      img: 'https://p-t-m.kz/images/2022/10/27/3.png',
      icon: 'fa-wrench',
      steps: [
        { title: 'Бейнедиагностика', detail: 'Ішкі жағдайын роботпен тексеру.' },
        { title: 'Тазарту', detail: 'Ішкі қабырғаларды жуу және қыру.' },
        { title: 'Санация', detail: 'Полимерлі жеңді кіргізіп қатыру.' },
        { title: 'Қорытынды бақылау', detail: 'Қайта диагностика жасау.' }
      ]
    },
    {
      id: 3,
      title: 'Дәнекерлеу Процесі / Инженерлік бақылау',
      desc: 'Заманауи технологиялар арқылы жоғары қысымды құбырларды дәнекерлеу және сапасын бақылау.',
      img: 'https://www.xinfatools.com/uploads/THE-1.jpg',
      icon: 'fa-microscope',
      steps: [
        { title: 'Дайындық', detail: 'Материал сапасын тексеру.' },
        { title: 'Процесс', detail: 'Автоматтандырылған дәнекерлеу.' },
        { title: 'Бақылау', detail: 'Ультрадыбыстық диагностика.' },
        { title: 'Нәтиже', detail: 'Сапа сертификатын беру.' }
      ]
    }
  ];

  const activeService = servicesData[activeTab];

  return (
    <div className="w-100 bg-light" style={{ fontFamily: "'Montserrat', sans-serif", minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* Title Section */}
      <section className="bg-dark text-white pt-5 pb-4 border-bottom border-secondary border-opacity-25" style={{ backgroundImage: 'linear-gradient(to right, #14171c, #1a1f26)' }}>
        <div className="container py-4 text-center fade-in-up">
          <span 
            className="d-inline-block text-uppercase fw-bold px-4 py-2 mb-3 rounded-2 shadow-sm"
            style={{ backgroundColor: '#0b58ca', fontSize: '13px', letterSpacing: '3px' }}
          >
            КОРПОРАТИВТІК КАТАЛОГ
          </span>
          <h1 className="display-4 fw-bolder mb-0" style={{ letterSpacing: '-1px' }}>Біздің Қызметтер</h1>
        </div>
      </section>

      {/* Interactive Enterprise Catalog */}
      <section className="py-5">
        <div className="container py-4" style={{ maxWidth: '1300px' }}>
          <div className="row g-4 g-lg-5">
            
            {/* Left Sidebar (Navigation Tabs) */}
            <div className="col-lg-4 slide-in-left">
              <div className="bg-white rounded-4 shadow-sm p-3 border border-light position-sticky" style={{ top: '30px' }}>
                <h5 className="fw-bold text-muted mb-4 px-3 pt-2 text-uppercase tracking-wider" style={{ fontSize: '13px' }}>Қызмет түрлері:</h5>
                <div className="d-flex flex-column gap-2">
                  {servicesData.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(index)}
                      className={`btn text-start p-4 border-0 rounded-3 d-flex align-items-center transition-all ${activeTab === index ? 'bg-primary text-white shadow-md active-tab-scale' : 'bg-transparent text-dark hover-bg-light'}`}
                      style={{ fontSize: '15px' }}
                    >
                      <div 
                        className={`rounded-circle d-flex align-items-center justify-content-center me-3 ${activeTab === index ? 'bg-white text-primary' : 'bg-light text-primary'}`} 
                        style={{ width: '45px', height: '45px', flexShrink: 0 }}
                      >
                        <i className={`fa-solid ${item.icon} fs-5`}></i>
                      </div>
                      <span className="fw-bold lh-sm">{item.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content Area */}
            <div className="col-lg-8">
              {/* key={activeTab} forces a re-mount to trigger the CSS animation */}
              <div key={activeTab} className="bg-white rounded-4 shadow-sm border border-light overflow-hidden content-fade-in">
                
                {/* Dynamic Image Hero */}
                <div className="position-relative">
                  <img 
                    src={activeService.img} 
                    alt={activeService.title}
                    className="w-100"
                    style={{ objectFit: 'cover', height: '400px' }}
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
                  <div className="position-absolute bottom-0 start-0 p-4 p-md-5">
                     <h2 className="display-6 fw-bold text-white mb-0 text-shadow">{activeService.title}</h2>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-4 p-md-5">
                  <h4 className="fw-bold text-dark mb-3">Қызмет Сипаттамасы</h4>
                  <p className="text-muted lh-lg fs-5 mb-5 border-start border-4 border-primary ps-4 bg-light py-3 pe-3 rounded-end">
                    {activeService.desc}
                  </p>

                  {/* Step-by-Step Breakdown */}
                  <h4 className="fw-bold text-dark mb-4 d-flex align-items-center">
                    <i className="fa-solid fa-list-check text-primary me-3"></i> 
                    Жұмыс Процесі (Step-by-Step)
                  </h4>
                  
                  <div className="row g-4">
                    {activeService.steps.map((step, idx) => (
                      <div className="col-md-6" key={idx}>
                        <div className="d-flex premium-hover-card p-3 rounded-3 bg-light border border-white h-100">
                          <div 
                            className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold me-3 shadow-sm" 
                            style={{ width: '40px', height: '40px', flexShrink: 0, fontSize: '18px' }}
                          >
                            {idx + 1}
                          </div>
                          <div>
                            <h6 className="fw-bold text-dark mb-1 mt-2">{step.title}</h6>
                            <p className="text-muted small mb-0 lh-base">{step.detail}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>

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

        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .slide-in-left {
          animation: fadeInLeft 0.7s ease-out forwards;
        }

        /* Dynamic Content Fade In (Triggered on tab change) */
        @keyframes contentFadeIn {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .content-fade-in {
          animation: contentFadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* Hover & Transition Utility */
        .transition-all {
          transition: all 0.3s ease;
        }
        .hover-bg-light:hover {
          background-color: #f8f9fa !important;
          transform: translateX(5px);
        }
        .active-tab-scale {
          transform: scale(1.02);
          box-shadow: 0 10px 20px rgba(11, 88, 202, 0.2) !important;
        }
        
        .tracking-wider {
          letter-spacing: 1px;
        }
        .text-shadow {
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        .premium-hover-card {
          transition: all 0.3s ease;
        }
        .premium-hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 15px rgba(0,0,0,0.05) !important;
          background-color: #ffffff !important;
          border-color: #0b58ca !important;
        }
      `}</style>

    </div>
  );
}
