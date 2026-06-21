import React, { useState } from 'react';
import { X, Presentation, Lightbulb, Play, Code, Globe } from 'lucide-react';

export default function PresentationModal({ onClose, onStartDemo }) {
  const [activeTab, setActiveTab] = useState('problem');

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', zIndex: 10000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="glass-panel" style={{ width: '90%', maxWidth: '800px', height: '80vh', display: 'flex', flexDirection: 'column', position: 'relative', animation: 'fadeIn 0.2s ease-out' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', zIndex: 10 }}>
          <X size={24} />
        </button>
        
        <div style={{ padding: '30px', borderBottom: '1px solid var(--panel-border)', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Presentation size={32} color="var(--accent-cyan)" />
          <h2 style={{ fontSize: '2rem', margin: 0 }}>Presentation Mode</h2>
        </div>

        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Sidebar */}
          <div style={{ width: '250px', borderRight: '1px solid var(--panel-border)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button onClick={() => setActiveTab('problem')} className={`btn ${activeTab === 'problem' ? '' : 'btn-outline'}`} style={{ textAlign: 'left', justifyContent: 'flex-start' }}>1. Problem Statement</button>
            <button onClick={() => setActiveTab('solution')} className={`btn ${activeTab === 'solution' ? '' : 'btn-outline'}`} style={{ textAlign: 'left', justifyContent: 'flex-start' }}>2. Solution</button>
            <button onClick={() => setActiveTab('demo')} className={`btn ${activeTab === 'demo' ? '' : 'btn-outline'}`} style={{ textAlign: 'left', justifyContent: 'flex-start' }}>3. Demo</button>
            <button onClick={() => setActiveTab('tech')} className={`btn ${activeTab === 'tech' ? '' : 'btn-outline'}`} style={{ textAlign: 'left', justifyContent: 'flex-start' }}>4. Tech Requirements</button>
          </div>

          {/* Content */}
          <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
            {activeTab === 'problem' && (
              <div className="animate-fade-in">
                <h3 style={{ fontSize: '2.2rem', marginBottom: '20px', color: '#ef4444' }}>The AI Talent Gap</h3>
                <p style={{ fontSize: '1.3rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
                  The AI ecosystem is booming, but the community is highly disconnected.
                </p>
                <ul style={{ marginTop: '20px', fontSize: '1.25rem', lineHeight: '1.6', color: 'var(--text-muted)', paddingLeft: '20px' }}>
                  <li style={{ marginBottom: '15px' }}><strong>Geographical Silos:</strong> Global innovators struggle to collaborate across borders.</li>
                  <li style={{ marginBottom: '15px' }}><strong>Outdated Networking:</strong> Traditional platforms rely on basic keywords, completely missing true technical synergy.</li>
                  <li style={{ marginBottom: '15px' }}><strong>Hidden Hubs:</strong> Local meetups and micro-communities remain invisible to the broader world.</li>
                </ul>
              </div>
            )}

            {activeTab === 'solution' && (
              <div className="animate-fade-in">
                <h3 style={{ fontSize: '2.2rem', marginBottom: '20px', color: 'var(--accent-cyan)' }}>Global AI Connect</h3>
                <p style={{ fontSize: '1.3rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
                  We unite the world's AI ecosystem through intelligent matchmaking and global discovery.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px', borderLeft: '3px solid var(--accent-cyan)' }}>
                    <Lightbulb size={24} color="var(--accent-cyan)" style={{ marginBottom: '10px' }} />
                    <h4 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>AI Synergy Matching</h4>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.5', color: 'var(--text-muted)' }}>Our LLM analyzes deep context—like projects and goals—to find your perfect co-founder or technical partner.</p>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px', borderLeft: '3px solid var(--accent-purple)' }}>
                    <Globe size={24} color="var(--accent-purple)" style={{ marginBottom: '10px' }} />
                    <h4 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>Global Hub Discovery</h4>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.5', color: 'var(--text-muted)' }}>Easily discover and connect with local AI communities, labs, and events anywhere in the world.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'demo' && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
                <Play size={64} color="var(--accent-cyan)" style={{ marginBottom: '20px' }} />
                <h3 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>Interactive Platform Tour</h3>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '30px', maxWidth: '400px' }}>
                  Launch the interactive guided tour to explore the 10 key features of Global AI Connect in real-time.
                </p>
                <button onClick={() => { onClose(); onStartDemo(); }} className="btn hover-glow" style={{ padding: '15px 30px', fontSize: '1.2rem' }}>
                  Start Live Demo
                </button>
              </div>
            )}

            {activeTab === 'tech' && (
              <div className="animate-fade-in">
                <h3 style={{ fontSize: '1.8rem', marginBottom: '20px', color: '#10b981' }}>Technical Architecture</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-muted)', marginBottom: '20px' }}>
                  Built for scale, speed, and intelligence.
                </p>
                
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px', marginBottom: '15px' }}>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}><Code size={18} color="#10b981" /> Frontend Application</h4>
                  <ul style={{ color: 'var(--text-muted)', paddingLeft: '20px' }}>
                    <li><strong>Vite & React:</strong> Lightning-fast compilation and highly responsive component architecture.</li>
                    <li><strong>Vanilla CSS (Design System):</strong> Custom glassmorphic styling, CSS variables, and modern aesthetics tailored specifically for this platform without the bloat of heavy UI frameworks.</li>
                  </ul>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px', marginBottom: '15px' }}>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}><Code size={18} color="#10b981" /> AI Integration</h4>
                  <ul style={{ color: 'var(--text-muted)', paddingLeft: '20px' }}>
                    <li><strong>Google Gemini API:</strong> Utilized for deep-context resume extraction and unstructured data processing to build structured JSON profiles and infer synergies.</li>
                  </ul>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '12px' }}>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}><Code size={18} color="#10b981" /> Infrastructure & Deployment</h4>
                  <ul style={{ color: 'var(--text-muted)', paddingLeft: '20px' }}>
                    <li><strong>Docker:</strong> Fully containerized application with multi-stage builds.</li>
                    <li><strong>Nginx:</strong> Optimized static file serving and client-side routing management.</li>
                    <li><strong>Google Cloud Run:</strong> Serverless deployment for automatic scaling, zero-downtime, and cost efficiency.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
