import './GameGearShelfIcon.css';

/**
 * Icone d'etagere DEDIEE (distincte du skin de jeu) : rendu statique et
 * authentique de la vraie Sega Game Gear (chassis horizontal, ecran
 * chrome, D-pad gauche, START + boutons 1/2 droite, grille de
 * haut-parleur), pour que la console soit reconnaissable au premier coup
 * d'oeil sur l'etagere - contrairement au skin de jeu (SegaGameGearSkin)
 * qui lui adopte un style "coque de telephone" portrait different, pense
 * pour l'ergonomie en main plutot que la fidelite visuelle.
 *
 * Marque fictive "GEAR POCKET" (voir CONSOLE_DISPLAY_NAMES) : la forme et
 * les proportions rendent hommage au boitier reel, mais aucun nom/logo
 * depose n'est reproduit (les 4 barres colorees remplacent le vrai logo
 * "GAME GEAR" sans le reproduire).
 */
export function GameGearShelfIcon() {
  return (
    <div className="ggShelf-case" role="img" aria-label="Gear Pocket">
      <div className="ggShelf-bottomBand" />

      <div className="ggShelf-header">
        <div className="ggShelf-logoBars">
          <span />
          <span />
          <span />
          <span />
        </div>
        <span className="ggShelf-powerDot" />
      </div>

      <div className="ggShelf-body">
        <div className="ggShelf-dpad">
          <div className="ggShelf-dpadCross" />
        </div>

        <div className="ggShelf-screenBezel">
          <div className="ggShelf-screen" />
        </div>

        <div className="ggShelf-rightControls">
          <span className="ggShelf-start" />
          <div className="ggShelf-actionBtns">
            <span className="ggShelf-actionBtn" />
            <span className="ggShelf-actionBtn" />
          </div>
        </div>
      </div>

      <div className="ggShelf-speaker">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>
    </div>
  );
}
