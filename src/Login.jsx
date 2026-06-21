import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Mail, ArrowRight } from 'lucide-react';

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleSimulatedLogin = (e) => {
    e.preventDefault();
    setTimeout(() => {
      onLogin();
      navigate('/map');
    }, 400);
  };

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 1000, background: 'var(--bg-color)', overflow: 'hidden' }}>
      {/* Animated Background Orbs */}
      <div className="animate-float" style={{ position: 'absolute', top: '10%', left: '20%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(157, 78, 221, 0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)' }}></div>
      <div className="animate-float" style={{ position: 'absolute', bottom: '10%', right: '15%', width: '45vw', height: '45vw', background: 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)', animationDelay: '-3s' }}></div>
      <div className="animate-float" style={{ position: 'absolute', top: '40%', right: '40%', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', animationDelay: '-1.5s' }}></div>

      <div className="glass-panel animate-fade-in" style={{ width: '90%', maxWidth: '440px', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
        <div className="hover-glow-purple" style={{ marginBottom: '24px', padding: '16px', background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))', borderRadius: '24px', boxShadow: 'var(--accent-purple-glow)' }}>
          <Globe size={48} color="white" strokeWidth={1.5} />
        </div>
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '12px', textAlign: 'center', fontWeight: '800' }}>Global AI Connect</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '36px', textAlign: 'center', fontSize: '1.05rem', lineHeight: '1.5' }}>Sign in to connect with the world's most elite AI talent network.</p>

        <button 
          onClick={handleSimulatedLogin}
          className="btn" 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', display: 'flex', justifyContent: 'center', marginBottom: '30px', padding: '14px', borderRadius: '14px', transition: 'all 0.3s ease', boxShadow: isHovered ? '0 0 20px rgba(255,255,255,0.1)' : 'none' }}
        >
          <span style={{ color: '#fff', fontWeight: 'bold', marginRight: '10px', fontSize: '1.1rem' }}>G</span> Continue with Google
        </button>

        <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, var(--panel-border))' }}></div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '1px' }}>OR USE EMAIL</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(270deg, transparent, var(--panel-border))' }}></div>
        </div>

        <form onSubmit={handleSimulatedLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
            <Mail size={20} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-muted)' }} />
            <input 
              type="email" 
              placeholder="Email address" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '12px', fontSize: '1rem' }}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: '16px', borderRadius: '12px', fontSize: '1rem' }}
            />
          </div>
          <button type="submit" className="btn hover-glow" style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '16px', marginTop: '10px', fontSize: '1.05rem' }}>
            Enter Connect <ArrowRight size={20} style={{ marginLeft: '8px' }} />
          </button>
        </form>
      </div>
    </div>
  );
}
