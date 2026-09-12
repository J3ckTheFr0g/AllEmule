import type { SkinProps } from './SkinProps';
import './AtariLynxSkin.css';

/**
 * Skin CSS/SVG imitant le boitier de l'Atari Lynx (1989) : chassis horizontal
 * massif, ecran large a gauche, croix directionnelle + boutons Option 1 /
 * Option 2 / Pause a droite. Pas d'image externe : uniquement gradients,
 * formes et un SVG inline pour le logo.
 *
 * `data-rive-slot` marque l'emplacement reserve a une future animation Rive
 * (lynx.riv, cf. CONSOLE_SPECS) ; ce composant sert de stand-in statique en
 * attendant l'asset binaire reel.
 */
export function AtariLynxSkin({ screenContent }: SkinProps) {
  return (
    <div className="lynx-skin" data-rive-slot="lynx.riv" role="img" aria-label="Atari Lynx">
      <div className="lynx-skin__body">
        <div className="lynx-skin__screen-bay">
          <div className="lynx-skin__screen-bezel">
            <div className="lynx-skin__screen">{screenContent}</div>
          </div>
          <div className="lynx-skin__brand">
            <svg viewBox="0 0 100 20" className="lynx-skin__logo" aria-hidden="true">
              <text x="0" y="15" className="lynx-skin__logo-text">
                LYNX
              </text>
            </svg>
            <span className="lynx-skin__brand-sub">ATARI</span>
          </div>
        </div>

        <div className="lynx-skin__controls">
          <div className="lynx-skin__dpad">
            <div className="lynx-skin__dpad-v" />
            <div className="lynx-skin__dpad-h" />
          </div>

          <div className="lynx-skin__buttons">
            <div className="lynx-skin__ab">
              <button className="lynx-skin__btn lynx-skin__btn--b" aria-label="Bouton B">
                B
              </button>
              <button className="lynx-skin__btn lynx-skin__btn--a" aria-label="Bouton A">
                A
              </button>
            </div>
            <div className="lynx-skin__options">
              <button className="lynx-skin__btn lynx-skin__btn--small" aria-label="Option 1">
                OPT 1
              </button>
              <button className="lynx-skin__btn lynx-skin__btn--small" aria-label="Pause">
                PAUSE
              </button>
              <button className="lynx-skin__btn lynx-skin__btn--small" aria-label="Option 2">
                OPT 2
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="lynx-skin__vents" aria-hidden="true" />
    </div>
  );
}
