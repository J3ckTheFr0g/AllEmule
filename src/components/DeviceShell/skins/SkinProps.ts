import type { ReactNode } from 'react';

/**
 * Contrat commun a tous les skins de boitier (un par ConsoleType).
 * `screenContent` est injecte par DeviceShell (ex: le conteneur EmulatorJS,
 * ou un placeholder d'ecran eteint/allume) au centre de la zone d'affichage
 * du skin.
 */
export interface SkinProps {
  screenContent: ReactNode;
}
