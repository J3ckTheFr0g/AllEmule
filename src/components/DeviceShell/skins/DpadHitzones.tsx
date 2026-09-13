import { bindEmulatorButton } from '../../../utils/emulatorInput';
import './DpadHitzones.css';

/**
 * 4 zones de clic invisibles (haut/bas/gauche/droite) a placer comme
 * enfants d'un conteneur `position: relative` de dimensions ~carrees
 * (le D-pad visuel de chaque skin, quelle que soit sa forme exacte -
 * croix unifiee ou deux barres croisees). Fonctionne au tactile ET a la
 * souris, envoie les vraies touches clavier qu'EmulatorJS ecoute (voir
 * emulatorInput.ts) puisque son propre overlay tactile est desactive
 * (EJS_browserMode=2 dans DeviceShell.tsx).
 */
export function DpadHitzones() {
  return (
    <>
      <button
        className="dpad-hitzone dpad-hitzone--up"
        aria-label="Haut"
        {...bindEmulatorButton('up')}
      />
      <button
        className="dpad-hitzone dpad-hitzone--down"
        aria-label="Bas"
        {...bindEmulatorButton('down')}
      />
      <button
        className="dpad-hitzone dpad-hitzone--left"
        aria-label="Gauche"
        {...bindEmulatorButton('left')}
      />
      <button
        className="dpad-hitzone dpad-hitzone--right"
        aria-label="Droite"
        {...bindEmulatorButton('right')}
      />
    </>
  );
}
