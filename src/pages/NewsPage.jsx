import React from 'react';

const NewsPage = () => {
  const news = [
    { id: 1, date: '15 Маусым, 2026', title: 'Жаңа техника паркі', desc: 'Компаниямыз құрылыс жұмыстарын жеделдету үшін 5 жаңа экскаватор мен ауыр техника сатып алды.', img: 'https://images.unsplash.com/photo-1580983546086-4f40f0980556?auto=format&fit=crop&w=800&q=80' },
    { id: 2, date: '02 Мамыр, 2026', title: 'Астанадағы жаңа жоба', desc: 'Есіл ауданындағы ірі тұрғын үй кешенінің су желілерін тарту бойынша құрылыс жұмыстары басталды.', img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80' },
    { id: 3, date: '12 Сәуір, 2026', title: 'Жылды қорытындылау', desc: 'Өткен жылы 50-ден астам ірі нысанды сәтті тапсырып, сапа сертификаттарын иелендік.', img: 'https://images.unsplash.com/photo-1617469165786-8007eda3caa7?auto=format&fit=crop&w=800&q=80' }
  ];

  return (
    <main className="py-5 bg-white flex-grow-1 animate-fade-in-up">
      <div className="container py-4">
        <div className="text-center mb-5">
          <h6 className="text-primary fw-bold text-uppercase mb-2 tracking-wide">Блог</h6>
          <h2 className="display-5 fw-bold text-dark">Компания жаңалықтары</h2>
        </div>
        <div className="row g-4 mt-3">
          {news.map(item => (
            <div className="col-md-4" key={item.id}>
              <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden project-card">
                <div className="project-img-wrapper" style={{height: '240px'}}>
                  <img src={item.img} className="card-img-top" alt={item.title} />
                </div>
                <div className="card-body p-4 bg-light">
                  <span className="text-primary fw-bold small mb-2 d-block"><i className="fa-regular fa-calendar me-2"></i>{item.date}</span>
                  <h5 className="fw-bold mb-3">{item.title}</h5>
                  <p className="text-muted">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default NewsPage;
