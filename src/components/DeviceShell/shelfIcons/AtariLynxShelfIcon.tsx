import './AtariLynxShelfIcon.css';

/**
 * Icone d'etagere DEDIEE (distincte du skin de jeu) : rendu statique et
 * authentique du vrai boitier Atari Lynx (chassis large et massif,
 * ecran vers le haut, D-pad bas-gauche, cluster de 4 boutons en losange
 * bas-droite), pour une reconnaissance immediate sur l'etagere -
 * contrairement au skin de jeu (AtariLynxSkin) qui adopte un style
 * "coque de telephone" portrait different, pense pour l'ergonomie.
 *
 * Marque fictive "WILDCAT" (voir CONSOLE_DISPLAY_NAMES) : la forme rend
 * hommage au boitier reel, mais aucun nom/logo depose n'est reproduit.
 */
export function AtariLynxShelfIcon() {
  return (
    <div className="lynxShelf-case" role="img" aria-label="Wildcat">
      <div className="lynxShelf-topRow">
        <span className="lynxShelf-brand">WILDCAT</span>
        <span className="lynxShelf-powerDot" />
      </div>

      <div className="lynxShelf-body">
        <div className="lynxShelf-screenBezel">
          <div className="lynxShelf-screen" />
        </div>

        <div className="lynxShelf-controls">
          <div className="lynxShelf-dpad">
            <div className="lynxShelf-dpadCross" />
          </div>
          <div className="lynxShelf-diamond">
            <span className="lynxShelf-btn lynxShelf-btn--top" />
            <span className="lynxShelf-btn lynxShelf-btn--right" />
            <span className="lynxShelf-btn lynxShelf-btn--bottom" />
            <span className="lynxShelf-btn lynxShelf-btn--left" />
          </div>
        </div>
      </div>
    </div>
  );
}
