import React, { useState } from 'react';

export default function ProjectsPage() {
  const [filter, setFilter] = useState('Барлығы');
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      category: 'Су құбыры',
      title: 'Қабанбай батыр даңғылындағы магистральды су құбыры',
      desc: 'Ұзындығы 4.2 шақырым болатын Д-500мм жоғары қысымды құбырларды траншеялық әдіспен сәтті тарту жұмыстары. Мерзімі: 6 ай.',
      img: 'https://primeminister.kz/assets/media/img-2964.jpeg',
      location: 'Есіл ауданы, Астана',
      scale: 'Ауқымды нысан',
      bullets: [
        'Диаметрі 500мм жоғары қысымды полиэтилен құбырлар (ХДПЕ).',
        'Көше қозғалысын бұзбай, түнгі ауысыммен траншея қазу.',
        '100% гидравликалық қысым сынағынан сәтті өту.'
      ]
    },
    {
      id: 2,
      category: 'Кәріз жүйесі',
      title: 'Нұрлы Жол вокзалы маңындағы кәріз коллекторы',
      desc: 'Тереңдігі 6 метрлік күрделі темірбетонды кәріз коллекторын және автоматтандырылған сорғы станциясын (КНС) толықтай іске қосу.',
      img: 'https://kaz.zakon.kz/pbi/WEBP/2024-08-26/file-f9cc227d-1cc6-43c8-afd5-18bdbd523a6e/800x450.webp',
      location: 'Алматы ауданы, Астана',
      scale: 'Күрделі инженерлік нысан',
      bullets: [
        'Жер асты суларының деңгейі жоғары аймақта 6 метрге дейін қазу.',
        'Италиялық жабдықтары бар автоматтандырылған КНС монтажы.',
        'Айналадағы топырақты бекіту бойынша шпунтты жұмыстар.'
      ]
    },
    {
      id: 3,
      category: 'Су құбыры',
      title: 'Астана ТЭЦ-3 резервтік сумен жабдықтау жүйесі',
      desc: 'Стратегиялық маңызы бар энергетикалық нысанды үздіксіз техникалық сумен қамтамасыз ету үшін екі жақты желі тарту.',
      img: 'https://inbusiness.kz/uploads/2023-6/dAQm7PSU.webp',
      location: 'Байқоңыр ауданы, Астана',
      scale: 'Стратегиялық нысан',
      bullets: [
        'Диаметрі 800мм болатын екі тәуелсіз желіні тарту.',
        'Энергетикалық стандарттарға (МЕМСТ) толықтай сай келу.',
        'Су берудің үздіксіздігін қамтамасыз ететін ысырма камераларын салу.'
      ]
    }
  ];

  const filters = ['Барлығы', 'Су құбыры', 'Кәріз жүйесі'];
  const filteredProjects = filter === 'Барлығы' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="w-100 bg-light" style={{ fontFamily: "'Montserrat', sans-serif", minHeight: '100vh' }}>
      
      {/* Title Section */}
      <section className="bg-dark text-white pt-5 pb-4 border-bottom border-secondary border-opacity-25" style={{ backgroundImage: 'linear-gradient(to right, #14171c, #1a1f26)' }}>
        <div className="container py-4 text-center fade-in-up">
          <span 
            className="d-inline-block text-uppercase fw-bold px-4 py-2 mb-3 rounded-2 shadow-sm"
            style={{ backgroundColor: '#0b58ca', fontSize: '13px', letterSpacing: '3px' }}
          >
            БІЗДІҢ НЫСАНДАР
          </span>
          <h1 className="display-4 fw-bolder mb-0" style={{ letterSpacing: '-1px' }}>Аяқталған Жобалар</h1>
        </div>
      </section>

      <section className="py-5">
        <div className="container py-4" style={{ maxWidth: '1300px' }}>
          
          {/* Filter Controls */}
          <div className="d-flex flex-wrap justify-content-center gap-3 mb-5 slide-in-bottom">
            {filters.map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`btn px-4 py-2 fw-bold rounded-pill transition-all ${filter === f ? 'btn-primary shadow' : 'btn-outline-secondary bg-white text-dark'}`}
                style={{ fontSize: '15px' }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Masonry-Style Grid */}
          <div className="row g-4 g-lg-5">
            {filteredProjects.map((project, index) => (
              <div className="col-lg-4 col-md-6 project-card-anim" key={project.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <div 
                  className="rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl h-100 premium-project-card cursor-pointer bg-white"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="position-relative">
                    <img src={project.img} alt={project.title} className="w-100" style={{ objectFit: 'cover', height: '240px' }} />
                    <div className="position-absolute top-0 end-0 p-3">
                      <span className="badge bg-primary px-3 py-2 shadow-sm">{project.category}</span>
                    </div>
                  </div>
                  
                  <div className="card-body p-4 bg-white d-flex flex-column">
                    <h5 className="fw-bolder text-dark mb-3 lh-sm" style={{ letterSpacing: '-0.3px' }}>{project.title}</h5>
                    <p className="text-muted small lh-lg mb-0 line-clamp-3">{project.desc}</p>
                  </div>
                  
                  {/* Semi-transparent Dark Footer */}
                  <div className="card-footer bg-dark text-white p-4 border-0 d-flex justify-content-between align-items-center">
                    <div className="small d-flex align-items-center opacity-90">
                      <i className="fa-solid fa-location-dot text-primary me-2"></i>
                      {project.location}
                    </div>
                    <div className="badge bg-secondary bg-opacity-25 text-light fw-normal px-2 py-1">
                      {project.scale}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Interactive Full-Screen React Modal */}
      {selectedProject && (
        <div 
          className="modal fade show d-flex align-items-center justify-content-center p-3 p-md-4" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(20,23,28,0.9)', zIndex: 1050 }} 
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="modal-dialog modal-xl w-100 m-0 modal-anim" 
            style={{ maxWidth: '1100px' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-content border-0 rounded-4 overflow-hidden shadow-lg" style={{ backgroundColor: '#1a1f26', color: '#fff' }}>
              <div className="row g-0">
                {/* Modal Image */}
                <div className="col-lg-6 position-relative">
                  <img src={selectedProject.img} alt={selectedProject.title} className="w-100 h-100" style={{ objectFit: 'cover', minHeight: '400px' }} />
                  <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(to right, transparent, rgba(26,31,38,1) 95%)' }}></div>
                </div>
                
                {/* Modal Content */}
                <div className="col-lg-6 d-flex flex-column p-4 p-md-5 position-relative">
                  <button 
                    type="button" 
                    className="btn-close btn-close-white position-absolute top-0 end-0 m-4" 
                    onClick={() => setSelectedProject(null)}
                  ></button>
                  
                  <div className="mb-4 pt-2">
                    <span className="badge bg-primary px-3 py-2 text-uppercase mb-3" style={{ letterSpacing: '1px' }}>{selectedProject.category}</span>
                    <h2 className="fw-bolder mb-3 lh-sm">{selectedProject.title}</h2>
                    <p className="text-light opacity-75 lh-lg fs-6">{selectedProject.desc}</p>
                  </div>
                  
                  <div className="mb-5 border-start border-4 border-primary ps-4">
                    <h6 className="text-uppercase tracking-wider fw-bold mb-3 text-white">Техникалық Бақылау (Blueprint):</h6>
                    <ul className="list-unstyled mb-0">
                      {selectedProject.bullets.map((b, i) => (
                        <li key={i} className="d-flex align-items-start mb-3">
                          <div className="bg-primary bg-opacity-25 text-primary rounded-circle d-flex align-items-center justify-content-center me-3 mt-1" style={{ width: '24px', height: '24px', flexShrink: 0 }}>
                            <i className="fa-solid fa-check small"></i>
                          </div>
                          <span className="opacity-90 lh-base">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-4 border-top border-secondary border-opacity-25 d-flex flex-wrap gap-3 align-items-center justify-content-between">
                    <div>
                      <div className="small text-muted text-uppercase mb-1 tracking-wider">Орналасқан жері:</div>
                      <div className="fw-bold fs-6"><i className="fa-solid fa-location-dot text-primary me-2"></i>{selectedProject.location}</div>
                    </div>
                    {/* Explicit Engineering Sign-Off Checkmark */}
                    <div className="bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-4 py-2 rounded-3 fw-bold d-flex align-items-center shadow-sm">
                      <i className="fa-solid fa-stamp fs-4 me-2"></i> МЕМСТ (ГОСТ) Расталған
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NATIVE CSS ANIMATIONS */}
      <style>{`
        /* Fade Ins */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up {
          animation: fadeInUp 0.7s ease-out forwards;
        }

        @keyframes slideInBottom {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .slide-in-bottom {
          animation: slideInBottom 0.6s ease-out forwards;
        }

        .project-card-anim {
          opacity: 0;
          animation: slideInBottom 0.6s ease-out forwards;
        }

        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .modal-anim {
          animation: modalPop 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Hover Classes */
        .transition-all {
          transition: all 0.3s ease;
        }
        .cursor-pointer {
          cursor: pointer;
        }
        .premium-project-card {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .premium-project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.1) !important;
        }
        
        .project-img {
          transition: transform 0.6s ease;
        }
        .premium-project-card:hover .project-img {
          transform: scale(1.05);
        }

        .tracking-wider {
          letter-spacing: 1px;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
