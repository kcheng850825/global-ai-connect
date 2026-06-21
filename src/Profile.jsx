import React, { useState } from 'react';
import { User, Sparkles, Upload } from 'lucide-react';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('extract'); // 'view' or 'extract'
  
  // Extraction State
  const [rawText, setRawText] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionResult, setExtractionResult] = useState(null);

  const handleExtraction = () => {
    setIsExtracting(true);
    setExtractionResult(null);

    setTimeout(() => {
      setExtractionResult({
        name: "Demo User",
        role: "Senior AI Engineer",
        expertise: "Generative AI, Large Language Models, Multi-Agent Systems",
        location: "San Francisco, CA",
        nomadStatus: "Stationary",
        lookingFor: lookingFor || "Looking to co-found a cutting-edge GenAI startup focusing on agentic workflows and automated reasoning.",
        degrees: ["MS Artificial Intelligence", "BS Computer Science (Honors)"],
        certificates: ["AWS Certified Machine Learning – Specialty", "DeepLearning.AI TensorFlow Developer"],
        inferredSynergies: ["MLOps Infrastructure", "Product Strategy", "Research & Development"]
      });
      setIsExtracting(false);
    }, 1500);
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setRawText((prev) => prev + `\n[Extracted from uploaded file: ${file.name}]\nI have a BS in Computer Science from Stanford and an AWS Machine Learning certification. I work as an MLOps Engineer in New York.`);
      alert("File uploaded. (Simulated text extraction for PDF applied).");
    }
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

          {extractionResult && (
            <div style={{ marginTop: '20px', padding: '20px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid var(--accent-cyan)' }}>
              <h3 style={{ marginBottom: '15px', color: 'var(--accent-cyan)' }}>Extracted Candidate Profile JSON</h3>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.85rem' }}>
                {JSON.stringify(extractionResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}

      {activeTab === 'view' && (
        <div style={{ color: 'var(--text-muted)' }}>
          <p>Your current public profile will appear here. Use the GenAI Extraction tab to update it from your resume or LinkedIn!</p>
        </div>
      )}
    </div>
  );
}
