import type { SkinProps } from './SkinProps';
import { bindEmulatorButton } from '../../../utils/emulatorInput';
import { useViewportOrientation } from '../../../hooks/useViewportOrientation';
import { DpadHitzones } from './DpadHitzones';
import './AtariLynxSkin.css';

/**
 * Skin CSS/SVG imitant un handheld couleur massif dans l'esprit de
 * l'Atari Lynx (1989). Le boitier reel est en paysage, mais - comme
 * illustre par la reference "Horizon Skins" fournie - une meme console
 * peut se decliner en tenue portrait (ecran en haut, croix/boutons en
 * bas) ou paysage (ecran a gauche, croix/boutons a droite) : ce skin lit
 * l'orientation REELLE du telephone (useViewportOrientation, distincte de
 * l'orientation figee de la console dans CONSOLE_SPECS) et bascule sa
 * mise en page en consequence, sans dupliquer ses elements internes
 * (memes divs, juste reordonnes/reempiles via CSS selon
 * `.lynx-skin--portrait`).
 *
 * Marque fictive "WILDCAT" (voir CONSOLE_DISPLAY_NAMES) : la forme et les
 * proportions rendent hommage au boitier reel, mais aucun nom ni logo
 * depose n'est reproduit.
 *
 * `data-rive-slot` marque l'emplacement reserve a une future animation Rive
 * (lynx.riv, cf. CONSOLE_SPECS) ; ce composant sert de stand-in statique en
 * attendant l'asset binaire reel.
 */
export function AtariLynxSkin({ screenContent }: SkinProps) {
  const viewportOrientation = useViewportOrientation();
  const isPortrait = viewportOrientation === 'portrait';

  return (
    <div
      className={`lynx-skin ${isPortrait ? 'lynx-skin--portrait' : ''}`}
      data-rive-slot="lynx.riv"
      role="img"
      aria-label="Wildcat"
    >
      <div className="lynx-skin__body">
        <div className="lynx-skin__screen-bay">
          <div className="lynx-skin__screen-bezel">
            <div className="lynx-skin__screen">{screenContent}</div>
          </div>
          <div className="lynx-skin__brand">
            <svg viewBox="0 0 150 20" className="lynx-skin__logo" aria-hidden="true">
              <text x="0" y="15" className="lynx-skin__logo-text">
                WILDCAT
              </text>
            </svg>
            <span className="lynx-skin__brand-sub">COLOR SYSTEM</span>
          </div>
        </div>

        <div className="lynx-skin__controls">
          <div className="lynx-skin__dpad">
            <div className="lynx-skin__dpad-v" />
            <div className="lynx-skin__dpad-h" />
            <DpadHitzones />
          </div>

          <div className="lynx-skin__buttons">
            <div className="lynx-skin__ab">
              <button className="lynx-skin__btn lynx-skin__btn--b" aria-label="Bouton B" {...bindEmulatorButton('b')}>
                B
              </button>
              <button className="lynx-skin__btn lynx-skin__btn--a" aria-label="Bouton A" {...bindEmulatorButton('a')}>
                A
              </button>
            </div>
            <div className="lynx-skin__options">
              <button className="lynx-skin__btn lynx-skin__btn--small" aria-label="Option 1" {...bindEmulatorButton('l')}>
                OPT 1
              </button>
              <button className="lynx-skin__btn lynx-skin__btn--small" aria-label="Pause" {...bindEmulatorButton('start')}>
                PAUSE
              </button>
              <button className="lynx-skin__btn lynx-skin__btn--small" aria-label="Option 2" {...bindEmulatorButton('r')}>
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
