import type { SkinProps } from './SkinProps';
import './GameBoySkin.css';

/**
 * Rendu haute-fidelite d'un handheld monochrome vertical dans l'esprit du
 * Game Boy original (1989) : boitier ivoire/gris chaud, lunette d'ecran
 * gris-violet fonce avec vitre et reflet, D-pad en croix unique (pas deux
 * barres qui se croisent), boutons A/B ovales bordeaux inclines a -25deg
 * (comme le boitier reel), pilules SELECT/START, grille de haut-parleur
 * en points, et une ombre de contact au sol pour donner une sensation de
 * volume/tenue en main plutot qu'un pictogramme plat.
 *
 * Marque fictive "DOT BOY" (voir CONSOLE_DISPLAY_NAMES) : la forme, les
 * proportions et les couleurs rendent hommage au boitier reel, mais aucun
 * nom ni logo depose n'est reproduit.
 *
 * data-rive-slot="gameboy.riv" : ce rendu CSS est un remplacant temporaire.
 * Le jour ou l'asset Rive correspondant (voir CONSOLE_SPECS.riveAsset)
 * sera pret, ce composant pourra etre substitue par un <RiveSkin> sans
 * changer l'interface SkinProps.
 */
export function GameBoySkin({ screenContent }: SkinProps) {
  return (
    <div className="gb-skin" data-rive-slot="gameboy.riv">
      <div className="gb-skin__stage">
        <div className="gb-skin__case">
          <div className="gb-skin__case-sheen" />
          <div className="gb-skin__cartridge-seam" />

          <div className="gb-skin__screen-bezel">
            <span className="gb-skin__power-label">
              <span className="gb-skin__power-led" />
              BATTERY
            </span>

            <div className="gb-skin__screen-glass">
              <div className="gb-skin__screen">{screenContent}</div>
              <div className="gb-skin__screen-scanlines" />
              <div className="gb-skin__screen-glare" />
            </div>
          </div>

          <div className="gb-skin__brandplate">
            <span className="gb-skin__brand-gameboy">DOT BOY</span>
          </div>
          <div className="gb-skin__dotmatrix-label">DOT MATRIX POCKET SYSTEM</div>

          <div className="gb-skin__controls">
            <div className="gb-skin__dpad">
              <div className="gb-skin__dpad-cross" />
              <div className="gb-skin__dpad-center" />
            </div>

            <div className="gb-skin__ab">
              <button className="gb-skin__btn gb-skin__btn--b" aria-label="B">
                <span>B</span>
              </button>
              <button className="gb-skin__btn gb-skin__btn--a" aria-label="A">
                <span>A</span>
              </button>
            </div>
          </div>

          <div className="gb-skin__meta">
            <div className="gb-skin__pill-group">
              <span className="gb-skin__pill" />
              <span className="gb-skin__pill-label">SELECT</span>
            </div>
            <div className="gb-skin__pill-group">
              <span className="gb-skin__pill" />
              <span className="gb-skin__pill-label">START</span>
            </div>
          </div>

          <div className="gb-skin__speaker">
            {Array.from({ length: 15 }).map((_, i) => (
              <span key={i} className="gb-skin__speaker-hole" />
            ))}
          </div>

          <div className="gb-skin__volume-wheel" aria-hidden="true" />
        </div>

        <div className="gb-skin__contact-shadow" />
      </div>
    </div>
  );
}
