import type { SkinProps } from './SkinProps';
import './SegaGameGearSkin.css';

/**
 * Skin CSS/SVG imitant le boitier de la Sega Game Gear (1990) : chassis
 * horizontal noir/gris sobre, liseret rouge caracteristique, ecran large
 * centre, croix directionnelle a gauche, boutons 1 / 2 + Start a droite.
 * Pas d'image externe : uniquement gradients, formes et un SVG inline pour
 * le logo.
 *
 * `data-rive-slot` marque l'emplacement reserve a une future animation Rive
 * (game_gear.riv, cf. CONSOLE_SPECS) ; ce composant sert de stand-in
 * statique en attendant l'asset binaire reel.
 */
export function SegaGameGearSkin({ screenContent }: SkinProps) {
  return (
    <div className="gg-skin" data-rive-slot="game_gear.riv" role="img" aria-label="Sega Game Gear">
      <div className="gg-skin__body">
        <div className="gg-skin__stripe" aria-hidden="true" />

        <div className="gg-skin__top-row">
          <div className="gg-skin__dpad">
            <div className="gg-skin__dpad-v" />
            <div className="gg-skin__dpad-h" />
          </div>

          <div className="gg-skin__screen-bezel">
            <div className="gg-skin__screen">{screenContent}</div>
            <div className="gg-skin__speaker-grille" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} />
              ))}
            </div>
          </div>

          <div className="gg-skin__ab">
            <button className="gg-skin__btn gg-skin__btn--2" aria-label="Bouton 2">
              2
            </button>
            <button className="gg-skin__btn gg-skin__btn--1" aria-label="Bouton 1">
              1
            </button>
          </div>
        </div>

        <div className="gg-skin__bottom-row">
          <svg viewBox="0 0 120 16" className="gg-skin__logo" aria-hidden="true">
            <text x="0" y="13" className="gg-skin__logo-text">
              GAME GEAR
            </text>
          </svg>

          <button className="gg-skin__start" aria-label="Start">
            START
          </button>
        </div>
      </div>
    </div>
  );
}
