import React from 'react';

const SafeSOS = () => {
  return (
    <div className="fixed bottom-24 right-6 z-50">
      <button className="bg-error p-4 rounded-full shadow-xl text-white hover:scale-110 active:scale-90 transition-transform flex items-center justify-center animate-pulse">
        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          emergency_home
        </span>
      </button>
    </div>
  );
};

export default SafeSOS;
