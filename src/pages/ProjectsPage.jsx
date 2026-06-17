import React, { useState } from 'react';
import { projectsData } from '../data/projectsData';

const ProjectsPage = () => {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  return (
    <main className="py-5 bg-white flex-grow-1 animate-fade-in-up">
      <div className="container py-4">
        <h6 className="text-primary fw-bold text-uppercase mb-2 text-center tracking-wide">Жобалар</h6>
        <h2 className="display-5 fw-bold text-center mb-5">Аяқталған нысандар</h2>
        
        <div className="d-flex justify-content-center gap-2 mb-5">
          <button className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-secondary'} rounded-pill px-4`} onClick={() => setFilter('all')}>Барлығы</button>
          <button className={`btn ${filter === 'water' ? 'btn-primary' : 'btn-outline-secondary'} rounded-pill px-4`} onClick={() => setFilter('water')}>Су құбыры</button>
          <button className={`btn ${filter === 'sewer' ? 'btn-primary' : 'btn-outline-secondary'} rounded-pill px-4`} onClick={() => setFilter('sewer')}>Кәріз</button>
        </div>

        <div className="row g-4 project-grid">
          {filteredProjects.map(proj => (
            <div className="col-md-6 col-lg-4 project-item" key={proj.id}>
              <div className="card project-card border-0 shadow-sm rounded-4 h-100 overflow-hidden" onClick={() => setSelectedProject(proj)}>
                <div className="project-img-wrapper">
                   <img src={proj.img} className="card-img-top" alt={proj.title} />
                   <div className="project-overlay d-flex align-items-center justify-content-center">
                      <i className="fa-solid fa-magnifying-glass-plus text-white display-4"></i>
                   </div>
                </div>
                <div className="card-body p-4 bg-light">
                  <h5 className="fw-bold">{proj.title}</h5>
                  <p className="text-primary fw-medium small mb-2"><i className="fa-solid fa-location-dot me-1"></i>{proj.location}</p>
                  <p className="text-muted small mb-0">{proj.description.substring(0, 80)}...</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal / Lightbox */}
      {selectedProject && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1055}} tabIndex="-1" onClick={() => setSelectedProject(null)}>
          <div className="modal-dialog modal-dialog-centered modal-xl" onClick={e => e.stopPropagation()}>
            <div className="modal-content bg-transparent border-0">
              <div className="modal-header border-0 pb-0 justify-content-end">
                <button type="button" className="btn-close btn-close-white" onClick={() => setSelectedProject(null)}></button>
              </div>
              <div className="modal-body text-center pt-2">
                <img src={selectedProject.img} className="img-fluid rounded-4 shadow-lg mb-4" alt={selectedProject.title} style={{maxHeight: '70vh', objectFit: 'contain'}} />
                <div className="bg-white p-4 rounded-4 text-start shadow">
                   <h3 className="fw-bold">{selectedProject.title}</h3>
                   <p className="text-primary mb-3"><i className="fa-solid fa-location-dot me-2"></i>{selectedProject.location}</p>
                   <p className="text-dark fs-5">{selectedProject.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProjectsPage;
