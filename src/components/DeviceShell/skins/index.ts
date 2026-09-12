import type { ComponentType } from 'react';
import { ConsoleType } from '../../../models/consoleTypes';
import type { SkinProps } from './SkinProps';
import { GameBoySkin } from './GameBoySkin';
import { GameBoyColorSkin } from './GameBoyColorSkin';
import { GameBoyAdvanceSkin } from './GameBoyAdvanceSkin';
import { GameBoyAdvanceSpSkin } from './GameBoyAdvanceSpSkin';

/**
 * Mapping ConsoleType -> composant Skin.
 *
 * NOTE : ce fichier ne couvre pour l'instant que la famille Game Boy /
 * Game Boy Color / Game Boy Advance / Game Boy Advance SP. Les autres
 * familles de consoles (Atari Lynx, Sega Game Gear, PC Engine GT,
 * Neo Geo Pocket, etc. - dont les composants Skin existent deja dans ce
 * dossier) sont ajoutees par ailleurs et doivent etre fusionnees ici pour
 * obtenir une couverture complete de ConsoleType. A ce stade le Record
 * est volontairement partiel (Partial<Record<...>>) pour ne pas
 * pretendre couvrir des consoles dont le mapping n'a pas encore ete
 * merge dans ce fichier.
 */
export const CONSOLE_SKINS: Partial<Record<ConsoleType, ComponentType<SkinProps>>> = {
  [ConsoleType.GameBoy]: GameBoySkin,
  [ConsoleType.GameBoyColor]: GameBoyColorSkin,
  [ConsoleType.GameBoyAdvance]: GameBoyAdvanceSkin,
  [ConsoleType.GameBoyAdvanceSp]: GameBoyAdvanceSpSkin,
};

export type { SkinProps };
export {
  GameBoySkin,
  GameBoyColorSkin,
  GameBoyAdvanceSkin,
  GameBoyAdvanceSpSkin,
};
