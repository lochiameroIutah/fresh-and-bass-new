import React, { useState, useEffect } from "react";
import { getAdminSetting } from "../lib/supabase";
import SubscribeModal from "./SubscribeModal";

const ComingSoonLayout = () => {
  const [instagramUrl, setInstagramUrl] = useState("");
  const [comingSoonText, setComingSoonText] = useState(
    "Scopri quando sarà il prossimo freshnbass"
  );
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(0.5);
  const [showMainContent, setShowMainContent] = useState(false);
  const [buttonExiting, setButtonExiting] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // Calcola l'opacità basata sullo scroll (da 0.5 a 0.9)
      const opacity = Math.min(0.9, 0.5 + (scrollY / windowHeight) * 0.4);
      setScrollOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loadSettings = async () => {
    try {
      const instagramResult = await getAdminSetting("instagram_embed_url");
      const textResult = await getAdminSetting("coming_soon_text");

      if (instagramResult.success) {
        setInstagramUrl(
          instagramResult.data || "https://www.instagram.com/fresh_n_bass/embed"
        );
      }

      if (textResult.success) {
        setComingSoonText(
          textResult.data || "Scopri quando sarà il prossimo Freshnbass"
        );
      }
    } catch (err) {
      console.error("Errore nel caricamento delle impostazioni:", err);
    } finally {
      setLoading(false);
      // Piccolo delay per permettere il fade-in
      setTimeout(() => setContentVisible(true), 100);
    }
  };

  const handleStayUpdated = () => {
    setShowModal(true);
  };

  const handleDiscoverClick = () => {
    setButtonExiting(true);
    // Dopo l'animazione di uscita del pulsante, mostra il contenuto principale
    setTimeout(() => {
      setShowMainContent(true);
    }, 500);
  };

  return (
    <div
      className={`min-h-screen bg-black text-white transition-opacity duration-1000 ${
        contentVisible ? "opacity-100" : "opacity-0"
      } relative overflow-hidden`}
    >
      {/* Video Background */}
      <video
        className={`fixed top-0 left-0 w-full h-full object-cover z-0 transition-all duration-700 ${
          showMainContent ? "blur-[5px]" : "blur-0"
        }`}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/CANVA DIETRO.webm" type="video/webm" />
      </video>

      {/* Dark overlay for better text readability - dynamic opacity based on scroll */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-black z-10"
        style={{ opacity: scrollOpacity }}
      ></div>

      {/* Content wrapper with higher z-index */}
      <div className="relative z-20">
        {/* Header */}
        <header className="p-6">
          <div className="max-w-[720px] mx-auto">
            {/* Logo con immagini rotanti ai lati */}
            <div className="logo-section flex items-center justify-center gap-2 md:gap-6 lg:gap-8 mb-8">
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
                className="main-logo h-32 md:h-40 lg:h-48 object-contain"
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
          </div>
        </header>

        {/* Central Discover Button - shown initially */}
        {!showMainContent && (
          <div className="fixed inset-0 flex items-center justify-center px-6 z-30">
            <button
              onClick={handleDiscoverClick}
              className={`bg-black text-white mt-[40vh] font-normal py-3 px-6 rounded-full text-sm md:text-base transition-all duration-500 transform hover:scale-105 ${
                buttonExiting ? "opacity-0 scale-75" : "opacity-100 scale-100"
              }`}
              style={{
                boxShadow:
                  "0 20px 40px rgba(255, 193, 7, 0.6), 0 30px 60px rgba(255, 193, 7, 0.4)",
                animation: "floatGlow 3s ease-in-out infinite",
              }}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                </svg>
                <span>Scopri il prossimo Party</span>
              </div>
            </button>
          </div>
        )}

        {/* Main Content - shown after button click */}
        {showMainContent && (
          <main
            className={`flex-1 px-6 py-12 min-h-[100vh] transition-opacity duration-700 ease-out ${
              showMainContent ? "opacity-100" : "opacity-0"
            }`}
            style={{
              animation: showMainContent
                ? "fadeIn 0.7s ease-out forwards"
                : "none",
            }}
          >
            <div className="max-w-[720px] mx-auto">
              <div className="flex flex-col gap-12">
                {/* Call to Action Section */}
                <div className="flex flex-col text-center">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Il prossimo party sta arrivando
                  </h2>

                  <p className="text-sm text-gray-300 mb-8 leading-relaxed">
                    Un evento esclusivo ti aspetta. Entra nel gruppo WhatsApp
                    privato per scoprire quando e dove si terrà.
                  </p>

                  <button
                    onClick={handleStayUpdated}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full text-base transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mx-auto w-fit"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Entra nel Gruppo Segreto
                  </button>

                  {comingSoonText && (
                    <p className="mt-2 text-gray-400 text-xs">
                      {comingSoonText}
                    </p>
                  )}
                </div>

                {/* Instagram Section */}
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-center">
                    Ecco come sono andati gli altri 👇
                  </h2>

                  {instagramUrl ? (
                    <div
                      className="relative w-full"
                      style={{ paddingBottom: "125%" }}
                    >
                      <iframe
                        src={instagramUrl}
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                        frameBorder="0"
                        scrolling="no"
                        allowTransparency="true"
                        allow="encrypted-media"
                        title="Instagram Posts"
                      />
                    </div>
                  ) : (
                    <div className="bg-gray-800 rounded-lg p-8 text-center">
                      <p className="text-gray-400">
                        Instagram feed non disponibile
                      </p>
                    </div>
                  )}

                  {/* Spotify Playlist Section */}
                  <div className="mt-8">
                    <h3 className="text-3xl font-bold mb-4 text-center text-yellow-400">
                      Playlist Ufficiale
                    </h3>
                    <p className="text-white/70 text-sm text-center italic font-extralight">
                      Caricati con la nostra playliste posta il Fresh N' Bass
                      sempre con te!
                    </p>
                    <div className="">
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
                </div>
              </div>
            </div>
          </main>
        )}

        {/* Professional Footer with Better Visibility - only shown with main content */}
        {showMainContent && (
          <div className="mt-16 md:mt-20 relative bg-black/90 py-6 px-6 z-10">
            <div className="max-w-[720px] mx-auto">
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
        )}

        {/* Subscribe Modal */}
        {showModal && (
          <SubscribeModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ComingSoonLayout;
