import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Sécurité : Vérifier que les variables sont chargées
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("ERREUR : Les clés Supabase sont absentes du fichier .env.local")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
