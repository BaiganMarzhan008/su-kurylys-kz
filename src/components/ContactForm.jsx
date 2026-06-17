import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Аты-жөнін міндетті түрде енгізіңіз';
    
    const phoneRegex = /^\+7\s?[78]\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Дұрыс телефон нөмірін енгізіңіз (мыс. +7 700 000 0000)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Дұрыс email енгізіңіз';
    }

    if (formData.message.trim().length < 5) {
      newErrors.message = 'Хабарлама тым қысқа';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhoneChange = (e) => {
    let val = e.target.value;
    if (!val.startsWith('+7') && val.length > 0) {
      if (val.startsWith('8')) val = '+7' + val.substring(1);
      else if (val.startsWith('7')) val = '+' + val;
      else val = '+7 ' + val;
    }
    setFormData({ ...formData, phone: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      
      const newApp = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        date: new Date().toLocaleString('kk-KZ')
      };

      try {
        if (supabase && import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_URL !== 'https://placeholder.supabase.co') {
          const { error } = await supabase
            .from('applications')
            .insert([newApp]);
            
          if (error) throw error;
        } else {
          // Fallback to localStorage if Supabase is not configured yet
          const existing = JSON.parse(localStorage.getItem('applications')) || [];
          newApp.id = Date.now();
          localStorage.setItem('applications', JSON.stringify([...existing, newApp]));
          console.log("Saved to localStorage (Supabase not configured)");
        }
        
        setShowToast(true);
        setFormData({ name: '', phone: '+7 ', email: '', message: '' });
        setErrors({});
        
        setTimeout(() => setShowToast(false), 4000);
      } catch (error) {
        console.error('Error submitting application:', error.message);
        alert('Қате пайда болды. Қайта көріңіз.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="card shadow-lg border-0 rounded-4 h-100">
      <div className="card-body p-4 p-md-5 d-flex flex-column justify-content-center">
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label fw-medium">Аты-жөні</label>
            <input 
              type="text" 
              className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              disabled={isSubmitting}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          
          <div className="mb-3">
            <label className="form-label fw-medium">Телефон</label>
            <input 
              type="text" 
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`} 
              placeholder="+7 700 000 0000"
              value={formData.phone}
              onChange={handlePhoneChange}
              disabled={isSubmitting}
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>
          
          <div className="mb-3">
            <label className="form-label fw-medium">Email</label>
            <input 
              type="email" 
              className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              disabled={isSubmitting}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          
          <div className="mb-4">
            <label className="form-label fw-medium">Хабарлама</label>
            <textarea 
              className={`form-control ${errors.message ? 'is-invalid' : ''}`} 
              rows="4"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              disabled={isSubmitting}
            ></textarea>
            {errors.message && <div className="invalid-feedback">{errors.message}</div>}
          </div>
          
          <button type="submit" className="btn btn-primary w-100 rounded-pill py-3 fw-bold shadow-sm btn-animate" disabled={isSubmitting}>
            {isSubmitting ? (
              <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Күте тұрыңыз...</>
            ) : (
              <>Өтінім жіберу <i className="fa-solid fa-paper-plane ms-2"></i></>
            )}
          </button>
        </form>
      </div>

      {/* Toast Notification */}
      <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1100 }}>
        <div className={`toast ${showToast ? 'show' : ''} bg-success text-white border-0`} role="alert">
          <div className="toast-body d-flex align-items-center fw-medium fs-6 p-3">
            <i className="fa-solid fa-circle-check fs-4 me-3"></i>
            Сіздің өтініміңіз сәтті қабылданды!
            <button type="button" className="btn-close btn-close-white ms-auto" onClick={() => setShowToast(false)}></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
