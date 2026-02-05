'use client'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function TrackVisit() {
  useEffect(() => {
    const recordVisit = async () => {
      if (typeof window === 'undefined' || window.sessionStorage.getItem('visited_this_session')) return;

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch('https://ipapi.co/json/', { 
          signal: controller.signal 
        });
        
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error('API indisponible');
        
        const data = await response.json();
        
        let paysMatch = data.country_name || 'Inconnu';
        if (paysMatch === 'Ivory Coast') {
          paysMatch = "Côte d'Ivoire";
        }
        
        const villeMatch = data.city || 'Inconnu';

        const { error: dbError } = await supabase.from('visites').insert([{ 
          pays: paysMatch, 
          ville: villeMatch 
        }]);

        if (!dbError) {
          window.sessionStorage.setItem('visited_this_session', 'true');
        }

      } catch (error: any) { 
        // L'astuce est le ": any" ci-dessus pour TypeScript, 
        // ou alors utiliser error?.message si tu veux être plus propre
        console.warn("Tracking limité (AdBlock ou réseau) :", error?.message || error);
        
        try {
          await supabase.from('visites').insert([{ 
            pays: 'Inconnu', 
            ville: 'Inconnu' 
          }]);
          window.sessionStorage.setItem('visited_this_session', 'true');
        } catch (dbErr: any) {
          console.error("Échec critique DB:", dbErr?.message || dbErr);
        }
      }
    }
    
    recordVisit();
  }, [])

  return null
}