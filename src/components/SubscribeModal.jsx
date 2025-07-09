import React, { useState } from "react";
import { subscribeUser, verifySubscription } from "../lib/supabase";

const SubscribeModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    preferredGenre: "",
    customGenre: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const musicGenres = [
    "Melodic Techno",
    "Bass Music",
    "Hard Techno",
    "Drum & Bass",
    "Jungle",
    "Breaks",
    "House",
    "Tech House",
    "Minimal Techno",
    "Altro",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.preferredGenre ||
      (formData.preferredGenre === "Altro" && !formData.customGenre.trim())
    ) {
      setError("Tutti i campi sono obbligatori");
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Inserisci un indirizzo email valido");
      setIsLoading(false);
      return;
    }

    try {
      // Subscribe user
      const finalGenre =
        formData.preferredGenre === "Altro"
          ? formData.customGenre
          : formData.preferredGenre;
      const subscribeResult = await subscribeUser(
        formData.name,
        formData.email,
        finalGenre
      );

      if (!subscribeResult.success) {
        if (subscribeResult.error.includes("duplicate key")) {
          setError("Questo indirizzo email è già registrato");
        } else {
          setError("Errore durante l'iscrizione. Riprova.");
        }
        setIsLoading(false);
        return;
      }

      // Verify subscription
      const verifyResult = await verifySubscription(formData.email);

      if (verifyResult.success) {
        setShowSuccess(true);
        // Redirect to WhatsApp after 2 seconds
        setTimeout(() => {
          window.open(
            "https://chat.whatsapp.com/J5r4GGgcBmH6la9XooWAHh",
            "_blank"
          );
          onClose();
          setShowSuccess(false);
          setFormData({
            name: "",
            email: "",
            preferredGenre: "",
            customGenre: "",
          });
        }, 2000);
      } else {
        setError("Errore durante la verifica. Riprova.");
      }
    } catch (err) {
      setError("Errore imprevisto. Riprova.");
    }

    setIsLoading(false);
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
      setFormData({ name: "", email: "", preferredGenre: "", customGenre: "" });
      setError("");
      setShowSuccess(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 animate-fadeIn z-[9999]">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-transparent backdrop-blur-sm transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative rounded-2xl md:rounded-3xl shadow-2xl w-full max-w-sm md:max-w-md mx-auto transform transition-all duration-500 ease-out animate-slideUp border border-white/20 overflow-hidden">
        {/* Background with blur */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/sfondo fresh and bass.webp")',
            filter: 'blur(10px) brightness(0.3)',
            transform: 'scale(1.1)'
          }}
        />
        <div className="relative z-10 bg-black/40 backdrop-blur-sm">
        {showSuccess ? (
          // Success message
          <div className="p-8 text-center animate-fadeIn">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-3 tracking-tight">
                Perfetto! 🎉
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Ti abbiamo aggiunto alla lista! Ora ti portiamo nel gruppo
                WhatsApp per tutti gli aggiornamenti.
              </p>
              <div className="flex items-center justify-center space-x-3 text-green-600 bg-green-50 rounded-full px-4 py-2 mx-auto w-fit">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-600 border-t-transparent"></div>
                <span className="text-sm font-medium">
                  Reindirizzamento in corso...
                </span>
              </div>
            </div>
          </div>
        ) : (
          // Form
          <>
            {/* Header */}
            <div className="relative p-4 md:p-6">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-black/20 hover:bg-black/30 text-white hover:text-yellow-400 transition-all duration-200 flex items-center justify-center"
                disabled={isLoading}
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-black text-yellow-400 mb-3 tracking-tight">
                  Ne faremo altri!
                </h2>
                <p className="text-sm md:text-base text-white leading-relaxed px-2">
                  Siamo un gruppo di nuovi regaz da tutt'Italia, sbarcati a
                  Bolo! Vogliamo fare festa tutti insieme, e l'email è il modo
                  migliore per non perderci di vista!
                </p>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="p-4 md:p-6 space-y-3 md:space-y-4"
            >
              {/* Name */}
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl text-black placeholder-gray-500 transition-all duration-300 bg-white focus:bg-white border-2 border-white/50 focus:border-yellow-400 hover:border-white/70"
                  placeholder="Il tuo nome"
                  disabled={isLoading}
                />
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl text-black placeholder-gray-500 transition-all duration-300 bg-white focus:bg-white border-2 border-white/50 focus:border-yellow-400 hover:border-white/70"
                  placeholder="la.tua@email.com"
                  disabled={isLoading}
                />
              </div>

              {/* Genre */}
              <div>
                <select
                  id="preferredGenre"
                  name="preferredGenre"
                  value={formData.preferredGenre}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl text-black transition-all duration-300 bg-white focus:bg-white border-2 border-white/50 focus:border-yellow-400 hover:border-white/70 appearance-none cursor-pointer"
                  disabled={isLoading}
                >
                  <option value="">Seleziona il tuo genere preferito</option>
                  {musicGenres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom Genre - Show only when "Altro" is selected */}
              {formData.preferredGenre === "Altro" && (
                <div>
                  <input
                    type="text"
                    id="customGenre"
                    name="customGenre"
                    value={formData.customGenre}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl text-black placeholder-gray-500 transition-all duration-300 bg-white focus:bg-white border-2 border-white/50 focus:border-yellow-400 hover:border-white/70"
                    placeholder="Scrivi il tuo genere preferito"
                    disabled={isLoading}
                  />
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="p-3 bg-red-500/20 border-2 border-red-400/50 rounded-xl animate-fadeIn">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-red-300 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-sm text-white font-medium">{error}</p>
                  </div>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group w-full bg-yellow-400 hover:bg-yellow-300 text-black py-3 px-4 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent"></div>
                    <span className="tracking-wide">Iscrizione...</span>
                  </>
                ) : (
                  <>
                    <span className="tracking-wide">Iscriviti</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </>
        )}
        </div>
      </div>
    </div>
  );
};

export default SubscribeModal;
