import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();

  const getNavClass = (path) => {
    const baseClass = "flex flex-col items-center justify-center font-label-sm text-label-sm transition-transform duration-150";
    if (location.pathname === path) {
      return `${baseClass} text-secondary-fixed dark:text-secondary-fixed-dim font-bold scale-105`;
    }
    return `${baseClass} text-on-primary-container dark:text-on-primary-fixed-variant opacity-70 hover:opacity-100 active:scale-90`;
  };

  return (
    <nav className="fixed bottom-0 w-full z-40 rounded-t-xl bg-primary-container dark:bg-primary-container shadow-lg flex justify-around items-end pb-4 pt-2 px-2">
      <Link to="/dashboard" className={getNavClass('/dashboard')}>
        <span className="material-symbols-outlined">home</span>
        <span>Beranda</span>
      </Link>
      <Link to="/eduprep" className={getNavClass('/eduprep')}>
        <span className="material-symbols-outlined">school</span>
        <span>Edu</span>
      </Link>
      {/* Active Tab Logic can be updated, let's keep Tanya AI active in its own route */}
      <Link to="/lexai" className={getNavClass('/lexai')}>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
        <span>Tanya AI</span>
      </Link>
      <Link to="/joblink" className={getNavClass('/joblink')}>
        <span className="material-symbols-outlined">work</span>
        <span>Kerja</span>
      </Link>
      <Link to="/safesos" className={getNavClass('/safesos')}>
        <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>emergency_home</span>
        <span className="text-error">SOS</span>
      </Link>
    </nav>
  );
};

export default BottomNav;
