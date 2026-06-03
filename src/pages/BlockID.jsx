import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BottomNav from '../components/BottomNav';
import DigitalIDCard from '../components/DigitalIDCard';
import SettingsDrawer from '../components/SettingsDrawer';

const BlockID = () => {
  const navigate = useNavigate();
  const { userProfile, eduCompleted, currentUser } = useAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const status = eduCompleted ? "Terverifikasi" : "Belum Tervalidasi";

  return (
    <div className="min-h-screen font-body-md text-body-md bg-surface text-on-surface">
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-40 bg-surface-bright dark:bg-primary-container text-on-surface dark:text-on-primary-fixed shadow-sm flex items-center justify-between px-container-margin py-stack-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-secondary-container">
            <img
              alt="User profile photo"
              className="w-full h-full object-cover"
              src={currentUser?.photoURL || "https://lh3.googleusercontent.com/aida-public/AB6AXuCCSR6EDtppU69S19WIpW2-UZPoeTQe3tk62aiWFPuh7h5-o8BB8TWqoRc3BZ8btLvWD8X3b99gWaeZ-YC5fiaG6HZAr8Y3-318NeYl1837pvTvQESq3jwZ0oERryFcKFwG9fDgi_6ZlRTAqrFeac7cmcGVOaKoXI9l55Qnt4g_eVsbnX3zlYalyPs72Tgp4rv1ouXBooTboshjUVoTFFOBwsx4VGsY_Bz4rCf7i4RV_kxrZ7IKsi7QfsfTu4dX3covb9q38JrxEokd"}
            />
          </div>
          <h1 className="font-headline-md text-headline-md text-secondary dark:text-secondary-fixed-dim font-bold">
            BlockID
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="material-symbols-outlined p-2 hover:bg-surface-container-low dark:hover:bg-primary-fixed-variant rounded-full transition-colors duration-200">
            notifications
          </button>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="material-symbols-outlined p-2 hover:bg-surface-container-low dark:hover:bg-primary-fixed-variant rounded-full transition-colors duration-200"
          >
            settings
          </button>
        </div>
      </header>

      <main className="px-container-margin py-stack-md safe-bottom-padding">
        {/* Feature Card: Bento Hero */}
        <section className="mb-stack-lg">
          <div className="relative overflow-hidden rounded-xl bg-primary-container text-on-primary-fixed p-6 shadow-lg min-h-[180px] flex items-center">
            <div className="z-10 w-2/3">
              <p className="font-label-sm text-label-sm text-secondary-fixed mb-2 uppercase tracking-wider">
                Feature Highlight
              </p>
              <h2 className="font-headline-sm text-headline-sm text-white mb-4 leading-tight">
                Siap Kerja, Siap Hukum, Siap Beradaptasi dengan SafeTKI
              </h2>
              <button 
                onClick={() => navigate('/joblink')}
                className="bg-secondary text-white px-4 py-2 rounded-lg font-label-md text-label-md flex items-center gap-2 hover:bg-secondary-fixed hover:text-on-secondary transition-all"
              >
                Daftar Sekarang <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
            <div className="absolute right-[-20px] bottom-[-20px] opacity-40">
              <span className="material-symbols-outlined text-[180px] text-secondary-fixed opacity-20">
                shield_person
              </span>
            </div>
          </div>
        </section>

        {/* Section Title & Action */}
        <section className="flex items-center justify-between mb-stack-md">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Pengajuan Permohonan dan Status</h3>
        </section>

        {!userProfile ? (
          <div className="mb-stack-lg p-6 bg-surface-container-lowest border border-dashed border-outline-variant rounded-2xl text-center">
            <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">folder_off</span>
            <p className="font-body-md text-on-surface-variant mb-6">Belum ada permohonan aktif.</p>
            <button 
              onClick={() => navigate('/form-permohonan')}
              className="w-full bg-secondary-container text-on-secondary-container py-4 px-6 rounded-xl font-headline-sm text-headline-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-transform active:scale-95"
            >
              <span className="material-symbols-outlined">add_circle</span>
              Pengajuan Permohonan +
            </button>
          </div>
        ) : (
          <DigitalIDCard userProfile={userProfile} status={status} />
        )}
      </main>

      {/* BottomNav */}
      <BottomNav />
      <SettingsDrawer isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
};

export default BlockID;
