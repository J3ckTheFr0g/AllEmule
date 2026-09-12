import type { ReactNode } from 'react';
import './PcEngineGtSkin.css';

export interface SkinProps {
  screenContent: ReactNode;
}

/**
 * Skin pour la NEC PC Engine GT (1990) : console portable ultra-compacte
 * au format "calculatrice de luxe", boitier horizontal gris/blanc, ecran
 * large centre, croix directionnelle a gauche, deux boutons d'action ronds
 * a droite. Rendu en CSS pur (gradients, radius, ombres) + SVG inline.
 *
 * data-rive-slot sert de point d'ancrage pour une future animation Rive
 * (pc_engine_gt.riv, cf. src/models/consoleTypes.ts) ; en attendant, ce
 * marqueur est purement un stand-in statique.
 */
export function PcEngineGtSkin({ screenContent }: SkinProps) {
  return (
    <div className="pceGt-shell" data-rive-slot="pc_engine_gt.riv">
      <div className="pceGt-body">
        <div className="pceGt-topVents" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="pceGt-screenBezel">
          <div className="pceGt-screenInnerBezel">
            <div className="pceGt-screen">{screenContent}</div>
          </div>
          <div className="pceGt-brandRow">
            <span className="pceGt-brand">PC ENGINE</span>
            <span className="pceGt-brandGt">GT</span>
          </div>
        </div>

        <div className="pceGt-controls">
          <div className="pceGt-dpad" role="presentation">
            <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
              <path
                d="M18 4h12v12h12v12H30v12H18V28H6V16h12z"
                fill="url(#pceGt-dpadGradient)"
                stroke="#5a5d63"
                strokeWidth="1.5"
              />
              <defs>
                <linearGradient id="pceGt-dpadGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3a3c40" />
                  <stop offset="100%" stopColor="#1c1d1f" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="pceGt-selectRun">
            <span className="pceGt-pill">SELECT</span>
            <span className="pceGt-pill">RUN</span>
          </div>

          <div className="pceGt-actionButtons">
            <span className="pceGt-actionBtn pceGt-actionBtn--i">I</span>
            <span className="pceGt-actionBtn pceGt-actionBtn--ii">II</span>
          </div>
        </div>

        <div className="pceGt-speakerGrille" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
