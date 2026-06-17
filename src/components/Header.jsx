import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AccessibilityContext } from '../context/AccessibilityContext';

const Header = () => {
  const { 
    isHighContrast, setIsHighContrast, 
    isLargeFont, setIsLargeFont, 
    hideImages, setHideImages 
  } = useContext(AccessibilityContext);

  return (
    <header>
      {/* Accessibility Bar */}
      <div className="bg-dark text-white py-1">
        <div className="container d-flex justify-content-end align-items-center gap-2 flex-wrap" style={{fontSize: '0.85rem'}}>
          <span className="d-none d-sm-inline">Нашар көретіндерге арналған нұсқа:</span>
          <button 
            className={`btn btn-sm ${isHighContrast ? 'btn-light' : 'btn-outline-light'}`}
            onClick={() => setIsHighContrast(!isHighContrast)}
            title="Контрастты режим"
          >
            <i className="fa-solid fa-circle-half-stroke"></i>
          </button>
          <button 
            className={`btn btn-sm ${isLargeFont ? 'btn-light' : 'btn-outline-light'}`}
            onClick={() => setIsLargeFont(!isLargeFont)}
            title="Қаріпті үлкейту"
          >
            <i className="fa-solid fa-font"></i>+
          </button>
          <button 
            className={`btn btn-sm ${hideImages ? 'btn-light' : 'btn-outline-light'}`}
            onClick={() => setHideImages(!hideImages)}
            title="Суреттерді жасыру"
          >
            <i className="fa-solid fa-image-slash"></i>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar navbar-expand-lg sticky-top bg-white shadow-sm py-3">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center fw-bold fs-4 text-primary" to="/">
            <i className="fa-solid fa-droplet me-2"></i> СУ ҚҰРЫЛЫС <span className="text-dark ms-1">KZ</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav mx-auto gap-1">
              <li className="nav-item"><NavLink className={({isActive}) => `nav-link fw-medium ${isActive ? 'text-primary fw-bold' : ''}`} to="/">Басты бет</NavLink></li>
              <li className="nav-item"><NavLink className={({isActive}) => `nav-link fw-medium ${isActive ? 'text-primary fw-bold' : ''}`} to="/about">Біз туралы</NavLink></li>
              <li className="nav-item"><NavLink className={({isActive}) => `nav-link fw-medium ${isActive ? 'text-primary fw-bold' : ''}`} to="/services">Қызметтер</NavLink></li>
              <li className="nav-item"><NavLink className={({isActive}) => `nav-link fw-medium ${isActive ? 'text-primary fw-bold' : ''}`} to="/projects">Жобалар</NavLink></li>
              <li className="nav-item"><NavLink className={({isActive}) => `nav-link fw-medium ${isActive ? 'text-primary fw-bold' : ''}`} to="/news">Жаңалықтар</NavLink></li>
            </ul>
            <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
              <Link to="/contact" className="btn btn-primary fw-bold rounded-pill px-4 btn-animate shadow-sm">
                Өтінім қалдыру
              </Link>
              <Link to="/admin" className="btn btn-outline-secondary rounded-circle" title="Әкімші тақтасы" style={{width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <i className="fa-solid fa-lock"></i>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
