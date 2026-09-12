import type { ReactNode } from 'react';
import './NeoGeoPocketSkin.css';

export interface SkinProps {
  screenContent: ReactNode;
}

/**
 * Skin pour la SNK Neo Geo Pocket : petit boitier horizontal anguleux,
 * ecran carre-ish centre, joystick miniature a gauche (pas une croix
 * classique), deux boutons A/B a droite. Finition sobre anthracite/argent.
 * Rendu en CSS pur + SVG inline, aucune image externe.
 *
 * data-rive-slot sert de point d'ancrage pour une future animation Rive
 * (neo_geo_pocket.riv, cf. src/models/consoleTypes.ts) ; stand-in statique
 * en attendant un vrai fichier .riv.
 */
export function NeoGeoPocketSkin({ screenContent }: SkinProps) {
  return (
    <div className="ngp-shell" data-rive-slot="neo_geo_pocket.riv">
      <div className="ngp-body">
        <div className="ngp-headerRow">
          <span className="ngp-brand">NEOGEO</span>
          <span className="ngp-brandPocket">POCKET</span>
        </div>

        <div className="ngp-screenBezel">
          <div className="ngp-screen">{screenContent}</div>
        </div>

        <div className="ngp-controls">
          <div className="ngp-stickWell" role="presentation">
            <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
              <circle cx="20" cy="20" r="18" fill="url(#ngp-wellGradient)" stroke="#0c0c0d" strokeWidth="1" />
              <circle cx="20" cy="20" r="8" fill="url(#ngp-stickGradient)" stroke="#1a1a1c" strokeWidth="1" />
              <defs>
                <radialGradient id="ngp-wellGradient" cx="0.35" cy="0.3" r="0.9">
                  <stop offset="0%" stopColor="#2b2c2f" />
                  <stop offset="100%" stopColor="#101112" />
                </radialGradient>
                <radialGradient id="ngp-stickGradient" cx="0.35" cy="0.3" r="0.9">
                  <stop offset="0%" stopColor="#4a4b4f" />
                  <stop offset="100%" stopColor="#19191b" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          <div className="ngp-centerRow">
            <span className="ngp-pill">START</span>
          </div>

          <div className="ngp-actionButtons">
            <span className="ngp-actionBtn ngp-actionBtn--a">A</span>
            <span className="ngp-actionBtn ngp-actionBtn--b">B</span>
          </div>
        </div>

        <div className="ngp-powerLed" aria-hidden="true" />
      </div>
    </div>
  );
}
