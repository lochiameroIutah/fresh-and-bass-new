import React, { useState } from "react";
import { subscribeUser, verifySubscription } from "../lib/supabase";

const SubscribeModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    preferredGenre: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const musicGenres = [
    "House",
    "Techno",
    "Deep House",
    "Progressive House",
    "Tech House",
    "Minimal",
    "Trance",
    "Drum & Bass",
    "Dubstep",
    "Ambient",
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
      !formData.preferredGenre
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
      const subscribeResult = await subscribeUser(
        formData.name,
        formData.email,
        formData.preferredGenre
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
          setFormData({ name: "", email: "", preferredGenre: "" });
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
      setFormData({ name: "", email: "", preferredGenre: "" });
      setError("");
      setShowSuccess(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md mx-auto transform transition-all duration-500 ease-out animate-slideUp border border-white/20">
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
                <span className="text-sm font-medium">Reindirizzamento in corso...</span>
              </div>
            </div>
          </div>
        ) : (
          // Form
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100/50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-black tracking-tight">
                  Rimani aggiornato
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-all duration-200 flex items-center justify-center"
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
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Name */}
              <div className="group">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-3 transition-colors group-focus-within:text-black"
                >
                  Nome
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-black text-black placeholder-gray-400 transition-all duration-300 bg-gray-50 focus:bg-white hover:border-gray-300"
                    placeholder="Il tuo nome"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="group">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-3 transition-colors group-focus-within:text-black"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400 transition-colors group-focus-within:text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-black text-black placeholder-gray-400 transition-all duration-300 bg-gray-50 focus:bg-white hover:border-gray-300"
                    placeholder="la.tua@email.com"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Genre */}
              <div className="group">
                <label
                  htmlFor="preferredGenre"
                  className="block text-sm font-semibold text-gray-700 mb-3 transition-colors group-focus-within:text-black"
                >
                  Genere preferito
                </label>
                <div className="relative">
                  <select
                    id="preferredGenre"
                    name="preferredGenre"
                    value={formData.preferredGenre}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-black text-black transition-all duration-300 bg-gray-50 focus:bg-white hover:border-gray-300 appearance-none cursor-pointer"
                    disabled={isLoading}
                  >
                    <option value="">Seleziona un genere</option>
                    {musicGenres.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="p-4 bg-red-50 border-2 border-red-100 rounded-xl animate-fadeIn">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-red-500 flex-shrink-0"
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
                    <p className="text-sm text-red-700 font-medium">{error}</p>
                  </div>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group w-full bg-black text-white py-4 px-6 rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span className="tracking-wide">Iscrizione...</span>
                  </>
                ) : (
                  <>
                    <span className="tracking-wide">Iscriviti</span>
                    <svg
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
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
  );
};

export default SubscribeModal;
