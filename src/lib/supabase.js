import { createClient } from "@supabase/supabase-js";

// Supabase configuration
const supabaseUrl = "https://oufeicsddpaswuirhcmz.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91ZmVpY3NkZHBhc3d1aXJoY216Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNjUzNjEsImV4cCI6MjA2NzY0MTM2MX0.qgietGa90R6RlK_JHarP5ELl5m6FTrvmBzl-mY7GrFI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to subscribe a user
export async function subscribeUser(email, preferredGenre, instagram = '') {
  try {
    const insertData = {
      email: email.trim().toLowerCase(),
      preferred_genre: preferredGenre,
    };
    
    // Aggiungi Instagram solo se fornito
    if (instagram && instagram.trim()) {
      insertData.instagram = instagram.trim();
    }

    const { data, error } = await supabase
      .from("subscribers")
      .insert([insertData])
      .select();

    if (error) {
      console.error("Errore durante l'iscrizione:", error);
      return { success: false, error: error.message };
    }

    console.log("Iscrizione completata:", data);
    return { success: true, data };
  } catch (err) {
    console.error("Errore imprevisto:", err);
    return { success: false, error: "Errore imprevisto durante l'iscrizione" };
  }
}

// Function to verify if subscription was successful
export async function verifySubscription(email) {
  try {
    const { data, error } = await supabase
      .from("subscribers")
      .select("id, email, preferred_genre, instagram, created_at")
      .eq("email", email.trim().toLowerCase())
      .single();

    if (error) {
      console.error("Errore durante la verifica:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Errore imprevisto durante la verifica:", err);
    return { success: false, error: "Errore imprevisto durante la verifica" };
  }
}

// Admin Settings Functions
export async function getAdminSetting(settingKey) {
  try {
    const { data, error } = await supabase
      .from("admin_settings")
      .select("setting_value")
      .eq("setting_key", settingKey)
      .single();

    if (error) {
      console.error(`Errore durante il recupero dell'impostazione '${settingKey}':`, error);
      return { success: false, error: `Impostazione '${settingKey}' non trovata: ${error.message}` };
    }

    // Gestisce sia il formato { value: "..." } che il valore diretto
    const value = data.setting_value?.value !== undefined ? data.setting_value.value : data.setting_value;
    return { success: true, data: value };
  } catch (err) {
    console.error(`Errore imprevisto per '${settingKey}':`, err);
    return { success: false, error: `Errore imprevisto per '${settingKey}'` };
  }
}

export async function updateAdminSetting(settingKey, value) {
  try {
    const { data, error } = await supabase
      .from("admin_settings")
      .update({ 
        setting_value: { 
          value: value, 
          description: `Updated ${settingKey}` 
        } 
      })
      .eq("setting_key", settingKey)
      .select();

    if (error) {
      console.error("Errore durante l'aggiornamento dell'impostazione:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Errore imprevisto:", err);
    return { success: false, error: "Errore imprevisto" };
  }
}

export async function getAllAdminSettings() {
  try {
    const { data, error } = await supabase
      .from("admin_settings")
      .select("*");

    if (error) {
      console.error("Errore durante il recupero delle impostazioni:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Errore imprevisto:", err);
    return { success: false, error: "Errore imprevisto" };
  }
}

// Function to get all subscribers for CSV export
export async function getAllSubscribers() {
  try {
    const { data, error } = await supabase
      .from("subscribers")
      .select("id, email, preferred_genre, instagram, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Errore durante il recupero dei subscribers:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Errore imprevisto durante il recupero dei subscribers:", err);
    return { success: false, error: "Errore imprevisto durante il recupero dei subscribers" };
  }
}
