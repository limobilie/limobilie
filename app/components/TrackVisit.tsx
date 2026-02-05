'use client'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function TrackVisit() {
  useEffect(() => {
    const recordVisit = async () => {
      // 1. Sécurité : Empêcher l'exécution côté serveur ou les doublons de session
      if (typeof window === 'undefined' || window.sessionStorage.getItem('visited_this_session')) {
        return;
      }

      try {
        // 2. Appel API avec Timeout pour ne pas bloquer le chargement
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch('https://ipapi.co/json/', { 
          signal: controller.signal 
        });
        
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error('API Geo indisponible');
        
        const data = await response.json();
        
        // 3. Normalisation des données
        let paysMatch = data.country_name || 'Inconnu';
        if (paysMatch === 'Ivory Coast') {
          paysMatch = "Côte d'Ivoire";
        }
        
        const villeMatch = data.city || 'Inconnu';

        // 4. Insertion dans Supabase
        const { error: dbError } = await supabase.from('visites').insert([{ 
          pays: paysMatch, 
          ville: villeMatch 
        }]);

        if (!dbError) {
          window.sessionStorage.setItem('visited_this_session', 'true');
        }

      } catch (error: any) {
        // Gestion propre de l'erreur pour le build de production
        console.warn("Tracking limité (AdBlock ou réseau) :", error?.message || "Erreur inconnue");
        
        // 5. Fallback : En cas d'échec (AdBlock), on enregistre une visite anonyme
        try {
          const { error: fallbackError } = await supabase.from('visites').insert([{ 
            pays: 'Inconnu', 
            ville: 'Inconnu' 
          }]);
          
          if (!fallbackError) {
            window.sessionStorage.setItem('visited_this_session', 'true');
          }
        } catch (dbErr: any) {
          console.error("Échec critique DB:", dbErr?.message || dbErr);
        }
      }
    }
    
    recordVisit();
  }, [])

  return null
}