import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BottomNav from '../components/BottomNav';

const FormPermohonan = () => {
  const navigate = useNavigate();
  const { setUserProfile } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [formData, setFormData] = useState({
    nama: '',
    nik: '',
    paspor: '',
    ttl: '',
    alamat: ''
  });

  const [ktpPhoto, setKtpPhoto] = useState(null);
  const [ktpPreview, setKtpPreview] = useState('');
  const [kkPhoto, setKkPhoto] = useState(null);
  const [kkPreview, setKkPreview] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrorMsg('');
  };

  const handleKtpChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setKtpPhoto(file);
      setKtpPreview(URL.createObjectURL(file));
      setErrorMsg('');
    }
  };

  const handleKkChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setKkPhoto(file);
      setKkPreview(URL.createObjectURL(file));
      setErrorMsg('');
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!formData.nama || !formData.nik || !formData.paspor || !formData.ttl || !formData.alamat) {
        setErrorMsg("Semua kolom data diri wajib diisi!");
        return;
      }
      if (!/^\d{16}$/.test(formData.nik)) {
        setErrorMsg("NIK harus terdiri dari 16 digit angka!");
        return;
      }
    } else if (currentStep === 2) {
      if (!ktpPhoto) {
        setErrorMsg("Silakan ambil atau unggah foto KTP terlebih dahulu!");
        return;
      }
    }
    setErrorMsg('');
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setErrorMsg('');
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!kkPhoto) {
      setErrorMsg("Silakan ambil atau unggah foto KK terlebih dahulu!");
      return;
    }
    
    // Simpan semua data gabungan ke context global
    setUserProfile({
      ...formData,
      ktpPhoto: ktpPreview,
      kkPhoto: kkPreview,
      submittedAt: new Date().toISOString()
    });

    navigate('/dashboard');
  };

  return (
    <div className="font-body-md text-on-background min-h-screen pb-24 bg-surface text-on-surface">
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-40 bg-surface-bright shadow-sm flex items-center px-container-margin py-stack-sm gap-4">
        <button 
          onClick={() => {
            if (currentStep > 1) {
              handlePrevStep();
            } else {
              navigate(-1);
            }
          }} 
          className="material-symbols-outlined text-on-surface hover:bg-surface-container-low p-2 rounded-full transition-colors duration-200"
        >
          arrow_back
        </button>
        <h1 className="font-headline-md text-headline-md text-secondary font-bold">Form Permohonan</h1>
      </header>

      <main className="px-container-margin py-stack-lg">
        {/* Step Progress Bar */}
        <div className="mb-8 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-sm">
          <div className="flex justify-between items-center text-label-sm font-label-sm text-outline mb-2">
            <span>
              Langkah {currentStep} dari 3: {
                currentStep === 1 ? "Isi Data Diri" :
                currentStep === 2 ? "Verifikasi KTP" :
                "Verifikasi KK"
              }
            </span>
            <span className="font-bold text-secondary">{Math.round((currentStep / 3) * 100)}% Selesai</span>
          </div>
          <div className="w-full bg-surface-container-high rounded-full h-2">
            <div 
              className="bg-secondary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-error-container text-on-error-container rounded-xl flex items-center gap-2 text-label-sm">
            <span className="material-symbols-outlined text-[20px]">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-lg border border-outline-variant/30">
          
          {/* STEP 1: TEXT DATA */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="font-headline-sm text-headline-sm mb-4 text-on-surface">Lengkapi Data Diri</h2>
              
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface">Nama Lengkap</label>
                <input 
                  type="text" 
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
                  placeholder="Sesuai KTP"
                />
              </div>

              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface">NIK (Nomor Induk Kependudukan)</label>
                <input 
                  type="text" 
                  name="nik"
                  value={formData.nik}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
                  placeholder="16 Digit NIK"
                />
              </div>

              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface">No. Paspor</label>
                <input 
                  type="text" 
                  name="paspor"
                  value={formData.paspor}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
                  placeholder="Cth: A 1234567"
                />
              </div>

              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface">Tempat, Tanggal Lahir</label>
                <input 
                  type="text" 
                  name="ttl"
                  value={formData.ttl}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all"
                  placeholder="Cth: Jakarta, 12 Mei 1990"
                />
              </div>

              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface">Alamat Domisili</label>
                <textarea 
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full p-3 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all resize-none"
                  placeholder="Alamat lengkap saat ini"
                ></textarea>
              </div>

              <div className="pt-4">
                <button 
                  type="button"
                  onClick={handleNextStep}
                  className="w-full bg-secondary text-white font-headline-sm text-headline-sm py-4 rounded-xl shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <span>Lanjut ke Foto KTP</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: UPLOAD KTP */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-headline-sm text-headline-sm mb-1 text-on-surface">Unggah Foto KTP</h2>
                <p className="font-body-sm text-label-sm text-outline">Ambil foto KTP asli Anda dengan pencahayaan yang cukup.</p>
              </div>

              <div className="flex flex-col items-center">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  id="ktp-file" 
                  onChange={handleKtpChange}
                />
                
                {ktpPreview ? (
                  <div className="w-full flex flex-col gap-4">
                    <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-outline-variant max-h-60 bg-black flex items-center justify-center">
                      <img src={ktpPreview} alt="KTP Preview" className="max-h-60 object-contain w-full" />
                      <label 
                        htmlFor="ktp-file" 
                        className="absolute bottom-3 right-3 bg-secondary text-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-secondary-fixed hover:text-on-secondary transition-colors"
                      >
                        <span className="material-symbols-outlined text-[20px] block">edit</span>
                      </label>
                    </div>
                    <p className="font-label-sm text-label-sm text-secondary text-center font-bold">Foto KTP berhasil dimuat</p>
                  </div>
                ) : (
                  <label 
                    htmlFor="ktp-file" 
                    className="w-full cursor-pointer border-2 border-dashed border-[#006b5f]/50 hover:border-secondary bg-[#006b5f]/5 hover:bg-[#006b5f]/10 text-secondary rounded-2xl p-8 flex flex-col items-center justify-center gap-3 transition-all min-h-[200px]"
                  >
                    <span className="material-symbols-outlined text-5xl">photo_camera</span>
                    <span className="font-label-md text-label-md font-bold text-center">Ambil Foto / Unggah KTP</span>
                    <span className="font-body-sm text-label-sm text-center text-outline">Mendukung kamera langsung atau unggah dari galeri</span>
                  </label>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={handlePrevStep}
                  className="w-1/3 border border-outline-variant text-on-surface font-headline-sm text-headline-sm py-4 rounded-xl active:scale-[0.98] transition-all hover:bg-surface-container-low"
                >
                  Kembali
                </button>
                <button 
                  type="button"
                  onClick={handleNextStep}
                  className="w-2/3 bg-secondary text-white font-headline-sm text-headline-sm py-4 rounded-xl shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <span>Lanjut ke Foto KK</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: UPLOAD KK */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-headline-sm text-headline-sm mb-1 text-on-surface">Unggah Foto Kartu Keluarga</h2>
                <p className="font-body-sm text-label-sm text-outline">Pastikan seluruh data nama anggota keluarga di KK terlihat jelas.</p>
              </div>

              <div className="flex flex-col items-center">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  id="kk-file" 
                  onChange={handleKkChange}
                />
                
                {kkPreview ? (
                  <div className="w-full flex flex-col gap-4">
                    <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-outline-variant max-h-60 bg-black flex items-center justify-center">
                      <img src={kkPreview} alt="KK Preview" className="max-h-60 object-contain w-full" />
                      <label 
                        htmlFor="kk-file" 
                        className="absolute bottom-3 right-3 bg-secondary text-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-secondary-fixed hover:text-on-secondary transition-colors"
                      >
                        <span className="material-symbols-outlined text-[20px] block">edit</span>
                      </label>
                    </div>
                    <p className="font-label-sm text-label-sm text-secondary text-center font-bold">Foto KK berhasil dimuat</p>
                  </div>
                ) : (
                  <label 
                    htmlFor="kk-file" 
                    className="w-full cursor-pointer border-2 border-dashed border-[#006b5f]/50 hover:border-secondary bg-[#006b5f]/5 hover:bg-[#006b5f]/10 text-secondary rounded-2xl p-8 flex flex-col items-center justify-center gap-3 transition-all min-h-[200px]"
                  >
                    <span className="material-symbols-outlined text-5xl">photo_camera</span>
                    <span className="font-label-md text-label-md font-bold text-center">Ambil Foto / Unggah Kartu Keluarga (KK)</span>
                    <span className="font-body-sm text-label-sm text-center text-outline">Mendukung kamera langsung atau unggah dari galeri</span>
                  </label>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={handlePrevStep}
                  className="w-1/3 border border-outline-variant text-on-surface font-headline-sm text-headline-sm py-4 rounded-xl active:scale-[0.98] transition-all hover:bg-surface-container-low"
                >
                  Kembali
                </button>
                <button 
                  type="button"
                  onClick={handleSubmit}
                  className="w-2/3 bg-secondary text-white font-headline-sm text-headline-sm py-4 rounded-xl shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <span>Kirim Permohonan</span>
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default FormPermohonan;
