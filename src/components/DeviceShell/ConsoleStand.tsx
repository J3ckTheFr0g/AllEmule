import { CONSOLE_DISPLAY_NAMES, ConsoleType } from '../../models/consoleTypes';
import { CONSOLE_SKINS } from './skins';
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

export interface ConsoleStandProps {
  onSelect: (console: ConsoleType) => void;
}

/** Ecran d'un boitier au repos sur l'etagere (pas de jeu, pas d'interaction). */
function IdleScreen() {
  return <div className="console-stand__idle-screen" />;
}

/**
 * Ecran d'accueil : une "etagere" avec le vrai skin de chaque console
 * jouable (rendu en miniature via CSS transform), plutot qu'un simple
 * bouton "Charger une ROM" ou des icones plates. Cliquer une console
 * declenche onSelect, qui ouvre un selecteur de fichier filtre sur les
 * extensions de cette console et force ce type au chargement (bypasse la
 * detection automatique, utile notamment pour distinguer GBA/GBA SP).
 *
 * La racine de chaque tuile est un <div role="button"> (pas un <button>) :
 * les skins rendent eux-memes de vrais <button> internes (D-pad, A/B...)
 * pour l'ecran de jeu, et le HTML interdit d'imbriquer des elements
 * interactifs. `pointer-events: none` sur le mini-skin fait remonter le
 * clic au wrapper de la tuile plutot que d'activer ses boutons internes
 * (inertes ici de toute facon, il n'y a pas de jeu en cours).
 */
export function ConsoleStand({ onSelect }: ConsoleStandProps) {
  return (
    <div className="console-stand">
      <p className="console-stand__title">Choisis une console</p>
      <div className="console-stand__shelf">
        {STAND_CONSOLES.map((type) => {
          const Skin = CONSOLE_SKINS[type];
          return (
            <div
              key={type}
              role="button"
              tabIndex={0}
              className="console-stand__tile"
              onClick={() => onSelect(type)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelect(type);
              }}
            >
              <div className="console-stand__preview">
                {Skin && (
                  <div className="console-stand__preview-skin">
                    <Skin screenContent={<IdleScreen />} />
                  </div>
                )}
              </div>
              <span className="console-stand__label">{CONSOLE_DISPLAY_NAMES[type]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
