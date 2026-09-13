import './DotBoyShelfIcon.css';

/**
 * Icone d'etagere DEDIEE pour le Game Boy original : rendu statique,
 * reprend la palette/silhouette deja validee du skin de jeu (GameBoySkin)
 * mais simplifiee et non-interactive, pour une icone d'etagere compacte
 * et coherente avec le reste du systeme (voir shelfIcons/index.ts).
 */
export function DotBoyShelfIcon() {
  return (
    <div className="dotBoyShelf-case" role="img" aria-label="Dot Boy">
      <div className="dotBoyShelf-screenBezel">
        <div className="dotBoyShelf-screen" />
      </div>

      <span className="dotBoyShelf-logo">DOT BOY</span>

      <div className="dotBoyShelf-controls">
        <div className="dotBoyShelf-dpad">
          <div className="dotBoyShelf-dpadCross" />
        </div>

        <div className="dotBoyShelf-ab">
          <span className="dotBoyShelf-btn dotBoyShelf-btn--b" />
          <span className="dotBoyShelf-btn dotBoyShelf-btn--a" />
        </div>
      </div>

      <div className="dotBoyShelf-pills">
        <span className="dotBoyShelf-pill" />
        <span className="dotBoyShelf-pill" />
      </div>
    </div>
  );
}
