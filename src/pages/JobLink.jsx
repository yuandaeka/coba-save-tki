import React, { useState } from 'react';
import BottomNav from '../components/BottomNav';
import { useAuth } from '../context/AuthContext';
import SettingsDrawer from '../components/SettingsDrawer';

const JobLink = () => {
  const { currentUser } = useAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen pb-24">
      <SettingsDrawer isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-40 shadow-sm bg-surface-bright dark:bg-primary-container flex items-center justify-between px-container-margin py-stack-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant">
            <img
              alt="Profile"
              className="w-full h-full object-cover"
              src={currentUser?.photoURL || "https://lh3.googleusercontent.com/aida-public/AB6AXuCCSR6EDtppU69S19WIpW2-UZPoeTQe3tk62aiWFPuh7h5-o8BB8TWqoRc3BZ8btLvWD8X3b99gWaeZ-YC5fiaG6HZAr8Y3-318NeYl1837pvTvQESq3jwZ0oERryFcKFwG9fDgi_6ZlRTAqrFeac7cmcGVOaKoXI9l55Qnt4g_eVsbnX3zlYalyPs72Tgp4rv1ouXBooTboshjUVoTFFOBwsx4VGsY_Bz4rCf7i4RV_kxrZ7IKsi7QfsfTu4dX3covb9q38JrxEokd"}
            />
          </div>
          <h1 className="font-headline-sm text-headline-sm text-on-surface dark:text-on-primary-fixed">JobLink</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-on-surface dark:text-on-primary-fixed cursor-pointer p-2 hover:bg-surface-container-low dark:hover:bg-primary-fixed-variant rounded-full transition-colors duration-200">notifications</span>
          <span 
            onClick={() => setIsSettingsOpen(true)}
            className="material-symbols-outlined text-on-surface dark:text-on-primary-fixed cursor-pointer p-2 hover:bg-surface-container-low dark:hover:bg-primary-fixed-variant rounded-full transition-colors duration-200"
          >
            settings
          </span>
        </div>
      </header>

      <main className="px-container-margin mt-stack-md">
        {/* Search & Filter Bar */}
        <section className="flex items-center gap-3 mb-stack-lg">
          <div className="relative flex-grow">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input
              className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:border-on-tertiary-container transition-all font-body-md"
              placeholder="Cari Pekerjaan"
              type="text"
            />
          </div>
          <button className="p-3 bg-surface-container-lowest border border-outline-variant rounded-xl flex items-center justify-center hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-on-surface">filter_list</span>
          </button>
          <button className="p-3 bg-surface-container-lowest border border-outline-variant rounded-xl flex items-center justify-center hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-on-surface">chat_bubble</span>
          </button>
        </section>

        {/* Hero Branding / Promotion */}
        <div className="mb-stack-lg rounded-2xl overflow-hidden relative aspect-[2/1] shadow-md">
          <img
            alt="JobLink Promotion"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDstjEyqNKWQ5LyDj0QoVxCEwVTgBtsKilx1X36pSapM1uiV3ekE51MGEYfLa8ZT1AmKzZyEtnF_e-p3iQcSdeCyfRcxOrxuxcrTXGUN_BNcd0KOgENWXGbyloOOxdZPsTnZfsWcO3aNDQerSIZnn_CgSeTAnRdcF84WXwC0kugfyPcMM5BdrM4DsKyhERJ_nm75tJg11zjwrJGFT7eQFrgMPoitnFCzJNrZw0wavxFwaiGJaaTa7dogSby7pgkyyDV2flvSUmmg0oi"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 to-transparent flex flex-col justify-end p-container-margin">
            <span className="bg-secondary-container text-on-secondary-container px-2 py-1 rounded-full text-label-sm font-label-sm w-fit mb-2">
              Peluang Luar Negeri
            </span>
            <h2 className="text-white font-headline-md text-headline-md leading-tight">Wujudkan Masa Depan Lebih Baik</h2>
          </div>
        </div>

        {/* Section Title */}
        <div className="flex justify-between items-center mb-stack-md">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Pekerjaan terbaik untuk anda</h3>
          <span className="text-secondary font-label-md cursor-pointer hover:underline">Lihat Semua</span>
        </div>

        {/* Job Cards List */}
        <div className="space-y-gutter">
          {/* Card 1 */}
          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-transparent hover:border-secondary-container transition-all flex gap-4 items-start">
            <div className="w-14 h-14 rounded-full bg-surface flex items-center justify-center border border-outline-variant shrink-0 overflow-hidden">
              <img
                alt="Singapore"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQ-38mmFDseS1j3zDtZ7WLACEXjK8Y1wWZ5bVJS5drRqz-UiUyxu9qbGLDBBXXt4dbKlHgCrB9iWLsUy7M-kSIrz1TQCIIO-rkioh-hIrLLgdssStzwDiNePCKjYTNh8l05SRgaS6wX06t9avjyB6Bn--_alpIguxZuuwl-HYf8iBzWRPAtiDy8AlNHa7u-b3f9v307bl2zM9i2t7OkoslAPZbR9BCsLM14e1pY5q_y-mBshHjwuPUAz_CV46Fv-QusTA1W7LtDjE9"
              />
            </div>
            <div className="flex-grow">
              <h4 className="font-label-md text-label-md text-on-surface">Asisten Rumah Tangga</h4>
              <p className="font-body-sm text-body-sm text-outline flex items-center gap-1 mb-2">
                <span className="material-symbols-outlined text-[16px]">location_on</span> Singapura
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">Wanita max 25th, jujur, rajin, berpengalaman.</p>
              <div className="flex justify-between items-center">
                <span className="text-secondary font-label-md">S$ 600 - 800</span>
                <button className="bg-error text-on-error px-6 py-2 rounded-full font-label-md hover:bg-red-700 transition-colors">LAMAR</button>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-transparent hover:border-secondary-container transition-all flex gap-4 items-start">
            <div className="w-14 h-14 rounded-full bg-surface flex items-center justify-center border border-outline-variant shrink-0 overflow-hidden">
              <img
                alt="Cambodia"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7BAM4COo7PE_Wh2caXTq55Jv3dE4PAAOLqES7_jGmAPNtqE8xcLGs4AY4mpw_fVRqF0cV5IvI_NBWckgA0hl3tzxo9qGgwjx1l83CJk6ETJPHz9m-IF_fcfOqzO1sfnGr5MxSEOmbvwxJvtpAFtEw-4eBcTBe3ZfyKBnA6lbO-lxEPTncSw5uVjwVKfjC5FJesFdVgs_hzFi7TKoeGm4V9xXmsjyn34iWZWmnxniX3yLp5ItOWxAgBT6Sqq5uudSb9DbnZLLRtXXx"
              />
            </div>
            <div className="flex-grow">
              <h4 className="font-label-md text-label-md text-on-surface">Pengasuh Bayi</h4>
              <p className="font-body-sm text-body-sm text-outline flex items-center gap-1 mb-2">
                <span className="material-symbols-outlined text-[16px]">location_on</span> Kamboja
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">Wanita, penyayang, sertifikasi pengasuhan bayi.</p>
              <div className="flex justify-between items-center">
                <span className="text-secondary font-label-md">$ 450 - 550</span>
                <button className="bg-error text-on-error px-6 py-2 rounded-full font-label-md hover:bg-red-700 transition-colors">LAMAR</button>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-transparent hover:border-secondary-container transition-all flex gap-4 items-start">
            <div className="w-14 h-14 rounded-full bg-surface flex items-center justify-center border border-outline-variant shrink-0 overflow-hidden">
              <img
                alt="Brunei"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZ9a0mGA-2B7ou3sEIN4kaAYuJ5yDvg4rKl73REhFzyMQQeE9vBMQ9Xt7Iq-2Lpm5pPHUq0eVnZVdCdGALolrH_H2Cumr1SflhtkUbM_yVvbauzx3mevTjb-KpA0OTMF1-7vSpwCGq0tp9T_vnab9dGRzHzaBrLuDNDC37Tfsa0AUFuUXrNsMyPHMHYBDNUKOsDpQzlrIFGOnKomjP0xfie93V5nxoU4U6m1taY1JNNkd1yOBEI3pVU_cN-4fGhFsS-S-JOCpxal6j"
              />
            </div>
            <div className="flex-grow">
              <h4 className="font-label-md text-label-md text-on-surface">Supir Pribadi</h4>
              <p className="font-body-sm text-body-sm text-outline flex items-center gap-1 mb-2">
                <span className="material-symbols-outlined text-[16px]">location_on</span> Brunei Darussalam
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">Pria max 40th, SIM Internasional, sehat jasmani.</p>
              <div className="flex justify-between items-center">
                <span className="text-secondary font-label-md">B$ 500 - 700</span>
                <button className="bg-error text-on-error px-6 py-2 rounded-full font-label-md hover:bg-red-700 transition-colors">LAMAR</button>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-transparent hover:border-secondary-container transition-all flex gap-4 items-start">
            <div className="w-14 h-14 rounded-full bg-surface flex items-center justify-center border border-outline-variant shrink-0 overflow-hidden">
              <img
                alt="Malaysia"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYYxQpN2csK17HA1qUQUh1naomilnEKJ_TZyotA4PYO3a-yz5rKyQtJgtHQqeFBRDF0xA7EeTI2trb64xmvhmZX2sf12RNZkdAkfjVVlUL9cOG83-3_se7jgRhahbappcC-o-DcKG4FE_F-1ZRagJULDCMt1i9xfwPvTRjkkzV7FFQWN4L4MEC9SWIdf5sFVBCikqhW7b1Gt8zrWLWY-mR9fEjxCyil5ZtJeI8OHKzwCcyTN0AnX36CBw0PwGgh-lFOtohk8L0neZ0"
              />
            </div>
            <div className="flex-grow">
              <h4 className="font-label-md text-label-md text-on-surface">Pengasuh Lansia</h4>
              <p className="font-body-sm text-body-sm text-outline flex items-center gap-1 mb-2">
                <span className="material-symbols-outlined text-[16px]">location_on</span> Malaysia
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">Wanita, sabar, memahami bahasa melayu dasar.</p>
              <div className="flex justify-between items-center">
                <span className="text-secondary font-label-md">RM 1,500 - 2,000</span>
                <button className="bg-error text-on-error px-6 py-2 rounded-full font-label-md hover:bg-red-700 transition-colors">LAMAR</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default JobLink;
