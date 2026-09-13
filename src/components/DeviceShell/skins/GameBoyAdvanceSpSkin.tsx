import type { SkinProps } from './SkinProps';
import './GameBoyAdvanceSpSkin.css';

/**
 * Silhouette de la Game Boy Advance SP (AGS-001, 2003) : boitier clamshell
 * qui se replie, ouvert ici en position "jeu". Le capot superieur porte
 * l'ecran retro-eclaire, la charniere separe le capot de la base qui
 * porte croix, boutons A/B et Start/Select. Plus compact et plus
 * anguleux/metallique que la GBA classique.
 *
 * data-rive-slot="gba_sp.riv"
 */
export function GameBoyAdvanceSpSkin({ screenContent }: SkinProps) {
  return (
    <div className="gbasp-skin" data-rive-slot="gba_sp.riv">
      <div className="gbasp-skin__case">
        <div className="gbasp-skin__lid">
          <div className="gbasp-skin__screen-bezel">
            <div className="gbasp-skin__power-led" />
            <div className="gbasp-skin__screen">{screenContent}</div>
          </div>
        </div>

        <div className="gbasp-skin__hinge" />

        <div className="gbasp-skin__base">
          <div className="gbasp-skin__dpad">
            <div className="gbasp-skin__dpad-v" />
            <div className="gbasp-skin__dpad-h" />
          </div>

          <div className="gbasp-skin__center">
            <div className="gbasp-skin__logo">DOT BOY ADVANCE SP</div>
            <div className="gbasp-skin__start-select">
              <span className="gbasp-skin__pill" />
              <span className="gbasp-skin__pill" />
            </div>
          </div>

          <div className="gbasp-skin__ab">
            <button className="gbasp-skin__btn gbasp-skin__btn--b" aria-label="B" />
            <button className="gbasp-skin__btn gbasp-skin__btn--a" aria-label="A" />
          </div>
        </div>
      </div>
    </div>
  );
}
