import React, { useState } from 'react';

// --- STYLES ---
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import './geosearch-custom.css'; 

// --- COMPONENTS ---
import Auth from './Auth.jsx';
import BookingForm from './BookingForm.jsx';
import Confirmation from './Confirmation.jsx';
import ServiceAreaMap from './ServiceAreaMap.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx'; // Import the new Footer component

const App = () => {
  const [view, setView] = useState('map');
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', description: '', date: '', time: '',
  });

  const handleServiceSelectionComplete = (service) => {
    setSelectedService(service);
    setView('auth');
  };

  const handleAuthSuccess = () => {
    setView('booking');
  };

  const handleBookingSubmit = (data) => {
    setFormData({ ...formData, ...data });
    setView('confirmation');
  };

  const handleNewBooking = () => {
    setView('map');
    setSelectedService(null);
    setFormData({ name: '', email: '', phone: '', description: '', date: '', time: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow p-4 sm:p-8 flex items-center justify-center min-h-0">
        {view === 'map' ? (
          <div className="w-full h-full bg-white rounded-xl shadow-2xl overflow-hidden">
            <ServiceAreaMap onBookingProceed={handleServiceSelectionComplete} />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg mx-auto">
            {view === 'auth' && <Auth onAuthSuccess={handleAuthSuccess} onBack={() => setView('map')} />}
            {view === 'booking' && <BookingForm selectedService={selectedService} onBookingSubmit={handleBookingSubmit} onBack={() => setView('auth')} />}
            {view === 'confirmation' && <Confirmation formData={formData} selectedService={selectedService} onNewBooking={handleNewBooking} />}
          </div>
        )}
      </main>
      <Footer /> {/* Add the Footer component here */}
    </div>
  );
};

export default App;
