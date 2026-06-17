import React from 'react';

const AboutPage = () => {
  return (
    <main className="py-5 bg-white flex-grow-1 animate-fade-in-up">
      <div className="container py-4">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6 position-relative">
             <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80" alt="About Company" className="img-fluid rounded-4 shadow-lg" />
             <div className="position-absolute bottom-0 end-0 bg-primary text-white p-4 rounded-4 shadow-lg m-3 text-center border border-4 border-white">
                <h2 className="display-4 fw-bold mb-0">15+</h2>
                <p className="mb-0 fw-medium">Жыл тәжірибе</p>
             </div>
          </div>
          <div className="col-lg-6 ps-lg-5">
            <h6 className="text-primary fw-bold mb-2 tracking-wide text-uppercase">Біз туралы</h6>
            <h2 className="display-5 fw-bold text-dark mb-4">«СУ ҚҰРЫЛЫС KZ» ЖШС</h2>
            <p className="text-muted fs-5 mb-4">
              БСН 081240011564. Біздің компания 2008 жылдан бері Астана қаласында және оған іргелес аймақтарда инженерлік желілерді тарту бойынша жоғары сапалы қызметтер көрсетіп келеді.
            </p>
            <p className="text-muted mb-4">
              Біздің миссиямыз — қала мен өндірістік нысандардың инфрақұрылымын жақсарта отырып, халыққа таза су мен сенімді кәріз жүйелерін ұсыну. Жоғары білікті мамандар тобы кез келген қиындықтағы жобаларды МЕМСТ талаптарына сай жүзеге асырады.
            </p>
            
            <h5 className="fw-bold mt-4 mb-3">Біздің жетістіктеріміз:</h5>
            <ul className="list-unstyled text-muted">
              <li className="mb-2"><i className="fa-solid fa-check text-primary me-2"></i> 500+ сәтті аяқталған жобалар</li>
              <li className="mb-2"><i className="fa-solid fa-check text-primary me-2"></i> Астана қаласы бойынша сенімді серіктес</li>
              <li className="mb-2"><i className="fa-solid fa-check text-primary me-2"></i> Заманауи техника мен жабдықтар</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
