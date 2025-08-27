import React, { useState } from 'react';
import { Mail, Phone, User, Calendar, Clock } from 'lucide-react';

const BookingForm = ({ selectedService, onBookingSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    date: '',
    time: '',
  });

  // Handles changes in the form input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // Handles the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (formData.name && formData.email && formData.phone && formData.date && formData.time) {
      onBookingSubmit(formData);
    } else {
      alert('Please fill out all required fields.');
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">Book {selectedService.name}</h2>
      <p className="text-gray-500 mb-6 text-center">Please provide your details, a brief description, and your preferred time slot.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form inputs */}
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="w-full px-10 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            className="w-full px-10 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="w-full px-10 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        {/* Date and time selectors */}
        <div className="flex gap-4">
          <div className="relative w-1/2">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-10 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="relative w-1/2">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="w-full px-10 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>
        <div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Tell us about your IT needs..."
            rows="4"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>
        {/* Submission and back buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-medium transition duration-300 hover:bg-gray-300"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white rounded-full font-medium shadow-md transition duration-300 hover:bg-indigo-700 hover:shadow-lg"
          >
            Submit Booking
          </button>
        </div>
      </form>
    </>
  );
};

export default BookingForm;
