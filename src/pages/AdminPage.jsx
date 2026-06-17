import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'sukurylys2024';

export default function AdminPage() {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // ── Auth ──────────────────────────────────
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('admin_auth') === 'true'
  );
  const [loginInput, setLoginInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  // ── useEffect міндетті түрде conditional return-дан БҰРЫН тұруы тиіс ──
  useEffect(() => {
    if (isAuthenticated) {
      fetchApplications();
    }
  }, [isAuthenticated]); // isAuthenticated өзгергенде авто жүктейді

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    setTimeout(() => {
      if (loginInput === ADMIN_PASSWORD) {
        sessionStorage.setItem('admin_auth', 'true');
        setIsAuthenticated(true);
      } else {
        setLoginError('Қате пароль. Қайталап көріңіз.');
        setLoginInput('');
      }
      setLoginLoading(false);
    }, 600);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
    setLoginInput('');
  };

  // ── Login Screen ─────────────────────────
  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #14171c 0%, #0d1b2a 60%, #0b58ca 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Montserrat', sans-serif", padding: '1rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '24px', padding: '3rem 2.5rem', width: '100%', maxWidth: '420px', boxShadow: '0 32px 64px rgba(0,0,0,0.5)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ width: '72px', height: '72px', background: 'linear-gradient(135deg, #0b58ca, #1a7fe8)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', boxShadow: '0 12px 32px rgba(11,88,202,0.4)' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h2 style={{ color: '#fff', fontWeight: '800', fontSize: '22px', marginBottom: '0.4rem' }}>Админ Панель</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: 0 }}>ТОО «СУ ҚҰРЫЛЫС KZ» — Жеке кіру</p>
          </div>
          <form onSubmit={handleLogin}>
            {loginError && (
              <div style={{ background: 'rgba(220,53,69,0.15)', border: '1px solid rgba(220,53,69,0.4)', borderRadius: '12px', padding: '12px 16px', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <span style={{ color: '#ff6b6b', fontSize: '14px', fontWeight: '500' }}>{loginError}</span>
              </div>
            )}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '10px' }}>Пароль</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginInput}
                  onChange={e => { setLoginInput(e.target.value); setLoginError(''); }}
                  placeholder="Паролді енгізіңіз..."
                  autoFocus
                  style={{ width: '100%', padding: '14px 50px 14px 18px', background: 'rgba(255,255,255,0.08)', border: loginError ? '1.5px solid rgba(220,53,69,0.6)' : '1.5px solid rgba(255,255,255,0.15)', borderRadius: '14px', color: '#fff', fontSize: '16px', outline: 'none', boxSizing: 'border-box', fontFamily: 'monospace' }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', padding: '4px' }}>
                  {showPassword
                    ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>
            <button type="submit" disabled={loginLoading || !loginInput} style={{ width: '100%', padding: '15px', background: loginLoading || !loginInput ? 'rgba(11,88,202,0.4)' : 'linear-gradient(135deg, #0b58ca, #1a7fe8)', border: 'none', borderRadius: '14px', color: '#fff', fontSize: '16px', fontWeight: '700', cursor: loginLoading || !loginInput ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: loginLoading || !loginInput ? 'none' : '0 8px 24px rgba(11,88,202,0.4)' }}>
              {loginLoading ? (
                <><div style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'admSpin 0.8s linear infinite' }}/>Тексерілуде...</>
              ) : (
                <><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>Кіру</>
              )}
            </button>
          </form>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px', textAlign: 'center', marginTop: '1.5rem', marginBottom: 0 }}>Тек уәкілетті қызметкерлерге арналған</p>
        </div>
        <style>{`@keyframes admSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }



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
            <div className="d-flex gap-2 slide-in-right">
              <button onClick={fetchApplications} className="btn btn-outline-light shadow-sm rounded-3 py-2 px-4 fw-bold" disabled={isLoading}>
                <i className={`fa-solid fa-rotate-right ${isLoading ? 'fa-spin' : ''} me-2`}></i>
                Жаңарту
              </button>
              <button onClick={handleLogout} className="btn btn-danger rounded-3 py-2 px-4 fw-bold" title="Шығу">
                <i className="fa-solid fa-right-from-bracket me-2"></i>
                Шығу
              </button>
            </div>
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
