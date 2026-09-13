import { useEffect, useState } from 'react';

export type ViewportOrientation = 'portrait' | 'landscape';

function readOrientation(): ViewportOrientation {
  if (typeof window === 'undefined' || !window.matchMedia) return 'portrait';
  return window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape';
}

/**
 * Orientation reelle du telephone (pas celle, fixe, de la console dans
 * CONSOLE_SPECS). Sert a proposer, console par console, une disposition
 * de boutons adaptee a la facon dont l'utilisateur tient son telephone
 * plutot que de forcer une seule mise en page quelle que soit la prise en
 * main (voir AtariLynxSkin pour le premier skin a exploiter ceci).
 */
export function useViewportOrientation(): ViewportOrientation {
  const [orientation, setOrientation] = useState<ViewportOrientation>(readOrientation);

  useEffect(() => {
    const mql = window.matchMedia('(orientation: portrait)');
    const handleChange = () => setOrientation(mql.matches ? 'portrait' : 'landscape');
    handleChange();
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  return orientation;
}
