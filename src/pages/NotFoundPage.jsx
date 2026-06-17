import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #14171c 0%, #0d1b2a 50%, #0b58ca 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Montserrat', sans-serif",
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Animated background circles */}
      <div style={{
        position: 'absolute', width: '500px', height: '500px', borderRadius: '50%',
        border: '1px solid rgba(11,88,202,0.15)', top: '-100px', left: '-100px', animation: 'pulse404 4s ease-in-out infinite'
      }}/>
      <div style={{
        position: 'absolute', width: '350px', height: '350px', borderRadius: '50%',
        border: '1px solid rgba(11,88,202,0.1)', bottom: '-80px', right: '-80px', animation: 'pulse404 4s ease-in-out infinite 2s'
      }}/>

      <div style={{ textAlign: 'center', zIndex: 10, padding: '2rem' }}>

        {/* SVG Water Drop / Pipe Icon */}
        <div style={{ marginBottom: '2rem' }}>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="38" stroke="#0b58ca" strokeWidth="2" strokeDasharray="6 4" style={{ animation: 'spin404 20s linear infinite' }}/>
            <path d="M40 15 C30 30 20 40 20 52 C20 63 29 72 40 72 C51 72 60 63 60 52 C60 40 50 30 40 15Z" fill="rgba(11,88,202,0.3)" stroke="#0b58ca" strokeWidth="2"/>
            <line x1="40" y1="55" x2="40" y2="45" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="40" cy="42" r="2" fill="white"/>
          </svg>
        </div>

        {/* 404 Number */}
        <div style={{
          fontSize: 'clamp(80px, 15vw, 140px)',
          fontWeight: '900',
          lineHeight: 1,
          background: 'linear-gradient(135deg, #ffffff 40%, #0b58ca)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '1rem',
          letterSpacing: '-5px',
        }}>
          404
        </div>

        {/* Divider */}
        <div style={{ width: '60px', height: '3px', background: '#0b58ca', margin: '0 auto 1.5rem', borderRadius: '2px' }}/>

        {/* Title */}
        <h1 style={{
          color: '#ffffff',
          fontWeight: '700',
          fontSize: 'clamp(20px, 4vw, 28px)',
          marginBottom: '1rem',
        }}>
          Бет табылмады
        </h1>

        {/* Description */}
        <p style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: '16px',
          maxWidth: '420px',
          margin: '0 auto 2.5rem',
          lineHeight: 1.7,
        }}>
          Сіз іздеген бет жоқ немесе жойылған. Үй бетіне оралыңыз немесе байланыс бетіне өтіңіз.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#0b58ca',
              color: '#fff',
              padding: '14px 32px',
              borderRadius: '50px',
              fontWeight: '700',
              fontSize: '15px',
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(11,88,202,0.4)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 12px 32px rgba(11,88,202,0.6)'; }}
            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 8px 24px rgba(11,88,202,0.4)'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Басты Бетке
          </Link>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'transparent',
              color: '#fff',
              padding: '14px 32px',
              borderRadius: '50px',
              fontWeight: '700',
              fontSize: '15px',
              textDecoration: 'none',
              border: '2px solid rgba(255,255,255,0.3)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.92 13 19.79 19.79 0 0 1 1.87 4.37 2 2 0 0 1 3.85 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            Байланысу
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes pulse404 {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.6; }
        }
        @keyframes spin404 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
