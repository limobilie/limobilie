import { createClient } from '@supabase/supabase-js'

// URL de ton projet spécifique
const supabaseUrl = "https://kfayfidbsfmorvwhvzaf.supabase.co"

// Ta clé publiable que tu viens de trouver
const supabaseAnonKey = "sb_publishable_LUKq5b0vqU3z2Us277UbSg_NxCJ8Fww"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Ce bloc permet de vérifier la connexion dans ton navigateur (F12)
if (typeof window !== "undefined") {
  supabase.from('souscriptions').select('count', { count: 'exact', head: true })
    .then(({ error }) => {
      if (error) {
        console.error("❌ Erreur Supabase :", error.message);
      } else {
        console.log("✅ TOUT EST PRÊT : La base de données répond parfaitement !");
      }
    });
}