import React, { useState, useEffect } from 'react';
import { getAdminSetting, updateAdminSetting, getAllAdminSettings, getAllSubscribers } from '../lib/supabase';
import './AdminToggle.css';

const AdminDashboard = () => {
  const [layoutMode, setLayoutMode] = useState('current');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [comingSoonText, setComingSoonText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadingCsv, setDownloadingCsv] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Carica le impostazioni singolarmente per una migliore gestione degli errori
      const layoutResult = await getAdminSetting('layout_mode');
      const instagramResult = await getAdminSetting('instagram_embed_url');
      const textResult = await getAdminSetting('coming_soon_text');
      
      if (layoutResult.success) {
        setLayoutMode(layoutResult.data || 'current');
      }
      
      if (instagramResult.success) {
        setInstagramUrl(instagramResult.data || '');
      }
      
      if (textResult.success) {
        setComingSoonText(textResult.data || '');
      }
      
      // Se almeno una impostazione è stata caricata con successo, non mostrare errore
      if (!layoutResult.success && !instagramResult.success && !textResult.success) {
        setError('Errore nel caricamento delle impostazioni. Verifica la connessione al database.');
      }
      
    } catch (err) {
      console.error('Errore nel caricamento:', err);
      setError('Errore imprevisto nel caricamento delle impostazioni');
    } finally {
      setLoading(false);
    }
  };

  const handleLayoutToggle = async () => {
    const newMode = layoutMode === 'current' ? 'coming_soon' : 'current';
    
    const result = await updateAdminSetting('layout_mode', newMode);
    if (result.success) {
      setLayoutMode(newMode);
    } else {
      setError('Errore nell\'aggiornamento del layout');
    }
  };

  const handleInstagramUrlChange = async (e) => {
    const newUrl = e.target.value;
    setInstagramUrl(newUrl);
    
    const result = await updateAdminSetting('instagram_embed_url', newUrl);
    if (!result.success) {
      setError('Errore nell\'aggiornamento dell\'URL Instagram');
    }
  };

  const handleTextChange = async (e) => {
    const newText = e.target.value;
    setComingSoonText(newText);
    
    const result = await updateAdminSetting('coming_soon_text', newText);
    if (!result.success) {
      setError('Errore nell\'aggiornamento del testo');
    }
  };

  const downloadCsv = async () => {
    try {
      setDownloadingCsv(true);
      setError(null);
      
      const result = await getAllSubscribers();
      
      if (!result.success) {
        setError('Errore nel recupero dei dati: ' + result.error);
        return;
      }
      
      if (!result.data || result.data.length === 0) {
        setError('Nessun dato disponibile per il download');
        return;
      }
      
      // Converti i dati in formato CSV
      const csvHeaders = ['ID', 'Email', 'Genere Preferito', 'Instagram', 'Data Iscrizione'];
      const csvRows = result.data.map(subscriber => [
        subscriber.id,
        subscriber.email,
        subscriber.preferred_genre || '',
        subscriber.instagram || '',
        new Date(subscriber.created_at).toLocaleString('it-IT')
      ]);
      
      // Crea il contenuto CSV
      const csvContent = [
        csvHeaders.join(','),
        ...csvRows.map(row => row.map(field => `"${field}"`).join(','))
      ].join('\n');
      
      // Crea e scarica il file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `subscribers_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (err) {
      console.error('Errore durante il download:', err);
      setError('Errore imprevisto durante il download del CSV');
    } finally {
      setDownloadingCsv(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Caricamento...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Amministrazione</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Layout Mode</h2>
          
          <div className="flex items-center space-x-4">
            <span className={`text-sm font-medium ${
              layoutMode === 'current' ? 'text-blue-600' : 'text-gray-500'
            }`}>
              Layout Attuale
            </span>
            
            <label className="switch">
              <input
                type="checkbox"
                checked={layoutMode === 'coming_soon'}
                onChange={handleLayoutToggle}
              />
              <span className="knob"></span>
            </label>
            
            <span className={`text-sm font-medium ${
              layoutMode === 'coming_soon' ? 'text-blue-600' : 'text-gray-500'
            }`}>
              Prossimamente
            </span>
          </div>
        </div>

        {layoutMode === 'coming_soon' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Configurazione Instagram</h2>
              <div>
                <label htmlFor="instagram-url" className="block text-sm font-medium text-gray-700 mb-2">
                  URL Embed Instagram
                </label>
                <input
                  type="url"
                  id="instagram-url"
                  value={instagramUrl}
                  onChange={handleInstagramUrlChange}
                  placeholder="https://www.instagram.com/fresh_n_bass/embed"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Testo Pulsante</h2>
              <div>
                <label htmlFor="coming-soon-text" className="block text-sm font-medium text-gray-700 mb-2">
                  Testo per il pulsante "Rimani Aggiornato"
                </label>
                <textarea
                  id="coming-soon-text"
                  value={comingSoonText}
                  onChange={handleTextChange}
                  placeholder="Scopri quando sarà il prossimo freshnbass"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Gestione Dati Utenti</h2>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <p>Scarica tutti i dati degli utenti iscritti in formato CSV</p>
            </div>
            <button
              onClick={downloadCsv}
              disabled={downloadingCsv}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                downloadingCsv
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {downloadingCsv ? 'Scaricando...' : 'Scarica CSV'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Stato Attuale</h2>
          <div className="text-sm text-gray-600">
            <p><strong>Layout:</strong> {layoutMode === 'current' ? 'Layout Attuale' : 'Prossimamente'}</p>
            {layoutMode === 'coming_soon' && (
              <>
                <p><strong>Instagram URL:</strong> {instagramUrl || 'Non configurato'}</p>
                <p><strong>Testo Pulsante:</strong> {comingSoonText || 'Non configurato'}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;