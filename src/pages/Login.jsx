import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuth();
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login success and redirect to BlockID dashboard
    navigate('/dashboard');
  };

  const handleGoogleLogin = async () => {
    try {
      setError("");
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError("Gagal masuk dengan Google.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-body-md">
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
          <h2 className="font-headline-sm text-headline-sm text-secondary-fixed mb-2">Selamat Datang di Aplikasi SafeTKI !!!</h2>
          <p className="font-body-md text-body-md text-surface-variant opacity-90 max-w-xs mx-auto">
            Keamanan dan kenyamanan perjalanan Anda adalah prioritas kami.
          </p>
        </div>
      </header>

      {/* Form Section */}
      <main className="flex-grow flex flex-col items-center -mt-16 px-container-margin pb-stack-lg relative z-20">
        <div className="w-full max-w-md glass-card rounded-3xl shadow-xl p-8 border border-white/20">
          <form className="space-y-6" onSubmit={handleLogin}>
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
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="password">Kata Sandi</label>
                <a className="font-label-sm text-label-sm text-secondary hover:text-on-secondary-container transition-colors" href="#">
                  Lupa Kata Sandi?
                </a>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">lock</span>
                <input
                  className="w-full pl-12 pr-12 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all font-body-md text-body-md"
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  required
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface" type="button">
                  <span className="material-symbols-outlined">visibility</span>
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              className="w-full bg-primary-container text-white font-headline-sm text-headline-sm py-4 rounded-xl shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              type="submit"
            >
              Masuk
            </button>
          </form>

          {/* Social Login Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-outline font-label-sm text-label-sm">Atau masuk dengan</span>
            </div>
          </div>

          {/* Biometric/Social Placeholders */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 px-4 border border-outline-variant rounded-xl hover:bg-surface-container-low transition-colors">
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
          {error && <p className="text-error text-center mt-4 text-sm">{error}</p>}
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center pb-8">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Belum memiliki akun?{' '}
            <a className="font-label-md text-label-md text-secondary font-bold hover:underline" href="#">
              Daftar Akun
            </a>
          </p>
        </footer>
      </main>

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
