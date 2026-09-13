import { CONSOLE_DISPLAY_NAMES, ConsoleType } from '../../models/consoleTypes';
import { CONSOLE_SKINS } from './skins';
import { SHELF_ICON_OVERRIDES } from './shelfIcons';
import './ConsoleStand.css';

interface ShelfEntry {
  type: ConsoleType;
  /** true = boitier paysage, incline en arriere comme pose contre le mur (cf reference). */
  tilt: boolean;
}

/**
 * Regroupement par etagere, dans l'esprit de la reference utilisateur
 * (3 etageres en bois superposees) : rangee du haut = petits boitiers
 * paysage/exotiques, rangee du milieu = duo Game Boy/Color portrait,
 * rangee du bas = Advance/SP/Lynx.
 */
const SHELF_ROWS: ShelfEntry[][] = [
  [
    { type: ConsoleType.SegaGameGear, tilt: true },
    { type: ConsoleType.NeoGeoPocket, tilt: false },
    { type: ConsoleType.PcEngineGt, tilt: false },
  ],
  [
    { type: ConsoleType.GameBoy, tilt: false },
    { type: ConsoleType.GameBoyColor, tilt: false },
  ],
  [
    { type: ConsoleType.GameBoyAdvance, tilt: true },
    { type: ConsoleType.GameBoyAdvanceSp, tilt: true },
    { type: ConsoleType.AtariLynx, tilt: true },
  ],
];

export interface ConsoleStandProps {
  onSelect: (console: ConsoleType) => void;
}

function IdleScreen() {
  return <div className="console-stand__idle-screen" />;
}

/**
 * Ecran d'accueil : etagere en bois a 3 niveaux fixee sur un mur
 * d'ambiance chambre d'ado fin-90s (guirlande lumineuse, silhouettes
 * d'affiches abstraites - pas de vraies pochettes/logos de groupes, voir
 * commentaire dans ConsoleStand.css), avec chaque console dans ses vraies
 * proportions (pas ecrasee en carre) et une legere inclinaison pour les
 * boitiers paysage, comme posee debout contre le mur.
 *
 * Chaque console utilise son icone d'etagere dediee (SHELF_ICON_OVERRIDES,
 * voir shelfIcons/) ; a defaut, retombe sur une version reduite de son
 * skin de jeu (CONSOLE_SKINS) - ne devrait plus arriver, les 8 consoles
 * jouables ont toutes une icone dediee.
 */
export function ConsoleStand({ onSelect }: ConsoleStandProps) {
  return (
    <div className="console-stand">
      <div className="console-stand__wall">
        <div className="console-stand__lights" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
        <div className="console-stand__posters" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className={`console-stand__poster console-stand__poster--${i}`} />
          ))}
        </div>
      </div>

      <p className="console-stand__title">Choisis une console</p>

      <div className="console-stand__bookcase">
        {SHELF_ROWS.map((row, rowIndex) => (
          <div className="console-stand__row" key={rowIndex}>
            <div className="console-stand__items">
              {row.map(({ type, tilt }) => {
                const ShelfIcon = SHELF_ICON_OVERRIDES[type];
                const Skin = CONSOLE_SKINS[type];
                return (
                  <div
                    key={type}
                    role="button"
                    tabIndex={0}
                    className="console-stand__item"
                    onClick={() => onSelect(type)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') onSelect(type);
                    }}
                  >
                    <div className={`console-stand__figure ${tilt ? 'console-stand__figure--tilt' : ''}`}>
                      {ShelfIcon ? (
                        <ShelfIcon />
                      ) : (
                        Skin && <Skin screenContent={<IdleScreen />} />
                      )}
                    </div>
                    <div className="console-stand__shadow" />
                    <span className="console-stand__label">{CONSOLE_DISPLAY_NAMES[type]}</span>
                  </div>
                );
              })}
            </div>
            <div className="console-stand__plank" />
          </div>
        ))}
      </div>
    </div>
  );
}
