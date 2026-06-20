import React from 'react';
import { X, Users, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { users, events } from './mockData';

export default function ClusterModal({ cluster, onClose, onEventClick, onUserClick }) {
  if (!cluster) return null;
  
  const hostedEvents = events.filter(e => e.hostClusterId === cluster.id);
  const members = users.filter(u => u.memberClusterIds.includes(cluster.id));

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="glass-panel" style={{ width: '90%', maxWidth: '500px', padding: '30px', position: 'relative', animation: 'fadeIn 0.2s ease-out', maxHeight: '90vh', overflowY: 'auto' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}><X size={24} /></button>
        
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>
          {cluster.name.charAt(0)}
        </div>
        
        <h2 style={{ fontSize: '2rem', marginBottom: '5px' }}>{cluster.name}</h2>
        <h4 style={{ color: '#3b82f6', marginBottom: '15px', fontSize: '1.2rem' }}>{cluster.topic}</h4>
        
        {cluster.address && <p style={{ color: 'var(--text-muted)', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}><MapPin size={16} /> {cluster.address}</p>}
        {cluster.website && <p style={{ color: 'var(--accent-cyan)', marginBottom: cluster.members != null ? '5px' : '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}><ExternalLink size={16} /> <a href={cluster.website} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>{cluster.website}</a></p>}
        {cluster.members != null && <p style={{ color: 'var(--text-muted)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><Users size={16} /> {cluster.members} members registered</p>}

        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: '#ef4444' }}><Calendar size={16} /> Hosted Events ({hostedEvents.length})</h4>
          {hostedEvents.length > 0 ? hostedEvents.map(e => (
            <div key={e.id} onClick={() => onEventClick(e)} style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginBottom: '6px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
              <span>{e.title}</span><ExternalLink size={14} />
            </div>
          )) : <div style={{fontSize: '0.85rem'}}>No upcoming events</div>}
        </div>

        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: '#eab308' }}><Users size={16} /> Active Members</h4>
          {members.slice(0, 5).map(u => (
            <div key={u.id} onClick={() => onUserClick(u)} style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginBottom: '6px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
              <span>{u.name} - {u.role}</span><ExternalLink size={14} />
            </div>
          ))}
          {members.length > 5 && <div style={{fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '5px'}}>+ {members.length - 5} more members</div>}
          {members.length === 0 && <div style={{fontSize: '0.85rem'}}>No active members found</div>}
        </div>
      </div>
    </div>
  );
}
