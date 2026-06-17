import React from 'react';

const ServicesPage = () => {
  const services = [
    { icon: 'fa-water', title: 'Су құбырларын салу', desc: 'Магистральді және қалалық су құбырларын тарту жұмыстары. Жоғары қысымға төзімді HDPE құбырларын қолданамыз.' },
    { icon: 'fa-faucet-drip', title: 'Кәріз жүйелерін орнату', desc: 'Сенімді дренаж және кәріз жүйелерін кешенді түрде орнату. Экологиялық нормалар қатаң сақталады.' },
    { icon: 'fa-network-wired', title: 'Инженерлік желілер', desc: 'Жылыту жүйелері мен сорғы станцияларын толықтай монтаждау. Нысанды инженерлік инфрақұрылыммен қамтамасыз ету.' },
    { icon: 'fa-screwdriver-wrench', title: 'Жөндеу жұмыстары', desc: 'Ескі құбырларды қайта қалыпқа келтіру, күрделі жөндеу және техникалық қызмет көрсету.' }
  ];

  return (
    <main className="py-5 bg-light flex-grow-1 animate-fade-in-up">
      <div className="container py-4">
        <div className="text-center mb-5">
          <h6 className="text-primary fw-bold text-uppercase mb-2 tracking-wide">Қызметтер</h6>
          <h2 className="display-5 fw-bold text-dark">Біздің бағыттарымыз</h2>
        </div>
        <div className="row g-4 mt-3">
          {services.map((srv, idx) => (
            <div className="col-md-6 col-lg-6" key={idx}>
              <div className="card h-100 border-0 shadow-sm p-5 text-center service-card rounded-4">
                <div className="service-icon bg-light text-primary mx-auto rounded-circle d-flex align-items-center justify-content-center mb-4">
                   <i className={`fa-solid ${srv.icon} fs-1`}></i>
                </div>
                <h4 className="fw-bold mb-3">{srv.title}</h4>
                <p className="text-muted mb-0 fs-5">{srv.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ServicesPage;
