import React, { useState } from "react";
import { subscribeUser, verifySubscription } from "../lib/supabase";

const SubscribeModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    preferredGenre: "",
    customGenre: "",
    instagram: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [showInstagram, setShowInstagram] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const musicGenres = [
    "Melodic Techno",
    "Bass Music",
    "Hard Techno",
    "Drum & Bass",
    "Jungle",
    "UK Garage",
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

  // Step validation function
  const isStepValid = () => {
    if (currentStep === 1) {
      return (
        formData.preferredGenre !== "" &&
        (formData.preferredGenre !== "Altro" ||
          formData.customGenre.trim() !== "")
      );
    }
    if (currentStep === 2) {
      return formData.email.trim() !== "";
    }
    if (currentStep === 3) {
      return true; // Instagram is optional
    }
    return false;
  };

  // Navigation functions
  const handleStepOne = () => {
    if (isStepValid()) {
      setCurrentStep(2);
    }
  };

  const handleStepTwo = () => {
    if (isStepValid()) {
      setCurrentStep(3);
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      handleStepOne();
    } else if (currentStep === 2) {
      handleStepTwo();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Subscribe user
      const finalGenre =
        formData.preferredGenre === "Altro"
          ? formData.customGenre
          : formData.preferredGenre;
      const subscribeResult = await subscribeUser(
        formData.email,
        finalGenre,
        formData.instagram
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
            email: "",
            preferredGenre: "",
            customGenre: "",
            instagram: "",
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
      setFormData({
        email: "",
        preferredGenre: "",
        customGenre: "",
        instagram: "",
      });
      setCurrentStep(1);
      setShowInstagram(false);
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
            filter: "blur(10px) brightness(0.3)",
            transform: "scale(1.1)",
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
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                  Accesso Autorizzato! 🎉
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Perfetto! Ora hai accesso al gruppo WhatsApp segreto del
                  Party.
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
              <div className="relative pt-4 pb-0 px-4 md:p-6 md:pb-0">
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
                  <h2 className="text-2xl md:text-3xl font-black text-yellow-400 mb-4 tracking-tight">
                    Party Access
                  </h2>
                  <div className="transition-all text-left duration-500 ease-in-out">
                    {currentStep === 1 && (
                      <p className="text-lg md:text-xl text-white font-bold px-1 leading-7 animate-fadeIn">
                        Qual è il tuo genere musicale preferito?
                      </p>
                    )}
                    {currentStep === 2 && (
                      <p className="text-lg md:text-xl text-white font-bold px-1 leading-7 animate-fadeIn">
                        Dove vuoi ricevere il link del gruppo WhatsApp?
                      </p>
                    )}
                    {currentStep === 3 && (
                      <p className="text-lg md:text-xl text-white font-bold px-1 leading-7 animate-fadeIn">
                        Un'ultima cosa...
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="p-4 pt-0 md:p-6 md:pt-0 space-y-3 md:space-y-4">
                {/* Step 1: Genre Selection */}
                {currentStep === 1 && (
                  <div className="animate-fadeIn">
                    {/* Genre */}
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                        </svg>
                      </div>
                      <select
                        id="preferredGenre"
                        name="preferredGenre"
                        value={formData.preferredGenre}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl text-black transition-all duration-300 bg-white focus:bg-white border-2 border-white/50 focus:border-yellow-400 hover:border-white/70 appearance-none cursor-pointer"
                        disabled={isLoading}
                      >
                        <option value="">
                          Seleziona il tuo genere preferito
                        </option>
                        {musicGenres.map((genre) => (
                          <option key={genre} value={genre}>
                            {genre}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M7 10l5 5 5-5z" />
                        </svg>
                      </div>
                    </div>

                    {/* Custom Genre - Show only when "Altro" is selected */}
                    {formData.preferredGenre === "Altro" && (
                      <div className="mt-3 animate-fadeIn">
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
                  </div>
                )}

                {/* Step 2: Email */}
                {currentStep === 2 && (
                  <div className="animate-fadeIn">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl text-black placeholder-gray-500 transition-all duration-300 bg-white focus:bg-white border-2 border-white/50 focus:border-yellow-400 hover:border-white/70"
                      placeholder="latuamail@email.com"
                      disabled={isLoading}
                    />
                  </div>
                )}

                {/* Step 3: Instagram */}
                {currentStep === 3 && (
                  <div className="flex items-start space-x-3 animate-fadeIn">
                    <div className="flex items-center mt-1">
                      <input
                        type="checkbox"
                        id="instagram-checkbox"
                        checked={showInstagram}
                        onChange={(e) => setShowInstagram(e.target.checked)}
                        className="w-5 h-5 rounded-md border-2 border-white bg-transparent checked:bg-white checked:border-white focus:ring-2 focus:ring-yellow-400 focus:ring-offset-0 cursor-pointer"
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="instagram-checkbox"
                        className="block text-sm text-white cursor-pointer"
                      >
                        Clicca su questo pulsante se vuoi aggiungere il tuo
                        Instagram{" "}
                        <span className="text-gray-400">(opzionale)</span>{" "}
                        <br />
                        <span className="text-xs text-gray-500">
                          Potremmo inviarti qualcosa di succulento per la serata
                        </span>
                      </label>
                      {showInstagram && (
                        <input
                          type="text"
                          id="instagram"
                          name="instagram"
                          value={formData.instagram}
                          onChange={handleInputChange}
                          className="w-full mt-2 px-4 py-3 rounded-xl text-black placeholder-gray-500 transition-all duration-300 bg-white focus:bg-white border-2 border-white/50 focus:border-yellow-400 hover:border-white/70 animate-fadeIn"
                          placeholder="@il_tuo_instagram"
                          disabled={isLoading}
                        />
                      )}
                    </div>
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

                {/* Navigation Buttons */}
                <div className="space-y-3">
                  {(currentStep === 1 || currentStep === 2) && (
                    <button
                      onClick={handleNextStep}
                      disabled={isLoading || !isStepValid()}
                      className="group w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] animate-fadeIn"
                    >
                      <span className="tracking-wide">
                        {currentStep === 1 ? "Continua" : "Conferma e Continua"}
                      </span>
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
                    </button>
                  )}

                  {currentStep === 3 && (
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="group w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] animate-fadeIn"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                          <span className="tracking-wide">
                            Verifica in corso...
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="tracking-wide">
                            Ottieni Link Segreto
                          </span>
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
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscribeModal;
