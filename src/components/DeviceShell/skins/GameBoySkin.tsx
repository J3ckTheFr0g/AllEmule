import type { SkinProps } from './SkinProps';
import './GameBoySkin.css';

/**
 * Silhouette du Game Boy original (DMG-01, 1989) : boitier vertical
 * gris clair, ecran carre-ish encadre d'une lunette sombre, croix
 * directionnelle en bas a gauche, boutons A/B ronds en bas a droite,
 * Start/Select en pilules au centre, haut-parleur en bas a droite.
 *
 * data-rive-slot="gameboy.riv" : ce rendu CSS est un remplacant temporaire.
 * Le jour ou l'asset Rive correspondant (voir CONSOLE_SPECS.riveAsset)
 * sera pret, ce composant pourra etre substitue par un <RiveSkin> sans
 * changer l'interface SkinProps.
 */
export function GameBoySkin({ screenContent }: SkinProps) {
  return (
    <div className="gb-skin" data-rive-slot="gameboy.riv">
      <div className="gb-skin__case">
        <div className="gb-skin__screen-bezel">
          <span className="gb-skin__brand">Dot Matrix Game Boy</span>
          <div className="gb-skin__power-led" />
          <div className="gb-skin__screen">{screenContent}</div>
        </div>

        <div className="gb-skin__logo">GAME BOY</div>

        <div className="gb-skin__controls">
          <div className="gb-skin__dpad">
            <div className="gb-skin__dpad-v" />
            <div className="gb-skin__dpad-h" />
          </div>

          <div className="gb-skin__ab">
            <button className="gb-skin__btn gb-skin__btn--b" aria-label="B" />
            <button className="gb-skin__btn gb-skin__btn--a" aria-label="A" />
          </div>
        </div>

        <div className="gb-skin__meta">
          <div className="gb-skin__start-select">
            <span className="gb-skin__pill" />
            <span className="gb-skin__pill" />
          </div>
          <div className="gb-skin__labels">
            <span>SELECT</span>
            <span>START</span>
          </div>
        </div>

        <div className="gb-skin__speaker">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="gb-skin__speaker-hole" />
          ))}
        </div>
      </div>
    </div>
  );
}
