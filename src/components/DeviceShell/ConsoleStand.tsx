import { CONSOLE_DISPLAY_NAMES, ConsoleType } from '../../models/consoleTypes';
import shelfPhoto from '../../assets/shelf-photo.jpg';
import './ConsoleStand.css';

/**
 * Position/taille de la zone cliquable de chaque console, en pourcentage
 * de l'image src/assets/shelf-photo.jpg (photo fournie par l'utilisateur,
 * recadree pour ne garder que l'etagere en bois - toute affiche/logo de
 * groupe identifiable a ete exclue du cadrage). Valeurs estimees a l'oeil
 * sur la photo ; a affiner si le calage visuel ne correspond pas assez
 * precisement une fois teste en vrai.
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
  { type: ConsoleType.SegaGameGear, left: 0, top: 0, width: 33, height: 18 },
  { type: ConsoleType.PcEngineGt, left: 33, top: 0, width: 30, height: 18 },
  { type: ConsoleType.NeoGeoPocket, left: 63, top: 0, width: 37, height: 18 },
  // Etagere du milieu.
  { type: ConsoleType.GameBoy, left: 18, top: 30, width: 30, height: 30 },
  { type: ConsoleType.GameBoyColor, left: 52, top: 30, width: 30, height: 30 },
  // Etagere du bas.
  { type: ConsoleType.GameBoyAdvance, left: 0, top: 74, width: 36, height: 26 },
  { type: ConsoleType.GameBoyAdvanceSp, left: 36, top: 76, width: 22, height: 22 },
  { type: ConsoleType.AtariLynx, left: 58, top: 73, width: 42, height: 27 },
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
