import React, { useState } from 'react';
import { Phone, Lock } from 'lucide-react';

const Auth = ({ onAuthSuccess, onBack }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Simulates sending an OTP to the phone number
  const handleSendOtp = () => {
    setError('');
    if (phoneNumber.length < 10) {
      setError('Please enter a valid phone number.');
      return;
    }
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      console.log(`OTP sent to ${phoneNumber}`);
      setLoading(false);
      setOtpSent(true);
    }, 1500);
  };

  // Simulates verifying the OTP
  const handleVerifyOtp = () => {
    setError('');
    setLoading(true);
    // Simulate API call and OTP validation
    setTimeout(() => {
      // In a real app, you'd check against the OTP sent by the server
      const isValid = otp === '123456'; // Placeholder for demonstration
      if (isValid) {
        setLoading(false);
        onAuthSuccess();
      } else {
        setLoading(false);
        setError('Invalid OTP. Please try again.');
      }
    }, 1500);
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">Sign In to Book</h2>
      <p className="text-gray-500 mb-6 text-center">Please enter your phone number to receive a verification code.</p>
      <div className="space-y-4">
        {!otpSent ? (
          <>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
                className="w-full px-10 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-full font-medium shadow-md transition duration-300 hover:bg-indigo-700 hover:shadow-lg disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </>
        ) : (
          <>
            <p className="text-center text-gray-600">Enter the 6-digit code sent to your phone number.</p>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full px-10 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                maxLength="6"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-full font-medium shadow-md transition duration-300 hover:bg-indigo-700 hover:shadow-lg disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <p className="text-center text-sm text-indigo-600 cursor-pointer hover:underline" onClick={() => setOtpSent(false)}>
              Back
            </p>
          </>
        )}
      </div>
      <div className="flex justify-between items-center mt-6">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-medium transition duration-300 hover:bg-gray-300"
        >
          Back
        </button>
      </div>
    </>
  );
};

export default Auth;
