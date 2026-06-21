import React, { useState } from 'react';
import { User, Sparkles, Upload, X } from 'lucide-react';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('extract'); // 'view' or 'extract'
  
  // Extraction State
  const [rawText, setRawText] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  
  const [myProfile, setMyProfile] = useState({
    name: "Johnny Depp",
    role: "AI Creative Director",
    location: "Los Angeles, CA",
    expertise: "Generative Audio & Video",
    bio: "An eccentric actor turned AI enthusiast. Captivated by the intersection of machine learning and human creativity. Currently traveling the world looking for brilliant minds to build the next generation of generative entertainment.",
    skills: ["Generative Audio", "Storytelling", "AI Cinematography", "Voice Cloning", "Character Design"],
    lookingFor: "Exploring how AI can revolutionize the filmmaking process and storytelling."
  });
  
  const [newSkill, setNewSkill] = useState('');

  const handleExtraction = () => {
    setIsExtracting(true);

    setTimeout(() => {
      setMyProfile({
        name: "Johnny Depp",
        role: "AI Creative Director",
        location: "Los Angeles, CA",
        expertise: "Generative Audio & Video, Multi-Modal AI",
        bio: "An eccentric actor turned AI enthusiast. Captivated by the intersection of machine learning and human creativity. Profile auto-generated from recent context.",
        skills: ["Generative Audio", "Storytelling", "AI Cinematography", "Multi-Modal Models"],
        lookingFor: lookingFor || "Exploring how AI can revolutionize the filmmaking process and storytelling."
      });
      setIsExtracting(false);
      setActiveTab('view');
      alert("Profile successfully extracted and updated!");
    }, 1500);
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setRawText((prev) => prev + `\n[Extracted from uploaded file: ${file.name}]\nI have a BS in Computer Science from Stanford and an AWS Machine Learning certification. I work as an MLOps Engineer in New York.`);
      alert("File uploaded. (Simulated text extraction for PDF applied).");
    }
  };

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const trimmed = newSkill.trim();
      if (trimmed && myProfile.skills.length < 50 && !myProfile.skills.includes(trimmed)) {
        setMyProfile({ ...myProfile, skills: [...myProfile.skills, trimmed] });
      }
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setMyProfile({ ...myProfile, skills: myProfile.skills.filter(s => s !== skillToRemove) });
  };

  return (
    <div style={{ padding: '40px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div>
        <h1 className="text-gradient mobile-h1" style={{ fontSize: '2.5rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <User size={36} /> Profile Center
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Manage your public candidate page or extract a new one via AI.</p>
      </div>

      <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid var(--panel-border)', paddingBottom: '10px' }}>
        <button 
          onClick={() => setActiveTab('view')}
          style={{ background: 'transparent', border: 'none', color: activeTab === 'view' ? 'white' : 'var(--text-muted)', fontSize: '1.1rem', fontWeight: activeTab === 'view' ? 'bold' : 'normal', cursor: 'pointer' }}
        >My Profile</button>
        <button 
          onClick={() => setActiveTab('extract')}
          style={{ background: 'transparent', border: 'none', color: activeTab === 'extract' ? 'var(--accent-cyan)' : 'var(--text-muted)', fontSize: '1.1rem', fontWeight: activeTab === 'extract' ? 'bold' : 'normal', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        ><Sparkles size={18} /> GenAI Extraction</button>
      </div>

      {activeTab === 'extract' && (
        <div id="tour-profile" className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.3s ease' }}>
          <div style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid var(--accent-purple)', padding: '15px', borderRadius: '8px' }}>
            <p style={{ fontSize: '0.9rem', marginBottom: '8px', color: 'var(--accent-purple)' }}><strong>GenAI Profile Extraction Demo</strong></p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Upload your resume or paste a LinkedIn link below. Our GenAI will parse the unstructured data to generate a structured profile JSON instantly.
            </p>
          </div>

          <div>
            <label style={{ color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>LinkedIn Profile URL</label>
            <input 
              type="text" 
              placeholder="https://linkedin.com/in/..."
              value={linkedinUrl}
              onChange={e => setLinkedinUrl(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--panel-border)', background: 'rgba(0,0,0,0.3)', color: 'white', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>Upload Resume (PDF/DOCX)</label>
            <input 
              type="file" 
              id="file-upload"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
            <label htmlFor="file-upload" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 15px', borderRadius: '8px', cursor: 'pointer' }}>
              <Upload size={18} /> Select File
            </label>
          </div>

          <div>
            <label style={{ color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>Paste Raw Text or Notes</label>
            <textarea 
              rows="6" 
              placeholder="Paste any additional context here..."
              value={rawText}
              onChange={e => setRawText(e.target.value)}
              style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid var(--panel-border)', background: 'rgba(0,0,0,0.3)', color: 'white', outline: 'none', resize: 'vertical' }}
            />
          </div>

          <div>
            <label style={{ color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>What are you looking for?</label>
            <textarea 
              rows="3" 
              placeholder="E.g., I'm looking for a co-founder for an MLOps startup..."
              value={lookingFor}
              onChange={e => setLookingFor(e.target.value)}
              style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid var(--panel-border)', background: 'rgba(0,0,0,0.3)', color: 'white', outline: 'none', resize: 'vertical' }}
            />
          </div>

          <button className="btn hover-glow" onClick={handleExtraction} disabled={isExtracting} style={{ alignSelf: 'flex-start' }}>
            {isExtracting ? 'Extracting via AI...' : <><Sparkles size={18} /> Run GenAI Extraction</>}
          </button>
        </div>
      )}

      {activeTab === 'view' && (
        <div className="glass-panel animate-fade-in" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ color: 'var(--accent-cyan)' }}>Public Profile Preview</h3>
          
          <div>
            <label style={{ color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>Full Name</label>
            <input type="text" value={myProfile.name} onChange={e => setMyProfile({...myProfile, name: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--panel-border)', background: 'rgba(0,0,0,0.3)', color: 'white', outline: 'none' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>Role</label>
              <input type="text" value={myProfile.role} onChange={e => setMyProfile({...myProfile, role: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--panel-border)', background: 'rgba(0,0,0,0.3)', color: 'white', outline: 'none' }} />
            </div>
            <div>
              <label style={{ color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>Location</label>
              <input type="text" value={myProfile.location} onChange={e => setMyProfile({...myProfile, location: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--panel-border)', background: 'rgba(0,0,0,0.3)', color: 'white', outline: 'none' }} />
            </div>
          </div>

          <div>
            <label style={{ color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>Expertise (Comma separated)</label>
            <input type="text" value={myProfile.expertise} onChange={e => setMyProfile({...myProfile, expertise: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--panel-border)', background: 'rgba(0,0,0,0.3)', color: 'white', outline: 'none' }} />
          </div>
          
          <div>
            <label style={{ color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Skills & Tags</span>
              <span style={{ fontSize: '0.85rem' }}>{myProfile.skills.length}/50</span>
            </label>
            <div style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--panel-border)', background: 'rgba(0,0,0,0.3)', display: 'flex', flexWrap: 'wrap', gap: '8px', minHeight: '50px' }}>
              {myProfile.skills.map((skill, idx) => (
                <div key={idx} style={{ background: 'rgba(0, 240, 255, 0.15)', color: 'var(--accent-cyan)', padding: '5px 10px', borderRadius: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {skill}
                  <X size={14} style={{ cursor: 'pointer' }} onClick={() => handleRemoveSkill(skill)} />
                </div>
              ))}
              {myProfile.skills.length < 50 && (
                <input 
                  type="text" 
                  placeholder="Type a skill and press Enter..." 
                  value={newSkill}
                  onChange={e => setNewSkill(e.target.value)}
                  onKeyDown={handleAddSkill}
                  style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', outline: 'none', minWidth: '150px' }} 
                />
              )}
            </div>
          </div>

          <div>
            <label style={{ color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>Quick Blurb / Bio</label>
            <textarea rows="4" value={myProfile.bio} onChange={e => setMyProfile({...myProfile, bio: e.target.value})} style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid var(--panel-border)', background: 'rgba(0,0,0,0.3)', color: 'white', outline: 'none', resize: 'vertical' }} />
          </div>

          <button className="btn hover-glow" onClick={() => alert('Profile saved successfully!')} style={{ alignSelf: 'flex-start' }}>Save Changes</button>
        </div>
      )}
    </div>
  );
}
