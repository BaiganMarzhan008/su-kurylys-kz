import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <main className="animate-fade-in-up">
      {/* Hero Section */}
      <section className="hero-section text-white d-flex align-items-center position-relative">
        <div className="hero-overlay"></div>
        <div className="container text-center text-lg-start position-relative z-index-1 animate-fade-in-up">
          <span className="badge bg-primary text-white px-3 py-2 rounded-pill mb-4 text-uppercase tracking-wide shadow">Кәсіби қызмет көрсету</span>
          <h1 className="display-3 fw-bolder mb-4 hero-title">Су мен сенімділіктің берік іргетасы</h1>
          <p className="lead mb-5 w-75 mx-auto mx-lg-0 hero-subtitle">Өнеркәсіптік және азаматтық нысандарда инженерлік желілерді тарту. Біздің сапа — сіздің болашағыңыз.</p>
          <Link to="/contact" className="btn btn-primary btn-lg rounded-pill px-5 py-3 fw-bold btn-animate shadow-lg">
            Жобаны бастау <i className="fa-solid fa-arrow-right ms-2"></i>
          </Link>
        </div>
      </section>

      {/* Main Advantages Section */}
      <section className="py-5 bg-white">
        <div className="container py-5">
          <div className="row text-center mb-5">
            <h6 className="text-primary fw-bold text-uppercase tracking-wide">Неліктен бізді таңдайды?</h6>
            <h2 className="display-5 fw-bold text-dark">Біздің басты артықшылықтарымыз</h2>
          </div>
          <div className="row g-4">
            <div className="col-md-4 d-flex align-items-start">
              <div className="icon-box bg-light text-primary flex-shrink-0 me-4 rounded-circle d-flex align-items-center justify-content-center">
                <i className="fa-solid fa-helmet-safety fs-4"></i>
              </div>
              <div>
                <h4 className="fw-bold text-dark mb-2">Мол тәжірибе</h4>
                <p className="text-muted">2008 жылдан бастап түрлі күрделіліктегі жүздеген жобаларды сәтті жүзеге асырдық.</p>
              </div>
            </div>
            <div className="col-md-4 d-flex align-items-start">
              <div className="icon-box bg-light text-primary flex-shrink-0 me-4 rounded-circle d-flex align-items-center justify-content-center">
                <i className="fa-solid fa-medal fs-4"></i>
              </div>
              <div>
                <h4 className="fw-bold text-dark mb-2">Жоғары сапа</h4>
                <p className="text-muted">МЕМСТ стандарттары бойынша тек сертификатталған материалдарды қолданамыз.</p>
              </div>
            </div>
            <div className="col-md-4 d-flex align-items-start">
              <div className="icon-box bg-light text-primary flex-shrink-0 me-4 rounded-circle d-flex align-items-center justify-content-center">
                <i className="fa-solid fa-stopwatch fs-4"></i>
              </div>
              <div>
                <h4 className="fw-bold text-dark mb-2">Уақытылы тапсыру</h4>
                <p className="text-muted">Заманауи техника паркінің арқасында мерзімдерді қатаң сақтаймыз.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainPage;
