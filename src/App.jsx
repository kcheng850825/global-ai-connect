import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { Map, Rss, BarChart2, User, HeartHandshake } from 'lucide-react';
import MapDashboard from './MapDashboard';
import Feed from './Feed';
import Analytics from './Analytics';
import Profile from './Profile';
import SwipeMatch from './SwipeMatch';
import Login from './Login';
import PresentationModal from './PresentationModal';
import GuidedTour from './GuidedTour';
import { PlayCircle } from 'lucide-react';
import './index.css';

// Extracted the layout into its own component to keep App.jsx clean
function AuthenticatedLayout() {
  const navLinkStyle = ({ isActive }) => ({
    padding: '16px',
    margin: '10px 0',
    borderRadius: '16px',
    color: isActive ? '#fff' : 'var(--text-muted)',
    background: isActive ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(157, 78, 221, 0.15))' : 'transparent',
    border: isActive ? '1px solid rgba(0, 240, 255, 0.3)' : '1px solid transparent',
    boxShadow: isActive ? 'inset 0 0 20px rgba(0, 240, 255, 0.1), 0 0 15px rgba(0, 240, 255, 0.2)' : 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
    fontSize: '0.75rem',
    fontWeight: '600',
    letterSpacing: '0.5px'
  });

  return (
    <div className="app-container">
      <nav className="sidebar" style={{ width: '100px' }}>
        <div className="hover-glow" style={{ marginBottom: '40px', padding: '12px', background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))', borderRadius: '20px', boxShadow: 'var(--accent-purple-glow)' }}>
          <Map size={28} color="white" />
        </div>
        
        {/* We changed the order here so Map is the primary focus after login */}
        <NavLink to="/map" style={navLinkStyle}>
          <Map size={24} />
          <span>Map</span>
        </NavLink>

        <NavLink to="/profile" style={navLinkStyle}>
          <User size={24} />
          <span>Profile</span>
        </NavLink>
        
        <NavLink to="/match" style={navLinkStyle}>
          <HeartHandshake size={24} />
          <span>Match</span>
        </NavLink>
        
        <NavLink to="/feed" style={navLinkStyle}>
          <Rss size={24} />
          <span>Feed</span>
        </NavLink>
        
        <NavLink to="/analytics" style={navLinkStyle}>
          <BarChart2 size={24} />
          <span>Insights</span>
        </NavLink>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/map" replace />} />
          <Route path="/map" element={<MapDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/match" element={<SwipeMatch />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="*" element={<Navigate to="/map" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPresentation, setShowPresentation] = useState(false);
  const [showTour, setShowTour] = useState(false);

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <>
          <AuthenticatedLayout />
          
          <button 
            id="tour-presentation-btn"
            onClick={() => setShowPresentation(true)}
            className="btn hover-glow"
            style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999, display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', borderRadius: '30px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
          >
            <PlayCircle size={20} /> Presentation Mode
          </button>

          {showPresentation && (
            <PresentationModal 
              onClose={() => setShowPresentation(false)} 
              onStartDemo={() => {
                setShowPresentation(false);
                setShowTour(true);
              }} 
            />
          )}

          {showTour && (
            <GuidedTour onComplete={() => {
              setShowTour(false);
              setShowPresentation(true);
            }} />
          )}
        </>
      ) : (
        <Routes>
          <Route path="*" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}
