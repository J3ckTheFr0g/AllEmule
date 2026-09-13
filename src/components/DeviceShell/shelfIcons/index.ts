import type { ComponentType } from 'react';
import { ConsoleType } from '../../../models/consoleTypes';
import { GameGearShelfIcon } from './GameGearShelfIcon';
import { AtariLynxShelfIcon } from './AtariLynxShelfIcon';
import { NeoGeoPocketShelfIcon } from './NeoGeoPocketShelfIcon';
import { PcEngineGtShelfIcon } from './PcEngineGtShelfIcon';
import { DotBoyShelfIcon } from './DotBoyShelfIcon';
import { DotBoyColorShelfIcon } from './DotBoyColorShelfIcon';
import { DotBoyAdvanceShelfIcon } from './DotBoyAdvanceShelfIcon';
import { DotBoyAdvanceSpShelfIcon } from './DotBoyAdvanceSpShelfIcon';

/**
 * Icones d'etagere DEDIEES, distinctes des skins de jeu (voir
 * ConsoleStand.tsx). Toutes les consoles jouables en ont desormais une :
 * rendu authentique/statique pense pour la reconnaissance immediate sur
 * l'etagere, independant du style du skin de jeu (qui peut adopter une
 * disposition differente, ex: "coque de telephone" portrait pour les
 * consoles historiquement paysage).
 */
export const SHELF_ICON_OVERRIDES: Partial<Record<ConsoleType, ComponentType>> = {
  [ConsoleType.GameBoy]: DotBoyShelfIcon,
  [ConsoleType.GameBoyColor]: DotBoyColorShelfIcon,
  [ConsoleType.GameBoyAdvance]: DotBoyAdvanceShelfIcon,
  [ConsoleType.GameBoyAdvanceSp]: DotBoyAdvanceSpShelfIcon,
  [ConsoleType.SegaGameGear]: GameGearShelfIcon,
  [ConsoleType.AtariLynx]: AtariLynxShelfIcon,
  [ConsoleType.NeoGeoPocket]: NeoGeoPocketShelfIcon,
  [ConsoleType.PcEngineGt]: PcEngineGtShelfIcon,
};
