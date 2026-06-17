import React from 'react';
import ContactForm from '../components/ContactForm';

const ContactPage = () => {
  return (
    <main className="py-5 bg-light flex-grow-1 animate-fade-in-up">
      <div className="container py-4">
        <h6 className="text-primary fw-bold text-uppercase mb-2 text-center tracking-wide">Байланыс</h6>
        <h2 className="display-5 fw-bold text-center mb-5">Бізбен хабарласыңыз</h2>
        <div className="row g-5">
          <div className="col-lg-5">
            <div className="bg-white p-5 rounded-4 shadow-sm h-100">
              <h4 className="fw-bold mb-4">Байланыс ақпараты</h4>
              <div className="d-flex align-items-center mb-4">
                <div className="icon-box bg-light text-primary flex-shrink-0 me-3 rounded-circle d-flex align-items-center justify-content-center" style={{width: '50px', height: '50px'}}>
                  <i className="fa-solid fa-location-dot fs-5"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Мекенжай</h6>
                  <p className="text-muted mb-0">Астана қ., Алматы ауданы, Тәуелсіздік даңғылы, 10</p>
                </div>
              </div>
              <div className="d-flex align-items-center mb-4">
                <div className="icon-box bg-light text-primary flex-shrink-0 me-3 rounded-circle d-flex align-items-center justify-content-center" style={{width: '50px', height: '50px'}}>
                  <i className="fa-solid fa-phone fs-5"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Телефон</h6>
                  <p className="text-muted mb-0">+7 (7172) 123-456</p>
                </div>
              </div>
              <div className="d-flex align-items-center mb-5">
                <div className="icon-box bg-light text-primary flex-shrink-0 me-3 rounded-circle d-flex align-items-center justify-content-center" style={{width: '50px', height: '50px'}}>
                  <i className="fa-solid fa-envelope fs-5"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Email</h6>
                  <p className="text-muted mb-0">info@su-qurylys.kz</p>
                </div>
              </div>
              
              <h4 className="fw-bold mb-3">Карта</h4>
              <div className="rounded-4 overflow-hidden border shadow-sm">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39994.52627993043!2d71.4729113645362!3d51.13524855018698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x42458129cc6bfa15%3A0xe5a36371f496d07d!2z0JDQu9C80LDRgtGLINCw0YPQtNCw0L3Riywg0JDRgdGC0LDQvdCw!5e0!3m2!1sru!2skz!4v1718300000000!5m2!1sru!2skz" 
                  width="100%" 
                  height="350" 
                  style={{border:0}} 
                  allowFullScreen="" 
                  loading="lazy">
                </iframe>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
