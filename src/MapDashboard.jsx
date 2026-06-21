import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Search, List, Globe, Calendar, ChevronDown, ChevronUp, Eye, User, MapPin } from 'lucide-react';
import { users, clusters, events, cities } from './mockData';
import UserModal from './UserModal';
import ClusterModal from './ClusterModal';
import EventModal from './EventModal';
import L from 'leaflet';

const createIcon = (color) => L.divIcon({
  className: 'custom-pin',
  html: `<svg width="30" height="30" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3" fill="white"></circle></svg>`,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

const icons = {
  group: createIcon('#3b82f6'),
  event: createIcon('#ef4444'),
  person: createIcon('#eab308')
};

const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function MapDashboard() {
  const [viewMode, setViewMode] = useState('map');
  const [timeFilter, setTimeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState([20, 0]);
  const [mapZoom, setMapZoom] = useState(2);
  
  const [selectedContinents, setSelectedContinents] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [globalSearch, setGlobalSearch] = useState('');
  
  const [isMinimized, setIsMinimized] = useState(false);
  const [showGroups, setShowGroups] = useState(true);
  const [showEvents, setShowEvents] = useState(true);
  const [showPeople, setShowPeople] = useState(true);
  
  const [activeModal, setActiveModal] = useState(null);

  const today = new Date('2026-06-20');
  
  // Derived state for dropdowns
  const continents = [...new Set(cities.map(c => c.continent))].sort();
  const countries = [...new Set(cities.filter(c => selectedContinents.length === 0 || selectedContinents.includes(c.continent)).map(c => c.country))].sort();
  const availableCities = [...cities.filter(c => 
    (selectedContinents.length === 0 || selectedContinents.includes(c.continent)) &&
    (selectedCountries.length === 0 || selectedCountries.includes(c.country))
  ).map(c => c.loc)].sort();

  // Filter Data
  const matchGlobalSearch = (item) => {
    if (!globalSearch.trim()) return true;
    const searchTerms = globalSearch.toLowerCase().split(' ').filter(Boolean);
    const itemStr = JSON.stringify(item).toLowerCase();
    return searchTerms.every(term => itemStr.includes(term));
  };

  const filterByLocation = (item) => {
    if (!matchGlobalSearch(item)) return false;
    if (selectedContinents.length > 0 && !selectedContinents.includes(item.cityData?.continent)) return false;
    if (selectedCountries.length > 0 && !selectedCountries.includes(item.cityData?.country)) return false;
    if (selectedCities.length > 0 && !selectedCities.includes(item.cityData?.loc)) return false;
    return true;
  };

  const filteredEvents = events.filter(e => {
    if (!filterByLocation(e)) return false;
    if (timeFilter === 'all') return true;
    const eventDate = new Date(e.date);
    const diffTime = Math.abs(eventDate - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= parseInt(timeFilter);
  });

  const filteredClusters = clusters.filter(filterByLocation);
  const filteredUsers = users.filter(filterByLocation);

  const handleUserClick = (u) => setActiveModal({ type: 'user', data: u });
  const handleEventClick = (e) => setActiveModal({ type: 'event', data: e });
  const handleClusterClick = (c) => setActiveModal({ type: 'cluster', data: c });
  const handleCloseModal = () => setActiveModal(null);

  const mapContent = (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      <MapContainer center={mapCenter} zoom={mapZoom} scrollWheelZoom={true} worldCopyJump={true} style={{ height: '100%', width: '100%' }}>
        <ChangeView center={mapCenter} zoom={mapZoom} />
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {showPeople && filteredUsers.map(u => (
          <Marker key={`user-${u.id}`} position={[u.lat, u.lng]} icon={icons.person}>
            <Popup>
              <div style={{ color: '#000' }}>
                <h3 style={{ margin: '0 0 5px 0' }}>{u.name}</h3>
                <p style={{ margin: '0 0 5px 0', fontSize: '13px' }}><strong>Role:</strong> {u.role}</p>
                <button className="btn" style={{ padding: '5px 10px', fontSize: '12px', marginTop: '10px' }} onClick={() => handleUserClick(u)}>View Profile</button>
              </div>
            </Popup>
          </Marker>
        ))}

        {showGroups && filteredClusters.map(c => (
          <Marker key={`cluster-${c.id}`} position={[c.lat, c.lng]} icon={icons.group}>
            <Popup>
              <div style={{ color: '#000' }}>
                <h3 style={{ margin: '0 0 5px 0' }}>{c.name}</h3>
                <p style={{ margin: '0 0 5px 0', fontSize: '13px' }}><strong>Topic:</strong> {c.topic}</p>
                <button className="btn" style={{ padding: '5px 10px', fontSize: '12px', marginTop: '10px' }} onClick={() => handleClusterClick(c)}>View Hub</button>
              </div>
            </Popup>
          </Marker>
        ))}

        {showEvents && filteredEvents.map(e => (
          <Marker key={`event-${e.id}`} position={[e.lat, e.lng]} icon={icons.event}>
            <Popup>
              <div style={{ color: '#000' }}>
                <h3 style={{ margin: '0 0 5px 0' }}>{e.title}</h3>
                <p style={{ margin: '0 0 5px 0', fontSize: '13px' }}><strong>Date:</strong> {e.date}</p>
                <button className="btn" style={{ padding: '5px 10px', fontSize: '12px', marginTop: '10px' }} onClick={() => handleEventClick(e)}>View Event</button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );

  const listContent = (
    <div style={{ height: '100%', width: '100%', overflowY: 'auto', padding: '40px', background: 'transparent' }}>
      <h2 className="text-gradient mobile-h1" style={{ fontSize: '2.5rem', marginBottom: '30px', fontWeight: '800' }}>Directory Explorer</h2>
      
      {showEvents && (
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ borderBottom: '1px solid rgba(239, 68, 68, 0.3)', paddingBottom: '12px', marginBottom: '20px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Calendar size={20} /> Upcoming Events
          </h3>
          <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
            {filteredEvents.map(e => (
              <div key={`list-event-${e.id}`} onClick={() => handleEventClick(e)} className="glass-panel hover-glow" style={{ padding: '20px', borderLeft: '4px solid #ef4444', cursor: 'pointer', background: 'rgba(239, 68, 68, 0.05)' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#fff' }}>{e.title}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{e.date} &bull; {e.location}</p>
              </div>
            ))}
            {filteredEvents.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No events found.</p>}
          </div>
        </div>
      )}

      {showGroups && (
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ borderBottom: '1px solid rgba(59, 130, 246, 0.3)', paddingBottom: '12px', marginBottom: '20px', color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Globe size={20} /> Active Hubs
          </h3>
          <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
            {filteredClusters.map(c => (
              <div key={`list-cluster-${c.id}`} onClick={() => handleClusterClick(c)} className="glass-panel hover-glow" style={{ padding: '20px', borderLeft: '4px solid #3b82f6', cursor: 'pointer', background: 'rgba(59, 130, 246, 0.05)' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#fff' }}>{c.name}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{c.topic} {c.members != null ? <>&bull; <span style={{ color: '#3b82f6' }}>{c.members} members</span></> : ''}</p>
              </div>
            ))}
            {filteredClusters.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No hubs found.</p>}
          </div>
        </div>
      )}

      {showPeople && (
        <div>
          <h3 style={{ borderBottom: '1px solid rgba(234, 179, 8, 0.3)', paddingBottom: '12px', marginBottom: '20px', color: '#eab308', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <User size={20} /> Elite Talent
          </h3>
          <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
            {filteredUsers.map(u => (
              <div key={`list-user-${u.id}`} onClick={() => handleUserClick(u)} className="glass-panel hover-glow" style={{ padding: '20px', borderLeft: '4px solid #eab308', cursor: 'pointer', background: 'rgba(234, 179, 8, 0.05)' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#fff' }}>{u.name}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}><span style={{ color: '#eab308' }}>{u.role}</span> &bull; {u.expertise}</p>
              </div>
            ))}
            {filteredUsers.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No talent found.</p>}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div id="tour-map" style={{ flex: 1, position: 'relative', display: 'flex' }}>
      {viewMode === 'map' ? mapContent : listContent}
      
      {activeModal?.type === 'user' && <UserModal user={activeModal.data} onClose={handleCloseModal} onClusterClick={handleClusterClick} onEventClick={handleEventClick} />}
      {activeModal?.type === 'event' && <EventModal event={activeModal.data} onClose={handleCloseModal} onClusterClick={handleClusterClick} onUserClick={handleUserClick} />}
      {activeModal?.type === 'cluster' && <ClusterModal cluster={activeModal.data} onClose={handleCloseModal} onEventClick={handleEventClick} onUserClick={handleUserClick} />}

      {/* Control Panel Overlay */}
      <div className="glass-panel map-controls animate-fade-in" style={{ 
        position: 'absolute', 
        top: '24px', 
        right: '24px', 
        zIndex: 1000, 
        width: isMinimized ? 'auto' : '360px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgba(10, 15, 25, 0.95)',
        boxShadow: '0 15px 35px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: isMinimized ? '12px 16px' : '24px 24px 16px 24px' }}>
          {!isMinimized && <h3 className="text-gradient" style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>Global AI Connect</h3>}
          {isMinimized && <Search size={20} className="text-gradient" />}
          <button 
            onClick={() => setIsMinimized(!isMinimized)} 
            style={{ background: 'transparent', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', display: 'flex', alignItems: 'center', marginLeft: isMinimized ? '12px' : '0', transition: 'all 0.3s ease' }}
          >
            {isMinimized ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
          </button>
        </div>

        {!isMinimized && (
          <div style={{ padding: '0 24px 24px 24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div id="tour-global-search" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  placeholder="Global Search (e.g. Karl SQL)" 
                  value={globalSearch} 
                  onChange={e => setGlobalSearch(e.target.value)} 
                  style={{ width: '100%', padding: '12px 16px 12px 36px', borderRadius: '12px', fontSize: '0.95rem', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none' }}
                />
              </div>
            </div>

            <div id="tour-directory" style={{ display: 'flex', background: 'rgba(0,0,0,0.6)', borderRadius: '12px', padding: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <button 
                style={{ flex: 1, padding: '10px', border: 'none', background: viewMode === 'map' ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(157, 78, 221, 0.2))' : 'transparent', color: viewMode === 'map' ? '#fff' : 'var(--text-muted)', borderRadius: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', transition: 'all 0.3s', fontWeight: '600' }}
                onClick={() => setViewMode('map')}
              ><Globe size={18} /> Map</button>
              <button 
                style={{ flex: 1, padding: '10px', border: 'none', background: viewMode === 'list' ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(157, 78, 221, 0.2))' : 'transparent', color: viewMode === 'list' ? '#fff' : 'var(--text-muted)', borderRadius: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', transition: 'all 0.3s', fontWeight: '600' }}
                onClick={() => setViewMode('list')}
              ><List size={18} /> Directory</button>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
                <Eye size={16} /> Visibility Layers
              </label>
              <div style={{ display: 'flex', gap: '16px', background: 'rgba(0,0,0,0.4)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input type="checkbox" checked={showGroups} onChange={e => setShowGroups(e.target.checked)} style={{ accentColor: '#3b82f6', width: '16px', height: '16px' }} />
                  <span style={{ color: '#3b82f6', fontWeight: '600' }}>Hubs</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input type="checkbox" checked={showEvents} onChange={e => setShowEvents(e.target.checked)} style={{ accentColor: '#ef4444', width: '16px', height: '16px' }} />
                  <span style={{ color: '#ef4444', fontWeight: '600' }}>Events</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input type="checkbox" checked={showPeople} onChange={e => setShowPeople(e.target.checked)} style={{ accentColor: '#eab308', width: '16px', height: '16px' }} />
                  <span style={{ color: '#eab308', fontWeight: '600' }}>Talent</span>
                </label>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
                <MapPin size={16} /> Location Filters
              </label>
              <div id="tour-filters" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <select 
                  multiple
                  value={selectedContinents} 
                  onChange={e => setSelectedContinents(Array.from(e.target.selectedOptions, option => option.value))}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', fontSize: '0.95rem', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none', height: '80px' }}
                >
                  {continents.map(c => <option key={c} value={c} style={{ background: selectedContinents.includes(c) ? 'rgba(59, 130, 246, 0.4)' : 'transparent', color: '#fff', padding: '4px 8px', borderRadius: '4px' }}>{c}</option>)}
                </select>
                
                <select 
                  multiple
                  value={selectedCountries} 
                  onChange={e => setSelectedCountries(Array.from(e.target.selectedOptions, option => option.value))}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', fontSize: '0.95rem', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none', height: '80px' }}
                >
                  {countries.map(c => <option key={c} value={c} style={{ background: selectedCountries.includes(c) ? 'rgba(59, 130, 246, 0.4)' : 'transparent', color: '#fff', padding: '4px 8px', borderRadius: '4px' }}>{c}</option>)}
                </select>

                <select 
                  multiple
                  value={selectedCities} 
                  onChange={e => setSelectedCities(Array.from(e.target.selectedOptions, option => option.value))}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', fontSize: '0.95rem', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none', height: '80px' }}
                >
                  {availableCities.map(c => <option key={c} value={c} style={{ background: selectedCities.includes(c) ? 'rgba(59, 130, 246, 0.4)' : 'transparent', color: '#fff', padding: '4px 8px', borderRadius: '4px' }}>{c}</option>)}
                </select>
              </div>
              <div style={{ marginTop: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Hold Ctrl (Cmd on Mac) to select multiple items.
              </div>
            </div>

            {showEvents && (
              <div id="tour-events">
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  <Calendar size={16} /> Event Timeline
                </label>
                <select 
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.6)', color: 'white', outline: 'none', cursor: 'pointer', fontSize: '0.95rem' }}
                >
                  <option value="30" style={{ background: '#111827', color: '#fff' }}>Next 30 Days</option>
                  <option value="90" style={{ background: '#111827', color: '#fff' }}>Next 90 Days</option>
                  <option value="180" style={{ background: '#111827', color: '#fff' }}>Next 180 Days</option>
                  <option value="all" style={{ background: '#111827', color: '#fff' }}>All Future Events</option>
                </select>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
