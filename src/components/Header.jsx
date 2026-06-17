import React, { useContext, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { AccessibilityContext } from '../context/AccessibilityContext';

const Header = () => {
  const { 
    isHighContrast, setIsHighContrast, 
    isLargeFont, setIsLargeFont, 
    hideImages, setHideImages 
  } = useContext(AccessibilityContext);

  const { pathname } = useLocation();

  // Бет ауысқан сайын гамбургер мәзірін автоматты жабу
  useEffect(() => {
    const navEl = document.getElementById('navbarContent');
    if (navEl && navEl.classList.contains('show')) {
      navEl.classList.remove('show');
      const toggler = document.querySelector('[data-bs-target="#navbarContent"]');
      if (toggler) toggler.setAttribute('aria-expanded', 'false');
    }
  }, [pathname]);

  const closeNav = () => {
    const navEl = document.getElementById('navbarContent');
    if (navEl && navEl.classList.contains('show')) {
      navEl.classList.remove('show');
      const toggler = document.querySelector('[data-bs-target="#navbarContent"]');
      if (toggler) toggler.setAttribute('aria-expanded', 'false');
    }
  };

  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-lg bg-slate-dark navbar-dark py-3 shadow-sm">
        <div className="container">
          <Link className="navbar-brand text-decoration-none" to="/" onClick={closeNav}>
            <div className="d-flex align-items-center">
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
          </Link>
          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav mx-auto gap-2">
              <li className="nav-item"><NavLink onClick={closeNav} className={({isActive}) => `nav-link px-3 rounded ${isActive ? 'text-white bg-primary bg-opacity-10' : 'text-slate-light'}`} to="/">Басты бет</NavLink></li>
              <li className="nav-item"><NavLink onClick={closeNav} className={({isActive}) => `nav-link px-3 rounded ${isActive ? 'text-white bg-primary bg-opacity-10' : 'text-slate-light'}`} to="/about">Біз туралы</NavLink></li>
              <li className="nav-item"><NavLink onClick={closeNav} className={({isActive}) => `nav-link px-3 rounded ${isActive ? 'text-white bg-primary bg-opacity-10' : 'text-slate-light'}`} to="/services">Қызметтер</NavLink></li>
              <li className="nav-item"><NavLink onClick={closeNav} className={({isActive}) => `nav-link px-3 rounded ${isActive ? 'text-white bg-primary bg-opacity-10' : 'text-slate-light'}`} to="/projects">Жобалар</NavLink></li>
              <li className="nav-item"><NavLink onClick={closeNav} className={({isActive}) => `nav-link px-3 rounded ${isActive ? 'text-white bg-primary bg-opacity-10' : 'text-slate-light'}`} to="/news">Жаңалықтар</NavLink></li>
            </ul>
            <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
              <Link to="/contact" onClick={closeNav} className="btn btn-primary fw-bold rounded px-4 py-2 btn-animate text-uppercase" style={{fontSize: '0.9rem', letterSpacing: '0.5px'}}>
                Өтінім қалдыру
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
