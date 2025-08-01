import React, { useState, useEffect } from "react";
import "./App.css";
import FeltText from "./FeltText";
import SubscribeButton from "./components/SubscribeButton";
import WhatsAppButton from "./components/WhatsAppButton";
import WhatsAppBox from "./components/WhatsAppBox";
import ScrollHeader from "./components/ScrollHeader";
import { getAdminSetting } from "./lib/supabase";

function App() {
  const [showDirectionsModal, setShowDirectionsModal] = useState(false);
  const [showPastEventsModal, setShowPastEventsModal] = useState(false);
  const [isClosingPastEventsModal, setIsClosingPastEventsModal] =
    useState(false);
  const [instagramUrl, setInstagramUrl] = useState("");
  const [isInstagramLoading, setIsInstagramLoading] = useState(true);
  const [shouldLoadInstagram, setShouldLoadInstagram] = useState(false);
  const [instagramError, setInstagramError] = useState(false);

  // Funzione per aprire la modale degli eventi passati
  const openPastEventsModal = () => {
    setShowPastEventsModal(true);
    setShouldLoadInstagram(true);
    setIsInstagramLoading(true);
    setInstagramError(false);
  };

  // Gestione timeout per Instagram con useEffect
  useEffect(() => {
    let timeoutId;
    if (shouldLoadInstagram && isInstagramLoading) {
      timeoutId = setTimeout(() => {
        setIsInstagramLoading(false);
        setInstagramError(true);
      }, 10000); // 10 secondi di timeout
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [shouldLoadInstagram, isInstagramLoading]);

  // Funzione per chiudere la modale degli eventi passati con animazione
  const closePastEventsModal = () => {
    setIsClosingPastEventsModal(true);
    setTimeout(() => {
      setShowPastEventsModal(false);
      setIsClosingPastEventsModal(false);
    }, 200); // Durata dell'animazione di uscita
  };

  // Carica l'URL di Instagram all'avvio
  useEffect(() => {
    const loadInstagramUrl = async () => {
      try {
        const instagramResult = await getAdminSetting("instagram_embed_url");
        if (instagramResult.success) {
          const url =
            instagramResult.data ||
            "https://www.instagram.com/fresh_n_bass/embed";
          setInstagramUrl(url);
        }
      } catch (error) {
        console.error("Errore nel caricamento dell'URL Instagram:", error);
      }
    };
    loadInstagramUrl();
  }, []);
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
              {/* Immagine rotante sinistra - visibile anche su mobile */}
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

              {/* Immagine rotante destra - visibile anche su mobile */}
              <img
                className="w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28"
                style={{
                  animation: "reverseSpinWithBlur 4s linear infinite",
                }}
                src="/fresh sun.webp"
                alt="Rotating Element Right"
              />
            </div>
            <div className="w-[80%] text-center mb-4">
              <p className="text-xl md:text-2xl lg:text-3xl outline-2 text-white font-bold uppercase tracking-wider mb-2 px-4 py-0.5 bg-gradient-to-r from-white/30 to-white/70 backdrop-blur-2xl drop-shadow-sm">
                POOL PARTY
              </p>
            </div>

            {/* <p className="text-lg md:text-2xl lg:text-3xl font-bold text-blue-400 text-center max-w-2xl px-4">
              Il Pool Party più fresco dell'estate
            </p> */}

            {/* Buttons for summer party */}
            <div className="mt-4 flex  sm:flex-row items-center justify-center gap-4">
              <button
                onClick={openPastEventsModal}
                className="inline-flex items-center space-x-2 bg-white/20 border border-white/30 text-white px-4 py-2 rounded-full text-sm font-normal hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 backdrop-blur-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="white" />
                  <rect x="11" y="7" width="2" height="10" fill="black" />
                  <rect x="7" y="11" width="10" height="2" fill="black" />
                </svg>
                <span>Scopri di più</span>
              </button>
              <WhatsAppButton />
            </div>

            {/* Subscribe Button - Moved below partner logos */}
            {/* <div className="flex justify-center mt-8 md:mt-12">
              <SubscribeButton />
            </div> */}
          </div>
        </header>

        <div className="my-8 md:my-12">
          <div className="felt-board rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/20 animate-slideInRight mb-8 md:mb-12">
            <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-yellow-400 mb-4 md:mb-6">
              <FeltText>9 AGOSTO</FeltText>
            </div>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl  md:text-2xl font-bold text-white mb-1 md:mb-2">
                    <FeltText>VILLA PARADISE</FeltText>
                  </h2>
                </div>

                <div className="space-y-1 text-base md:text-xl text-white mb-3 md:mb-4">
                  <a
                    href="https://maps.app.goo.gl/nu6cPbM2aqghCJBR9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white hover:text-blue-400 transition-colors ease-in-out"
                  >
                    📍 <u>VIA GASTONE PICCININI 9, (BO)</u>
                  </a>
                  <button
                    onClick={() => setShowDirectionsModal(true)}
                    className="bg-black/80 text-xs backdrop-blur-sm  text-white  py-1.5 pb-2 px-3 rounded-full transition-all duration-300 flex items-center gap-1  md:mt-0 md:ml-4 self-start"
                  >
                    🗺️ Come arrivare
                  </button>
                </div>
              </div>
            </div>

            <div className="text-xl md:text-xl drop-shadow-xl text-blue-400 font-bold ">
              DALLE 15:00 ALLE 22:00
            </div>

            <div className="space-y-2 mb-6">
              <div className="text-lg md:text-xl text-white">
                <u>
                  <strong>Piscina aperta dalle 10</strong>
                </u>{" "}
                <br />
              </div>
            </div>
          </div>

          {/* Informazioni Ingresso - Boxate con sfocatura */}
          <div className="felt-board rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/20 mb-8 md:mb-12 shadow-lg">
            <div className="text-4xl tracking-wider md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-yellow-400 mb-4">
              <FeltText>INGRESSO:</FeltText>
            </div>
            <div className="space-y-1.5 text-xl md:text-2xl text-white">
              <div className="drop-shadow-md">
                <strong>10 €</strong> per tutta la giornata
              </div>
              <div className="drop-shadow-md">
                <strong>5 €</strong> se entri dopo le 18:00
              </div>
              <div className="text-blue-500 font-bold drop-shadow-md text-base md:text-base">
                + Tessera ARCI obbligatoria <br /> (acquistabile in loco per 5€)
              </div>
            </div>
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

          {/* WhatsApp Box - Above Line Up */}
          {/* Temporarily hidden WhatsApp box */}
          {/* <div className="mb-8 md:mb-12">
            <WhatsAppBox />
          </div> */}

          {/* Line Up Section - Felt Board Style */}
          <div className="felt-board rounded-2xl  md:rounded-3xl p-6 md:p-10 lg:p-12 border border-white/20 animate-slideInLeft">
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-blue-400 mb-6 md:mb-8 lg:mb-10 uppercase tracking-widest text-left">
              <FeltText>Line Up</FeltText>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 md:mb-8">
              <FeltText className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 text-left">
                WEERO
              </FeltText>
              <FeltText className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 text-left">
                RIC DE LARGE
              </FeltText>
              <FeltText className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 text-left">
                EPCORAW
              </FeltText>
              <FeltText className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 text-left">
                SINNER
              </FeltText>
              <FeltText className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 text-left">
                IKB
              </FeltText>
            </div>
            <div className="text-xl text-left md:text-2xl text-blue-400 font-bold mb-4 ">
              Hosted by <br />{" "}
              <b className="text-white text-2xl">GRIME SPITTERZ</b>
            </div>

            {/* <div className="text-lg md:text-xl lg:text-2xl text-center">
              <p className="font-bold">
                <span className="text-blue-400">Live Streaming</span>
                <br />
                <span className="text-yellow-400 text-xl md:text-2xl lg:text-3xl">
                  by Jungle Planet Radio
                </span>
              </p>
            </div> */}
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

        {/* Professional Footer with Better Visibility */}
        <div className="mt-16 md:mt-20 relative bg-black/90 py-6 -mx-4 md:-mx-8 lg:-mx-12 xl:-mx-16 px-4 md:px-8 lg:px-12 xl:px-16 z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              {/* Main branding line */}
              <div className="flex items-center justify-center gap-1">
                <span className="text-white text-sm md:text-base font-light italic">
                  Realizzato da
                </span>
                <span className="text-yellow-400 text-base md:text-lg font-bold tracking-wide">
                  Matteo Zampieri
                </span>
              </div>

              {/* Compact Instagram button */}
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

              {/* Subtle tagline */}
              <div className="text-white text-xs italic">
                Sviluppo web • Design • Automazioni • Creatività digitale
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modale per le indicazioni stradali */}
      {showDirectionsModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300 ease-out"
          onClick={() => setShowDirectionsModal(false)}
        >
          <div
            className="bg-gray-900 rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-out animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-400">
                🚗 COME ARRIVARE
              </h3>
              <button
                onClick={() => setShowDirectionsModal(false)}
                className="text-white hover:text-red-400 text-3xl font-bold transition-colors duration-200"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 text-lg md:text-xl text-white">
              <div>
                <strong>🚌 Bus:</strong> linee 11, 18, 30, 92 (fermate
                Pellegrino o Selva Pescarola)
              </div>
              <div>
                <strong>🚲 Bici:</strong> 12 min dalla Stazione Centrale
              </div>
              <div>
                <strong>🚗 Auto:</strong> ampio parcheggio gratuito
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setShowDirectionsModal(false)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modale fullscreen per eventi passati */}
      {showPastEventsModal && (
        <div
          className={`fixed inset-0 bg-transparent backdrop-blur-lg flex items-center justify-center z-50 transition-all duration-300 ${
            isClosingPastEventsModal ? "animate-fade-out" : "animate-fade-in"
          }`}
          onClick={closePastEventsModal}
        >
          <div
            className="bg-transparent rounded-2xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col overflow-visible"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header della modale */}
            <div className="flex justify-between items-center p-6">
              <h2 className="text-xl md:text-2xl font-bold text-yellow-400 text-center flex-1">
                Ecco come sono andati gli altri fresh 'n bass
              </h2>
              <button
                onClick={closePastEventsModal}
                className="text-white hover:text-yellow-400 transition-colors text-2xl font-bold ml-4"
              >
                ✕
              </button>
            </div>

            {/* Contenuto della modale */}
            <div className="flex-1 p-6 overflow-y-auto flex items-center justify-center">
              {instagramUrl ? (
                <div className="w-full max-w-2xl">
                  <div
                    className="relative w-full rounded-lg overflow-hidden"
                    style={{ paddingBottom: "125%" }}
                  >
                    {isInstagramLoading && !instagramError && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-800 rounded-lg">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
                          <p className="text-gray-400">
                            Caricamento Instagram...
                          </p>
                        </div>
                      </div>
                    )}
                    {instagramError && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-800 rounded-lg">
                        <div className="text-center">
                          <div className="text-red-400 text-4xl mb-4">⚠️</div>
                          <p className="text-gray-400 mb-4">
                            Errore nel caricamento di Instagram
                          </p>
                          <button
                            onClick={() => {
                              setInstagramError(false);
                              setIsInstagramLoading(true);
                              setShouldLoadInstagram(false);
                              setTimeout(
                                () => setShouldLoadInstagram(true),
                                100
                              );
                            }}
                            className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors"
                          >
                            Riprova
                          </button>
                        </div>
                      </div>
                    )}
                    {shouldLoadInstagram && (
                      <iframe
                        src={instagramUrl}
                        className="absolute top-0 left-0 w-full h-full"
                        frameBorder="0"
                        scrolling="no"
                        allowTransparency="true"
                        allow="encrypted-media"
                        title="Instagram Posts"
                        style={{ backgroundColor: "transparent" }}
                        onLoad={() => {
                          setIsInstagramLoading(false);
                          setInstagramError(false);
                        }}
                        onError={() => {
                          setIsInstagramLoading(false);
                          setInstagramError(true);
                        }}
                        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                        referrerPolicy="strict-origin-when-cross-origin"
                      />
                    )}
                  </div>

                  <div className=" text-center italic text-amber-400 leading-3 text-sm md:text-xl mt-6">
                    <p className="drop-shadow-lg">
                      Allora sarai dei nostri? Clicca sul pulsante qua sotto per
                      iniziare, ti aspettiamo!
                    </p>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <WhatsAppButton />
                  </div>
                </div>
              ) : (
                <div className="bg-gray-800 rounded-lg p-8 text-center w-full max-w-2xl">
                  <p className="text-gray-400 text-lg">
                    Instagram feed non disponibile
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
