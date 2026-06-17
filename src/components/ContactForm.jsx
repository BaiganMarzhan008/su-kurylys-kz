import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (fieldName, value) => {
    let errorMsg = '';
    if (fieldName === 'name' && !value.trim()) errorMsg = 'Аты-жөнін міндетті түрде енгізіңіз';
    if (fieldName === 'phone') {
      const phoneRegex = /^\+7\s?[78]\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
      if (!phoneRegex.test(value)) errorMsg = 'Дұрыс телефон нөмірін енгізіңіз (мыс. +7 700 000 0000)';
    }
    if (fieldName === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) errorMsg = 'Дұрыс email енгізіңіз';
      else if (!value) errorMsg = 'Email енгізіңіз';
    }
    if (fieldName === 'message' && value.trim().length < 5) errorMsg = 'Хабарлама тым қысқа (кемінде 5 таңба)';
    
    setErrors(prev => ({ ...prev, [fieldName]: errorMsg }));
    return !errorMsg;
  };

  const validateAll = () => {
    const isNameValid = validateField('name', formData.name);
    const isPhoneValid = validateField('phone', formData.phone);
    const isEmailValid = validateField('email', formData.email);
    const isMsgValid = validateField('message', formData.message);
    return isNameValid && isPhoneValid && isEmailValid && isMsgValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) validateField(name, value);
  };

  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value);
  };

  const handlePhoneChange = (e) => {
    let val = e.target.value;
    if (!val.startsWith('+7') && val.length > 0) {
      if (val.startsWith('8')) val = '+7' + val.substring(1);
      else if (val.startsWith('7')) val = '+' + val;
      else val = '+7 ' + val;
    }
    setFormData(prev => ({ ...prev, phone: val }));
    if (errors.phone) validateField('phone', val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateAll()) {
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
          const { error } = await supabase.from('applications').insert([newApp]);
          if (error) throw error;
        } else {
          const existing = JSON.parse(localStorage.getItem('applications')) || [];
          newApp.id = Date.now();
          localStorage.setItem('applications', JSON.stringify([...existing, newApp]));
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
    <div className="premium-card h-100 bg-white shadow-sm border-0">
      <div className="card-body p-4 p-md-5 d-flex flex-column justify-content-center">
        <h4 className="fw-bold mb-4 text-slate-dark">Өтінім қалдыру</h4>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label className="form-label fw-bold text-slate-dark small text-uppercase" style={{letterSpacing: '1px'}}>Аты-жөні</label>
            <input type="text" name="name" className={`form-control bg-industrial-light border-0 ${errors.name ? 'is-invalid' : ''}`} value={formData.name} onChange={handleChange} onBlur={handleBlur} disabled={isSubmitting} />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          <div className="mb-4">
            <label className="form-label fw-bold text-slate-dark small text-uppercase" style={{letterSpacing: '1px'}}>Телефон</label>
            <input type="text" name="phone" className={`form-control bg-industrial-light border-0 ${errors.phone ? 'is-invalid' : ''}`} placeholder="+7 700 000 0000" value={formData.phone} onChange={handlePhoneChange} onBlur={handleBlur} disabled={isSubmitting} />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>
          <div className="mb-4">
            <label className="form-label fw-bold text-slate-dark small text-uppercase" style={{letterSpacing: '1px'}}>Email</label>
            <input type="email" name="email" className={`form-control bg-industrial-light border-0 ${errors.email ? 'is-invalid' : ''}`} value={formData.email} onChange={handleChange} onBlur={handleBlur} disabled={isSubmitting} />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-5">
            <label className="form-label fw-bold text-slate-dark small text-uppercase" style={{letterSpacing: '1px'}}>Хабарлама</label>
            <textarea name="message" className={`form-control bg-industrial-light border-0 ${errors.message ? 'is-invalid' : ''}`} rows="4" value={formData.message} onChange={handleChange} onBlur={handleBlur} disabled={isSubmitting}></textarea>
            {errors.message && <div className="invalid-feedback">{errors.message}</div>}
          </div>
          <button type="submit" className="btn btn-primary w-100 rounded py-3 fw-bold shadow-sm btn-animate text-uppercase" style={{letterSpacing: '1px'}} disabled={isSubmitting}>
            {isSubmitting ? (
              <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Күте тұрыңыз...</>
            ) : (
              <>Өтінімді жіберу</>
            )}
          </button>
        </form>
      </div>
      {/* Toast Notification */}
      <div className="toast-container position-fixed bottom-0 end-0 p-4" style={{ zIndex: 1100 }}>
        <div className={`toast ${showToast ? 'show' : ''} bg-slate-dark text-white border-0 shadow-lg`} role="alert">
          <div className="toast-body d-flex align-items-center fw-medium fs-6 p-3">
            <div className="bg-success rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '32px', height: '32px'}}>
               <i className="fa-solid fa-check text-white"></i>
            </div>
            Сіздің өтініміңіз сәтті қабылданды!
            <button type="button" className="btn-close btn-close-white ms-auto" onClick={() => setShowToast(false)}></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
