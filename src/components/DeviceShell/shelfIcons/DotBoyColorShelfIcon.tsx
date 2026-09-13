import './DotBoyColorShelfIcon.css';

/**
 * Icone d'etagere DEDIEE pour le Game Boy Color : rendu statique, reprend
 * la palette/silhouette deja validee du skin de jeu (GameBoyColorSkin)
 * mais simplifiee et non-interactive.
 */
export function DotBoyColorShelfIcon() {
  return (
    <div className="dotBoyColorShelf-case" role="img" aria-label="Dot Boy Color">
      <div className="dotBoyColorShelf-screenBezel">
        <div className="dotBoyColorShelf-screen" />
      </div>

      <span className="dotBoyColorShelf-logo">
        DOT BOY <span className="dotBoyColorShelf-logoColor">COLOR</span>
      </span>

      <div className="dotBoyColorShelf-controls">
        <div className="dotBoyColorShelf-dpad">
          <div className="dotBoyColorShelf-dpadCross" />
        </div>

        <div className="dotBoyColorShelf-ab">
          <span className="dotBoyColorShelf-btn dotBoyColorShelf-btn--b" />
          <span className="dotBoyColorShelf-btn dotBoyColorShelf-btn--a" />
        </div>
      </div>
    </div>
  );
}
