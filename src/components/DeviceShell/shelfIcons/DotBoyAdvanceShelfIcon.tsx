import './DotBoyAdvanceShelfIcon.css';

/**
 * Icone d'etagere DEDIEE pour la Game Boy Advance : rendu statique,
 * reprend la palette/silhouette deja validee du skin de jeu
 * (GameBoyAdvanceSkin) mais simplifiee et non-interactive.
 */
export function DotBoyAdvanceShelfIcon() {
  return (
    <div className="dotBoyAdvShelf-case" role="img" aria-label="Dot Boy Advance">
      <span className="dotBoyAdvShelf-shoulder dotBoyAdvShelf-shoulder--l" />
      <span className="dotBoyAdvShelf-shoulder dotBoyAdvShelf-shoulder--r" />

      <div className="dotBoyAdvShelf-row">
        <div className="dotBoyAdvShelf-dpad">
          <div className="dotBoyAdvShelf-dpadCross" />
        </div>

        <div className="dotBoyAdvShelf-screenBezel">
          <div className="dotBoyAdvShelf-screen" />
        </div>

        <div className="dotBoyAdvShelf-ab">
          <span className="dotBoyAdvShelf-btn dotBoyAdvShelf-btn--b" />
          <span className="dotBoyAdvShelf-btn dotBoyAdvShelf-btn--a" />
        </div>
      </div>

      <span className="dotBoyAdvShelf-logo">DOT BOY ADVANCE</span>
    </div>
  );
}
