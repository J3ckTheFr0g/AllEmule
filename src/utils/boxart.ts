import { ConsoleType } from '../models/consoleTypes';

/**
 * Depot libretro-thumbnails (projet communautaire ouvert, gratuit, sans
 * cle API) par console. Chaque depot expose un dossier "Named_Boxarts"
 * avec un PNG par jeu, nomme d'apres le titre No-Intro exact du jeu
 * (ex: "Pokemon - Red Version (USA, Europe).png").
 */
const LIBRETRO_THUMBNAILS_REPO: Partial<Record<ConsoleType, string>> = {
  [ConsoleType.GameBoy]: 'Nintendo_-_Game_Boy',
  [ConsoleType.GameBoyColor]: 'Nintendo_-_Game_Boy_Color',
  [ConsoleType.GameBoyAdvance]: 'Nintendo_-_Game_Boy_Advance',
  [ConsoleType.GameBoyAdvanceSp]: 'Nintendo_-_Game_Boy_Advance',
  [ConsoleType.AtariLynx]: 'Atari_-_Lynx',
  [ConsoleType.SegaGameGear]: 'Sega_-_Game_Gear',
  [ConsoleType.PcEngineGt]: 'NEC_-_PC_Engine_-_TurboGrafx_16',
  [ConsoleType.NeoGeoPocket]: 'SNK_-_Neo_Geo_Pocket',
};

/**
 * Deduit un nom de jeu "probable" a partir du nom de fichier local, en
 * enlevant l'extension et les suffixes entre parentheses/crochets
 * (region, revision, hash...) genralement absents des noms de ROM perso
 * mais qui different souvent du titre No-Intro exact utilise par
 * libretro-thumbnails. Best-effort : ca ne trouvera pas tout, mais couvre
 * les noms de fichiers deja proches du titre officiel.
 */
function guessGameTitle(fileName: string): string {
  const withoutExt = fileName.replace(/\.[^./\\]+$/, '');
  return withoutExt
    .replace(/[_.]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Caracteres a remplacer par "_" dans les noms de fichiers libretro-thumbnails. */
function toThumbnailFileName(title: string): string {
  return title.replace(/[&*/:`<>?\\|"]/g, '_');
}

/**
 * URL candidate (best-effort, non garantie) de la jaquette du jeu sur
 * libretro-thumbnails, a partir du nom de fichier local de la ROM. A
 * utiliser comme `src` d'un <img> avec un fallback `onError` : beaucoup de
 * noms de fichiers perso ne correspondront pas exactement au titre
 * No-Intro attendu et l'image sera simplement absente (404), ce qui est
 * attendu et gere par l'appelant plutot qu'une erreur a traiter ici.
 */
export function getBoxartUrl(consoleType: ConsoleType, fileName: string): string | null {
  const repo = LIBRETRO_THUMBNAILS_REPO[consoleType];
  if (!repo) return null;

  const title = toThumbnailFileName(guessGameTitle(fileName));
  if (!title) return null;

  return `https://raw.githubusercontent.com/libretro-thumbnails/${repo}/master/Named_Boxarts/${encodeURIComponent(title)}.png`;
}
