import React, { useState } from 'react';
import { trendingData, matches, users, events } from './mockData';
import { TrendingUp, Users, Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

export default function Analytics() {
  const currentUser = users[0];
  const nearbyEventsList = events.filter(e => e.cityData.loc === currentUser.cityData.loc);
  const attendedEventsList = events.filter(e => currentUser.attendingEventIds.includes(e.id));
  
  const [expandedInsight, setExpandedInsight] = useState(null); // 'matched', 'attended', 'nearby'

  const toggleInsight = (insight) => {
    if (expandedInsight === insight) setExpandedInsight(null);
    else setExpandedInsight(insight);
  };

  return (
    <div style={{ padding: '40px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div>
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <TrendingUp size={36} /> Trending Topics
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Automated analysis of global events, meetups, and discussions.</p>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div className="glass-panel hover-glow" onClick={() => toggleInsight('matched')} style={{ flex: 1, padding: '24px', borderTop: '4px solid var(--accent-cyan)', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h4 style={{ color: 'var(--text-muted)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}><Users size={18} /> People Matched</h4>
            {expandedInsight === 'matched' ? <ChevronUp size={20} color="var(--text-muted)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
          </div>
          <h2 style={{ fontSize: '2rem' }}>{matches.length}</h2>
          <p style={{ color: '#10b981', marginTop: '10px', fontWeight: 'bold' }}>High Synergy</p>
        </div>
        <div className="glass-panel hover-glow" onClick={() => toggleInsight('attended')} style={{ flex: 1, padding: '24px', borderTop: '4px solid var(--accent-purple)', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h4 style={{ color: 'var(--text-muted)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={18} /> Events Attended</h4>
            {expandedInsight === 'attended' ? <ChevronUp size={20} color="var(--text-muted)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
          </div>
          <h2 style={{ fontSize: '2rem' }}>{attendedEventsList.length}</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>Global connections made</p>
        </div>
        <div className="glass-panel hover-glow" onClick={() => toggleInsight('nearby')} style={{ flex: 1, padding: '24px', borderTop: '4px solid #10b981', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h4 style={{ color: 'var(--text-muted)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={18} /> Nearby Events</h4>
            {expandedInsight === 'nearby' ? <ChevronUp size={20} color="var(--text-muted)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
          </div>
          <h2 style={{ fontSize: '2rem' }}>{nearbyEventsList.length}</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>In {currentUser.cityData.loc}</p>
        </div>
      </div>

      {expandedInsight && (
        <div className="glass-panel animate-fade-in" style={{ padding: '24px', marginTop: '-10px' }}>
          {expandedInsight === 'matched' && (
            <div>
              <h3 style={{ marginBottom: '16px', color: 'var(--accent-cyan)' }}>Your Top Synergies</h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {matches.map(m => (
                  <div key={m.id} style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px', borderLeft: '2px solid var(--accent-cyan)' }}>
                    <strong>{m.user.name}</strong> - {m.user.role} in {m.user.location}
                  </div>
                ))}
              </div>
            </div>
          )}
          {expandedInsight === 'attended' && (
            <div>
              <h3 style={{ marginBottom: '16px', color: 'var(--accent-purple)' }}>Events You Attended</h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {attendedEventsList.map(e => (
                  <div key={e.id} style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px', borderLeft: '2px solid var(--accent-purple)' }}>
                    <strong>{e.title}</strong> - {e.date} in {e.location}
                  </div>
                ))}
                {attendedEventsList.length === 0 && <p style={{ color: 'var(--text-muted)' }}>You haven't attended any events yet.</p>}
              </div>
            </div>
          )}
          {expandedInsight === 'nearby' && (
            <div>
              <h3 style={{ marginBottom: '16px', color: '#10b981' }}>Upcoming Events in {currentUser.cityData.loc}</h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {nearbyEventsList.map(e => (
                  <div key={e.id} style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px', borderLeft: '2px solid #10b981' }}>
                    <strong>{e.title}</strong> - {e.date}
                  </div>
                ))}
                {nearbyEventsList.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No upcoming events in your area.</p>}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
