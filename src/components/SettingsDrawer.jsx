import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SettingsDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, userProfile, setUserProfile, logout } = useAuth();
  
  // Local form state for profile
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [alamat, setAlamat] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  
  // Local state for security
  const [emergencyNumber, setEmergencyNumber] = useState(() => {
    return localStorage.getItem('emergencyNumber') || '';
  });

  // Collapsible accordion states
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  
  // Settings state
  const [language, setLanguage] = useState('ID');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Synchronize form states with auth state when drawer opens
  useEffect(() => {
    if (isOpen && currentUser) {
      setNama(currentUser.displayName || '');
      setEmail(currentUser.email || '');
      setPhotoURL(currentUser.photoURL || '');
      if (userProfile) {
        setAlamat(userProfile.alamat || '');
      } else {
        setAlamat('');
      }
    }
  }, [isOpen, currentUser, userProfile]);

  // Sync dark mode state with document class list
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, [isOpen]);

  const handleProfileImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setPhotoURL(previewUrl);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    
    // Update currentUser state
    setCurrentUser({
      ...currentUser,
      displayName: nama,
      email: email,
      photoURL: photoURL
    });

    // Update userProfile if it exists
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        nama: nama,
        alamat: alamat
      });
    }

    setSuccessMsg('Profil berhasil diperbarui!');
    setTimeout(() => {
      setSuccessMsg('');
    }, 3000);
  };

  const handleSaveSecurity = (e) => {
    e.preventDefault();
    localStorage.setItem('emergencyNumber', emergencyNumber);
    setSuccessMsg('Kontak darurat berhasil disimpan!');
    setTimeout(() => {
      setSuccessMsg('');
    }, 3000);
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ID' ? 'EN' : 'ID'));
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    logout();
    onClose();
    navigate('/login');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-body-md">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/55 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        <div className="w-screen max-w-md bg-surface dark:bg-[#131b2e] text-on-surface dark:text-surface-bright shadow-2xl flex flex-col h-full border-l border-outline-variant/20 transition-transform duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-outline-variant/20 flex justify-between items-center bg-surface-bright dark:bg-primary-container">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary dark:text-secondary-fixed-dim">settings</span>
              <h3 className="font-headline-sm text-headline-sm font-bold">Pengaturan Aplikasi</h3>
            </div>
            <button 
              onClick={onClose}
              className="material-symbols-outlined p-2 hover:bg-surface-container-low dark:hover:bg-primary-fixed-variant rounded-full transition-colors"
            >
              close
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Success Message Alert */}
            {successMsg && (
              <div className="p-3 bg-secondary-container text-on-secondary-container rounded-xl flex items-center gap-2 text-label-sm shadow-sm animate-fade-in">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>{successMsg}</span>
              </div>
            )}

            {/* ACCORDION 1: EDIT PROFIL */}
            <section className="bg-surface-container-lowest dark:bg-surface-container-lowest/5 rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
              <button 
                type="button"
                onClick={() => setIsEditProfileOpen(!isEditProfileOpen)}
                className="w-full flex items-center justify-between p-5 font-bold text-on-surface dark:text-surface-bright hover:bg-surface-container-low dark:hover:bg-primary-fixed-variant transition-colors"
              >
                <div className="flex items-center gap-2 text-secondary dark:text-secondary-fixed-dim">
                  <span className="material-symbols-outlined text-[20px]">person</span>
                  <span className="font-label-md text-label-md">Edit Profil</span>
                </div>
                <span className={`material-symbols-outlined transition-transform duration-200 ${isEditProfileOpen ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>
              
              {isEditProfileOpen && (
                <div className="p-5 border-t border-outline-variant/10 bg-surface-bright/30 dark:bg-primary-container/20 space-y-4 animate-slide-down">
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    {/* Profile Photo Upload */}
                    <div className="flex items-center gap-4 py-2">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-secondary-container bg-surface-container-high relative">
                        <img 
                          src={photoURL || "https://via.placeholder.com/150"} 
                          alt="Avatar" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <label 
                          htmlFor="profile-image-upload" 
                          className="inline-flex items-center gap-2 px-3 py-2 bg-[#006b5f]/10 dark:bg-[#6df5e1]/10 text-secondary dark:text-secondary-fixed-dim hover:bg-secondary/20 rounded-xl cursor-pointer font-label-sm text-label-sm transition-all"
                        >
                          <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                          <span>Ubah Foto Profil</span>
                        </label>
                        <input 
                          type="file" 
                          id="profile-image-upload" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleProfileImageChange}
                        />
                        <p className="text-[10px] text-outline mt-1">Format: JPG, PNG. Maksimal 2MB</p>
                      </div>
                    </div>

                    {/* Nama Lengkap */}
                    <div className="space-y-1">
                      <label className="font-label-sm text-label-sm text-on-surface-variant">Nama Lengkap</label>
                      <input 
                        type="text" 
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        required
                        className="w-full p-2.5 bg-surface dark:bg-[#1e293b] border border-outline-variant rounded-xl focus:ring-2 focus:ring-secondary outline-none text-body-sm transition-all text-on-surface dark:text-white"
                        placeholder="Nama Lengkap"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="font-label-sm text-label-sm text-on-surface-variant">Email</label>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2.5 bg-surface dark:bg-[#1e293b] border border-outline-variant rounded-xl focus:ring-2 focus:ring-secondary outline-none text-body-sm transition-all text-on-surface dark:text-white"
                        placeholder="email@example.com"
                      />
                    </div>

                    {/* Alamat Domisili */}
                    <div className="space-y-1">
                      <label className="font-label-sm text-label-sm text-on-surface-variant">Alamat Domisili</label>
                      <textarea 
                        value={alamat}
                        onChange={(e) => setAlamat(e.target.value)}
                        rows="2"
                        className="w-full p-2.5 bg-surface dark:bg-[#1e293b] border border-outline-variant rounded-xl focus:ring-2 focus:ring-secondary outline-none text-body-sm transition-all resize-none text-on-surface dark:text-white"
                        placeholder="Alamat domisili saat ini"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#006b5f] text-white py-2.5 rounded-xl font-label-md text-label-md hover:bg-[#005048] active:scale-95 transition-all shadow-sm"
                    >
                      Simpan Perubahan
                    </button>
                  </form>
                </div>
              )}
            </section>

            {/* ACCORDION 2: KEAMANAN & KONTAK DARURAT */}
            <section className="bg-surface-container-lowest dark:bg-surface-container-lowest/5 rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
              <button 
                type="button"
                onClick={() => setIsSecurityOpen(!isSecurityOpen)}
                className="w-full flex items-center justify-between p-5 font-bold text-on-surface dark:text-surface-bright hover:bg-surface-container-low dark:hover:bg-primary-fixed-variant transition-colors"
              >
                <div className="flex items-center gap-2 text-secondary dark:text-secondary-fixed-dim">
                  <span className="material-symbols-outlined text-[20px]">security</span>
                  <span className="font-label-md text-label-md">Keamanan & Kontak Darurat</span>
                </div>
                <span className={`material-symbols-outlined transition-transform duration-200 ${isSecurityOpen ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>
              
              {isSecurityOpen && (
                <div className="p-5 border-t border-outline-variant/10 bg-surface-bright/30 dark:bg-primary-container/20 space-y-4 animate-slide-down">
                  <form onSubmit={handleSaveSecurity} className="space-y-4">
                    <div className="space-y-1">
                      <label className="font-label-sm text-label-sm text-on-surface-variant">Nomor Darurat Keluarga</label>
                      <input 
                        type="text" 
                        value={emergencyNumber}
                        onChange={(e) => setEmergencyNumber(e.target.value)}
                        className="w-full p-2.5 bg-surface dark:bg-[#1e293b] border border-outline-variant rounded-xl focus:ring-2 focus:ring-secondary outline-none text-body-sm transition-all text-on-surface dark:text-white"
                        placeholder="Contoh: +6281234567890"
                      />
                      <p className="text-[10px] text-outline mt-1">Nomor ini akan digunakan sebagai rujukan cepat pada menu SafeSOS.</p>
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-[#006b5f] text-white py-2.5 rounded-xl font-label-md text-label-md hover:bg-[#005048] active:scale-95 transition-all shadow-sm"
                    >
                      Simpan Kontak Darurat
                    </button>
                  </form>
                </div>
              )}
            </section>

            {/* MENU 3: TRANSLATE BAHASA */}
            <section className="bg-surface-container-lowest dark:bg-surface-container-lowest/5 p-5 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary dark:text-secondary-fixed-dim">translate</span>
                <span className="font-label-md text-label-md">Bahasa Aplikasi</span>
              </div>
              <button 
                type="button"
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#006b5f]/10 text-secondary dark:text-secondary-fixed-dim font-bold rounded-full text-label-sm border border-[#006b5f]/20 hover:bg-[#006b5f]/20 transition-all"
              >
                <span>{language === 'ID' ? 'Bahasa Indonesia' : 'English'}</span>
                <span className="material-symbols-outlined text-[16px]">sync</span>
              </button>
            </section>

            {/* MENU 4: THEME MODE */}
            <section className="bg-surface-container-lowest dark:bg-surface-container-lowest/5 p-5 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary dark:text-secondary-fixed-dim">
                  {isDarkMode ? 'dark_mode' : 'light_mode'}
                </span>
                <span className="font-label-md text-label-md">Mode Tampilan</span>
              </div>
              
              {/* Toggle Switch */}
              <button 
                type="button"
                onClick={toggleDarkMode}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${isDarkMode ? 'bg-[#006b5f]' : 'bg-outline-variant'}`}
              >
                <span 
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`}
                />
              </button>
            </section>

          </div>

          {/* Footer with Logout Button */}
          <div className="p-5 border-t border-outline-variant/20 bg-surface-bright dark:bg-primary-container mt-auto">
            <button 
              type="button"
              onClick={handleLogoutClick}
              className="w-full bg-[#ba1a1a] hover:bg-[#93000a] text-white py-3.5 rounded-xl font-headline-sm text-headline-sm font-semibold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined">logout</span>
              <span>Keluar dari Aplikasi</span>
            </button>
          </div>

        </div>
      </div>

      {/* CONFIRMATION LOGOUT MODAL */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowLogoutConfirm(false)}
          />
          <div className="relative bg-surface dark:bg-[#131b2e] text-on-surface dark:text-surface-bright p-6 rounded-2xl shadow-2xl max-w-sm w-full border border-outline-variant/30 space-y-5 animate-fade-in">
            <div className="flex flex-col items-center text-center space-y-2">
              <span className="material-symbols-outlined text-5xl text-[#ba1a1a]">warning</span>
              <h4 className="font-headline-sm text-headline-sm font-bold">Konfirmasi Keluar</h4>
              <p className="font-body-sm text-body-sm text-outline">
                Apakah Anda yakin ingin keluar dari aplikasi SafeTKI? Sesi Anda akan berakhir.
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="w-1/2 border border-outline-variant py-3 rounded-xl font-label-md text-label-md hover:bg-surface-container-low transition-all text-on-surface dark:text-white"
              >
                Batal
              </button>
              <button 
                type="button"
                onClick={handleConfirmLogout}
                className="w-1/2 bg-[#ba1a1a] hover:bg-[#93000a] text-white py-3 rounded-xl font-label-md text-label-md shadow-md active:scale-95 transition-all"
              >
                Yakin, Keluar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SettingsDrawer;
