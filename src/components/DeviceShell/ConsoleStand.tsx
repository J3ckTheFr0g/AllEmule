import type { CSSProperties } from 'react';
import { CONSOLE_DISPLAY_NAMES, ConsoleType } from '../../models/consoleTypes';
import { CONSOLE_SKINS } from './skins';
import { SHELF_ICON_OVERRIDES } from './shelfIcons';
import { SKIN_DESIGN_SIZE } from './skinDesignSizes';
import './ConsoleStand.css';

/** Consoles jouables affichees dans le stand, dans un ordre de sortie approximatif. */
const STAND_CONSOLES: ConsoleType[] = [
  ConsoleType.GameBoy,
  ConsoleType.GameBoyColor,
  ConsoleType.AtariLynx,
  ConsoleType.SegaGameGear,
  ConsoleType.NeoGeoPocket,
  ConsoleType.PcEngineGt,
  ConsoleType.GameBoyAdvance,
  ConsoleType.GameBoyAdvanceSp,
];

export interface ConsoleStandProps {
  onSelect: (console: ConsoleType) => void;
}

/** Ecran d'un boitier au repos sur l'etagere (pas de jeu, pas d'interaction). */
function IdleScreen() {
  return <div className="console-stand__idle-screen" />;
}

/**
 * Ecran d'accueil : une etagere de chambre d'ado fin-90s, avec le vrai
 * skin de chaque console jouable pose dessus (rendu en miniature). Chaque
 * mini-skin est explicitement dimensionne a sa taille de reference
 * (SKIN_DESIGN_SIZE, memes valeurs que le rendu plein ecran dans
 * DeviceShell) puis reduit via `transform: scale()` calcule pour tenir
 * dans une case fixe de 78x78px - volontairement PAS de pourcentages en
 * cascade sur plusieurs niveaux (largeur/hauteur "auto" d'un skin a
 * l'interieur d'un parent lui-meme "auto" ne se contraint pas de façon
 * fiable, c'est ce qui faisait exploser la mise en page precedente en
 * une colonne de cases pleine largeur).
 *
 * Certaines consoles ont une icone d'etagere DEDIEE (SHELF_ICON_OVERRIDES,
 * voir shelfIcons/) plutot qu'une version reduite de leur skin de jeu :
 * utile quand le skin de jeu adopte un style different (ex: "coque de
 * telephone" portrait pour la Game Gear) de l'apparence authentique
 * attendue ici pour une reconnaissance immediate. Les autres consoles
 * utilisent par defaut leur skin de jeu reduit, ce qui reste correct
 * pour elles (Dot Boy, Dot Boy Color, Dot Boy Advance...).
 *
 * La racine de chaque tuile est un <div role="button"> (pas un <button>) :
 * les skins de jeu rendent eux-memes de vrais <button> internes (D-pad,
 * A/B...), et le HTML interdit d'imbriquer des elements interactifs.
 * `pointer-events: none` sur le mini-skin fait remonter le clic au
 * wrapper de la tuile plutot que d'activer ses boutons internes.
 */
export function ConsoleStand({ onSelect }: ConsoleStandProps) {
  return (
    <div className="console-stand">
      <p className="console-stand__title">Choisis une console</p>
      <div className="console-stand__shelf">
        {STAND_CONSOLES.map((type) => {
          const ShelfIcon = SHELF_ICON_OVERRIDES[type];
          const Skin = CONSOLE_SKINS[type];
          const design = SKIN_DESIGN_SIZE[type];
          return (
            <div
              key={type}
              role="button"
              tabIndex={0}
              className="console-stand__tile"
              onClick={() => onSelect(type)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelect(type);
              }}
            >
              <div className="console-stand__preview">
                {ShelfIcon ? (
                  <div className="console-stand__preview-icon">
                    <ShelfIcon />
                  </div>
                ) : (
                  Skin && (
                    <div
                      className="console-stand__preview-skin"
                      style={
                        {
                          '--design-w': `${design.width}px`,
                          '--design-h': `${design.height}px`,
                        } as CSSProperties
                      }
                    >
                      <Skin screenContent={<IdleScreen />} />
                    </div>
                  )
                )}
              </div>
              <span className="console-stand__label">{CONSOLE_DISPLAY_NAMES[type]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
