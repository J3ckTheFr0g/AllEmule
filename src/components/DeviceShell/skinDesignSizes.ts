import { ConsoleType } from '../../models/consoleTypes';

export interface DesignSize {
  width: number;
  height: number;
}

/**
 * Taille de reference (design pixel-perfect) de chaque skin - doit
 * correspondre a la largeur/aspect-ratio fixes dans le CSS `__case` de
 * chaque skin. Partagee entre DeviceShell (mise a l'echelle plein ecran)
 * et ConsoleStand (miniatures de l'etagere) pour ne pas dupliquer/
 * desynchroniser ces valeurs.
 */
export const SKIN_DESIGN_SIZE: Record<ConsoleType, DesignSize> = {
  [ConsoleType.GameBoy]: { width: 280, height: 460 },
  [ConsoleType.GameBoyColor]: { width: 280, height: 430 },
  [ConsoleType.GameBoyAdvance]: { width: 480, height: 260 },
  [ConsoleType.GameBoyAdvanceSp]: { width: 420, height: 300 },
  [ConsoleType.AtariLynx]: { width: 480, height: 280 },
  [ConsoleType.SegaGameGear]: { width: 460, height: 288 },
  [ConsoleType.PcEngineGt]: { width: 480, height: 360 },
  [ConsoleType.NeoGeoPocket]: { width: 400, height: 400 },
  [ConsoleType.WataraSupervision]: { width: 300, height: 480 },
  [ConsoleType.Gp32]: { width: 480, height: 360 },
  [ConsoleType.GameAndWatch]: { width: 300, height: 480 },
  [ConsoleType.Unknown]: { width: 300, height: 480 },
};

/**
 * Consoles dont le skin propose une mise en page alternative quand le
 * telephone est tenu en portrait (voir AtariLynxSkin + useViewportOrientation).
 */
export const SKIN_DESIGN_SIZE_PORTRAIT: Partial<Record<ConsoleType, DesignSize>> = {
  [ConsoleType.AtariLynx]: { width: 300, height: 480 },
};
