import React, { useState, useEffect } from "react";
import App from "../App";

const PreviewLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const PREVIEW_PASSWORD = "freshandbass_"; // Stessa password dell'admin
  const STORAGE_KEY = "preview_authenticated";

  useEffect(() => {
    // Controlla se l'utente è già autenticato
    const savedAuth = localStorage.getItem(STORAGE_KEY);
    if (savedAuth === "true") {
      setIsAuthenticated(true);
      setTimeout(() => setContentVisible(true), 100);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simula un piccolo delay per l'autenticazione
    setTimeout(() => {
      if (password === PREVIEW_PASSWORD) {
        setIsAuthenticated(true);
        localStorage.setItem(STORAGE_KEY, "true");
        setTimeout(() => setContentVisible(true), 100);
      } else {
        setError("Password non corretta");
      }
      setLoading(false);
    }, 500);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setContentVisible(false);
    localStorage.removeItem(STORAGE_KEY);
    setPassword("");
    setError("");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">
            Preview Access
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
                  placeholder="Inserisci la password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            {error && <div className="text-red-400 text-sm">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? "Verifica..." : "Accedi"}
            </button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-400">
            Accesso riservato per visualizzare l'anteprima del sito
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`transition-opacity duration-1000 ${
        contentVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Pulsante di logout nascosto in alto a destra */}
      <button
        onClick={handleLogout}
        className="fixed top-4 right-4 z-50 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors opacity-20 hover:opacity-100"
        title="Logout"
      >
        ✕
      </button>

      {/* Contenuto del sito attuale */}
      <App />
    </div>
  );
};

export default PreviewLayout;
