import React, { useState, useEffect, useRef } from 'react';
import BottomNav from '../components/BottomNav';
import { useAuth } from '../context/AuthContext';
import SettingsDrawer from '../components/SettingsDrawer';

const LexAI = () => {
  const { currentUser } = useAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseText = '';
      if (text === 'Bantuan Hukum') {
        aiResponseText = 'Halo! Untuk bantuan hukum bagi TKI, Anda dapat menghubungi KBRI terdekat atau hotline Pengaduan TKI di +62 21 2924 1600. Kami juga dapat membantu Anda menyiapkan draf surat pengaduan resmi.';
      } else if (text === 'Info Gaji & Kirim') {
        aiResponseText = 'Informasi Gaji & Kirim Uang: Pastikan Anda mengirimkan uang (remitansi) melalui lembaga resmi yang terdaftar di OJK atau Bank Indonesia. Selalu periksa nilai tukar (kurs) terbaru dan simpan bukti transaksi pengiriman Anda.';
      } else {
        aiResponseText = `Terima kasih atas pertanyaan Anda mengenai "${text}". Saya akan meneruskan hal ini ke tim bantuan hukum dan ketenagakerjaan SafeTKI untuk analisis lebih lanjut.`;
      }

      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col font-body-md text-body-md bg-surface text-on-surface">
      <SettingsDrawer isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-50 bg-surface-bright dark:bg-primary-container shadow-sm flex items-center justify-between px-container-margin py-stack-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden">
            <img
              alt="Profile photo"
              className="w-full h-full object-cover"
              src={currentUser?.photoURL || "https://lh3.googleusercontent.com/aida-public/AB6AXuCCSR6EDtppU69S19WIpW2-UZPoeTQe3tk62aiWFPuh7h5-o8BB8TWqoRc3BZ8btLvWD8X3b99gWaeZ-YC5fiaG6HZAr8Y3-318NeYl1837pvTvQESq3jwZ0oERryFcKFwG9fDgi_6ZlRTAqrFeac7cmcGVOaKoXI9l55Qnt4g_eVsbnX3zlYalyPs72Tgp4rv1ouXBooTboshjUVoTFFOBwsx4VGsY_Bz4rCf7i4RV_kxrZ7IKsi7QfsfTu4dX3covb9q38JrxEokd"}
            />
          </div>
          <h1 className="font-headline-md text-headline-md text-secondary dark:text-secondary-fixed-dim font-bold">SafeTKI</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="material-symbols-outlined text-on-surface dark:text-on-primary-fixed hover:bg-surface-container-low dark:hover:bg-primary-fixed-variant p-2 rounded-full transition-colors duration-200">
            notifications
          </button>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="material-symbols-outlined text-on-surface dark:text-on-primary-fixed hover:bg-surface-container-low dark:hover:bg-primary-fixed-variant p-2 rounded-full transition-colors duration-200"
          >
            settings
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto flex flex-col items-center px-container-margin pb-48 pt-8">
        {/* AI Assistant Headline */}
        <div className="text-center mb-stack-lg">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">AI Assistant</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xs mx-auto">
            Halo! Saya asisten pintar SafeTKI. Ada yang bisa saya bantu hari ini?
          </p>
        </div>

        {messages.length === 0 ? (
          <>
            {/* Robot Visual / Hero */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              <div className="absolute inset-0 bg-secondary-container opacity-20 rounded-full blur-3xl animate-pulse"></div>
            </div>

            {/* Quick Suggestions (Bento Style) */}
            <div className="w-full max-w-md mt-stack-lg grid grid-cols-2 gap-stack-sm">
              <button 
                onClick={() => sendMessage("Bantuan Hukum")}
                className="p-4 bg-surface-container-lowest border border-outline-variant rounded-xl flex flex-col items-start gap-2 hover:bg-surface-container-low cursor-pointer hover:opacity-80 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-secondary">gavel</span>
                <span className="font-label-md text-label-md text-on-surface text-left">Bantuan Hukum</span>
              </button>
              <button 
                onClick={() => sendMessage("Info Gaji & Kirim")}
                className="p-4 bg-surface-container-lowest border border-outline-variant rounded-xl flex flex-col items-start gap-2 hover:bg-surface-container-low cursor-pointer hover:opacity-80 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-secondary">payments</span>
                <span className="font-label-md text-label-md text-on-surface text-left">Info Gaji &amp; Kirim</span>
              </button>
            </div>
          </>
        ) : (
          <div className="w-full max-w-md flex flex-col gap-4 flex-1">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[85%] ${
                  msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                }`}
              >
                <div
                  className={`p-4 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-secondary text-on-secondary rounded-tr-none'
                      : 'bg-surface-container-lowest border border-outline-variant text-on-surface rounded-tl-none'
                  }`}
                >
                  <p className="font-body-md text-body-md whitespace-pre-wrap">{msg.text}</p>
                </div>
                <span className="text-[10px] text-outline mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}
            {isTyping && (
              <div className="flex flex-col max-w-[85%] self-start items-start">
                <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant text-on-surface rounded-tl-none flex gap-1.5 items-center">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      {/* Floating Chat Input Wrapper */}
      <div className="fixed bottom-24 left-0 w-full px-container-margin z-40">
        <div className="max-w-md mx-auto relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-outline">smart_toy</span>
          </div>
          <input
            className="w-full bg-surface-container-lowest border-outline-variant border py-4 pl-12 pr-14 rounded-full shadow-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all outline-none font-body-md text-body-md text-on-surface placeholder:text-outline"
            placeholder="Tanyakan apa saja"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage(inputText);
                setInputText('');
              }
            }}
          />
          <button 
            onClick={() => {
              sendMessage(inputText);
              setInputText('');
            }}
            className="absolute inset-y-2 right-2 w-10 h-10 bg-secondary text-on-secondary rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default LexAI;
