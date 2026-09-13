import type { SkinProps } from './SkinProps';
import './GameBoyColorSkin.css';

/**
 * Silhouette du Game Boy Color (CGB-001, 1998) : boitier plus petit et
 * plus arrondi que le DMG original, coques translucides/vives typiques
 * de l'epoque, ecran retro-eclaire couleur legerement plus large, memes
 * emplacements de croix / A-B / start-select que le Game Boy.
 *
 * data-rive-slot="gameboy_color.riv"
 */
export function GameBoyColorSkin({ screenContent }: SkinProps) {
  return (
    <div className="gbc-skin" data-rive-slot="gameboy_color.riv">
      <div className="gbc-skin__case">
        <div className="gbc-skin__screen-bezel">
          <span className="gbc-skin__brand">Color</span>
          <div className="gbc-skin__power-led" />
          <div className="gbc-skin__screen">{screenContent}</div>
        </div>

        <div className="gbc-skin__logo">
          DOT BOY <span className="gbc-skin__logo-color">COLOR</span>
        </div>

        <div className="gbc-skin__controls">
          <div className="gbc-skin__dpad">
            <div className="gbc-skin__dpad-v" />
            <div className="gbc-skin__dpad-h" />
          </div>

          <div className="gbc-skin__ab">
            <button className="gbc-skin__btn gbc-skin__btn--b" aria-label="B" />
            <button className="gbc-skin__btn gbc-skin__btn--a" aria-label="A" />
          </div>
        </div>

        <div className="gbc-skin__meta">
          <div className="gbc-skin__start-select">
            <span className="gbc-skin__pill" />
            <span className="gbc-skin__pill" />
          </div>
          <div className="gbc-skin__labels">
            <span>SELECT</span>
            <span>START</span>
          </div>
        </div>
      </div>
    </div>
  );
}
