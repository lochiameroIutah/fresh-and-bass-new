# Fresh & Bass - Sito Web con Sistema di Layout Dinamico

Questo progetto è un sito web per Fresh & Bass con un sistema di gestione layout dinamico, pagina "Coming Soon" personalizzabile e funzionalità di amministrazione.

## 🚀 Avvio Rapido

```bash
npm install
npm run dev
```

Il sito sarà disponibile su `http://localhost:5174`

## 📋 Struttura del Progetto

### Layout Dinamico

Il progetto supporta due modalità di layout:

- **Layout Attuale**: Il sito completo Fresh & Bass
- **Coming Soon**: Pagina "Prossimamente" con tema "Party"

### Pagine Principali

- `/` - Homepage (layout dinamico basato sulle impostazioni admin)
- `/admin` - Pannello di amministrazione
- `/preview` - Anteprima protetta del layout attuale

## 🔧 Come Modificare il Sito

### Metodo 1: Sviluppo con Pagina Preview (Consigliato)

**La pagina `/preview` ti permette di sviluppare senza esporre modifiche al pubblico:**

1. **Imposta il layout pubblico su "Coming Soon"** tramite il pannello admin (`/admin`)
2. **Sviluppa liberamente** modificando i file del layout attuale
3. **Visualizza le modifiche in tempo reale** su `/preview` (password: `freshbass2024`)
4. **Quando sei soddisfatto**, cambia il layout pubblico su "Attuale" dall'admin

**Vantaggi:**

- ✅ Il pubblico vede sempre "Coming Soon"
- ✅ Tu vedi le modifiche in tempo reale
- ✅ Nessuna duplicazione di codice
- ✅ Sviluppo sicuro e isolato

### Metodo 2: Cambio Layout Tradizionale

1. Vai su `/admin` (password: `freshandbass_`)
2. Usa il toggle per cambiare tra "Coming Soon" e "Layout Attuale"
3. Le modifiche si applicano immediatamente al sito pubblico

## 🔐 Sistema di Autenticazione

### Pannello Admin (`/admin`)

- **Password**: `freshandbass_`
- **Funzionalità**:
  - Toggle tra layout "Coming Soon" e "Attuale"
  - Gestione URL Instagram
  - Gestione testo "Coming Soon"
  - Visualizzazione iscritti
  - Esportazione dati in CSV

### Pagina Preview (`/preview`)

- **Password**: `freshandbass_` (stessa dell'admin)
- **Autenticazione persistente**: Una volta inserita, la password viene salvata nel localStorage
- **Logout**: Clicca sulla "✕" in alto a destra
- **Contenuto**: Mostra sempre il layout attuale, indipendentemente dalle impostazioni pubbliche

## 📝 Form di Iscrizione "Party"

### Funzionalità

- **Email obbligatoria**: Validazione email integrata
- **Genere musicale**: Selezione tra Hip Hop, Reggaeton, Afrobeat, Dancehall, Altro
- **Instagram opzionale**: Checkbox con campo di input condizionale
- **Validazione**: Controllo duplicati email
- **Feedback**: Messaggi di successo/errore
- **Redirect automatico**: Dopo l'iscrizione, redirect al gruppo WhatsApp

### Testo del Form

- **Titolo**: "Il prossimo PARTY sta arrivando"
- **Bottone**: "Entra nel Gruppo WhatsApp Segreto"
- **Instagram**: "Clicca qui per aggiungere il tuo Instagram (opzionale)"
- **Successo**: "Accesso Autorizzato! Reindirizzamento al gruppo segreto in X secondi..."

## 🗄️ Database (Supabase)

### Tabella `subscribers`

```sql
- id (UUID, Primary Key)
- email (TEXT, Unique, Not Null)
- preferred_genre (TEXT)
- instagram (TEXT, Optional)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Tabella `admin_settings`

```sql
- id (UUID, Primary Key)
- setting_key (TEXT, Unique)
- setting_value (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

**Impostazioni disponibili:**

- `layout_mode`: "coming_soon" | "current"
- `instagram_url`: URL del profilo Instagram
- `coming_soon_text`: Testo personalizzabile della pagina Coming Soon

## 🎨 Temi e Stili

### Coming Soon - Tema "Party"

- **Logo centrale** con due immagini rotanti
- **Colori**: Nero, giallo, bianco
- **Animazioni**: Rotazione con blur e drop shadow
- **Testo**: Focalizzato su "Party" e "gruppo WhatsApp segreto"

### Layout Attuale

- **Design responsive** con Tailwind CSS
- **Componenti modulari** facilmente modificabili
- **Animazioni fluide** con transizioni CSS

## 🔄 Aggiornamenti in Tempo Reale

- **Polling automatico**: Il layout si aggiorna ogni 2 secondi
- **Nessun refresh necessario**: Le modifiche admin si applicano automaticamente
- **Sincronizzazione**: Tutti gli utenti vedono le modifiche simultaneamente

## 📁 Struttura File Principali

```
src/
├── components/
│   ├── LayoutManager.jsx      # Gestione layout dinamico
│   ├── ComingSoonLayout.jsx   # Pagina "Coming Soon"
│   ├── PreviewLayout.jsx      # Pagina preview protetta
│   ├── AdminAuth.jsx          # Autenticazione admin
│   ├── AdminDashboard.jsx     # Pannello di controllo
│   └── SubscribeModal.jsx     # Form di iscrizione
├── lib/
│   └── supabase.js           # Configurazione database
└── App.jsx                   # Layout principale del sito
```

## 🛠️ Comandi Utili

```bash
# Sviluppo
npm run dev

# Build per produzione
npm run build

# Preview build
npm run preview

# Database migrations
npx supabase db push
```

## 🔒 Sicurezza

- **Password hardcoded**: Per semplicità, la password è nel codice (`freshandbass_`)
- **Autenticazione locale**: Nessun sistema di autenticazione complesso
- **HTTPS consigliato**: Per produzione, usa sempre HTTPS
- **Variabili ambiente**: Le chiavi Supabase sono in variabili ambiente

## 📱 Responsive Design

- **Mobile-first**: Ottimizzato per dispositivi mobili
- **Breakpoints Tailwind**: sm, md, lg, xl
- **Touch-friendly**: Pulsanti e form ottimizzati per touch

## 🚀 Deploy

1. **Build del progetto**: `npm run build`
2. **Upload su hosting**: Carica la cartella `dist/`
3. **Configura variabili ambiente** per Supabase
4. **Testa tutte le funzionalità** in produzione

---

**Sviluppato per Fresh & Bass** 🎵

Per domande o supporto, contatta il team di sviluppo.
