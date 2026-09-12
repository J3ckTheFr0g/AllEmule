export enum ConsoleType {
  GameAndWatch = 'gameAndWatch',
  GameBoy = 'gameBoy',
  GameBoyColor = 'gameBoyColor',
  GameBoyAdvance = 'gameBoyAdvance',
  GameBoyAdvanceSp = 'gameBoyAdvanceSp',
  AtariLynx = 'atariLynx',
  SegaGameGear = 'segaGameGear',
  PcEngineGt = 'pcEngineGt',
  WataraSupervision = 'wataraSupervision',
  NeoGeoPocket = 'neoGeoPocket',
  Gp32 = 'gp32',
  Unknown = 'unknown',
}

export type ScreenOrientation = 'portrait' | 'landscape';

export type EmulatorCore =
  | 'gambatte'
  | 'mgba'
  | 'handy'
  | 'genesis_plus_gx'
  | 'mednafen_pce'
  | 'mednafen_ngp'
  | 'unsupported';

export type SupportStatus = 'mvp' | 'phase2' | 'excluded';

export interface ConsoleSpec {
  type: ConsoleType;
  orientation: ScreenOrientation;
  screenAspectRatio: number;
  emulatorCore: EmulatorCore;
  supportStatus: SupportStatus;
  isClamshell?: boolean;
  riveAsset: string;
}

export const CONSOLE_SPECS: Record<ConsoleType, ConsoleSpec> = {
  [ConsoleType.GameBoy]: {
    type: ConsoleType.GameBoy,
    orientation: 'portrait',
    screenAspectRatio: 10 / 9,
    emulatorCore: 'gambatte',
    supportStatus: 'mvp',
    riveAsset: 'gameboy.riv',
  },
  [ConsoleType.GameBoyColor]: {
    type: ConsoleType.GameBoyColor,
    orientation: 'portrait',
    screenAspectRatio: 10 / 9,
    emulatorCore: 'gambatte',
    supportStatus: 'mvp',
    riveAsset: 'gameboy_color.riv',
  },
  [ConsoleType.GameBoyAdvance]: {
    type: ConsoleType.GameBoyAdvance,
    orientation: 'landscape',
    screenAspectRatio: 3 / 2,
    emulatorCore: 'mgba',
    supportStatus: 'mvp',
    riveAsset: 'gba.riv',
  },
  [ConsoleType.GameBoyAdvanceSp]: {
    type: ConsoleType.GameBoyAdvanceSp,
    orientation: 'landscape',
    screenAspectRatio: 3 / 2,
    emulatorCore: 'mgba',
    supportStatus: 'mvp',
    isClamshell: true,
    riveAsset: 'gba_sp.riv',
  },
  [ConsoleType.AtariLynx]: {
    type: ConsoleType.AtariLynx,
    orientation: 'landscape',
    screenAspectRatio: 8 / 5,
    emulatorCore: 'handy',
    supportStatus: 'mvp',
    riveAsset: 'lynx.riv',
  },
  [ConsoleType.SegaGameGear]: {
    type: ConsoleType.SegaGameGear,
    orientation: 'landscape',
    screenAspectRatio: 8 / 5,
    emulatorCore: 'genesis_plus_gx',
    supportStatus: 'mvp',
    riveAsset: 'game_gear.riv',
  },
  [ConsoleType.PcEngineGt]: {
    type: ConsoleType.PcEngineGt,
    orientation: 'landscape',
    screenAspectRatio: 4 / 3,
    emulatorCore: 'mednafen_pce',
    supportStatus: 'mvp',
    riveAsset: 'pc_engine_gt.riv',
  },
  [ConsoleType.WataraSupervision]: {
    type: ConsoleType.WataraSupervision,
    orientation: 'portrait',
    screenAspectRatio: 11 / 10,
    emulatorCore: 'unsupported', // pas de core Wasm EmulatorJS pour la Supervision (Potator non porté)
    supportStatus: 'excluded',
    riveAsset: 'supervision.riv',
  },
  [ConsoleType.NeoGeoPocket]: {
    type: ConsoleType.NeoGeoPocket,
    orientation: 'landscape',
    screenAspectRatio: 8 / 5,
    emulatorCore: 'mednafen_ngp',
    supportStatus: 'mvp',
    riveAsset: 'neo_geo_pocket.riv',
  },
  [ConsoleType.Gp32]: {
    type: ConsoleType.Gp32,
    orientation: 'landscape',
    screenAspectRatio: 4 / 3,
    emulatorCore: 'unsupported',
    supportStatus: 'excluded',
    riveAsset: 'gp32.riv',
  },
  [ConsoleType.GameAndWatch]: {
    type: ConsoleType.GameAndWatch,
    orientation: 'portrait',
    screenAspectRatio: 1.0,
    emulatorCore: 'unsupported', // pas de core EmulatorJS confirme pour les drivers Game & Watch (hh_sm510)
    supportStatus: 'excluded',
    riveAsset: 'game_and_watch_generic.riv',
  },
  [ConsoleType.Unknown]: {
    type: ConsoleType.Unknown,
    orientation: 'portrait',
    screenAspectRatio: 1.0,
    emulatorCore: 'unsupported',
    supportStatus: 'excluded',
    riveAsset: '',
  },
};

/** Nom lisible par humain, pour l'UI (prompts, message "non jouable", etc.). */
export const CONSOLE_DISPLAY_NAMES: Record<ConsoleType, string> = {
  [ConsoleType.GameBoy]: 'Game Boy',
  [ConsoleType.GameBoyColor]: 'Game Boy Color',
  [ConsoleType.GameBoyAdvance]: 'Game Boy Advance',
  [ConsoleType.GameBoyAdvanceSp]: 'Game Boy Advance SP',
  [ConsoleType.AtariLynx]: 'Atari Lynx',
  [ConsoleType.SegaGameGear]: 'Sega Game Gear',
  [ConsoleType.PcEngineGt]: 'PC Engine GT',
  [ConsoleType.WataraSupervision]: 'Watara Supervision',
  [ConsoleType.NeoGeoPocket]: 'Neo Geo Pocket',
  [ConsoleType.Gp32]: 'GP32',
  [ConsoleType.GameAndWatch]: 'Game & Watch',
  [ConsoleType.Unknown]: 'Console inconnue',
};

export interface GameAndWatchSkin {
  gameId: string;
  riveAsset: string;
  caseColorHex: string;
  screenAspectRatio: number;
}

export const GAME_AND_WATCH_SKINS: Record<string, GameAndWatchSkin> = {
};
