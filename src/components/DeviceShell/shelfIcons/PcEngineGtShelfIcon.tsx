import './PcEngineGtShelfIcon.css';

/**
 * Icone d'etagere DEDIEE : rendu statique et authentique de la vraie NEC
 * PC Engine GT (boitier noir compact, tres grand ecran, D-pad losange
 * bas-gauche, boutons II/I ronds haut-droite, SELECT/RUN en bas),
 * distincte du skin de jeu "coque de telephone".
 *
 * Marque fictive "CORE ENGINE GT" (voir CONSOLE_DISPLAY_NAMES).
 */
export function PcEngineGtShelfIcon() {
  return (
    <div className="pceGtShelf-case" role="img" aria-label="Core Engine GT">
      <div className="pceGtShelf-topRow">
        <span className="pceGtShelf-brand">CORE ENGINE</span>
      </div>

      <div className="pceGtShelf-screenBezel">
        <div className="pceGtShelf-screen" />
      </div>

      <span className="pceGtShelf-gt">GT</span>

      <div className="pceGtShelf-controls">
        <div className="pceGtShelf-dpad" role="presentation">
          <svg viewBox="0 0 48 48" width="100%" height="100%" aria-hidden="true">
            <path
              d="M18 4h12v12h12v12H30v12H18V28H6V16h12z"
              fill="#2c2d30"
              stroke="#5a5d63"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <div className="pceGtShelf-selectRun">
          <span className="pceGtShelf-toggle" />
          <span className="pceGtShelf-toggle" />
        </div>

        <div className="pceGtShelf-actionBtns">
          <span className="pceGtShelf-actionBtn" />
          <span className="pceGtShelf-actionBtn" />
        </div>
      </div>
    </div>
  );
}
