import { CONSOLE_DISPLAY_NAMES, ConsoleType } from '../../models/consoleTypes';
import shelfPhoto from '../../assets/shelf-photo.jpg';
import './ConsoleStand.css';

/**
 * Position/taille de la zone cliquable de chaque console, en pourcentage
 * de l'image src/assets/shelf-photo.jpg (photo fournie par l'utilisateur,
 * etagere en bois sans affiche/logo/pochette identifiable en fond).
 * Valeurs estimees a l'oeil sur la photo ; a affiner si le calage visuel
 * ne correspond pas assez precisement une fois teste en vrai.
 */
interface Hotspot {
  type: ConsoleType;
  left: number;
  top: number;
  width: number;
  height: number;
}

const HOTSPOTS: Hotspot[] = [
  // Etagere du haut.
  { type: ConsoleType.SegaGameGear, left: 4, top: 8, width: 40, height: 21 },
  { type: ConsoleType.PcEngineGt, left: 45, top: 5, width: 20, height: 24 },
  { type: ConsoleType.NeoGeoPocket, left: 66, top: 12, width: 28, height: 16 },
  // Etagere du milieu.
  { type: ConsoleType.GameBoy, left: 24, top: 40, width: 19, height: 24 },
  { type: ConsoleType.GameBoyColor, left: 58, top: 41, width: 16, height: 22 },
  // Etagere du bas.
  { type: ConsoleType.GameBoyAdvance, left: 6, top: 82, width: 31, height: 16 },
  { type: ConsoleType.GameBoyAdvanceSp, left: 39, top: 80, width: 18, height: 18 },
  { type: ConsoleType.AtariLynx, left: 58, top: 79, width: 36, height: 20 },
];

export interface ConsoleStandProps {
  onSelect: (console: ConsoleType) => void;
}

/**
 * Ecran d'accueil : la photo fournie par l'utilisateur (etagere en bois,
 * fond recadre pour exclure toute affiche/pochette/logo identifiable),
 * avec une zone cliquable transparente positionnee sur chaque console
 * visible dans la photo (voir HOTSPOTS). Remplace l'etagere entierement
 * dessinee en CSS, jugee trop eloignee du rendu voulu par l'utilisateur.
 */
export function ConsoleStand({ onSelect }: ConsoleStandProps) {
  return (
    <div className="console-stand">
      <p className="console-stand__title">Choisis une console</p>

      <div className="console-stand__photo-frame">
        <img src={shelfPhoto} alt="Etagere de consoles" className="console-stand__photo" />

        {HOTSPOTS.map(({ type, left, top, width, height }) => (
          <button
            key={type}
            className="console-stand__hotspot"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${width}%`,
              height: `${height}%`,
            }}
            aria-label={CONSOLE_DISPLAY_NAMES[type]}
            onClick={() => onSelect(type)}
          />
        ))}
      </div>
    </div>
  );
}
