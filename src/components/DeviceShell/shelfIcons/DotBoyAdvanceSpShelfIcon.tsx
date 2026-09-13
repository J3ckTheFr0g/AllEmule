import './DotBoyAdvanceSpShelfIcon.css';

/**
 * Icone d'etagere DEDIEE pour la Game Boy Advance SP : rendu statique du
 * boitier clamshell ouvert, reprend la palette/silhouette deja validee du
 * skin de jeu (GameBoyAdvanceSpSkin) mais simplifiee et non-interactive.
 */
export function DotBoyAdvanceSpShelfIcon() {
  return (
    <div className="dotBoySpShelf-case" role="img" aria-label="Dot Boy Advance SP">
      <div className="dotBoySpShelf-lid">
        <div className="dotBoySpShelf-screenBezel">
          <div className="dotBoySpShelf-screen" />
        </div>
      </div>

      <div className="dotBoySpShelf-hinge" />

      <div className="dotBoySpShelf-base">
        <div className="dotBoySpShelf-dpad">
          <div className="dotBoySpShelf-dpadCross" />
        </div>
        <span className="dotBoySpShelf-logo">DOT BOY ADVANCE SP</span>
        <div className="dotBoySpShelf-ab">
          <span className="dotBoySpShelf-btn dotBoySpShelf-btn--b" />
          <span className="dotBoySpShelf-btn dotBoySpShelf-btn--a" />
        </div>
      </div>
    </div>
  );
}
