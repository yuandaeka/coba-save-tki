import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import BottomNav from '../components/BottomNav';
import SettingsDrawer from '../components/SettingsDrawer';

const EduPrep = () => {
  const { eduCompleted, setEduCompleted, currentUser } = useAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  return (
    <div className="font-body-md text-on-background min-h-screen pb-24 bg-surface text-on-surface">
      <SettingsDrawer isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-40 bg-surface-bright shadow-sm flex items-center justify-between px-container-margin py-stack-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-highest border-2 border-secondary-container">
            <img
              alt="User Profile"
              className="w-full h-full object-cover"
              src={currentUser?.photoURL || "https://lh3.googleusercontent.com/aida-public/AB6AXuCCSR6EDtppU69S19WIpW2-UZPoeTQe3tk62aiWFPuh7h5-o8BB8TWqoRc3BZ8btLvWD8X3b99gWaeZ-YC5fiaG6HZAr8Y3-318NeYl1837pvTvQESq3jwZ0oERryFcKFwG9fDgi_6ZlRTAqrFeac7cmcGVOaKoXI9l55Qnt4g_eVsbnX3zlYalyPs72Tgp4rv1ouXBooTboshjUVoTFFOBwsx4VGsY_Bz4rCf7i4RV_kxrZ7IKsi7QfsfTu4dX3covb9q38JrxEokd"}
            />
          </div>
          <h1 className="font-headline-md text-headline-md text-secondary font-bold">EduPrep</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="material-symbols-outlined text-on-surface transition-colors duration-200 hover:bg-surface-container-low p-2 rounded-full">
            notifications
          </button>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="material-symbols-outlined text-on-surface transition-colors duration-200 hover:bg-surface-container-low p-2 rounded-full"
          >
            settings
          </button>
        </div>
      </header>

      <main className="px-container-margin py-stack-lg mb-24">
        {/* Hero Section */}
        <section className="mb-stack-lg">
          <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-md">
            <img
              alt="EduPrep Banner"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlDbgaicb2zsWSQYdyDhN06CRV46T1OLGH_5O-VJmtFTWf5sfsU8A9m38cRs1BHBT59wgAHoc2Gc_1zABdr5UdrlUZlt1nU0gmHPx7Lf8dGsQTFfBIpRD58TisJaEjVeuSuSB-r0YwC62hmMvCpT02P6gshhbkP0TgbU1ikSR6akrxDLlvBEb-wTl-GtOBo9dTMm5O4kJFgBuzxn50lNtUr7eHXAxVfzkbvmLXAD2epIsHacsJuzcrpSb4qeq3SpOwOu_kc8-6rGl8"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-container/90 to-transparent flex flex-col justify-center px-6">
              <span className="bg-secondary-container text-on-secondary-container text-label-sm font-label-sm px-3 py-1 rounded-full w-fit mb-2">
                Program Unggulan
              </span>
              <h2 className="font-headline-sm text-headline-sm text-surface-bright leading-tight max-w-[200px]">
                Siapkan Diri, Amankan Masa Depan
              </h2>
            </div>
          </div>
        </section>

        {/* Educational Cards List */}
        <div className="space-y-gutter">
          {/* Card 1 */}
          <div className="glass-card rounded-xl overflow-hidden shadow-sm flex h-40 transition-transform active:scale-[0.98]">
            <div className="flex-1 p-4 flex flex-col justify-center">
              <h3 className="font-headline-sm text-label-md text-on-surface mb-1">Literasi Hukum dan Perlindungan</h3>
              <p className="font-body-sm text-label-sm text-outline leading-snug">
                Memahami Hukum dan Hak Asasi Migran secara menyeluruh.
              </p>
              <div className="mt-3 flex items-center text-secondary font-label-sm text-label-sm">
                <span>Pelajari Sekarang</span>
                <span className="material-symbols-outlined text-[18px] ml-1">arrow_forward</span>
              </div>
            </div>
            <div className="w-1/3 bg-surface-container-highest relative overflow-hidden">
              <img
                alt="Law and Rights"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDz4_JAAsFGj7DiOaGs3kBt_DiKirBNDj_DwagFcFQusIHpSf9ms-Ym0W-kBYw02Msw4doopkBcjJ8am4P4RL8kPReejLfNfdLK09HF2EDAjhVsesLbo4qP0i68qduuShmj837x83ffZMpbVmXX3KbwydJTHG5jlkGYDPbmlU_3orVkkprhdgCUnebX4LeWaxEVq_4rLtguyRP0K4ewZJtpaUd_jkz8Dt-schQDmqLOTqcPwzdNNd3-Hv6JChvoqz6NA4PW88YL-6NP"
              />
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-card rounded-xl overflow-hidden shadow-sm flex h-40 transition-transform active:scale-[0.98]">
            <div className="flex-1 p-4 flex flex-col justify-center">
              <h3 className="font-headline-sm text-label-md text-on-surface mb-1">Kesiapan Profesional dan Teknis</h3>
              <p className="font-body-sm text-label-sm text-outline leading-snug">
                Standarisasi keahlian untuk standar kerja internasional.
              </p>
              <div className="mt-3 flex items-center text-secondary font-label-sm text-label-sm">
                <span>Lihat Modul</span>
                <span className="material-symbols-outlined text-[18px] ml-1">arrow_forward</span>
              </div>
            </div>
            <div className="w-1/3 bg-surface-container-highest relative overflow-hidden">
              <img
                alt="Professional Readiness"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGUQbrsvzF_J5GQRCrO41aMgyeswD9wWgdt8weu2wkPrvWEQIYqPKwQI9vYcn1_rQ_FAw2BFMzJllpz4oZUCJt6Ns5CRwQ8Hr-s5UKmgVMT9s-ghfoo0hRES6iavsuvNnEUn3gtQb9hwyLmVUSSYFiyWlYhNXdDBc4ZeiGmc8bahb5siXt67uO4gqFeurgsGKlCqwrK0XEB03OYDKdIRPPuvk3Lqhcxr_aQFi25vXYWP3IjAKv2XIzbww5otOhD_dXDG-IY_7Dvwp0"
              />
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-card rounded-xl overflow-hidden shadow-sm flex h-40 transition-transform active:scale-[0.98]">
            <div className="flex-1 p-4 flex flex-col justify-center">
              <h3 className="font-headline-sm text-label-md text-on-surface mb-1">Kesiapan Adaptasi Sosial dan Budaya</h3>
              <p className="font-body-sm text-label-sm text-outline leading-snug">
                Navigasi etika dan budaya lokal di negara tujuan.
              </p>
              <div className="mt-3 flex items-center text-secondary font-label-sm text-label-sm">
                <span>Eksplorasi</span>
                <span className="material-symbols-outlined text-[18px] ml-1">arrow_forward</span>
              </div>
            </div>
            <div className="w-1/3 bg-surface-container-highest relative overflow-hidden">
              <img
                alt="Social Adaptation"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVAGMroq_YBhSBphTzTwAL1NqX9ZsZmfif-apRRHe-er2gKYq8C2kA6zeresNzEf0Lz58vmJPd2XFj7jkXsBtbJ7QbrLKcVOcdne89UO6YvrlliXW3cWqOwisRf-B_lsMD2j44G9UCWdj8hhxc67LQVoDa73OBNIeoF9yO84ZLf7pSFlBkcWrAIoRtLlpJohteRWQIUqK2_2VaOy-72f8fqTrJ4Moy93DxYDTxjMnnJxwKbdRxF6NqynuqV0xMhdo6jznkEm0InkCH"
              />
            </div>
          </div>

          {/* Card 4 */}
          <div className="glass-card rounded-xl overflow-hidden shadow-sm flex h-40 transition-transform active:scale-[0.98]">
            <div className="flex-1 p-4 flex flex-col justify-center">
              <h3 className="font-headline-sm text-label-md text-on-surface mb-1">Literasi Digital dan Keamanan Data</h3>
              <p className="font-body-sm text-label-sm text-outline leading-snug">
                Melindungi identitas digital dan data pribadi Anda.
              </p>
              <div className="mt-3 flex items-center text-secondary font-label-sm text-label-sm">
                <span>Amankan Data</span>
                <span className="material-symbols-outlined text-[18px] ml-1">arrow_forward</span>
              </div>
            </div>
            <div className="w-1/3 bg-surface-container-highest relative overflow-hidden">
              <img
                alt="Digital Literacy"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuALcLiptBVL36_m884NzEpnGJLg19MnDqjBoxuBY0wQBm98yQ2FyUnTSPE3xNwSMiIu3nhC34uclJKVEyGdVI1rUyaR200Lm823EwNTGLV1uYMRlVcVIJofgIhmj2sE6CwfEtOkMPNEwrJ0fXtKCYbBMLP4EAmInhLL2GNlxnUrXJQEhiB-5XRspMq11nmm67W3tDI1JMAObUv8z3UrIIlvptrZZtJU0hkT7o8WuledmYxTNgj_LAs18F9xujFcrRfKcy6vZ7nDmI0n"
              />
            </div>
          </div>

          {/* Card 5 */}
          <div className="glass-card rounded-xl overflow-hidden shadow-sm flex h-40 transition-transform active:scale-[0.98]">
            <div className="flex-1 p-4 flex flex-col justify-center">
              <h3 className="font-headline-sm text-label-md text-on-surface mb-1">Literasi Keuangan dan Perlindungan Ekonomi</h3>
              <p className="font-body-sm text-label-sm text-outline leading-snug">
                Kelola penghasilan dan investasi untuk keluarga.
              </p>
              <div className="mt-3 flex items-center text-secondary font-label-sm text-label-sm">
                <span>Mulai Menabung</span>
                <span className="material-symbols-outlined text-[18px] ml-1">arrow_forward</span>
              </div>
            </div>
            <div className="w-1/3 bg-surface-container-highest relative overflow-hidden">
              <img
                alt="Financial Literacy"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVNpHOZJjOZAKt0oj8vDwnc4GLGqDUYl80imjm6lNdXXGF5ao10MfOuY8fSoDSCLXc7WEwYTXKwVNGoi50QnFlPB-iN-9PE7ZEa8bnEcGyD-RyXwCt_1MIK4eyTeJNrpYQga6FuaojXj-LYOjNfjj2QQxZMaZgTR0ikDdljtQsuK0DzqA-A-_kdMaz6DIL5q5FPfrW8dqjga-7Jv8InREybORdmD_wkiHikpbvMjwc9eWQ_LpblIXESNANteWNk_VAUHqwVskNhlBG"
              />
            </div>
          </div>
        </div>

        {/* Extra Content: Progress Tracker */}
        <section className="mt-stack-lg p-5 bg-primary-container rounded-2xl shadow-lg border-l-4 border-secondary-fixed">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-headline-sm text-label-md text-surface-bright">Progres Belajar Anda</h4>
            <span className="text-secondary-fixed font-bold">{eduCompleted ? '100%' : '40%'}</span>
          </div>
          <div className="w-full bg-on-primary-fixed-variant rounded-full h-2 mb-4">
            <div className="bg-secondary-fixed h-2 rounded-full transition-all duration-1000" style={{ width: eduCompleted ? '100%' : '40%' }}></div>
          </div>
          <p className="font-body-sm text-label-sm text-on-primary-container mb-4">
            {eduCompleted ? 'Selamat! Anda telah menyelesaikan semua modul.' : 'Selesaikan 3 modul lagi untuk mendapatkan sertifikat persiapan kerja.'}
          </p>
          
          {!eduCompleted && (
            <button 
              onClick={() => setEduCompleted(true)}
              className="w-full bg-secondary text-white py-2 rounded-lg font-label-md hover:bg-secondary-fixed hover:text-on-secondary transition-colors shadow-sm"
            >
              Simulasikan Selesai Semua Modul
            </button>
          )}
        </section>

        {/* Certificate Download Section */}
        <section className="mt-6 bg-surface-container-lowest p-5 rounded-2xl shadow-lg border border-outline-variant/30 text-center">
          <span className="material-symbols-outlined text-5xl text-secondary mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
          <h4 className="font-headline-sm text-label-md text-on-surface mb-2 font-bold">Sertifikat Kelulusan EduPrep</h4>
          <p className="font-body-sm text-label-sm text-outline mb-4 leading-relaxed">
            Dapatkan sertifikat resmi pelatihan persiapan kerja Anda setelah menyelesaikan semua modul pelatihan.
          </p>

          {eduCompleted ? (
            <a 
              href="/SertifikatEduPrep.pdf" 
              download="SertifikatEduPrep.pdf"
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-xl font-headline-sm text-headline-sm hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg active:scale-95 text-center"
            >
              <span className="material-symbols-outlined">download</span>
              <span>Unduh Sertifikat Kelulusan</span>
            </a>
          ) : (
            <button 
              disabled
              className="w-full inline-flex items-center justify-center gap-2 bg-[#76777d]/20 text-[#76777d]/60 py-3 rounded-xl font-headline-sm text-headline-sm cursor-not-allowed border border-outline-variant/20"
            >
              <span className="material-symbols-outlined text-[18px]">lock</span>
              <span>Selesaikan Semua Pelatihan untuk mendapatkan Sertifikat</span>
            </button>
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default EduPrep;
