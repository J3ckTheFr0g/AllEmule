import type { SkinProps } from './SkinProps';
import './GameBoyAdvanceSkin.css';

/**
 * Silhouette de la Game Boy Advance (AGB-001, 2001) : boitier horizontal
 * indigo/violet, ecran large sans retro-eclairage centre, croix a
 * gauche, boutons A/B ronds a droite, epaulettes L/R en haut, Start/Select
 * en pilules sous l'ecran.
 *
 * data-rive-slot="gba.riv"
 */
export function GameBoyAdvanceSkin({ screenContent }: SkinProps) {
  return (
    <div className="gba-skin" data-rive-slot="gba.riv">
      <div className="gba-skin__case">
        <div className="gba-skin__shoulder gba-skin__shoulder--l">L</div>
        <div className="gba-skin__shoulder gba-skin__shoulder--r">R</div>

        <div className="gba-skin__top-row">
          <div className="gba-skin__dpad">
            <div className="gba-skin__dpad-v" />
            <div className="gba-skin__dpad-h" />
          </div>

          <div className="gba-skin__screen-bezel">
            <div className="gba-skin__power-led" />
            <div className="gba-skin__screen">{screenContent}</div>
          </div>

          <div className="gba-skin__ab">
            <button className="gba-skin__btn gba-skin__btn--b" aria-label="B" />
            <button className="gba-skin__btn gba-skin__btn--a" aria-label="A" />
          </div>
        </div>

        <div className="gba-skin__bottom-row">
          <div className="gba-skin__logo">GAME BOY ADVANCE</div>
          <div className="gba-skin__start-select">
            <span className="gba-skin__pill" />
            <span className="gba-skin__pill" />
          </div>
        </div>
      </div>
    </div>
  );
}
