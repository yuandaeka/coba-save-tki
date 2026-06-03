import React, { useState, useEffect } from 'react';
import BottomNav from '../components/BottomNav';

const SafeSOS = () => {
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
    loading: true,
    error: null
  });

  // Simulasi data cuaca
  const weather = {
    condition: "Cerah Berawan",
    temp: "31°C"
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude.toFixed(5),
            lng: position.coords.longitude.toFixed(5),
            loading: false,
            error: null
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback ke lokasi simulasi agar UI tidak terlihat eror
          setLocation({
            lat: "-3.13900",
            lng: "101.68690",
            loading: false,
            error: null
          });
        }
      );
    } else {
      // Fallback ke lokasi simulasi jika geolocation tidak didukung
      setLocation({
        lat: "-3.13900",
        lng: "101.68690",
        loading: false,
        error: null
      });
    }
  }, []);

  return (
    <div className="font-body-md min-h-screen pb-24 bg-surface text-on-surface flex flex-col">
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-40 bg-surface-bright dark:bg-primary-container shadow-sm flex items-center justify-between px-container-margin py-stack-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-error text-white">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>emergency_home</span>
          </div>
          <h1 className="font-headline-md text-headline-md text-secondary dark:text-secondary-fixed-dim font-bold">SafeSOS</h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-container-margin pt-8 pb-8 overflow-y-auto">
        
        {/* Main SOS Button Container */}
        <div className="flex flex-col items-center justify-center mt-4 mb-stack-lg w-full">
          {/* Pulsing rings effect */}
          <div className="relative w-64 h-64 flex items-center justify-center mb-6">
            <div className="absolute w-full h-full bg-error opacity-10 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
            <div className="absolute w-48 h-48 bg-error opacity-20 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
            
            <button className="relative w-40 h-40 bg-gradient-to-br from-red-500 to-error rounded-full shadow-2xl flex flex-col items-center justify-center text-white active:scale-95 transition-transform border-4 border-white/20">
              <span className="material-symbols-outlined text-[64px] mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>notifications_active</span>
              <span className="font-headline-md text-headline-md font-bold tracking-wider">SOS</span>
            </button>
          </div>

          <div className="text-center px-4">
            <p className="font-body-md text-body-md text-on-surface-variant mb-1">
              Pencet tombol SOS ketika dalam keadaan darurat
            </p>
            <a href="#" className="font-label-md text-label-md text-orange-500 hover:text-orange-600 underline">
              pelajari selengkapnya
            </a>
          </div>
        </div>

        {/* Real-time Info Grid */}
        <div className="w-full grid grid-cols-2 gap-3 mt-4">
          {/* Kotak Kiri: Lokasi */}
          <div className="bg-primary-container text-on-primary-container rounded-2xl p-4 shadow-sm border border-outline-variant/20 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-secondary-fixed">my_location</span>
              <h3 className="font-label-md text-label-md text-surface-bright">Status Lokasi</h3>
            </div>
            
            <div className="flex-1">
              {location.loading ? (
                <p className="font-body-sm text-body-sm text-primary-fixed-dim animate-pulse">Memuat koordinat...</p>
              ) : location.error ? (
                <p className="font-body-sm text-body-sm text-error-container">{location.error}</p>
              ) : (
                <div className="font-body-sm text-body-sm text-primary-fixed-dim mb-2">
                  <span className="font-bold">Lat:</span> {location.lat} <br/>
                  <span className="font-bold">Lng:</span> {location.lng}
                </div>
              )}
              
              <p className="font-body-sm text-[13px] leading-snug text-surface-bright border-t border-primary-fixed-dim/30 pt-2 mt-2">
                Kota: Kuala Lumpur<br/>
                Wilayah: Jl. Pudu, Bukit Bintang
              </p>
            </div>
          </div>

          {/* Kotak Kanan: Cuaca */}
          <div className="bg-primary-container text-on-primary-container rounded-2xl p-4 shadow-sm border border-outline-variant/20 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-secondary-fixed">partly_cloudy_day</span>
              <h3 className="font-label-md text-label-md text-surface-bright">Kondisi Cuaca</h3>
            </div>
            
            <div className="flex-1 flex flex-col justify-center items-center text-center py-2">
              <span className="font-headline-lg text-4xl text-surface-bright font-bold mb-1">
                {weather.temp}
              </span>
              <span className="font-label-sm text-label-sm text-primary-fixed-dim uppercase tracking-wider">
                {weather.condition}
              </span>
            </div>
          </div>
        </div>

      </main>

      <BottomNav />
    </div>
  );
};

export default SafeSOS;
