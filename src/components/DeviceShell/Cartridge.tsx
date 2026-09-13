import { useState } from 'react';
import type { ConsoleType } from '../../models/consoleTypes';
import { getBoxartUrl } from '../../utils/boxart';
import './Cartridge.css';

export interface CartridgeProps {
  consoleType: ConsoleType;
  fileName: string;
}

/**
 * Animation d'insertion de cartouche, affichee pendant l'etat
 * "romInserting". Essaie d'afficher la jaquette du jeu (best-effort,
 * depot communautaire libretro-thumbnails - voir utils/boxart.ts) sur
 * l'etiquette de la cartouche ; si l'image n'existe pas pour ce nom de
 * fichier (404, cas frequent - le nom local ne correspond pas toujours
 * au titre officiel), on retombe sur une etiquette generique avec le nom
 * du fichier, sans erreur visible pour l'utilisateur.
 */
export function Cartridge({ consoleType, fileName }: CartridgeProps) {
  const boxartUrl = getBoxartUrl(consoleType, fileName);
  const [imageFailed, setImageFailed] = useState(false);
  const showArt = boxartUrl && !imageFailed;

  return (
    <div className="cartridge">
      <div className="cartridge__body">
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
