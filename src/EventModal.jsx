import React from 'react';
import { X, Calendar, MapPin, Users, Target, ExternalLink } from 'lucide-react';
import { users, clusters } from './mockData';

export default function EventModal({ event, onClose, onClusterClick, onUserClick }) {
  if (!event) return null;
  
  const hostCluster = clusters.find(c => c.id === event.hostClusterId);
  const attendees = users.filter(u => u.attendingEventIds.includes(event.id));

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="glass-panel" style={{ width: '90%', maxWidth: '500px', padding: '30px', position: 'relative', animation: 'fadeIn 0.2s ease-out', maxHeight: '90vh', overflowY: 'auto' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}><X size={24} /></button>
        
        <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: 'linear-gradient(135deg, #ef4444, #f97316)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>
          <Calendar size={36} color="white" />
        </div>
        
        <h2 style={{ fontSize: '2rem', marginBottom: '5px' }}>{event.title}</h2>
        <h4 style={{ color: '#ef4444', marginBottom: '15px', fontSize: '1.2rem' }}>{event.type}</h4>
        
        <p style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '10px' }}><Calendar size={16} /> {event.date}</p>
        <p style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '20px' }}><MapPin size={16} /> {event.location}</p>

        {hostCluster && (
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: '#3b82f6' }}><Target size={16} /> Hosted By</h4>
            <div onClick={() => onClusterClick(hostCluster)} style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{hostCluster.name}</strong>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{hostCluster.topic}</div>
              </div>
              <ExternalLink size={16} />
            </div>
          </div>
        )}

        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: '#eab308' }}><Users size={16} /> Attending Professionals ({attendees.length})</h4>
          {attendees.slice(0, 5).map(u => (
            <div key={u.id} onClick={() => onUserClick(u)} style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginBottom: '6px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
              <span>{u.name} - {u.role}</span><ExternalLink size={14} />
            </div>
          ))}
          {attendees.length > 5 && <div style={{fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '5px'}}>+ {attendees.length - 5} more attending</div>}
          {attendees.length === 0 && <div style={{fontSize: '0.85rem'}}>No attendees found</div>}
        </div>
      </div>
    </div>
  );
}
