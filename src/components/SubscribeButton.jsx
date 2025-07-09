import React, { useState } from "react";
import SubscribeModal from "./SubscribeModal";

const SubscribeButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="group inline-flex items-center space-x-3 bg-black text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-gray-900 transition-all duration-500 ease-out shadow-2xl hover:shadow-black/50 transform hover:scale-105 hover:-translate-y-1 border border-gray-800 backdrop-blur-sm"
      >
        <svg
          className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
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
        <span className="tracking-wide">Rimani aggiornato</span>
      </button>

      <SubscribeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default SubscribeButton;
