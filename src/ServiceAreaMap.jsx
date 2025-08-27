import React, { useState, useEffect, useRef, memo } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import IssueSelector from './IssueSelector.jsx';
import SupportTypeSelector from './SupportTypeSelector.jsx';
import SearchBar from './SearchBar.jsx';

// --- CONFIGURATION & LOGIC ---
const SERVICE_CENTER = { lat: -37.8768, lng: 145.1653 };
const SERVICE_RADIUS_METERS = 25000;
const isWithinServiceArea = (point) => {
  const center = L.latLng(SERVICE_CENTER.lat, SERVICE_CENTER.lng);
  const selectedPoint = L.latLng(point.lat, point.lng);
  return center.distanceTo(selectedPoint) <= SERVICE_RADIUS_METERS;
};
const markerPng = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
const markerPng2x = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png';
const defaultDivIcon = L.divIcon({
  className: 'custom-leaflet-marker',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  html: `<div class="marker-shell"><img class="marker-img" src="${markerPng}" srcset="${markerPng2x} 2x" alt="" draggable="false"/></div>`,
});

// --- CHILD COMPONENTS ---
const AnimatedMarker = memo(({ position }) => {
  const markerRef = useRef(null);
  const map = useMap();
  const popAnimate = () => {
    const el = markerRef.current?.getElement();
    if (!el) return;
    const img = el.querySelector('.marker-img');
    if (!img) return;
    img.classList.remove('marker-pop');
    void img.offsetWidth;
    img.classList.add('marker-pop');
  };
  useEffect(() => {
    if (!markerRef.current) {
      markerRef.current = L.marker(position, { icon: defaultDivIcon, keyboard: false }).addTo(map);
    }
    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
    };
  }, [map]);
  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) return;
    marker.setLatLng(position);
    map.flyTo(position, map.getZoom());
    popAnimate();
  }, [position, map]);
  return null;
});
const MapEvents = ({ onLocationFound }) => {
  useMapEvents({ click(e) { onLocationFound(e.latlng); } });
  return null;
};

// --- MAIN COMPONENT ---
const ServiceAreaMap = ({ onBookingProceed, onFirstInteraction }) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [isServiceable, setIsServiceable] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [step, setStep] = useState('selectIssue');
  const hasInteracted = useRef(false); // Ref to track the first interaction

  const handleLocationFound = (location) => {
    // If this is the first time the user interacts, call the function to close the popup
    if (!hasInteracted.current) {
      onFirstInteraction();
      hasInteracted.current = true;
    }

    const next = { lat: location.lat, lng: location.lng };
    setMarkerPosition(next);
    setIsServiceable(isWithinServiceArea(next));
  };

  const handleIssueSelect = (issue) => {
    setSelectedIssue(issue);
  };

  const handleIssueNext = () => {
    setStep('selectSupport');
  };

  const handleSupportNext = (finalService) => {
    onBookingProceed(finalService);
  };

  return (
    <div className="flex w-full h-full">
      {/* Map and Search Section */}
      <div className="w-full md:w-3/4 flex flex-col relative">
        <div className="flex-grow">
          <MapContainer center={SERVICE_CENTER} zoom={10} style={{ height: '100%', width: '100%' }} zoomControl={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
            <MapEvents onLocationFound={handleLocationFound} />
            {markerPosition && <AnimatedMarker position={markerPosition} />}
          </MapContainer>
        </div>
        <SearchBar onLocationFound={handleLocationFound} />
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/4 border-l">
        {step === 'selectIssue' && (
          <IssueSelector
            onIssueSelect={handleIssueSelect}
            selectedIssue={selectedIssue}
            onNext={handleIssueNext}
            isServiceable={isServiceable}
          />
        )}
        {step === 'selectSupport' && (
          <SupportTypeSelector
            selectedIssue={selectedIssue}
            onSupportTypeSelect={handleSupportNext}
            onBack={() => setStep('selectIssue')}
            isServiceable={isServiceable}
          />
        )}
      </div>
    </div>
  );
};

export default ServiceAreaMap;
