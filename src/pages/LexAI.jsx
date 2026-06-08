import { useState, useEffect, useRef } from 'react';
import BottomNav from '../components/BottomNav';
import { useAuth } from '../context/AuthContext';
import SettingsDrawer from '../components/SettingsDrawer';

const VoiceNotePlayer = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    if (audio.readyState >= 1 && audio.duration) {
      setDuration(audio.duration);
    }

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.error("Playback error:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const formatAudioTime = (time) => {
    if (isNaN(time) || !isFinite(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  const handleSliderChange = (e) => {
    if (!audioRef.current) return;
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="flex items-center gap-3 w-52 py-2">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      <button 
        type="button"
        onClick={togglePlay}
        className="w-9 h-9 rounded-full bg-white text-secondary flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform shrink-0"
      >
        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          {isPlaying ? 'pause' : 'play_arrow'}
        </span>
      </button>
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <input 
          type="range" 
          min="0" 
          max="100" 
          step="0.1"
          value={progress} 
          onChange={handleSliderChange}
          className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
        />
        <div className="flex justify-between text-[9px] text-white/80">
          <span>{formatAudioTime(currentTime)}</span>
          <span>{formatAudioTime(duration || 0)}</span>
        </div>
      </div>
    </div>
  );
};

const LexAI = () => {
  const { currentUser } = useAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Voice Note states
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  
  // Attachment states
  const [attachmentMenuOpen, setAttachmentMenuOpen] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null); // { name, type, dataUrl, base64 }

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerIntervalRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  // Format record timer (mm:ss)
  const formatRecordTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Call Gemini API through Vercel Serverless / Vite middleware proxy
  const callGeminiAPI = async (contents) => {
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ contents })
      });

      if (!response.ok) {
        let errData;
        try {
          errData = await response.json();
        } catch (error) {
          throw new Error(`Server error (${response.status}): ${response.statusText}`, { cause: error });
        }
        const errorMessage = typeof errData.error === 'object' && errData.error !== null
          ? errData.error.message
          : errData.error || 'Gagal terhubung dengan server backend API.';
        throw new Error(errorMessage);
      }

      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Respon dari model kosong atau tidak valid.');
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  };

  const sendMessage = async (textOverride) => {
    const textToSend = textOverride !== undefined ? textOverride : inputText;
    const fileToSend = textOverride !== undefined ? null : attachedFile;

    if (!textToSend.trim() && !fileToSend) return;

    if (textOverride === undefined) {
      setInputText('');
      setAttachedFile(null);
    }
    setAttachmentMenuOpen(false);

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    if (textToSend.trim()) {
      userMessage.text = textToSend;
    }

    if (fileToSend) {
      userMessage.file = {
        name: fileToSend.name,
        type: fileToSend.type,
        dataUrl: fileToSend.dataUrl
      };
    }

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsTyping(true);

    try {
      // Build conversation history
      const history = messages.map(msg => {
        let parts = [];
        if (msg.text) {
          parts.push({ text: msg.text });
        }
        if (msg.file) {
          parts.push({ text: `[User mengirim lampiran file/foto: ${msg.file.name}]` });
        }
        if (msg.audio) {
          parts.push({ text: `[User mengirim pesan suara]` });
        }
        return {
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: parts.length > 0 ? parts : [{ text: '' }]
        };
      });

      // Construct current message parts
      const currentParts = [];
      if (textToSend.trim()) {
        currentParts.push({ text: textToSend });
      }
      if (fileToSend) {
        currentParts.push({
          inlineData: {
            mimeType: fileToSend.type,
            data: fileToSend.base64
          }
        });
      }

      const contents = [
        ...history,
        {
          role: 'user',
          parts: currentParts
        }
      ];

      const aiResponseText = await callGeminiAPI(contents);

      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: `⚠️ Error: ${error.message}\n\nPastikan Anda sudah mengonfigurasi variabel lingkungan GEMINI_API_KEY di file .env lokal atau konfigurasi Environment Variables di Vercel Dashboard.`,
        sender: 'ai',
        isError: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Start recording Voice Note
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);

        // Convert audio to base64
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64data = reader.result.split(',')[1];
          sendVoiceNote(audioUrl, base64data, audioBlob.type);
        };

        // Release microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (err) {
      console.error('Microphone error:', err);
      alert('Gagal mengakses mikrofon. Pastikan Anda mengizinkan akses mikrofon di peramban Anda.');
    }
  };

  // Stop recording and process send
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerIntervalRef.current);
    }
  };

  // Cancel recording and discard audio
  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      // Bypass the normal onstop handler
      mediaRecorderRef.current.onstop = () => {
        const stream = mediaRecorderRef.current.stream;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
      };
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerIntervalRef.current);
      audioChunksRef.current = [];
    }
  };

  const sendVoiceNote = async (audioUrl, base64Data, mimeType) => {
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      audio: audioUrl,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsTyping(true);

    try {
      const history = messages.map(msg => {
        let parts = [];
        if (msg.text) {
          parts.push({ text: msg.text });
        }
        if (msg.file) {
          parts.push({ text: `[User mengirim lampiran file/foto: ${msg.file.name}]` });
        }
        if (msg.audio) {
          parts.push({ text: `[User mengirim pesan suara]` });
        }
        return {
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: parts.length > 0 ? parts : [{ text: '' }]
        };
      });

      const contents = [
        ...history,
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                mimeType: mimeType || 'audio/webm',
                data: base64Data
              }
            },
            {
              text: 'Dengarkan pesan suara saya ini, pahami pesannya, dan tolong tanggapi langsung dalam Bahasa Indonesia dengan jelas.'
            }
          ]
        }
      ];

      const aiResponseText = await callGeminiAPI(contents);

      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: `⚠️ Gagal memproses pesan suara: ${error.message}`,
        sender: 'ai',
        isError: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File terlalu besar. Maksimal batas ukuran file adalah 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64 = reader.result.split(',')[1];
      setAttachedFile({
        name: file.name,
        type: file.type,
        dataUrl: reader.result,
        base64: base64
      });
    };
    setAttachmentMenuOpen(false);
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const triggerCameraSelect = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  const handleAttachmentClick = () => {
    setAttachmentMenuOpen(prev => !prev);
  };


  return (
    <div className="min-h-screen flex flex-col font-body-md text-body-md bg-surface text-on-surface">
      <SettingsDrawer isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      
      {/* Hidden File Inputs */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
      />
      <input 
        type="file" 
        ref={cameraInputRef} 
        accept="image/*" 
        capture="environment" 
        onChange={handleFileChange} 
        className="hidden" 
      />

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
      <main className="flex-1 overflow-y-auto flex flex-col items-center px-container-margin pb-48 pt-8 w-full">
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
              {/* Decorative Robot Icon */}
              <span className="material-symbols-outlined text-8xl text-secondary opacity-60 animate-bounce" style={{ fontVariationSettings: "'FILL' 0" }}>
                smart_toy
              </span>
            </div>

            {/* Quick Suggestions (Bento Style) */}
            <div className="w-full max-w-md mt-stack-lg grid grid-cols-2 gap-stack-sm">
              <button 
                onClick={() => sendMessage("Bantuan Hukum")}
                className="p-4 bg-surface-container-lowest border border-outline-variant rounded-xl flex flex-col items-start gap-2 hover:bg-surface-container-low cursor-pointer hover:opacity-80 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-secondary">gavel</span>
                <span className="font-label-md text-label-md text-on-surface text-left font-semibold">Bantuan Hukum</span>
              </button>
              <button 
                onClick={() => sendMessage("Info Gaji & Kirim")}
                className="p-4 bg-surface-container-lowest border border-outline-variant rounded-xl flex flex-col items-start gap-2 hover:bg-surface-container-low cursor-pointer hover:opacity-80 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-secondary">payments</span>
                <span className="font-label-md text-label-md text-on-surface text-left font-semibold">Info Gaji &amp; Kirim</span>
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
                      : msg.isError
                      ? 'bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 rounded-tl-none'
                      : 'bg-surface-container-lowest border border-outline-variant text-on-surface rounded-tl-none shadow-sm'
                  }`}
                >
                  {/* File Attachment Render */}
                  {msg.file && (
                    <div className="mb-2 max-w-xs rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-inner">
                      {msg.file.type.startsWith('image/') ? (
                        <img 
                          src={msg.file.dataUrl} 
                          alt={msg.file.name} 
                          className="w-full max-h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity" 
                          onClick={() => window.open(msg.file.dataUrl, '_blank')}
                        />
                      ) : (
                        <div className="p-3 bg-black/5 dark:bg-white/5 flex items-center gap-2 text-xs">
                          <span className="material-symbols-outlined text-secondary">description</span>
                          <span className="truncate max-w-[150px] font-medium">{msg.file.name}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Audio Render */}
                  {msg.audio && (
                    <VoiceNotePlayer audioUrl={msg.audio} />
                  )}

                  {/* Text Render */}
                  {msg.text && (
                    <p className="font-body-md text-body-md whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  )}
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
        <div className="max-w-md mx-auto relative">
          
          {/* Attachment Preview Box */}
          {attachedFile && (
            <div className="absolute bottom-full mb-3 left-4 right-4 bg-surface-container-lowest border border-outline-variant rounded-2xl p-3 flex items-center justify-between shadow-xl z-50 animate-in slide-in-from-bottom-2 duration-200">
              <div className="flex items-center gap-3 min-w-0">
                {attachedFile.type.startsWith('image/') ? (
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-outline-variant shrink-0">
                    <img src={attachedFile.dataUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                    <span className="material-symbols-outlined">description</span>
                  </div>
                )}
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-on-surface truncate">
                    {attachedFile.name}
                  </span>
                  <span className="text-[10px] text-outline">
                    {(attachedFile.type || 'File').split('/')[1]?.toUpperCase()}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setAttachedFile(null)}
                className="w-7 h-7 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-outline hover:text-on-surface transition-colors shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          )}

          {/* Attachment Menu Popup */}
          {attachmentMenuOpen && (
            <div className="absolute bottom-full mb-3 left-4 bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-xl p-2 flex flex-col gap-1 w-48 z-50 animate-in slide-in-from-bottom-2 duration-200">
              <button 
                type="button"
                onClick={triggerCameraSelect}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container-low transition-colors text-left text-on-surface font-label-md text-label-md w-full"
              >
                <span className="material-symbols-outlined text-secondary">photo_camera</span>
                <span>Ambil Foto</span>
              </button>
              <button 
                type="button"
                onClick={triggerFileSelect}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container-low transition-colors text-left text-on-surface font-label-md text-label-md w-full"
              >
                <span className="material-symbols-outlined text-secondary">image</span>
                <span>Pilih Gambar &amp; File</span>
              </button>
            </div>
          )}

          {/* Interactive Input Bar */}
          {isRecording ? (
            <div className="w-full bg-surface-container-lowest border border-outline-variant py-4 px-6 rounded-full shadow-lg flex items-center justify-between transition-all relative">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                </span>
                <span className="font-body-md text-body-md text-red-600 font-bold ml-2">
                  Merekam: {formatRecordTime(recordingTime)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {/* Trash/Cancel Button */}
                <button 
                  type="button"
                  onClick={cancelRecording}
                  className="w-10 h-10 bg-surface-container-low text-outline hover:text-red-600 hover:bg-red-50 rounded-full flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
                {/* Stop & Send Button */}
                <button 
                  type="button"
                  onClick={stopRecording}
                  className="w-10 h-10 bg-secondary text-on-secondary hover:scale-105 active:scale-95 rounded-full flex items-center justify-center transition-all shadow-md"
                >
                  <span className="material-symbols-outlined">check</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="relative group">
              {/* Robot Icon Button (Attachment Selector) */}
              <button
                type="button"
                onClick={handleAttachmentClick}
                className={`absolute inset-y-0 left-4 flex items-center hover:text-secondary active:scale-95 transition-all outline-none ${
                  attachmentMenuOpen ? 'text-secondary' : 'text-outline'
                }`}
              >
                <span className="material-symbols-outlined text-[24px]">smart_toy</span>
              </button>

              <input
                className="w-full bg-surface-container-lowest border-outline-variant border py-4 pl-12 pr-14 rounded-full shadow-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all outline-none font-body-md text-body-md text-on-surface placeholder:text-outline"
                placeholder="Tanyakan apa saja"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    sendMessage();
                  }
                }}
              />

              {/* Dynamic Send / Mic Action Button */}
              <button 
                type="button"
                onClick={inputText.trim() || attachedFile ? () => sendMessage() : startRecording}
                className="absolute inset-y-2 right-2 w-10 h-10 bg-secondary text-on-secondary rounded-full flex items-center justify-center hover:opacity-90 active:scale-95 transition-all shadow-md"
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {inputText.trim() || attachedFile ? 'send' : 'mic'}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default LexAI;
