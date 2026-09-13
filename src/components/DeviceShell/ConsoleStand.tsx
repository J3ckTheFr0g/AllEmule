import type { CSSProperties } from 'react';
import { CONSOLE_SPECS, CONSOLE_DISPLAY_NAMES, ConsoleType } from '../../models/consoleTypes';
import './ConsoleStand.css';

/** Consoles jouables affichees dans le stand, dans un ordre de sortie approximatif. */
const STAND_CONSOLES: ConsoleType[] = [
  ConsoleType.GameBoy,
  ConsoleType.GameBoyColor,
  ConsoleType.AtariLynx,
  ConsoleType.SegaGameGear,
  ConsoleType.NeoGeoPocket,
  ConsoleType.PcEngineGt,
  ConsoleType.GameBoyAdvance,
  ConsoleType.GameBoyAdvanceSp,
];

/** Couleur d'accent par tuile, reprenant l'identite visuelle du skin de chaque console. */
const STAND_ACCENTS: Partial<Record<ConsoleType, string>> = {
  [ConsoleType.GameBoy]: '#8b9968',
  [ConsoleType.GameBoyColor]: '#ffd93d',
  [ConsoleType.AtariLynx]: '#c81f2e',
  [ConsoleType.SegaGameGear]: '#c81f2e',
  [ConsoleType.NeoGeoPocket]: '#9a9ba0',
  [ConsoleType.PcEngineGt]: '#d8283b',
  [ConsoleType.GameBoyAdvance]: '#7a2350',
  [ConsoleType.GameBoyAdvanceSp]: '#453a9e',
};

export interface ConsoleStandProps {
  onSelect: (console: ConsoleType) => void;
}

/**
 * Ecran d'accueil : une "etagere" moderne des consoles jouables plutot
 * qu'un simple bouton "Charger une ROM". Chaque tuile reprend
 * l'orientation/couleur caracteristique de la console (silhouette
 * simplifiee, pas le skin complet - trop lourd a rendre x8 en meme temps)
 * et son nom fictif (voir CONSOLE_DISPLAY_NAMES). Cliquer une tuile
 * declenche onSelect, qui ouvre un selecteur de fichier filtre sur les
 * extensions de cette console et force ce type au chargement (bypasse la
 * detection automatique, utile notamment pour distinguer GBA/GBA SP).
 */
export function ConsoleStand({ onSelect }: ConsoleStandProps) {
  return (
    <div className="console-stand">
      <p className="console-stand__title">Choisis une console</p>
      <div className="console-stand__grid">
        {STAND_CONSOLES.map((type) => {
          const spec = CONSOLE_SPECS[type];
          return (
            <button
              key={type}
              className="console-stand__tile"
              style={{ '--accent': STAND_ACCENTS[type] } as CSSProperties}
              onClick={() => onSelect(type)}
            >
              <span
                className={`console-stand__icon console-stand__icon--${spec.orientation}`}
              />
              <span className="console-stand__label">{CONSOLE_DISPLAY_NAMES[type]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
