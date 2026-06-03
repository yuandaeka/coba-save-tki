import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { loginWithGoogle, loginWithEmail, registerWithEmail, loginWithBiometric } = useAuth();
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Biometric modal simulation states
  const [showBiometricModal, setShowBiometricModal] = useState(false);
  const [biometricStatus, setBiometricStatus] = useState("");
  const [biometricError, setBiometricError] = useState(false);

  const handleLoginOrRegister = async (e) => {
    e.preventDefault();
    try {
      setError("");
      if (isRegistering) {
        await registerWithEmail(email, password, displayName);
        navigate('/dashboard');
      } else {
        await loginWithEmail(email, password);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
      let errMsg = "Terjadi kesalahan.";
      if (err.code === "auth/invalid-credential") {
        errMsg = "Email atau kata sandi salah.";
      } else if (err.code === "auth/email-already-in-use") {
        errMsg = "Alamat email sudah digunakan.";
      } else if (err.code === "auth/weak-password") {
        errMsg = "Kata sandi terlalu lemah (min. 6 karakter).";
      } else if (err.code === "auth/invalid-email") {
        errMsg = "Format alamat email tidak valid.";
      } else {
        errMsg = err.message || errMsg;
      }
      setError(errMsg);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError("");
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError("Gagal masuk dengan Google. Pastikan konfigurasi Firebase Anda benar.");
    }
  };

  const handleBiometricLogin = async () => {
    try {
      setError("");
      setBiometricError(false);
      setBiometricStatus("Memindai Sidik Gari / Face ID...");
      setShowBiometricModal(true);
      
      // Simulate fingerprint scanning delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      await loginWithBiometric();
      setBiometricStatus("Autentikasi Berhasil!");
      await new Promise(resolve => setTimeout(resolve, 800));
      setShowBiometricModal(false);
      navigate('/dashboard');
    } catch (err) {
      setBiometricError(true);
      setBiometricStatus(err.message || "Gagal memindai biometrik.");
      // Auto close modal after failure message is displayed
      setTimeout(() => {
        setShowBiometricModal(false);
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-body-md relative">
      {/* Top Section with Gradient Background */}
      <header className="hero-gradient relative overflow-hidden pt-12 pb-24 px-container-margin">
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ 
            backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDAyCtOtXQyKMGtcEZXYu4B_u7Xpc2oFMjY5BIV1bkAv2lnhH2UzdB_s-2LfiuhUZF4N8c3WCPV5Lwd1pL4z4O1_BJjvgqKvVp5J9_A_OFkTFU0At8_e1KybzVcpmIKAj13c3OHf2Kn_7O4wKv8RTtxfjO4pv1tmpO5_IFxpxmJXWoVCnSY3eFPa2UHge6-_EvRSswXXNYIF_GEg8ZT6B3IVovArruI_tmFe2VD6XUjPIgGD9yb2Xghtb4usdyXG6C9JIt2Yz1-9COx")`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center center', 
            mixBlendMode: 'overlay' 
          }}
        ></div>
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Brand Identity */}
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-secondary-fixed p-2 rounded-xl shadow-lg">
              <span className="material-symbols-outlined text-on-secondary-fixed text-4xl">shield_person</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-white tracking-tight">SafeTKI</h1>
          </div>
          <h2 className="font-headline-sm text-headline-sm text-secondary-fixed mb-2">
            {isRegistering ? "Daftar Akun Baru SafeTKI" : "Selamat Datang di Aplikasi SafeTKI !!!"}
          </h2>
          <p className="font-body-md text-body-md text-surface-variant opacity-90 max-w-xs mx-auto">
            Keamanan dan kenyamanan perjalanan Anda adalah prioritas kami.
          </p>
        </div>
      </header>

      {/* Form Section */}
      <main className="flex-grow flex flex-col items-center -mt-16 px-container-margin pb-stack-lg relative z-20">
        <div className="w-full max-w-md glass-card rounded-3xl shadow-xl p-8 border border-white/20">
          <form className="space-y-6" onSubmit={handleLoginOrRegister}>
            {isRegistering && (
              /* Name Field for Registration */
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="name">Nama Lengkap</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">person</span>
                  <input
                    className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all font-body-md text-body-md"
                    id="name"
                    placeholder="Nama Lengkap Anda"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="email">Alamat Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">mail</span>
                <input
                  className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all font-body-md text-body-md"
                  id="email"
                  placeholder="contoh@email.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="password">Kata Sandi</label>
                {!isRegistering && (
                  <a className="font-label-sm text-label-sm text-secondary hover:text-on-secondary-container transition-colors" href="#">
                    Lupa Kata Sandi?
                  </a>
                )}
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">lock</span>
                <input
                  className="w-full pl-12 pr-12 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all font-body-md text-body-md"
                  id="password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface" 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Login / Register Button */}
            <button
              className="w-full bg-primary-container text-white font-headline-sm text-headline-sm py-4 rounded-xl shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              type="submit"
            >
              {isRegistering ? "Daftar Akun" : "Masuk"}
            </button>
          </form>

          {/* Social Login Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-outline font-label-sm text-label-sm">
                {isRegistering ? "Atau daftar dengan" : "Atau masuk dengan"}
              </span>
            </div>
          </div>

          {/* Biometric/Social Placeholders */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              type="button"
              onClick={handleBiometricLogin}
              className="flex items-center justify-center gap-2 py-3 px-4 border border-outline-variant rounded-xl hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined text-primary">fingerprint</span>
              <span className="font-label-md text-label-md">Biometrik</span>
            </button>
            <button 
              type="button" 
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2 py-3 px-4 border border-outline-variant rounded-xl hover:bg-surface-container-low transition-colors"
            >
              <span className="font-label-md text-label-md">Google</span>
            </button>
          </div>
          {error && <p className="text-error text-center mt-4 text-sm font-semibold">{error}</p>}
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center pb-8">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {isRegistering ? (
              <>
                Sudah memiliki akun?{' '}
                <button 
                  onClick={() => { setIsRegistering(false); setError(""); }}
                  className="font-label-md text-label-md text-secondary font-bold hover:underline bg-transparent border-none p-0 cursor-pointer"
                >
                  Masuk di sini
                </button>
              </>
            ) : (
              <>
                Belum memiliki akun?{' '}
                <button 
                  onClick={() => { setIsRegistering(true); setError(""); }}
                  className="font-label-md text-label-md text-secondary font-bold hover:underline bg-transparent border-none p-0 cursor-pointer"
                >
                  Daftar Akun
                </button>
              </>
            )}
          </p>
        </footer>
      </main>

      {/* Biometric Verification Simulation Modal */}
      {showBiometricModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-surface-container-high rounded-3xl p-8 max-w-sm w-full border border-outline-variant shadow-2xl flex flex-col items-center text-center animate-fade-in">
            <div className={`p-6 rounded-full mb-6 ${biometricError ? 'bg-error-container text-error' : 'bg-primary-container text-white'} relative`}>
              <span className={`material-symbols-outlined text-6xl ${!biometricError && 'animate-pulse'}`}>
                {biometricError ? 'error' : 'fingerprint'}
              </span>
            </div>
            <h3 className="font-headline-sm text-headline-sm mb-2 text-on-surface font-bold">Autentikasi Biometrik</h3>
            <p className={`font-body-md text-body-md ${biometricError ? 'text-error font-semibold' : 'text-on-surface-variant'}`}>
              {biometricStatus}
            </p>
            {biometricError && (
              <button 
                onClick={() => setShowBiometricModal(false)}
                className="mt-6 w-full py-3 bg-surface-container-high border border-outline-variant rounded-xl text-on-surface hover:bg-surface-container-highest transition-colors font-label-md text-label-md"
              >
                Tutup
              </button>
            )}
          </div>
        </div>
      )}

      {/* Support Help Floating Action */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-secondary p-4 rounded-full shadow-xl text-white hover:scale-110 active:scale-90 transition-transform flex items-center justify-center">
          <span className="material-symbols-outlined">support_agent</span>
        </button>
      </div>

      {/* Security Badges Section */}
      <div className="w-full max-w-md mx-auto flex justify-center gap-6 opacity-40 mb-12">
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">verified_user</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">OJK Verified</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">encrypted</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">256-Bit SSL</span>
        </div>
      </div>
    </div>
  );
};

export default Login;

