import React from 'react';
import { news } from './mockData';
import { Newspaper, Users } from 'lucide-react';

export default function Feed() {
  return (
    <div style={{ padding: '40px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div>
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Global Feed</h1>
        <p style={{ color: 'var(--text-muted)' }}>The latest updates and meetups from the AI community.</p>
      </div>

      <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {news.map(item => (
          <div key={item.id} className="glass-panel hover-glow" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              {item.type === 'Meetup' ? <Users size={20} color="var(--accent-purple)" /> : <Newspaper size={20} color="var(--accent-cyan)" />}
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.type}</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', lineHeight: '1.4', flex: 1 }}>{item.title}</h3>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
              {item.tags?.map(tag => (
                <span key={tag} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  #{tag}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <span>{item.source}</span>
              <span>{item.date}</span>
            </div>
            <button className="btn-outline" style={{ marginTop: '20px', width: '100%', padding: '10px', borderRadius: '8px', cursor: 'pointer', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>Read More</button>
          </div>
        ))}
      </div>
    </div>
  );
}
