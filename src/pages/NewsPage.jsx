import React from 'react';

const NewsPage = () => {
  const news = [
    { 
      id: 1, 
      date: '15 Маусым, 2026', 
      title: 'Жаңа техника паркі', 
      desc: 'Компаниямыз құрылыс жұмыстарын жеделдету және күрделі инженерлік жобаларды сапалы орындау мақсатында жаңадан 5 заманауи ауыр экскаватор мен жоғары өнімді гидравликалық техника сатып алды. Бұл Астана қаласы маңындағы жаңа су құбыры желілерін тарту мерзімін 30%-ға қысқартуға мүмкіндік береді.', 
      img: 'https://semeytany.kz/wp-content/uploads/2026/06/714184667_995628349859569_9024572374550390961_n.jpg' 
    },
    { 
      id: 2, 
      date: '02 Мамыр, 2026', 
      title: 'Астанадағы жаңа жоба', 
      desc: 'Есіл ауданындағы ірі тұрғын үй кешенінің сыртқы сумен жабдықтау және кәріз желілерін тарту бойынша ауқымды құрылыс жұмыстары басталды. Жоба аясында жоғары қысымға төзімді, экологиялық қауіпсіз HDPE құбырлары қолданылып, магистральды жүйеге заманауи сүзгілеу станциялары интеграцияланады.', 
      img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 3, 
      date: '12 Сәуір, 2026', 
      title: 'Жылды қорытындылау', 
      desc: 'Өткен есептік кезеңде компаниямыз 50-ден астам ірі өндірістік және азаматтық нысандарды сумен қамту жүйелерін сәтті тапсырды. Барлық атқарылған жұмыстар МЕМСТ (ГОСТ) стандарттарына толық сәйкес келіп, мемлекеттік қабылдау комиссиясынан жоғары баға алды және арнайы сапа сертификаттарына ие болдық.', 
      img: 'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&w=800&q=80' 
    }
  ];

  return (
    <main className="py-5 flex-grow-1" style={{ backgroundColor: '#f4f6f9', fontFamily: "'Montserrat', sans-serif" }}>
      <div className="container py-5 slide-in-up">
        <div className="text-center mb-5">
          <h6 className="text-primary fw-bold text-uppercase mb-2 tracking-wide" style={{letterSpacing: '2px'}}>Блог</h6>
          <h2 className="display-5 fw-bold text-dark mb-3">Компания жаңалықтары</h2>
          <div className="bg-primary mx-auto mt-3" style={{width: '60px', height: '4px', borderRadius: '2px'}}></div>
        </div>
        <div className="row g-4 mt-3">
          {news.map((item, index) => (
            <div className="col-lg-4 col-md-6" key={item.id}>
              <div className="rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl bg-white h-100 d-flex flex-column premium-news-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="position-relative" style={{ height: '240px' }}>
                  <img src={item.img} alt={item.title} className="w-100 h-100 news-img" style={{ objectFit: 'cover' }} />
                  <div className="position-absolute top-0 start-0 m-3">
                    <div className="bg-white text-primary rounded px-3 py-2 small fw-bold text-uppercase shadow-sm" style={{letterSpacing: '1px'}}>
                      <i className="fa-regular fa-calendar me-2"></i>{item.date}
                    </div>
                  </div>
                </div>
                <div className="card-body p-4 d-flex flex-column flex-grow-1">
                  <h5 className="fw-bold mb-3 text-dark lh-base" style={{ fontSize: '1.2rem' }}>{item.title}</h5>
                  <p className="text-muted lh-lg mb-0" style={{ fontSize: '15px' }}>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .slide-in-up {
          animation: slideInUp 0.8s ease-out forwards;
        }
        
        .premium-news-card {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          opacity: 0;
          animation: slideInUp 0.6s ease-out forwards;
        }
        .premium-news-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.1) !important;
        }
        
        .news-img {
          transition: transform 0.6s ease;
        }
        .premium-news-card:hover .news-img {
          transform: scale(1.05);
        }
      `}</style>
    </main>
  );
};

export default NewsPage;
