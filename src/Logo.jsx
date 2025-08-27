import React from 'react';

// You can replace the content of this component with your actual SVG or an <img> tag.
const Logo = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Placeholder for the V4IT logo image */}
      <div className="text-5xl font-bold">
        <span className="text-cyan-500">V4</span>
        <span className="text-blue-800">IT</span>
      </div>
      <p className="text-sm font-semibold text-blue-800 tracking-widest mt-1">'IT' is for you!</p>
      <p className="text-xl font-bold text-gray-700 tracking-wider mt-2">138 400</p>
    </div>
  );
};

export default Logo;