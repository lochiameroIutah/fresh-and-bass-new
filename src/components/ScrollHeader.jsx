import React, { useState, useEffect, useRef } from "react";
import WhatsAppButton from "./WhatsAppButton";

const ScrollHeader = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({});
  const [isEventStarted, setIsEventStarted] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [hasTriggeredEasterEgg, setHasTriggeredEasterEgg] = useState(false);
  const audioRef = useRef(null);
  const confettiRef = useRef(null);

  // Modifica questa data per cambiare l'orario di scadenza del timer
  // Formato: new Date(anno, mese-1, giorno, ora, minuti, secondi)
  const eventDate = new Date(2025, 6, 18, 18, 0, 0); // 18 luglio 2025 alle 18:00
  
  // Debug: mostra sempre il timer per test
  console.log('Timer values:', timeLeft);
  console.log('Event started:', isEventStarted);
  console.log('Current time:', new Date());
  console.log('Event time:', eventDate);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      // Cerca il primo box con classe 'felt-board'
      const firstBox = document.querySelector('.felt-board');
      
      if (firstBox) {
        const boxRect = firstBox.getBoundingClientRect();
        const boxTop = boxRect.top + scrollTop;
        const boxHeight = boxRect.height;
        
        // Mostra l'header quando l'utente ha superato completamente il primo box
        setIsVisible(scrollTop > boxTop + boxHeight);
      } else {
        // Fallback: usa la logica precedente se non trova il box
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        setIsVisible(scrollPercent >= 30);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate.getTime() - now;

      if (distance < 0) {
        setIsEventStarted(true);
        if (!hasTriggeredEasterEgg && !sessionStorage.getItem('easterEggTriggered')) {
          setShowEasterEgg(true);
          setHasTriggeredEasterEgg(true);
          sessionStorage.setItem('easterEggTriggered', 'true');
          
          // Riproduci audio
          if (audioRef.current) {
            audioRef.current.play().catch(e => console.log('Audio play failed:', e));
          }
          
          // Crea confetti
          createConfetti();
          
          // Nascondi easter egg dopo 5 secondi
          setTimeout(() => {
            setShowEasterEgg(false);
          }, 5000);
        }
        clearInterval(timer);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate, hasTriggeredEasterEgg]);

  const createConfetti = () => {
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'absolute';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = '-10px';
      confetti.style.borderRadius = '50%';
      confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
      confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
      document.body.removeChild(confettiContainer);
    }, 5000);
  };

  useEffect(() => {
    // Aggiungi CSS per l'animazione dei confetti
    const style = document.createElement('style');
    style.textContent = `
      @keyframes confettiFall {
        to {
          transform: translateY(100vh) rotate(360deg);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      {/* Audio element per l'easter egg */}
      <audio ref={audioRef} preload="auto">
        <source src="/bombaclaaat.mp3" type="audio/mpeg" />
      </audio>

      {/* Easter Egg Overlay */}
      {showEasterEgg && (
        <div className="fixed inset-0 z-[10000] bg-black/80 flex items-center justify-center">
          <div 
            className="text-6xl md:text-8xl lg:text-9xl font-black uppercase transform rotate-12 animate-pulse"
            style={{
              fontFamily: 'Impact, Arial Black, sans-serif',
              color: '#000000',
              textShadow: '4px 4px 0px #ffffff, -4px -4px 0px #ffffff, 4px -4px 0px #ffffff, -4px 4px 0px #ffffff, 0px 4px 0px #ffffff, 4px 0px 0px #ffffff, 0px -4px 0px #ffffff, -4px 0px 0px #ffffff, 2px 2px 0px #ffffff, -2px -2px 0px #ffffff, 2px -2px 0px #ffffff, -2px 2px 0px #ffffff'
            }}
          >
            BOMBOCLAAAAT!
          </div>
        </div>
      )}

      {/* Header principale */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/10 transition-all duration-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
        }`}
      >
        {/* Mobile Layout */}
        <div className="md:hidden px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Logo e countdown */}
            <div className="flex items-center gap-2">
              <img
                src="/fresh-and-bass-logo-singolo-YZ9jxD2GBvI9v9XG.webp"
                alt="Fresh and Bass"
                className="h-6 w-auto"
              />
              <div className="flex items-center gap-2">
                <div className="text-white text-xs font-bold leading-tight">
                  <div>IL 18 LUGLIO</div>
                  <div>AL DUMBO (BO)</div>
                </div>
                {!isEventStarted ? (
                   <div className="flex justify-center items-center space-x-1 text-center">
                     <div className="flex flex-col items-center">
                       <div className="text-white text-sm font-black font-mono">
                         {String(timeLeft.days || 0).padStart(2, '0')}
                       </div>
                       <div className="text-xs text-white leading-none">
                         GG
                       </div>
                     </div>
                     <div className="flex flex-col items-center">
                       <div className="text-white text-sm font-black font-mono">
                         {String(timeLeft.hours || 0).padStart(2, '0')}
                       </div>
                       <div className="text-xs text-white leading-none">
                         ORE
                       </div>
                     </div>
                     <div className="flex flex-col items-center">
                       <div className="text-white text-sm font-black font-mono">
                         {String(timeLeft.minutes || 0).padStart(2, '0')}
                       </div>
                       <div className="text-xs text-white leading-none">
                         MIN
                       </div>
                     </div>
                     <div className="flex flex-col items-center">
                       <div className="text-white text-sm font-black font-mono">
                         {String(timeLeft.seconds || 0).padStart(2, '0')}
                       </div>
                       <div className="text-xs text-white leading-none">
                         SEC
                       </div>
                     </div>
                   </div>
                  ) : (
                  <div className="text-green-400 text-xs font-bold">
                    La festa è iniziata!
                  </div>
                )}
              </div>
            </div>

            {/* Pulsante WhatsApp */}
            <button
              onClick={() =>
                window.open(
                  "https://chat.whatsapp.com/J5r4GGgcBmH6la9XooWAHh",
                  "_blank"
                )
              }
              className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium transition-colors duration-200 flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787" />
              </svg>
              Unisciti
            </button>
          </div>
        </div>

        {/* Tablet Layout */}
        <div className="hidden md:block lg:hidden px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="/fresh-and-bass-logo-singolo-YZ9jxD2GBvI9v9XG.webp"
                alt="Fresh and Bass"
                className="h-8 w-auto"
              />
              <div className="flex items-center gap-4">
                <span className="text-white text-sm font-bold uppercase tracking-wide">
                  18 LUGLIO AL DUMBO (BO)
                </span>
                {!isEventStarted ? (
                   <div className="flex justify-center items-center space-x-2 text-center">
                     <div className="flex flex-col items-center">
                       <div className="text-white text-lg font-black font-mono">
                         {String(timeLeft.days || 0).padStart(2, '0')}
                       </div>
                       <div className="text-xs text-white leading-none">
                         GG
                       </div>
                     </div>
                     <div className="flex flex-col items-center">
                       <div className="text-white text-lg font-black font-mono">
                         {String(timeLeft.hours || 0).padStart(2, '0')}
                       </div>
                       <div className="text-xs text-white leading-none">
                         ORE
                       </div>
                     </div>
                     <div className="flex flex-col items-center">
                       <div className="text-white text-lg font-black font-mono">
                         {String(timeLeft.minutes || 0).padStart(2, '0')}
                       </div>
                       <div className="text-xs text-white leading-none">
                         MIN
                       </div>
                     </div>
                     <div className="flex flex-col items-center">
                       <div className="text-white text-lg font-black font-mono">
                         {String(timeLeft.seconds || 0).padStart(2, '0')}
                       </div>
                       <div className="text-xs text-white leading-none">
                         SEC
                       </div>
                     </div>
                   </div>
                  ) : (
                  <div className="text-green-400 text-sm font-bold">
                    La festa è iniziata!
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() =>
                window.open(
                  "https://chat.whatsapp.com/J5r4GGgcBmH6la9XooWAHh",
                  "_blank"
                )
              }
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787" />
              </svg>
              Unisciti al gruppo
            </button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block px-8 py-4">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center gap-6">
              <img
                src="/fresh-and-bass-logo-singolo-YZ9jxD2GBvI9v9XG.webp"
                alt="Fresh and Bass"
                className="h-10 w-auto"
              />
              <div className="flex items-center gap-6">
                <span className="text-white text-lg font-bold uppercase tracking-wide">
                  18 LUGLIO AL DUMBO (BO)
                </span>
                {!isEventStarted ? (
                   <div className="flex justify-center items-center space-x-3 text-center">
                     <div className="flex flex-col items-center">
                       <div className="text-white text-xl font-black font-mono">
                         {String(timeLeft.days || 0).padStart(2, '0')}
                       </div>
                       <div className="text-sm text-white leading-none">
                         GG
                       </div>
                     </div>
                     <div className="flex flex-col items-center">
                       <div className="text-white text-xl font-black font-mono">
                         {String(timeLeft.hours || 0).padStart(2, '0')}
                       </div>
                       <div className="text-sm text-white leading-none">
                         ORE
                       </div>
                     </div>
                     <div className="flex flex-col items-center">
                       <div className="text-white text-xl font-black font-mono">
                         {String(timeLeft.minutes || 0).padStart(2, '0')}
                       </div>
                       <div className="text-sm text-white leading-none">
                         MIN
                       </div>
                     </div>
                     <div className="flex flex-col items-center">
                       <div className="text-white text-xl font-black font-mono">
                         {String(timeLeft.seconds || 0).padStart(2, '0')}
                       </div>
                       <div className="text-sm text-white leading-none">
                         SEC
                       </div>
                     </div>
                   </div>
                  ) : (
                  <div className="text-green-400 text-lg font-bold">
                    La festa è iniziata!
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() =>
                window.open(
                  "https://chat.whatsapp.com/J5r4GGgcBmH6la9XooWAHh",
                  "_blank"
                )
              }
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full text-base font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787" />
              </svg>
              Unisciti al gruppo WhatsApp
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScrollHeader;
