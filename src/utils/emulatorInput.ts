import type { PointerEvent as ReactPointerEvent } from 'react';

/**
 * Le tactile virtuel natif d'EmulatorJS (croix/A/B/Select/Start/Fast/Slow
 * en overlay transparent sur le canvas) est desactive via EJS_browserMode=2
 * (voir DeviceShell.tsx) car il se superposait au minuscule ecran du
 * boitier et le rendait illisible. A la place, les boutons DESSINES sur
 * chaque skin sont cables ici pour emettre les memes evenements clavier
 * qu'EmulatorJS ecoute par defaut (cf. doc EmulatorJS "Default Controls") :
 * fleches pour la croix, x = A, z = B, Enter = Start, v = Select.
 *
 * On simule de vraies KeyboardEvent sur window plutot que d'utiliser une
 * API interne EmulatorJS non documentee/stable, pour rester compatible
 * quelle que soit la version du loader charge depuis le CDN.
 */
export const EMULATOR_KEYS = {
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
  a: 'x',
  b: 'z',
  start: 'Enter',
  select: 'v',
  l: 'q',
  r: 'e',
} as const;

export type EmulatorButton = keyof typeof EMULATOR_KEYS;

function dispatchKey(type: 'keydown' | 'keyup', key: string) {
  window.dispatchEvent(
    new KeyboardEvent(type, { key, code: key, bubbles: true, cancelable: true }),
  );
}

/**
 * Handlers pointer a etaler sur un bouton/zone de boitier factice pour
 * qu'il envoie reellement la touche correspondante au jeu tant qu'il est
 * maintenu enfonce (tactile ET souris, avec relachement propre meme si le
 * doigt glisse hors de l'element).
 */
export function bindEmulatorButton(button: EmulatorButton) {
  const key = EMULATOR_KEYS[button];
  const press = (e: ReactPointerEvent) => {
    e.preventDefault();
    dispatchKey('keydown', key);
  };
  const release = () => dispatchKey('keyup', key);

  return {
    onPointerDown: press,
    onPointerUp: release,
    onPointerLeave: release,
    onPointerCancel: release,
  };
}
