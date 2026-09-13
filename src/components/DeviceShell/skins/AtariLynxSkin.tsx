import type { SkinProps } from './SkinProps';
import { bindEmulatorButton } from '../../../utils/emulatorInput';
import { useViewportOrientation } from '../../../hooks/useViewportOrientation';
import { DpadHitzones } from './DpadHitzones';
import './AtariLynxSkin.css';

/**
 * Rendu "coque de telephone" en PORTRAIT natif (meme logique que
 * SegaGameGearSkin : reference "Horizon Skins", pas une recreation du
 * vrai boitier Atari Lynx qui est en paysage). Grand ecran qui domine la
 * carte, cluster de controles compact en bas (D-pad, boutons A/B,
 * Option 1/Pause/Option 2).
 *
 * Le mode paysage n'est pas une disposition differente : c'est la MEME
 * carte tournee de 90 degres (`.lynx-skin__case--rotated`, pilote par
 * useViewportOrientation), comme une vraie coque de telephone ne change
 * pas de forme quand on tourne le telephone.
 *
 * Marque fictive "WILDCAT" (voir CONSOLE_DISPLAY_NAMES) : le style rend
 * hommage aux references fournies, mais aucun nom ni logo depose n'est
 * reproduit. L'apparence AUTHENTIQUE du vrai boitier (pour reconnaissance
 * immediate) vit a part, dans l'icone d'etagere dediee
 * (shelfIcons/AtariLynxShelfIcon.tsx), pas ici.
 *
 * `data-rive-slot` marque l'emplacement reserve a une future animation Rive
 * (lynx.riv, cf. CONSOLE_SPECS) ; ce composant sert de stand-in statique en
 * attendant l'asset binaire reel.
 */
export function AtariLynxSkin({ screenContent }: SkinProps) {
  const isLandscape = useViewportOrientation() === 'landscape';

  return (
    <div className="lynx-skin" data-rive-slot="lynx.riv" role="img" aria-label="Wildcat">
      <div className={`lynx-skin__case ${isLandscape ? 'lynx-skin__case--rotated' : ''}`}>
        <div className="lynx-skin__case-sheen" />

        <div className="lynx-skin__header">
          <span className="lynx-skin__brand-name">WILDCAT</span>
          <span className="lynx-skin__power-dot" />
        </div>

        <div className="lynx-skin__screen-bezel">
          <div className="lynx-skin__screen-glass">
            <div className="lynx-skin__screen">{screenContent}</div>
            <div className="lynx-skin__screen-glare" />
          </div>
        </div>

        <span className="lynx-skin__tagline">COLOR SYSTEM</span>

        <div className="lynx-skin__controls">
          <div className="lynx-skin__dpad">
            <div className="lynx-skin__dpad-cross" />
            <div className="lynx-skin__dpad-center" />
            <DpadHitzones />
          </div>

          <div className="lynx-skin__mid">
            <button className="lynx-skin__pill" aria-label="Option 1" {...bindEmulatorButton('l')}>
              OPT 1
            </button>
            <button className="lynx-skin__pill" aria-label="Pause" {...bindEmulatorButton('start')}>
              PAUSE
            </button>
            <button className="lynx-skin__pill" aria-label="Option 2" {...bindEmulatorButton('r')}>
              OPT 2
            </button>
          </div>

          <div className="lynx-skin__ab">
            <button className="lynx-skin__btn lynx-skin__btn--b" aria-label="Bouton B" {...bindEmulatorButton('b')}>
              B
            </button>
            <button className="lynx-skin__btn lynx-skin__btn--a" aria-label="Bouton A" {...bindEmulatorButton('a')}>
              A
            </button>
          </div>
        </div>

        <div className="lynx-skin__footer" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="lynx-skin__speaker-hole" />
          ))}
        </div>
      </div>
    </div>
  );
}
