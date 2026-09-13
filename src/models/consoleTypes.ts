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

/**
 * Nom affiche a l'utilisateur (prompts, message "non jouable", etc.).
 *
 * Pour les consoles qui ont un skin dessine (supportStatus 'mvp'), c'est
 * la marque FICTIVE utilisee sur la plaque du boitier (ex: "Dot Boy" pour
 * le Game Boy) - coherence entre le texte de l'UI et le logo dessine dans
 * le skin, sans reproduire de nom/logo depose reel.
 *
 * Pour les consoles non supportees (excluded/phase2), c'est le vrai nom :
 * aucun skin/logo n'est dessine pour elles, ce n'est qu'une reference
 * textuelle informative a la console reelle (usage descriptif standard,
 * pas une marque appliquee a notre propre produit).
 */
export const CONSOLE_DISPLAY_NAMES: Record<ConsoleType, string> = {
  [ConsoleType.GameBoy]: 'Dot Boy',
  [ConsoleType.GameBoyColor]: 'Dot Boy Color',
  [ConsoleType.GameBoyAdvance]: 'Dot Boy Advance',
  [ConsoleType.GameBoyAdvanceSp]: 'Dot Boy Advance SP',
  [ConsoleType.AtariLynx]: 'Wildcat',
  [ConsoleType.SegaGameGear]: 'Gear Pocket',
  [ConsoleType.PcEngineGt]: 'Core Engine GT',
  [ConsoleType.WataraSupervision]: 'Watara Supervision',
  [ConsoleType.NeoGeoPocket]: 'Arc Pocket',
  [ConsoleType.Gp32]: 'GP32',
  [ConsoleType.GameAndWatch]: 'Game & Watch',
  [ConsoleType.Unknown]: 'Console inconnue',
};

/**
 * Extensions de fichier associees a chaque console jouable, utilisees pour
 * filtrer le selecteur de fichiers quand l'utilisateur choisit une console
 * dans le stand d'accueil (voir ConsoleStand). GBA et GBA SP partagent la
 * meme extension (.gba) - impossible a distinguer par le contenu de la
 * ROM (meme puce), d'ou l'interet de laisser l'utilisateur choisir
 * explicitement plutot que de se fier a la seule detection automatique.
 */
export const CONSOLE_FILE_EXTENSIONS: Partial<Record<ConsoleType, string[]>> = {
  [ConsoleType.GameBoy]: ['.gb'],
  [ConsoleType.GameBoyColor]: ['.gbc'],
  [ConsoleType.GameBoyAdvance]: ['.gba'],
  [ConsoleType.GameBoyAdvanceSp]: ['.gba'],
  [ConsoleType.AtariLynx]: ['.lnx'],
  [ConsoleType.SegaGameGear]: ['.gg'],
  [ConsoleType.PcEngineGt]: ['.pce'],
  [ConsoleType.NeoGeoPocket]: ['.ngp', '.ngc'],
};

export interface GameAndWatchSkin {
  gameId: string;
  riveAsset: string;
  caseColorHex: string;
  screenAspectRatio: number;
}

export const GAME_AND_WATCH_SKINS: Record<string, GameAndWatchSkin> = {
};
