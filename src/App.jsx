import React, { useState } from 'react';
import Header from './Header.jsx'; // Import the new Header component
import Auth from './Auth.jsx';
import BookingForm from './BookingForm.jsx';
import Confirmation from './Confirmation.jsx';
import Services from './Services.jsx';

// Main application component for the booking portal
const App = () => {
  // Use a switch-case pattern for managing different views in the app
  const [view, setView] = useState('services'); // 'services', 'auth', 'booking', 'confirmation'
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    date: '',
    time: '',
  });

  // ... (keep all your existing handler functions: handleServiceSelect, handleAuthSuccess, etc.)
  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setView('auth');
  };

  const handleAuthSuccess = () => {
    setView('booking');
  };

  const handleBookingSubmit = (data) => {
    console.log('Booking submitted:', {
      service: selectedService.name,
      ...data,
    });
    setFormData({ ...formData, ...data });
    setView('confirmation');
  };

  const handleNewBooking = () => {
    setView('services');
    setFormData({
      name: '',
      email: '',
      phone: '',
      description: '',
      date: '',
      time: '',
    });
    setSelectedService(null);
  };


  const renderView = () => {
    switch (view) {
      case 'services':
        return <Services onServiceSelect={handleServiceSelect} />;
      case 'auth':
        return <Auth onAuthSuccess={handleAuthSuccess} onBack={() => setView('services')} />;
      case 'booking':
        return (
          <BookingForm
            selectedService={selectedService}
            onBookingSubmit={handleBookingSubmit}
            onBack={() => setView('auth')}
          />
        );
      case 'confirmation':
        return <Confirmation formData={formData} selectedService={selectedService} onNewBooking={handleNewBooking} />;
      default:
        return null;
    }
  };

  return (
    // Changed the main div to a fragment <> to allow Header and the portal to coexist
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex items-center justify-center font-['Inter']">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl mt-[-10vh]"> 
          {/* Added a negative margin-top to pull the card up slightly */}
          {renderView()}
        </div>
      </div>
    </>
  );
};

export default App;