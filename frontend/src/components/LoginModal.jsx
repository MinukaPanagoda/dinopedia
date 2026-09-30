import React, { useState, useEffect } from 'react';
import { X, User, Lock, Mail, LogIn, Sparkles, CheckCircle2, Shield } from 'lucide-react';
import DinoSkull from './DinoSkull';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters long.');
      return;
    }

    const displayName = isRegister ? (name.trim() || 'Paleo Explorer') : (name.trim() || email.split('@')[0] || 'Dr. Alan Grant');
    const userData = {
      name: displayName,
      email: email.trim(),
      role: isRegister ? 'Field Research Fellow' : 'Lead Paleontologist',
      badge: '🦖 Verified Explorer',
      loginTime: new Date().toISOString()
    };

    try {
      localStorage.setItem('dinopedia_user', JSON.stringify(userData));
    } catch {}

    setSuccess(isRegister ? 'Account created! Welcome to DinoPedia!' : 'Successfully signed in! Welcome back!');
    setTimeout(() => {
      onLoginSuccess(userData);
      onClose();
    }, 800);
  };

  const handleQuickDemoLogin = () => {
    const demoUser = {
      name: 'Dr. Alan Grant',
      email: 'alan.grant@dinopedia.org',
      role: 'Chief Paleontologist',
      badge: '🦖 Senior Researcher',
      loginTime: new Date().toISOString()
    };
    try {
      localStorage.setItem('dinopedia_user', JSON.stringify(demoUser));
    } catch {}
    setSuccess('Quick demo explorer access granted!');
    setTimeout(() => {
      onLoginSuccess(demoUser);
      onClose();
    }, 600);
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 9999 }}>
      <div 
        className="modal-card" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '440px', padding: '2.25rem' }}
      >
        <button 
          className="modal-close-btn" 
          onClick={onClose} 
          aria-label="Close login modal"
        >
          <X size={20} />
        </button>

        {/* Modal Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(217, 119, 6, 0.15))',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            color: 'var(--amber-light)'
          }}>
            <DinoSkull size={28} />
          </div>

          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#fff', margin: '0 0 0.35rem' }}>
            {isRegister ? 'Create Explorer ID' : 'DinoPedia Sign In'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>
            {isRegister 
              ? 'Join the Mesozoic field research archive' 
              : 'Sign in to access your field dossier and paleontology log'}
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#FCA5A5',
            padding: '0.65rem 1rem',
            borderRadius: '10px',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            color: '#6EE7B7',
            padding: '0.65rem 1rem',
            borderRadius: '10px',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}>
            <CheckCircle2 size={16} />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {isRegister && (
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--amber-primary)', marginBottom: '0.4rem' }}>
                Full Name / Explorer Alias
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                <input
                  type="text"
                  placeholder="e.g. Dr. Ellie Sattler"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.7rem 0.85rem 0.7rem 2.4rem',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid var(--border-subtle)',
                    color: '#fff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  required={isRegister}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--amber-primary)', marginBottom: '0.4rem' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input
                type="email"
                placeholder="explorer@dinopedia.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.7rem 0.85rem 0.7rem 2.4rem',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid var(--border-subtle)',
                  color: '#fff',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: 'var(--amber-primary)', marginBottom: '0.4rem' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.7rem 0.85rem 0.7rem 2.4rem',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid var(--border-subtle)',
                  color: '#fff',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '10px',
              fontSize: '0.95rem',
              fontWeight: '800',
              cursor: 'pointer',
              marginTop: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <LogIn size={16} />
            <span>{isRegister ? 'Register Explorer ID' : 'Sign In'}</span>
          </button>
        </form>

        {/* Quick Demo Login Option */}
        <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            style={{
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px dashed rgba(245, 158, 11, 0.4)',
              color: 'var(--amber-light)',
              padding: '0.55rem 1rem',
              borderRadius: '999px',
              fontSize: '0.82rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <Sparkles size={14} />
            <span>1-Click Demo Login (Dr. Alan Grant)</span>
          </button>

          <div style={{ marginTop: '1rem', fontSize: '0.82rem', color: 'var(--text-dim)' }}>
            {isRegister ? 'Already have an ID?' : "Don't have an ID yet?"}{' '}
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--amber-primary)',
                fontWeight: '700',
                cursor: 'pointer',
                padding: 0,
                textDecoration: 'underline'
              }}
            >
              {isRegister ? 'Sign In here' : 'Register now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
