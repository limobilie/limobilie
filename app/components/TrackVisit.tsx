'use client'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function TrackVisit() {
  useEffect(() => {
    const recordVisit = async () => {
      // Pour éviter les doublons inutiles en mode développement (React Strict Mode)
      if (window.sessionStorage.getItem('visited_this_session')) return;

      try {
        // 1. Appel de l'API avec un Timeout de 5 secondes
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch('https://ipapi.co/json/', { 
          signal: controller.signal 
        });
        
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error('API indisponible');
        
        const data = await response.json();
        
        // 2. Traitement des données
        let paysMatch = data.country_name || 'Inconnu';
        if (paysMatch === 'Ivory Coast') {
          paysMatch = "Côte d'Ivoire";
        }
        
        const villeMatch = data.city || 'Inconnu';

        // 3. Insertion dans Supabase
        const { error } = await supabase.from('visites').insert([{ 
          pays: paysMatch, 
          ville: villeMatch 
        }]);

        if (!error) {
          window.sessionStorage.setItem('visited_this_session', 'true');
        }

      } catch (error) {
        console.warn("Tracking limité (AdBlock ou réseau) :", error.message);
        
        // 4. Fallback : En cas d'échec, on tente quand même un enregistrement anonyme
        try {
          await supabase.from('visites').insert([{ 
            pays: 'Inconnu', 
            ville: 'Inconnu' 
          }]);
          window.sessionStorage.setItem('visited_this_session', 'true');
        } catch (dbErr) {
          console.error("Échec critique DB:", dbErr);
        }
      }
    }
    
    recordVisit();
  }, [])

  return null
}