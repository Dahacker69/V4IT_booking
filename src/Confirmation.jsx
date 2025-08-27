import React from 'react';
import { CheckCircle } from 'lucide-react';

const Confirmation = ({ formData, selectedService, onNewBooking }) => {
  return (
    <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-lg">
      <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
      <p className="text-gray-600">Thank you, {formData.name}, for your request. We have received your booking for:</p>
      <p className="text-indigo-600 font-bold mt-2 text-xl">{selectedService.name}</p>
      <p className="text-sm text-gray-500 mt-4">
        We will contact you shortly to confirm the appointment on **{formData.date}** at **{formData.time}**.
      </p>
      <p className="text-sm text-gray-500 mt-2">
        A V4 Services team member will be in touch via email at <span className="font-semibold text-gray-800">{formData.email}</span> or phone at <span className="font-semibold text-gray-800">{formData.phone}</span>.
      </p>
      <button
        onClick={onNewBooking}
        className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-full font-medium shadow-md transition duration-300 hover:bg-indigo-700 hover:shadow-lg"
      >
        Start New Booking
      </button>
    </div>
  );
};

export default Confirmation;
