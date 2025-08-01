import React, { useState } from "react";
import "../App.css";
import FeltText from "../FeltText";
import SubscribeButton from "./SubscribeButton";
import WhatsAppButton from "./WhatsAppButton";
import WhatsAppBox from "./WhatsAppBox";
import ScrollHeader from "./ScrollHeader";

// Password per accedere alla pagina dell'evento del 18 luglio
const EVENT_PASSWORD = "fresh18luglio";

function Event18Luglio() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Gestisce l'autenticazione con password
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === EVENT_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Password non corretta");
      setPassword("");
    }
  };

  // Se non autenticato, mostra il form di login
  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen text-white overflow-hidden bg-image-overlay light flex items-center justify-center"
        style={{ zIndex: 50 }}
      >
        <div
          className="felt-board rounded-2xl md:rounded-3xl p-8 md:p-12 border border-white/20 max-w-md w-full mx-4"
          style={{ zIndex: 100, position: "relative" }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-6 text-center">
            <FeltText>Evento 18 Luglio</FeltText>
          </h1>
          <p className="text-white text-center mb-6">
            Inserisci la password per accedere alle informazioni dell'evento
          </p>
          <form
            onSubmit={handlePasswordSubmit}
            className="space-y-4"
            style={{ zIndex: 101, position: "relative" }}
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 bg-black/50 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
              style={{
                zIndex: 102,
                position: "relative",
                pointerEvents: "auto",
              }}
              required
              autoFocus
            />
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              style={{
                zIndex: 102,
                position: "relative",
                pointerEvents: "auto",
              }}
            >
              Accedi
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Contenuto dell'evento del 18 luglio (quello attuale)
  return (
    <div className="min-h-screen text-white overflow-hidden bg-image-overlay light">
      <ScrollHeader />
      <div className="content-overlay px-4 md:px-8 lg:px-12 xl:px-16 pt-8 md:pt-12 lg:pt-16 max-w-[1080px] mx-auto">
        <header className="text-center mb-8 md:mb-12">
          <div className="flex flex-col items-center space-y-4 md:space-y-6">
            {/* Presentatori */}
            <div className="flex flex-col items-center space-y-0.5">
              <p className="text-base md:text-lg lg:text-xl font-bold text-blue-400 uppercase tracking-wider">
                JUNGLE PLANET RADIO
                <br /> MUCH MUCH BASS
              </p>
              <p className="text-sm md:text-base lg:text-lg text-white italic font-light">
                Presentano
              </p>
            </div>

            {/* Logo con immagini rotanti ai lati */}
            <div className="logo-section flex items-center justify-center gap-2 md:gap-6 lg:gap-8">
              {/* Immagine rotante sinistra */}
              <img
                className="w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28"
                style={{
                  animation: "spinWithBlur 3.333s linear infinite",
                }}
                src="/fresh sun.webp"
                alt="Rotating Element Left"
              />

              {/* Logo centrale */}
              <img
                className="main-logo h-40 md:h-40 lg:h-48 object-contain animate-zoom-in"
                style={{
                  filter: "drop-shadow(0 0 20px rgba(255,255,255,0.3))",
                }}
                src="https://assets.zyrosite.com/YNqB8DwbkaI8wBb2/fresh-and-bass-logo-singolo-YZ9jxD2GBvI9v9XG.webp"
                alt="Fresh and Bass Logo"
              />

              {/* Immagine rotante destra */}
              <img
                className="w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28"
                style={{
                  animation: "reverseSpinWithBlur 4s linear infinite",
                }}
                src="/fresh sun.webp"
                alt="Rotating Element Right"
              />
            </div>

            <div className="text-center mb-4">
              <p className="text-xl md:text-lg lg:text-xl text-white font-bold uppercase tracking-wider mb-2 px-4 py-0.5 bg-black">
                LOCALE CLIMATIZZATO
              </p>
            </div>

            <p className="text-lg md:text-2xl lg:text-3xl font-bold text-blue-400 text-center max-w-2xl px-4">
              Il party estivo col basso che spinge
            </p>

            {/* WhatsApp Button for summer party */}
            <div className="mt-4">
              <WhatsAppButton />
            </div>

            {/* Subscribe Button */}
            <div className="flex justify-center mt-8 md:mt-12">
              <SubscribeButton />
            </div>
          </div>
        </header>

        <div className="my-8 md:my-12">
          <div className="felt-board rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/20 animate-slideInRight mb-8 md:mb-12">
            <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-yellow-400 mb-4 md:mb-6">
              <FeltText>18 LUGLIO</FeltText>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">
              <FeltText>OFFICINA BISTROT</FeltText>
            </h2>
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <h3 className="text-xl md:text-2xl font-bold text-white">
                <FeltText>(DUMBO)</FeltText>
              </h3>
            </div>

            <div className="text-base md:text-xl text-white mb-3 md:mb-4 mb-5">
              <a
                href="https://maps.app.goo.gl/o86PcfE7rPYNMsxH9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-blue-400 transition-colors ease-in-out"
              >
                📍 <u>VIA CAMILLO CASARINI, 19 (BO)</u>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>

            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-400 mb-4 md:mb-6">
              DALLE 18:00 ALLE 02:00
            </div>
            <div className="text-base md:text-lg text-white mb-4">
              OUTDOOR 18:00-22:00 | INDOOR 22:00-02:00
            </div>

            <div
              className="text-4xl md:text-5xl lg:text-6xl font-black text-yellow-400 mb-2"
              style={{ textShadow: "0 0 10px rgba(255,193,7,0.5)" }}
            >
              FREE ENTRY
            </div>
            <p className="text-white text-lg md:text-xl mb-4 md:mb-6">
              NO TESSERA
            </p>
          </div>

          {/* Spotify Playlist Box */}
          <div className="felt-board rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/20 animate-slideInRight mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-yellow-400 mb-4 md:mb-6 uppercase tracking-widest text-left">
              <FeltText>Playlist</FeltText>
              <br />
              <FeltText>dell'evento</FeltText>
            </h2>
            <div className="flex justify-center">
              <iframe
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/playlist/7e7q2mBMpf6oY3SbrTLuRz?utm_source=generator"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Line Up Section */}
          <div className="felt-board rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-12 border border-white/20 animate-slideInLeft">
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-blue-400 mb-6 md:mb-8 lg:mb-10 uppercase tracking-widest text-left">
              <FeltText>Line Up</FeltText>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 md:mb-8 justify-items-center">
              <FeltText className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 text-center">
                JAHPAWA
              </FeltText>
              <FeltText className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 text-center">
                RIC DE LARGE
              </FeltText>
              <FeltText className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 text-center">
                DOMPROD
              </FeltText>
              <FeltText className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 text-center">
                GRIME SPITTERZ
              </FeltText>
              <FeltText className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 text-center">
                EPCORAW
              </FeltText>
              <FeltText className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 text-center">
                WEERO
              </FeltText>
              <FeltText className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 text-center">
                CLOUD
              </FeltText>
            </div>
            <div className="text-xl md:text-2xl text-blue-400 font-bold mb-4 text-center">
              Hosted by CESK
            </div>

            <div className="text-lg md:text-xl lg:text-2xl text-center">
              <p className="font-bold">
                <span className="text-blue-400">Live Streaming</span>
                <br />
                <span className="text-yellow-400 text-xl md:text-2xl lg:text-3xl">
                  by Jungle Planet Radio
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8 md:mt-12 lg:mt-16 px-4">
          <img
            src="/loghi sotto fresh and bass.webp"
            alt="Partner Logos"
            className="rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl max-w-full h-auto w-full max-w-4xl"
            style={{ filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.6))" }}
          />
        </div>

        {/* Footer */}
        <div className="mt-16 md:mt-20 relative bg-black/90 py-6 -mx-4 md:-mx-8 lg:-mx-12 xl:-mx-16 px-4 md:px-8 lg:px-12 xl:px-16 z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-1">
                <span className="text-white text-sm md:text-base font-light italic">
                  Realizzato da
                </span>
                <span className="text-yellow-400 text-base md:text-lg font-bold tracking-wide">
                  Matteo Zampieri
                </span>
              </div>
              <div className="pt-1">
                <a
                  href="https://instagram.com/themattvision"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs font-medium rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  <svg
                    className="w-2.5 h-2.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  @themattvision
                </a>
              </div>
              <div className="text-white text-xs italic">
                Sviluppo web • Design • Automazioni • Creatività digitale
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Event18Luglio;
