import React, { useState, useEffect } from 'react';
import { getAdminSetting } from '../lib/supabase';
import App from '../App';
import ComingSoonLayout from './ComingSoonLayout';

const LayoutManager = () => {
  const [layoutMode, setLayoutMode] = useState('current');
  const [loading, setLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    loadLayoutMode();
    
    // Polling per aggiornamenti in tempo reale
    const interval = setInterval(loadLayoutMode, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const loadLayoutMode = async () => {
    try {
      const result = await getAdminSetting('layout_mode');
      if (result.success) {
        setLayoutMode(result.data || 'current');
      }
    } catch (err) {
      console.error('Errore nel caricamento del layout mode:', err);
    } finally {
      setLoading(false);
      // Piccolo delay per permettere il fade-in
      setTimeout(() => setContentVisible(true), 100);
    }
  };

   return (
     <div className={`transition-opacity duration-1000 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
       {layoutMode === 'coming_soon' ? <ComingSoonLayout /> : <App />}
     </div>
   );
 };

export default LayoutManager;