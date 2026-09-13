import type { SkinProps } from './SkinProps';
import './SegaGameGearSkin.css';

/**
 * Rendu haute-fidelite d'un handheld couleur horizontal a grand ecran,
 * dans l'esprit de la console portable Sega Game Gear (1990) : chassis
 * noir mat, liseret rouge sur le bord superieur, tres large ecran central
 * avec vitre/reflet, D-pad unifie a gauche, boutons d'action 1/2 empiles
 * en diagonale a droite, bouton Start sous l'ecran, grille de
 * haut-parleur, molette de volume et prise casque sur la tranche droite.
 *
 * Marque fictive "GEAR POCKET" (voir CONSOLE_DISPLAY_NAMES) : forme et
 * couleurs rendent hommage au boitier reel, mais aucun nom/logo depose
 * n'est reproduit.
 *
 * data-rive-slot="game_gear.riv" : ce rendu CSS est un remplacant
 * temporaire en attendant un vrai asset Rive.
 */
export function SegaGameGearSkin({ screenContent }: SkinProps) {
  return (
    <div className="gg-skin" data-rive-slot="game_gear.riv" role="img" aria-label="Gear Pocket">
      <div className="gg-skin__stage">
        <div className="gg-skin__case">
          <div className="gg-skin__case-sheen" />
          <div className="gg-skin__top-stripe" />
          <div className="gg-skin__cartridge-seam" />

          <div className="gg-skin__screen-bezel">
            <div className="gg-skin__screen-glass">
              <div className="gg-skin__screen">{screenContent}</div>
              <div className="gg-skin__screen-scanlines" />
              <div className="gg-skin__screen-glare" />
            </div>
          </div>

          <div className="gg-skin__row">
            <div className="gg-skin__dpad">
              <div className="gg-skin__dpad-cross" />
              <div className="gg-skin__dpad-center" />
            </div>

            <div className="gg-skin__mid">
              <div className="gg-skin__brandplate">
                <span className="gg-skin__brand-name">GEAR POCKET</span>
                <span className="gg-skin__brand-tagline">PORTABLE COLOR PLAYER</span>
              </div>
              <button className="gg-skin__start" aria-label="Start">
                START
              </button>
              <div className="gg-skin__speaker" aria-hidden="true">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span key={i} className="gg-skin__speaker-hole" />
                ))}
              </div>
            </div>

            <div className="gg-skin__ab">
              <button className="gg-skin__btn gg-skin__btn--2" aria-label="Bouton 2">
                <span>2</span>
              </button>
              <button className="gg-skin__btn gg-skin__btn--1" aria-label="Bouton 1">
                <span>1</span>
              </button>
            </div>
          </div>

          <div className="gg-skin__side-controls" aria-hidden="true">
            <div className="gg-skin__volume-wheel" />
            <div className="gg-skin__headphone-jack" />
          </div>
        </div>

        <div className="gg-skin__contact-shadow" />
      </div>
    </div>
  );
}
