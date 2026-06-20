import React from 'react';
import { X, MapPin, Briefcase, Award, GraduationCap, Users, Calendar, ExternalLink } from 'lucide-react';
import { clusters, events } from './mockData';

export default function UserModal({ user, onClose, onClusterClick, onEventClick }) {
  if (!user) return null;
  
  const userClusters = user.memberClusterIds.map(id => clusters.find(c => c.id === id)).filter(Boolean);
  const userEvents = user.attendingEventIds.map(id => events.find(e => e.id === id)).filter(Boolean);
  
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
      background: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div className="glass-panel" style={{ width: '90%', maxWidth: '500px', padding: '30px', position: 'relative', animation: 'fadeIn 0.2s ease-out', maxHeight: '90vh', overflowY: 'auto' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
          <X size={24} />
        </button>
        
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>
          {user.name.charAt(0)}
        </div>
        
        <h2 style={{ fontSize: '2rem', marginBottom: '5px' }}>{user.name}</h2>
        <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '15px', fontSize: '1.2rem' }}>{user.role}</h4>
        
        <p style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '20px' }}>
          <MapPin size={16} /> {user.location} &bull; {user.nomadStatus || "Stationary"}
        </p>

        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}><Briefcase size={16} /> Key Expertise</h4>
          <p style={{ color: 'var(--text-main)' }}>{user.expertise}</p>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
          <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}><GraduationCap size={16} /> Degrees</h4>
            {user.degrees?.length ? user.degrees.map((d, i) => <div key={i} style={{fontSize: '0.85rem', marginBottom: '4px'}}>{d}</div>) : <div style={{fontSize: '0.85rem'}}>None listed</div>}
          </div>
          <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}><Award size={16} /> Certs</h4>
            {user.certificates?.length ? user.certificates.map((c, i) => <div key={i} style={{fontSize: '0.85rem', marginBottom: '4px'}}>{c}</div>) : <div style={{fontSize: '0.85rem'}}>None listed</div>}
          </div>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: '#3b82f6' }}><Users size={16} /> Associated Hubs</h4>
          {userClusters.length > 0 ? userClusters.map(c => (
            <div key={c.id} onClick={() => onClusterClick(c)} style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginBottom: '6px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
              <span>{c.name}</span><ExternalLink size={14} />
            </div>
          )) : <div style={{fontSize: '0.85rem'}}>No hub memberships</div>}
        </div>

        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: '#ef4444' }}><Calendar size={16} /> Attending Events</h4>
          {userEvents.length > 0 ? userEvents.map(e => (
            <div key={e.id} onClick={() => onEventClick(e)} style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginBottom: '6px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
              <span>{e.title}</span><ExternalLink size={14} />
            </div>
          )) : <div style={{fontSize: '0.85rem'}}>No upcoming events</div>}
        </div>
      </div>
    </div>
  );
}
