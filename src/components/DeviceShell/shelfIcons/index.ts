import type { ComponentType } from 'react';
import { ConsoleType } from '../../../models/consoleTypes';
import { GameGearShelfIcon } from './GameGearShelfIcon';

/**
 * Icones d'etagere DEDIEES, distinctes des skins de jeu (voir
 * ConsoleStand.tsx). A utiliser pour les consoles dont le skin de jeu
 * adopte un style different (ex: "coque de telephone" portrait) de leur
 * apparence reelle authentique attendue sur l'etagere. Les consoles
 * absentes de cette table utilisent par defaut une version reduite de
 * leur skin de jeu (CONSOLE_SKINS), ce qui reste correct pour elles.
 */
export const SHELF_ICON_OVERRIDES: Partial<Record<ConsoleType, ComponentType>> = {
  [ConsoleType.SegaGameGear]: GameGearShelfIcon,
};
