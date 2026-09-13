import type { SkinProps } from './SkinProps';
import { bindEmulatorButton } from '../../../utils/emulatorInput';
import { useViewportOrientation } from '../../../hooks/useViewportOrientation';
import { DpadHitzones } from './DpadHitzones';
import './PcEngineGtSkin.css';

/**
 * Rendu "coque de telephone" en PORTRAIT natif (meme logique que
 * SegaGameGearSkin/AtariLynxSkin/NeoGeoPocketSkin) : grand ecran qui
 * domine la carte, cluster de controles compact en bas (D-pad, I/II,
 * Select/Run).
 *
 * Le mode paysage n'est pas une disposition differente : c'est la MEME
 * carte tournee de 90 degres (`.pceGt-skin__case--rotated`, pilote par
 * useViewportOrientation).
 *
 * Marque fictive "CORE ENGINE GT" (voir CONSOLE_DISPLAY_NAMES). L'apparence
 * AUTHENTIQUE du vrai boitier vit a part, dans l'icone d'etagere dediee
 * (shelfIcons/PcEngineGtShelfIcon.tsx), pas ici.
 *
 * data-rive-slot sert de point d'ancrage pour une future animation Rive
 * (pc_engine_gt.riv, cf. src/models/consoleTypes.ts) ; stand-in statique
 * en attendant un vrai fichier .riv.
 */
export function PcEngineGtSkin({ screenContent }: SkinProps) {
  const isLandscape = useViewportOrientation() === 'landscape';

  return (
    <div className="pceGt-skin" data-rive-slot="pc_engine_gt.riv" role="img" aria-label="Core Engine GT">
      <div className={`pceGt-skin__case ${isLandscape ? 'pceGt-skin__case--rotated' : ''}`}>
        <div className="pceGt-skin__case-sheen" />

        <div className="pceGt-skin__header">
          <span className="pceGt-skin__brand-name">CORE ENGINE</span>
          <span className="pceGt-skin__brand-gt">GT</span>
        </div>

        <div className="pceGt-skin__screen-bezel">
          <div className="pceGt-skin__screen-glass">
            <div className="pceGt-skin__screen">{screenContent}</div>
            <div className="pceGt-skin__screen-glare" />
          </div>
        </div>

        <div className="pceGt-skin__controls">
          <div className="pceGt-skin__dpad">
            <div className="pceGt-skin__dpad-cross" />
            <div className="pceGt-skin__dpad-center" />
            <DpadHitzones />
          </div>

          <div className="pceGt-skin__mid">
            <button className="pceGt-skin__pill" aria-label="Select" {...bindEmulatorButton('select')}>
              SELECT
            </button>
            <button className="pceGt-skin__pill" aria-label="Run" {...bindEmulatorButton('start')}>
              RUN
            </button>
          </div>

          <div className="pceGt-skin__ab">
            <button className="pceGt-skin__btn pceGt-skin__btn--ii" aria-label="II" {...bindEmulatorButton('b')}>
              II
            </button>
            <button className="pceGt-skin__btn pceGt-skin__btn--i" aria-label="I" {...bindEmulatorButton('a')}>
              I
            </button>
          </div>
        </div>

        <div className="pceGt-skin__footer" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="pceGt-skin__speaker-hole" />
          ))}
        </div>
      </div>
    </div>
  );
}
