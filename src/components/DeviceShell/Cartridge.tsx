import { useState } from 'react';
import { ConsoleType } from '../../models/consoleTypes';
import { getBoxartUrl } from '../../utils/boxart';
import './Cartridge.css';

export interface CartridgeProps {
  consoleType: ConsoleType;
  fileName: string;
}

/**
 * Forme physique du support de jeu par console (voir Cartridge.css pour
 * les regles associees a chaque valeur, cf. selecteurs
 * `.cartridge__body[data-shape="..."]`) :
 * - "gb"   : cartouche Game Boy/Color, portrait, encoche coin haut-droit.
 * - "gba"  : cartouche GBA/GBA SP, fine et allongee, plastique sombre.
 * - "lynx" : carte large et plate (format "carte" plutot que cartouche).
 * - "gg"   : cartouche Game Gear, portrait trapue.
 * - "pce"  : HuCard, tres fine et plate (carte quasi a plat, pas de relief).
 * - "ngp"  : petite cartouche compacte quasi carree.
 */
const CARTRIDGE_SHAPE: Partial<Record<ConsoleType, string>> = {
  [ConsoleType.GameBoy]: 'gb',
  [ConsoleType.GameBoyColor]: 'gb',
  [ConsoleType.GameBoyAdvance]: 'gba',
  [ConsoleType.GameBoyAdvanceSp]: 'gba',
  [ConsoleType.AtariLynx]: 'lynx',
  [ConsoleType.SegaGameGear]: 'gg',
  [ConsoleType.PcEngineGt]: 'pce',
  [ConsoleType.NeoGeoPocket]: 'ngp',
};

/**
 * Animation d'insertion de cartouche, affichee pendant l'etat
 * "romInserting". La forme (aspect-ratio, encoche, epaisseur) reprend
 * celle du vrai support de la console detectee plutot qu'un rectangle
 * generique unique. Essaie aussi d'afficher la jaquette du jeu
 * (best-effort, depot communautaire libretro-thumbnails - voir
 * utils/boxart.ts) sur l'etiquette ; si l'image n'existe pas pour ce nom
 * de fichier (404, cas frequent - le nom local ne correspond pas toujours
 * au titre officiel), on retombe sur une etiquette generique avec le nom
 * du fichier, sans erreur visible pour l'utilisateur.
 */
export function Cartridge({ consoleType, fileName }: CartridgeProps) {
  const boxartUrl = getBoxartUrl(consoleType, fileName);
  const [imageFailed, setImageFailed] = useState(false);
  const showArt = boxartUrl && !imageFailed;
  const shape = CARTRIDGE_SHAPE[consoleType] ?? 'gb';

  return (
    <div className="cartridge">
      <div className="cartridge__body" data-shape={shape}>
        <div className="cartridge__notch" aria-hidden="true" />
        <div className="cartridge__label">
          {showArt ? (
            <img
              src={boxartUrl}
              alt=""
              className="cartridge__art"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <span className="cartridge__title">{fileName}</span>
          )}
        </div>
        <div className="cartridge__contacts" aria-hidden="true" />
      </div>
    </div>
  );
}
