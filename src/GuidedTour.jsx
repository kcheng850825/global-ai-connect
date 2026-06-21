import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TOUR_STEPS = [
  { targetId: 'tour-map', title: 'Global Map View', path: '/map', content: 'Visualize the entire global AI ecosystem. See where hubs and events are clustered geographically.' },
  { targetId: 'tour-filters', title: 'Multi-Select Filters', path: '/map', content: 'Hold Ctrl/Cmd to select multiple continents, countries, or cities. Break down geographical silos instantly.' },
  { targetId: 'tour-global-search', title: 'Global Search', path: '/map', content: 'Perform real-time, character-level matching across thousands of profiles, hubs, and events simultaneously.' },
  { targetId: 'tour-directory', title: 'Elite Talent Directory', path: '/map', content: 'Browse through thousands of pre-vetted AI professionals, researchers, and founders.' },
  { targetId: 'tour-swipe-match', title: 'AI Synergy Match', path: '/match', content: 'Our GenAI analyzes deeper than keywords to find your perfect co-founder or technical partner based on true synergistic overlap.' },
  { targetId: 'tour-feed', title: 'Real-Time Ecosystem Feed', path: '/feed', content: 'Stay updated with a chronologically aggregated news feed of what is happening across the AI community.' },
  { targetId: 'tour-analytics', title: 'Personalized Insights', path: '/analytics', content: 'View dynamic statistics on who you matched with and what events are happening in your vicinity.' },
  { targetId: 'tour-profile', title: 'GenAI Profile Extraction', path: '/profile', content: 'Upload a messy resume or paste a LinkedIn link, and our Gemini API integration instantly extracts a structured profile.' },
  { targetId: 'tour-events', title: 'Event Timeline', path: '/map', content: 'Filter upcoming events across the next 30 to 180 days across all global hubs.' },
  { targetId: 'tour-presentation-btn', title: 'Presentation Mode', path: '/map', content: 'You can always return to the pitch deck and presentation materials by clicking here.' }
];

export default function GuidedTour({ onComplete }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState(null);
  const navigate = useNavigate();

  const currentStep = TOUR_STEPS[currentStepIndex];

  useEffect(() => {
    // Navigate to the correct tab first
    navigate(currentStep.path);

    // Wait a tiny bit for the new page to render before finding the element
    const timer = setTimeout(() => {
      const targetElement = document.getElementById(currentStep.targetId);
      
      if (targetElement) {
        // Scroll into view if needed
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // We need a slight delay to allow scrolling to finish before grabbing the rect
        setTimeout(() => {
          const rect = targetElement.getBoundingClientRect();
          setTargetRect(rect);
        }, 300);
      } else {
        // If the element isn't on screen, we just show a centered modal
        setTargetRect(null);
      }
    }, 100);
    
    // Auto-recalc on resize
    const handleResize = () => {
      const el = document.getElementById(currentStep.targetId);
      if(el) setTargetRect(el.getBoundingClientRect());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentStepIndex]);

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  // Determine tooltip placement based on targetRect
  let tooltipStyle = {
    position: 'fixed',
    bottom: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 10002
  };

  let highlightStyle = {};

  if (targetRect) {
    const padding = 8;
    highlightStyle = {
      position: 'absolute',
      top: targetRect.top - padding + window.scrollY,
      left: targetRect.left - padding + window.scrollX,
      width: targetRect.width + (padding * 2),
      height: targetRect.height + (padding * 2),
      border: '3px solid var(--accent-cyan)',
      borderRadius: '8px',
      boxShadow: '0 0 0 9999px rgba(0,0,0,0.7)',
      pointerEvents: 'none',
      zIndex: 10001,
      transition: 'all 0.3s ease'
    };
  }

  return (
    <>
      {/* If we have a target, draw the highlight hole punch. Otherwise just dim the screen */}
      {targetRect ? (
        <div style={highlightStyle} />
      ) : (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.7)', zIndex: 10001 }} />
      )}

      {/* Tooltip */}
      <div className="glass-panel" style={{ ...tooltipStyle, width: '450px', padding: '24px', animation: 'fadeIn 0.2s ease-out', border: '1px solid var(--accent-cyan)', boxShadow: '0 10px 40px rgba(0,0,0,0.8)' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 'bold', marginBottom: '8px', textTransform: 'uppercase' }}>
          Step {currentStepIndex + 1} of {TOUR_STEPS.length}
        </div>
        <h3 style={{ marginBottom: '10px', fontSize: '1.4rem' }}>{currentStep.title}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.5', marginBottom: '24px' }}>
          {currentStep.content}
        </p>

        {!targetRect && (
          <div style={{ fontSize: '0.85rem', color: '#eab308', marginBottom: '20px', fontStyle: 'italic' }}>
            Note: This feature might be hidden behind a toggle or filter.
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={onComplete} className="btn-outline" style={{ padding: '8px 16px', fontSize: '0.95rem', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
            Exit Demo
          </button>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handlePrev} disabled={currentStepIndex === 0} className="btn-outline" style={{ padding: '8px 16px', fontSize: '0.95rem', opacity: currentStepIndex === 0 ? 0.5 : 1 }}>
              <ChevronLeft size={18} /> Back
            </button>
            <button onClick={handleNext} className="btn hover-glow" style={{ padding: '8px 16px', fontSize: '0.95rem' }}>
              {currentStepIndex === TOUR_STEPS.length - 1 ? 'Finish' : 'Next'} <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
