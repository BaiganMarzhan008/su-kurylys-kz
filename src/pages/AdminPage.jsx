import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AdminPage = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      if (supabase && import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_URL !== 'https://placeholder.supabase.co') {
        const { data, error } = await supabase
          .from('applications')
          .select('*')
          .order('id', { ascending: false });
          
        if (error) throw error;
        setApplications(data || []);
      } else {
        // Fallback to localStorage
        const data = JSON.parse(localStorage.getItem('applications')) || [];
        setApplications(data.reverse());
      }
    } catch (error) {
      console.error('Error fetching applications:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Бұл өтінімді шынымен жойғыңыз келе ме?')) return;
    
    try {
      if (supabase && import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_URL !== 'https://placeholder.supabase.co') {
        const { error } = await supabase
          .from('applications')
          .delete()
          .eq('id', id);
          
        if (error) throw error;
      } else {
        // Fallback to localStorage
        const updated = applications.filter(app => app.id !== id);
        localStorage.setItem('applications', JSON.stringify(updated));
      }
      
      setApplications(applications.filter(app => app.id !== id));
    } catch (error) {
      console.error('Error deleting application:', error.message);
      alert('Өшіру кезінде қате пайда болды.');
    }
  };

  return (
    <div className="container py-5 flex-grow-1 animate-fade-in-up">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0 text-dark">Әкімші тақтасы</h2>
        <span className="badge bg-primary fs-6 py-2 px-3 rounded-pill shadow-sm">
          Барлық өтінімдер: {applications.length}
        </span>
      </div>
      
      <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
        <div className="card-header bg-dark text-white p-4 d-flex justify-content-between align-items-center border-0">
          <h5 className="mb-0 fw-bold"><i className="fa-solid fa-inbox me-2"></i> Сайттан түскен өтінімдер</h5>
          <button className="btn btn-sm btn-outline-light" onClick={fetchApplications}>
            <i className="fa-solid fa-arrows-rotate"></i> Жаңарту
          </button>
        </div>
        <div className="card-body p-0">
          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Жүктелуде...</span>
              </div>
              <p className="mt-2 text-muted">Мәліметтер жүктелуде...</p>
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-5">
              <i className="fa-regular fa-folder-open display-1 text-muted opacity-50 mb-3"></i>
              <h4 className="text-muted">Өтінімдер жоқ</h4>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="py-3">Күні</th>
                    <th className="py-3">Аты-жөні</th>
                    <th className="py-3">Телефон</th>
                    <th className="py-3">Email</th>
                    <th className="py-3">Хабарлама</th>
                    <th className="py-3 text-end pe-4">Әрекеттер</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map(app => (
                    <tr key={app.id}>
                      <td className="px-4 text-muted small">{app.id}</td>
                      <td className="text-muted small">{app.date || new Date(app.created_at).toLocaleString('kk-KZ')}</td>
                      <td className="fw-medium">{app.name}</td>
                      <td>{app.phone}</td>
                      <td><a href={`mailto:${app.email}`} className="text-decoration-none">{app.email}</a></td>
                      <td>
                         <div style={{maxHeight: '80px', overflowY: 'auto', maxWidth: '250px'}}>
                           {app.message}
                         </div>
                      </td>
                      <td className="text-end pe-4">
                        <button 
                          className="btn btn-outline-danger btn-sm rounded-pill px-3"
                          onClick={() => handleDelete(app.id)}
                        >
                          <i className="fa-solid fa-trash-can me-1"></i> Жою
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
  );
};

export default AdminPage;
