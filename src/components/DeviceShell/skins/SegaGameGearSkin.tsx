import type { SkinProps } from './SkinProps';
import { bindEmulatorButton } from '../../../utils/emulatorInput';
import { useViewportOrientation } from '../../../hooks/useViewportOrientation';
import { DpadHitzones } from './DpadHitzones';
import './SegaGameGearSkin.css';

/**
 * Rendu "coque de telephone" en PORTRAIT natif, dans l'esprit des skins
 * de coque modernes (reference utilisateur "Horizon Skins") : ce ne sont
 * pas des recreations de la vraie console (qui est en paysage), mais des
 * habillages pensees pour un telephone tenu vertical - grand ecran qui
 * domine la carte, cluster de controles compact en bas (D-pad + boutons
 * ronds), plutot que la disposition "ecran a gauche/boutons a droite" a
 * l'ancienne.
 *
 * Quand le telephone est tenu en paysage, ce n'est PAS une disposition
 * differente : c'est la MEME carte, simplement tournee de 90 degres
 * (comme une vraie coque de telephone qui ne change pas de forme quand on
 * tourne le telephone) - voir `.gg-skin--rotated` et
 * useViewportOrientation. DeviceShell fournit alors la taille de
 * reference "empreinte tournee" (largeur/hauteur inversees) pour que la
 * mise a l'echelle plein ecran reste correcte.
 *
 * Marque fictive "GEAR POCKET" (voir CONSOLE_DISPLAY_NAMES) : le style
 * (chassis glossy noir, bandeau rouge, molettes) rend hommage aux
 * references fournies, mais aucun nom/logo depose n'est reproduit.
 *
 * data-rive-slot="game_gear.riv" : ce rendu CSS est un remplacant
 * temporaire en attendant un vrai asset Rive.
 */
export function SegaGameGearSkin({ screenContent }: SkinProps) {
  const isLandscape = useViewportOrientation() === 'landscape';

  return (
    <div className="gg-skin" data-rive-slot="game_gear.riv" role="img" aria-label="Gear Pocket">
      <div className={`gg-skin__case ${isLandscape ? 'gg-skin__case--rotated' : ''}`}>
        <div className="gg-skin__case-sheen" />
        <div className="gg-skin__top-stripe" />

        <div className="gg-skin__header">
          <span className="gg-skin__brand-name">GEAR POCKET</span>
          <span className="gg-skin__power-dot" />
        </div>

        <div className="gg-skin__screen-bezel">
          <div className="gg-skin__screen-glass">
            <div className="gg-skin__screen">{screenContent}</div>
            <div className="gg-skin__screen-scanlines" />
            <div className="gg-skin__screen-glare" />
          </div>
        </div>

        <span className="gg-skin__tagline">PORTABLE COLOR PLAYER</span>

        <div className="gg-skin__controls">
          <div className="gg-skin__dpad">
            <div className="gg-skin__dpad-cross" />
            <div className="gg-skin__dpad-center" />
            <DpadHitzones />
          </div>

          <div className="gg-skin__mid">
            <button className="gg-skin__pill" aria-label="Select" {...bindEmulatorButton('select')}>
              SELECT
            </button>
            <button className="gg-skin__pill" aria-label="Start" {...bindEmulatorButton('start')}>
              START
            </button>
          </div>

          <div className="gg-skin__ab">
            <button className="gg-skin__btn gg-skin__btn--2" aria-label="Bouton 2" {...bindEmulatorButton('b')}>
              <span>2</span>
            </button>
            <button className="gg-skin__btn gg-skin__btn--1" aria-label="Bouton 1" {...bindEmulatorButton('a')}>
              <span>1</span>
            </button>
          </div>
        </div>

        <div className="gg-skin__footer" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="gg-skin__speaker-hole" />
          ))}
        </div>
      </div>
    </div>
  );
}
