import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container text-center text-md-start d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="mb-3 mb-md-0">
          <div className="d-inline-flex align-items-center text-white text-decoration-none">
              <i className="fa-solid fa-droplet text-primary me-2 fs-5"></i>
              <span className="fw-bold fs-5">СУ ҚҰРЫЛЫС <span className="text-primary">KZ</span></span>
          </div>
          <p className="text-muted small mt-2 mb-0">&copy; 2026 Барлық құқықтар қорғалған. БСН: 081240011564</p>
        </div>
        <div className="d-flex gap-3">
            <a href="#" className="btn btn-outline-secondary rounded-circle text-white"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" className="btn btn-outline-secondary rounded-circle text-white"><i className="fa-brands fa-facebook-f"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
