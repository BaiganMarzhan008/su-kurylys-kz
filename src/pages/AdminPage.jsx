import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function AdminPage() {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      if (supabase && import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_URL !== 'https://placeholder.supabase.co') {
        const { data, error } = await supabase
          .from('applications')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          // If created_at column is missing, fallback to ordering by id
          if (error.code === 'PGRST100') {
             const { data: fallbackData, error: fallbackError } = await supabase
               .from('applications')
               .select('*')
               .order('id', { ascending: false });
             if (fallbackError) throw fallbackError;
             setApplications(fallbackData || []);
             return;
          }
          throw error;
        }
        setApplications(data || []);
      } else {
        // Fallback for local development
        const localData = JSON.parse(localStorage.getItem('applications')) || [];
        localData.sort((a, b) => b.id - a.id);
        setApplications(localData);
      }
    } catch (error) {
      console.error('Error fetching applications:', error.message);
      setErrorMsg('Деректерді жүктеу кезінде қате пайда болды.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Бұл өтінімді өшіруге сенімдісіз бе? Бұл әрекетті қайтару мүмкін емес.')) return;
    
    // Trigger CSS fade-out animation instantly
    setDeletingId(id);
    
    try {
      if (supabase && import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_URL !== 'https://placeholder.supabase.co') {
        const { error } = await supabase.from('applications').delete().eq('id', id);
        if (error) throw error;
      } else {
        const localData = JSON.parse(localStorage.getItem('applications')) || [];
        const filtered = localData.filter(app => app.id !== id);
        localStorage.setItem('applications', JSON.stringify(filtered));
      }
      
      // Delay state removal exactly by animation duration (400ms) to ensure smooth disappearance
      setTimeout(() => {
        setApplications(prev => prev.filter(app => app.id !== id));
        setDeletingId(null);
      }, 400);
      
    } catch (error) {
      console.error('Error deleting application:', error.message);
      alert('Өтінімді өшіру мүмкін болмады. Байланысты тексеріңіз.');
      setDeletingId(null); // Restore row visibility on failure
    }
  };

  const formatDate = (dateString, createdAt) => {
    const targetDate = createdAt || dateString;
    if (!targetDate) return '-';
    
    try {
      const d = new Date(targetDate);
      return d.toLocaleDateString('kk-KZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return targetDate;
    }
  };

  // Filter & Search Logic (WOW Feature)
  const filteredApps = applications.filter(app => {
    const lowerSearch = searchTerm.toLowerCase();
    const nameMatch = (app.name || '').toLowerCase().includes(lowerSearch);
    const phoneMatch = (app.phone || '').toLowerCase().includes(lowerSearch);
    return nameMatch || phoneMatch;
  });

  return (
    <div className="w-100" style={{ backgroundColor: '#f4f6f9', fontFamily: "'Montserrat', sans-serif", minHeight: '100vh' }}>
      
      {/* Top Banner */}
      <div className="bg-dark text-white pt-5 pb-4" style={{ backgroundImage: 'linear-gradient(to right, #14171c, #1a1f26)' }}>
        <div className="container py-3">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div className="slide-in-left">
              <span className="badge bg-primary px-3 py-2 text-uppercase mb-2" style={{ letterSpacing: '2px' }}>ҚАУІПСІЗДІК АЙМАҒЫ</span>
              <h1 className="display-6 fw-bolder mb-1">Басқару Тақтасы</h1>
              <p className="text-white opacity-50 mb-0">Келіп түскен өтінімдерді мониторингтеу және басқару жүйесі</p>
            </div>
            <button onClick={fetchApplications} className="btn btn-outline-light shadow-sm rounded-3 py-2 px-4 fw-bold slide-in-right" disabled={isLoading}>
              <i className={`fa-solid fa-rotate-right ${isLoading ? 'fa-spin' : ''} me-2`}></i> 
              Деректерді Жаңарту
            </button>
          </div>
        </div>
      </div>

      <div className="container py-5" style={{ maxWidth: '1400px' }}>
        
        {/* Search Bar / Filter Panel (WOW Feature) */}
        <div className="card border-0 shadow-sm rounded-4 mb-4 slide-in-up">
          <div className="card-body p-4 d-flex flex-column flex-md-row align-items-center gap-3 bg-white">
            <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px', flexShrink: 0 }}>
              <i className="fa-solid fa-magnifying-glass fs-5"></i>
            </div>
            <div className="flex-grow-1 w-100">
              <input 
                type="text" 
                className="form-control form-control-lg border-0 bg-light px-4 fs-6" 
                placeholder="Клиенттің аты немесе байланыс телефоны бойынша іздеу..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="text-muted small fw-bold text-uppercase ps-md-3 border-start-md border-secondary border-opacity-25" style={{ whiteSpace: 'nowrap' }}>
              <span className="text-primary fs-5">{filteredApps.length}</span> Өтінім табылды
            </div>
          </div>
        </div>

        {/* Dashboard Content / Datatable */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden slide-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="card-body p-0">
            {isLoading ? (
              <div className="text-center py-5 my-5">
                <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status"></div>
                <h5 className="text-muted fw-bold mt-4">Дерекқордан жүктелуде...</h5>
                <p className="text-muted small opacity-75">Қауіпсіз байланыс орнатылуда, күте тұрыңыз</p>
              </div>
            ) : errorMsg ? (
              <div className="alert alert-danger m-4 d-flex align-items-center border-0 rounded-3 p-4" role="alert">
                <i className="fa-solid fa-triangle-exclamation me-3 fs-3"></i>
                <div className="fw-bold fs-5">{errorMsg}</div>
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-5 my-4">
                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '80px', height: '80px', color: '#6c757d' }}>
                  <i className="fa-solid fa-inbox fa-2x"></i>
                </div>
                <h5 className="text-muted fw-bold mb-1">Қазіргі уақытта ешқандай өтінім келіп түскен жоқ.</h5>
                <p className="text-muted small">Жаңа өтінімдер осы жерде автоматты түрде пайда болады.</p>
              </div>
            ) : filteredApps.length === 0 ? (
              <div className="text-center py-5 my-4">
                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '80px', height: '80px', color: '#dc3545' }}>
                  <i className="fa-solid fa-magnifying-glass-minus fa-2x"></i>
                </div>
                <h5 className="text-muted fw-bold mb-1">Іздеу нәтижесі бос</h5>
                <p className="text-muted small">"{searchTerm}" бойынша ешнәрсе табылмады.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-hover align-middle mb-0">
                  <thead className="bg-dark text-white">
                    <tr>
                      <th scope="col" className="py-4 px-4 fw-bold text-uppercase tracking-wider" style={{ fontSize: '13px', width: '8%' }}>ID</th>
                      <th scope="col" className="py-4 px-4 fw-bold text-uppercase tracking-wider" style={{ fontSize: '13px', width: '15%' }}>Күні</th>
                      <th scope="col" className="py-4 px-4 fw-bold text-uppercase tracking-wider" style={{ fontSize: '13px', width: '20%' }}>Клиенттің аты</th>
                      <th scope="col" className="py-4 px-4 fw-bold text-uppercase tracking-wider" style={{ fontSize: '13px', width: '15%' }}>Байланыс телефоны</th>
                      <th scope="col" className="py-4 px-4 fw-bold text-uppercase tracking-wider" style={{ fontSize: '13px', width: '30%' }}>Хабарлама мазмұны</th>
                      <th scope="col" className="py-4 px-4 fw-bold text-uppercase tracking-wider text-center" style={{ fontSize: '13px', width: '12%' }}>Әрекет</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {filteredApps.map((app) => (
                      <tr 
                        key={app.id} 
                        className={`transition-fade ${deletingId === app.id ? 'row-fade-out' : ''}`}
                      >
                        <td className="py-4 px-4 text-muted fw-bold" style={{ fontSize: '13px' }}>#{app.id}</td>
                        <td className="py-4 px-4 fw-medium text-dark" style={{ fontSize: '14px' }}>
                          <span className="badge bg-light text-dark border border-secondary border-opacity-25 px-2 py-1 shadow-sm">
                            {formatDate(app.date, app.created_at)}
                          </span>
                        </td>
                        <td className="py-4 px-4 fw-bolder text-dark fs-6">{app.name}</td>
                        <td className="py-4 px-4 fw-bold text-primary" style={{ letterSpacing: '1px' }}>{app.phone}</td>
                        <td className="py-4 px-4">
                          <div className="text-muted lh-base" style={{ fontSize: '14px', maxWidth: '350px' }}>
                            {app.message}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button 
                            onClick={() => handleDelete(app.id)} 
                            className="btn btn-sm px-3 py-2 fw-bold rounded-2 shadow-sm d-inline-flex align-items-center btn-danger-premium"
                            title="Өшіру"
                            disabled={deletingId === app.id}
                          >
                            <i className="fa-regular fa-trash-can me-2"></i> Өшіру
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* STYLES & ANIMATIONS */}
      <style>{`
        /* Load Animations */
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .slide-in-up {
          animation: slideInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .slide-in-left {
          animation: slideInLeft 0.6s ease-out forwards;
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .slide-in-right {
          animation: slideInRight 0.6s ease-out forwards;
        }

        /* Fade Out Delete Animation */
        .transition-fade {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 1;
          transform: translateX(0);
        }
        .row-fade-out {
          opacity: 0 !important;
          transform: translateX(40px) !important;
          background-color: #ffeaea !important;
        }

        /* Dark Table Overrides */
        .table-striped > tbody > tr:nth-of-type(odd) > * {
          background-color: rgba(0, 0, 0, 0.015);
        }
        .table-hover > tbody > tr:hover > * {
          background-color: rgba(11, 88, 202, 0.03);
        }
        .table > :not(caption) > * > * {
          border-bottom-color: rgba(0, 0, 0, 0.05);
        }
        thead.bg-dark th {
          background-color: #14171c;
          border-bottom: 2px solid #0b58ca !important;
        }

        /* Buttons */
        .btn-danger-premium {
          background-color: #ef4444;
          border-color: #ef4444;
          color: white;
          transition: all 0.3s ease;
        }
        .btn-danger-premium:hover {
          background-color: #dc2626;
          border-color: #dc2626;
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(239, 68, 68, 0.3) !important;
        }

        /* Utilities */
        .tracking-wider {
          letter-spacing: 1px;
        }
        .form-control:focus {
          box-shadow: none !important;
          border-color: #0b58ca;
        }
        @media (min-width: 768px) {
          .border-start-md {
            border-left: 1px solid rgba(0,0,0,0.1);
          }
        }
      `}</style>
    </div>
  );
}
