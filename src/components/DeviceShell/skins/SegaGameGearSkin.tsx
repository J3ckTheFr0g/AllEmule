import type { SkinProps } from './SkinProps';
import { bindEmulatorButton } from '../../../utils/emulatorInput';
import { DpadHitzones } from './DpadHitzones';
import './SegaGameGearSkin.css';

/**
 * Rendu haute-fidelite d'un handheld couleur horizontal, chassis noir
 * glossy/chrome (inspire de coques modernes "retro-case" pour smartphone
 * plutot que du boitier plastique mat d'origine 1990) : bezel chrome
 * autour d'un tres large ecran central, deux molettes rondes en haut a
 * droite (cablees en boutons d'epaule L/R), D-pad unifie en bas a gauche,
 * boutons d'action 1/2 en bas a droite, petits boutons ronds
 * Select/Start au centre, grille de haut-parleur, molette de volume et
 * prise casque sur la tranche.
 *
 * Marque fictive "GEAR POCKET" (voir CONSOLE_DISPLAY_NAMES) : forme et
 * couleurs rendent hommage au style de boitier, mais aucun nom/logo
 * depose n'est reproduit.
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

          <div className="gg-skin__top-row">
            <span className="gg-skin__brand-name">GEAR POCKET</span>
            <div className="gg-skin__dials">
              <button className="gg-skin__dial" aria-label="Epaule gauche" {...bindEmulatorButton('l')}>
                <span className="gg-skin__dial-notch" />
              </button>
              <button className="gg-skin__dial" aria-label="Epaule droite" {...bindEmulatorButton('r')}>
                <span className="gg-skin__dial-notch" />
              </button>
            </div>
          </div>

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
              <DpadHitzones />
            </div>

            <div className="gg-skin__mid">
              <button className="gg-skin__pill" aria-label="Select" {...bindEmulatorButton('select')}>
                <span className="gg-skin__pill-dot" />
                SELECT
              </button>
              <button className="gg-skin__pill" aria-label="Start" {...bindEmulatorButton('start')}>
                <span className="gg-skin__pill-dot" />
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

          <div className="gg-skin__bottom-row">
            <span className="gg-skin__tagline">GEAR POCKET</span>
            <div className="gg-skin__speaker" aria-hidden="true">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="gg-skin__speaker-hole" />
              ))}
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
