import type { SkinProps } from './SkinProps';
import { bindEmulatorButton } from '../../../utils/emulatorInput';
import { useViewportOrientation } from '../../../hooks/useViewportOrientation';
import { DpadHitzones } from './DpadHitzones';
import './NeoGeoPocketSkin.css';

/**
 * Rendu "coque de telephone" en PORTRAIT natif (meme logique que
 * SegaGameGearSkin/AtariLynxSkin) : grand ecran qui domine la carte,
 * cluster de controles compact en bas (joystick, A/B, Start/Option).
 *
 * Le mode paysage n'est pas une disposition differente : c'est la MEME
 * carte tournee de 90 degres (`.ngp-skin__case--rotated`, pilote par
 * useViewportOrientation).
 *
 * Marque fictive "ARC POCKET" (voir CONSOLE_DISPLAY_NAMES). L'apparence
 * AUTHENTIQUE du vrai boitier vit a part, dans l'icone d'etagere dediee
 * (shelfIcons/NeoGeoPocketShelfIcon.tsx), pas ici.
 *
 * data-rive-slot sert de point d'ancrage pour une future animation Rive
 * (neo_geo_pocket.riv, cf. src/models/consoleTypes.ts) ; stand-in statique
 * en attendant un vrai fichier .riv.
 */
export function NeoGeoPocketSkin({ screenContent }: SkinProps) {
  const isLandscape = useViewportOrientation() === 'landscape';

  return (
    <div className="ngp-skin" data-rive-slot="neo_geo_pocket.riv" role="img" aria-label="Arc Pocket">
      <div className={`ngp-skin__case ${isLandscape ? 'ngp-skin__case--rotated' : ''}`}>
        <div className="ngp-skin__case-sheen" />

        <div className="ngp-skin__header">
          <span className="ngp-skin__brand-name">ARC POCKET</span>
          <span className="ngp-skin__power-dot" />
        </div>

        <div className="ngp-skin__screen-bezel">
          <div className="ngp-skin__screen-glass">
            <div className="ngp-skin__screen">{screenContent}</div>
            <div className="ngp-skin__screen-glare" />
          </div>
        </div>

        <div className="ngp-skin__controls">
          <div className="ngp-skin__stick" role="presentation">
            <div className="ngp-skin__stick-well" />
            <div className="ngp-skin__stick-nub" />
            <DpadHitzones />
          </div>

          <div className="ngp-skin__mid">
            <button className="ngp-skin__pill" aria-label="Option" {...bindEmulatorButton('select')}>
              OPTION
            </button>
            <button className="ngp-skin__pill" aria-label="Start" {...bindEmulatorButton('start')}>
              START
            </button>
          </div>

          <div className="ngp-skin__ab">
            <button className="ngp-skin__btn ngp-skin__btn--b" aria-label="B" {...bindEmulatorButton('b')}>
              B
            </button>
            <button className="ngp-skin__btn ngp-skin__btn--a" aria-label="A" {...bindEmulatorButton('a')}>
              A
            </button>
          </div>
        </div>

        <div className="ngp-skin__footer" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="ngp-skin__speaker-hole" />
          ))}
        </div>
      </div>
    </div>
  );
}
