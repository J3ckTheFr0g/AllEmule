import './NeoGeoPocketShelfIcon.css';

/**
 * Icone d'etagere DEDIEE : rendu statique et authentique de la vraie Neo
 * Geo Pocket (boitier blanc/creme compact, ecran carre-ish centre,
 * joystick miniature a gauche, boutons A/B a droite, POWER/OPTION aux
 * coins superieurs), distincte du skin de jeu "coque de telephone".
 *
 * Marque fictive "ARC POCKET" (voir CONSOLE_DISPLAY_NAMES).
 */
export function NeoGeoPocketShelfIcon() {
  return (
    <div className="ngpShelf-case" role="img" aria-label="Arc Pocket">
      <div className="ngpShelf-topRow">
        <span className="ngpShelf-power" />
        <span className="ngpShelf-option" />
      </div>

      <div className="ngpShelf-body">
        <div className="ngpShelf-stick">
          <div className="ngpShelf-stickNub" />
        </div>

        <div className="ngpShelf-screenBezel">
          <div className="ngpShelf-screen" />
        </div>

        <div className="ngpShelf-buttons">
          <span className="ngpShelf-btn ngpShelf-btn--a" />
          <span className="ngpShelf-btn ngpShelf-btn--b" />
        </div>
      </div>

      <span className="ngpShelf-brand">ARC POCKET</span>
    </div>
  );
}
