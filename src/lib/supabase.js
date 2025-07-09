import { createClient } from "@supabase/supabase-js";

// Supabase configuration
const supabaseUrl = "https://oufeicsddpaswuirhcmz.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91ZmVpY3NkZHBhc3d1aXJoY216Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNjUzNjEsImV4cCI6MjA2NzY0MTM2MX0.qgietGa90R6RlK_JHarP5ELl5m6FTrvmBzl-mY7GrFI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to subscribe a user
export async function subscribeUser(name, email, preferredGenre) {
  try {
    const { data, error } = await supabase
      .from("subscribers")
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          preferred_genre: preferredGenre,
        },
      ])
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
      .select("id, name, email, preferred_genre, created_at")
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
