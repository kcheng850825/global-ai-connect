import React, { useState } from 'react';
import { users, matches } from './mockData';
import { Sparkles, X, Heart, MessageCircle, List, UserPlus } from 'lucide-react';
import TinderCard from 'react-tinder-card';
import UserModal from './UserModal';

export default function SwipeMatch() {
  const [matchQueue, setMatchQueue] = useState(() => users.filter(u => u.id !== 999).slice(0, 20));
  const [lastSwipedUser, setLastSwipedUser] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  const onSwipe = (direction, user) => {
    if (direction === 'right') {
      handleConnect(user);
    } else {
      handlePass();
    }
  };

  const onCardLeftScreen = (id) => {
    setMatchQueue(prev => prev.filter(u => u.id !== id));
  };

  const handlePass = () => {
    setMatchResult('');
    setLastSwipedUser(null);
  };

  const handleConnect = (user) => {
    setLastSwipedUser(user);
    setIsMatching(true);
    setMatchResult('');
    
    setTimeout(() => {
      setMatchResult(`Synergy Found! Your background perfectly complements ${user.name}'s focus on ${user.expertise}. \nAI Proposal: Collaborate on ${user.expertise} pipelines in ${user.location}.`);
      setIsMatching(false);
    }, 800);
  };

  const manualSwipe = (direction) => {
    if (matchQueue.length === 0) return;
    const user = matchQueue[matchQueue.length - 1]; // Top card is the last in the array for TinderCard
    onSwipe(direction, user);
    onCardLeftScreen(user.id);
  };

  return (
    <div id="tour-swipe-match" style={{ padding: '40px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'transparent', overflowY: 'auto' }}>
      <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '16px', fontWeight: '800' }}>Find Synergies</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '1.1rem', letterSpacing: '0.5px' }}>Discover and connect with elite global AI talent.</p>

      <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid var(--panel-border)', paddingBottom: '10px', marginBottom: '40px', width: '100%', maxWidth: '600px', justifyContent: 'center' }}>
        <button 
          onClick={() => setActiveTab('discover')}
          style={{ background: 'transparent', border: 'none', color: activeTab === 'discover' ? 'white' : 'var(--text-muted)', fontSize: '1.1rem', fontWeight: activeTab === 'discover' ? 'bold' : 'normal', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        ><UserPlus size={20} /> Discover</button>
        <button 
          onClick={() => setActiveTab('matches')}
          style={{ background: 'transparent', border: 'none', color: activeTab === 'matches' ? 'var(--accent-purple)' : 'var(--text-muted)', fontSize: '1.1rem', fontWeight: activeTab === 'matches' ? 'bold' : 'normal', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        ><List size={20} /> My Matches</button>
      </div>

      {activeTab === 'discover' && (
        <div style={{ width: '100%', maxWidth: '440px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <div style={{ position: 'relative', width: '100%', height: '400px', marginBottom: '30px' }}>
            {matchQueue.map((user, index) => (
              <TinderCard 
                key={user.id} 
                onSwipe={(dir) => onSwipe(dir, user)} 
                onCardLeftScreen={() => onCardLeftScreen(user.id)} 
                preventSwipe={['up', 'down']}
                className="swipe"
                style={{ position: 'absolute', width: '100%', height: '100%', zIndex: index }}
              >
                <div className="glass-panel" style={{ width: '100%', height: '100%', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflow: 'hidden', cursor: 'grab' }}>
                  <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '150px', height: '150px', background: 'var(--accent-purple)', filter: 'blur(80px)', opacity: 0.3, zIndex: -1 }}></div>

                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem', fontWeight: 'bold', marginBottom: '16px', boxShadow: 'var(--accent-purple-glow)', border: '2px solid rgba(255,255,255,0.1)' }}>
                    {user.name.charAt(0)}
                  </div>
                  
                  <h2 style={{ fontSize: '1.8rem', marginBottom: '4px', fontWeight: '700' }}>{user.name}</h2>
                  <h4 className="text-gradient" style={{ fontSize: '1rem', marginBottom: '4px', fontWeight: '600' }}>{user.role}</h4>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontSize: '0.9rem' }}>📍 {user.location}</p>
                  
                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '16px', borderRadius: '16px', width: '100%', marginBottom: '24px', textAlign: 'center', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', fontWeight: '600' }}>Primary Expertise</p>
                    <p style={{ fontWeight: '600', fontSize: '1.1rem', color: '#fff' }}>{user.expertise}</p>
                  </div>
                </div>
              </TinderCard>
            ))}
            {matchQueue.length === 0 && (
              <div className="glass-panel" style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--text-muted)' }}>
                No more profiles to discover right now.
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '32px', width: '100%', justifyContent: 'center', zIndex: 100 }}>
            <button 
              onClick={() => manualSwipe('left')}
              style={{ width: '70px', height: '70px', borderRadius: '50%', border: '2px solid rgba(239, 68, 68, 0.5)', background: 'rgba(239, 68, 68, 0.05)', color: '#ef4444', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.1)' }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'; e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.4)'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)'; e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.1)'; }}
            >
              <X size={36} />
            </button>
            <button 
              onClick={() => manualSwipe('right')}
              style={{ width: '70px', height: '70px', borderRadius: '50%', border: '2px solid rgba(16, 185, 129, 0.5)', background: 'rgba(16, 185, 129, 0.05)', color: '#10b981', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.1)' }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'; e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.borderColor = '#10b981'; e.currentTarget.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.4)'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'rgba(16, 185, 129, 0.05)'; e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.5)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.1)'; }}
            >
              <Heart size={36} />
            </button>
          </div>

          {(isMatching || matchResult) && lastSwipedUser && (
            <div className="animate-fade-in" style={{ marginTop: '24px', width: '100%', padding: '20px', background: 'linear-gradient(135deg, rgba(157, 78, 221, 0.1), rgba(59, 130, 246, 0.1))', border: '1px solid rgba(157, 78, 221, 0.3)', borderRadius: '16px', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)' }}>
              <h4 className="text-gradient-purple" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '1.1rem', fontWeight: '700' }}>
                <Sparkles size={18} color="var(--accent-purple)" /> AI Synergy Analysis
              </h4>
              {isMatching ? (
                <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}>Analyzing global compatibility models...</p>
              ) : (
                <>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.5', whiteSpace: 'pre-wrap', color: 'rgba(255,255,255,0.9)' }}>{matchResult}</p>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                    <button className="btn hover-glow-purple" style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '10px', borderRadius: '12px' }} onClick={handlePass}>
                      Continue
                    </button>
                    <button className="btn-outline" style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '10px', borderRadius: '12px', border: '1px solid var(--accent-purple)', color: 'var(--accent-purple)' }} onClick={() => setActiveModal(lastSwipedUser)}>
                      View Profile
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === 'matches' && (
        <div className="animate-fade-in" style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {matches.map(match => (
            <div key={match.id} className="glass-panel hover-glow" style={{ padding: '24px', borderLeft: '4px solid var(--accent-purple)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {match.user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', margin: '0 0 4px 0' }}>{match.user.name}</h3>
                    <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>{match.user.role} &bull; {match.user.location}</p>
                  </div>
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Matched {match.date}</span>
              </div>
              
              <div style={{ background: 'rgba(157, 78, 221, 0.1)', border: '1px solid rgba(157, 78, 221, 0.3)', padding: '16px', borderRadius: '12px' }}>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.5', color: 'rgba(255,255,255,0.9)' }}>
                  <Sparkles size={16} color="var(--accent-purple)" style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
                  {match.synergy}
                </p>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
                <button className="btn hover-glow-purple" style={{ flex: 1, padding: '10px' }}><MessageCircle size={18} style={{ marginRight: '8px' }} /> Message</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeModal && <UserModal user={activeModal} onClose={() => setActiveModal(null)} />}
    </div>
  );
}
