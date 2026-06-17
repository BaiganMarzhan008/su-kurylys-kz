import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-darker text-white pt-5 pb-3 mt-auto border-top border-secondary border-opacity-25">
      <div className="container pt-4">
        <div className="row g-5 mb-5">
          {/* Col 1 */}
          <div className="col-lg-4">
            <div className="d-flex align-items-center mb-4">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
                <path d="M8 25h24 M12 32h16 M15 10v25 M25 10v25" stroke="#1E293B" strokeWidth="2" strokeOpacity="0.6" strokeLinecap="round" strokeDasharray="4 4" />
                <path d="M20 4 C20 4 8 16 8 26 C8 32.627 13.373 38 20 38 C26.627 38 32 32.627 32 26 C32 16 20 4 20 4 Z" fill="#0066FF" fillOpacity="0.9" />
                <path d="M16 24 L20 20 L24 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 20 L20 30" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <span className="fw-bold fs-4 text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                СУ ҚҰРЫЛЫС <span style={{ color: '#0066FF' }}>KZ</span>
              </span>
            </div>
            <p className="text-slate-light mb-3 pe-lg-4">
              Астана қаласы мен Қазақстанның басқа аймақтарында сумен жабдықтау және кәріз желілерін тарту бойынша сенімді серіктесіңіз. 2008 жылдан бері нарықта.
            </p>
            <p className="text-slate-light opacity-75 small font-monospace mb-0">БСН: 081240011564</p>
          </div>
          
          {/* Col 2 */}
          <div className="col-lg-3 col-md-4">
            <h5 className="fw-bold mb-4 text-white">Компания</h5>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><Link to="/about" className="text-slate-light text-decoration-none transition-color hover-white">Біз туралы</Link></li>
              <li><Link to="/services" className="text-slate-light text-decoration-none hover-white">Қызметтер</Link></li>
              <li><Link to="/projects" className="text-slate-light text-decoration-none hover-white">Жобалар</Link></li>
              <li><Link to="/news" className="text-slate-light text-decoration-none hover-white">Жаңалықтар</Link></li>

            </ul>
          </div>
          
          {/* Col 3 */}
          <div className="col-lg-5 col-md-4">
            <h5 className="fw-bold mb-4 text-white">Байланыс</h5>
            <ul className="list-unstyled d-flex flex-column gap-3 text-slate-light">
              <li className="d-flex align-items-start">
                <i className="fa-solid fa-location-dot mt-1 me-3 text-primary"></i>
                <span>Астана қ., Алматы ауданы,<br/>Тәуелсіздік даңғылы, 10</span>
              </li>
              <li className="d-flex align-items-center">
                <i className="fa-solid fa-phone me-3 text-primary"></i>
                <span>+7 (7172) 123-456</span>
              </li>
              <li className="d-flex align-items-center">
                <i className="fa-solid fa-envelope me-3 text-primary"></i>
                <span>info@su-qurylys.kz</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-top border-secondary border-opacity-25 pt-4 pb-2 text-center text-slate-light small">
          <p className="mb-0">&copy; {new Date().getFullYear()} «СУ ҚҰРЫЛЫС KZ» ЖШС. Барлық құқықтар қорғалған.</p>
        </div>
      </div>
      <style>{`
        .hover-white:hover { color: #ffffff !important; }
      `}</style>
    </footer>
  );
};

export default Footer;
