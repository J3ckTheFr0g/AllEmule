import type { ComponentType } from 'react';
import { ConsoleType } from '../../../models/consoleTypes';
import type { SkinProps } from './SkinProps';
import { GameBoySkin } from './GameBoySkin';
import { GameBoyColorSkin } from './GameBoyColorSkin';
import { GameBoyAdvanceSkin } from './GameBoyAdvanceSkin';
import { GameBoyAdvanceSpSkin } from './GameBoyAdvanceSpSkin';
import { AtariLynxSkin } from './AtariLynxSkin';
import { SegaGameGearSkin } from './SegaGameGearSkin';
import { PcEngineGtSkin } from './PcEngineGtSkin';
import { NeoGeoPocketSkin } from './NeoGeoPocketSkin';

/**
 * Mapping ConsoleType -> composant Skin. Couvre toutes les consoles
 * `supportStatus: 'mvp'` de CONSOLE_SPECS. Les consoles exclues (Watara
 * Supervision, Game & Watch, GP32) n'ont pas de skin ici : elles passent
 * par <UnsupportedConsoleNotice> dans DeviceShell au lieu d'un skin.
 */
export const CONSOLE_SKINS: Partial<Record<ConsoleType, ComponentType<SkinProps>>> = {
  [ConsoleType.GameBoy]: GameBoySkin,
  [ConsoleType.GameBoyColor]: GameBoyColorSkin,
  [ConsoleType.GameBoyAdvance]: GameBoyAdvanceSkin,
  [ConsoleType.GameBoyAdvanceSp]: GameBoyAdvanceSpSkin,
  [ConsoleType.AtariLynx]: AtariLynxSkin,
  [ConsoleType.SegaGameGear]: SegaGameGearSkin,
  [ConsoleType.PcEngineGt]: PcEngineGtSkin,
  [ConsoleType.NeoGeoPocket]: NeoGeoPocketSkin,
};

export type { SkinProps };
export {
  GameBoySkin,
  GameBoyColorSkin,
  GameBoyAdvanceSkin,
  GameBoyAdvanceSpSkin,
  AtariLynxSkin,
  SegaGameGearSkin,
  PcEngineGtSkin,
  NeoGeoPocketSkin,
};
export { UnsupportedConsoleNotice } from './UnsupportedConsoleNotice';
