import type { SkinProps } from './SkinProps';
import { bindEmulatorButton } from '../../../utils/emulatorInput';
import { DpadHitzones } from './DpadHitzones';
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
        <button className="gba-skin__shoulder gba-skin__shoulder--l" aria-label="L" {...bindEmulatorButton('l')}>L</button>
        <button className="gba-skin__shoulder gba-skin__shoulder--r" aria-label="R" {...bindEmulatorButton('r')}>R</button>

        <div className="gba-skin__top-row">
          <div className="gba-skin__dpad">
            <div className="gba-skin__dpad-v" />
            <div className="gba-skin__dpad-h" />
            <DpadHitzones />
          </div>

          <div className="gba-skin__screen-bezel">
            <div className="gba-skin__power-led" />
            <div className="gba-skin__screen">{screenContent}</div>
          </div>

          <div className="gba-skin__ab">
            <button className="gba-skin__btn gba-skin__btn--b" aria-label="B" {...bindEmulatorButton('b')} />
            <button className="gba-skin__btn gba-skin__btn--a" aria-label="A" {...bindEmulatorButton('a')} />
          </div>
        </div>

        <div className="gba-skin__bottom-row">
          <div className="gba-skin__logo">DOT BOY ADVANCE</div>
          <div className="gba-skin__start-select">
            <button className="gba-skin__pill" aria-label="Select" {...bindEmulatorButton('select')} />
            <button className="gba-skin__pill" aria-label="Start" {...bindEmulatorButton('start')} />
          </div>
        </div>
      </div>
    </div>
  );
}
