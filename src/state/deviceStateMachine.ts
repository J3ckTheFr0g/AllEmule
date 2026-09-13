import { ConsoleType } from '../models/consoleTypes';
import { ConsoleDetector, AmbiguousRomError } from '../detection/consoleDetector';

export type DeviceState =
  | 'off'
  | 'romInserting'
  | 'awaitingPowerOn'
  | 'morphing'
  | 'poweringOn'
  | 'playing'
  | 'poweringOff';

type Listener = (state: DeviceState) => void;

export class DeviceStateMachine {
  private state: DeviceState = 'off';
  private currentConsole: ConsoleType | null = null;
  private pendingConsole: ConsoleType | null = null;
  private detector = new ConsoleDetector();
  private listeners: Listener[] = [];

  getState(): DeviceState {
    return this.state;
  }

  getCurrentConsole(): ConsoleType | null {
    return this.currentConsole;
  }

  /**
   * Console detectee pour la ROM en cours de chargement, avant l'allumage
   * (pendant romInserting/morphing/awaitingPowerOn). Distinct de
   * getCurrentConsole(), qui ne bascule qu'a pressPowerOn() : necessaire
   * pour que l'UI puisse afficher le bon boitier/skin avant que
   * l'utilisateur n'ait appuye sur "Allumer".
   */
  getPendingConsole(): ConsoleType | null {
    return this.pendingConsole;
  }

  onStateChange(listener: Listener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private setState(next: DeviceState) {
    this.state = next;
    this.listeners.forEach((l) => l(next));
  }

  /**
   * @param forcedConsole Quand l'utilisateur a choisi explicitement une
   * console dans le stand d'accueil (voir ConsoleStand), on saute la
   * detection automatique par header/extension et on fait confiance a ce
   * choix. Utile pour les cas structurellement ambigus (GBA vs GBA SP,
   * indiscernables par le contenu de la ROM) ou pour les consoles qui
   * n'ont qu'un fallback par extension peu fiable (Game Gear, PC Engine,
   * NGP) : le detecteur automatique reste utilise seulement si aucune
   * console n'est precisee.
   */
  loadRom(bytes: Uint8Array, fileName: string, forcedConsole?: ConsoleType): void {
    if (this.state !== 'off') {
      throw new Error(
        `Impossible de charger une ROM depuis l'etat "${this.state}". ` +
          `Eteignez la console en cours d'abord.`,
      );
    }

    if (forcedConsole) {
      this.pendingConsole = forcedConsole;
      this.setState('romInserting');
      return;
    }

    const result = this.detector.detect(bytes, fileName);

    if (result.confidence === 'ambiguous') {
      throw new AmbiguousRomError(result.type, fileName);
    }

    this.pendingConsole = result.type;
    this.setState('romInserting');
  }

  onInsertAnimationComplete(): void {
    if (this.state !== 'romInserting') return;

    const needsMorph =
      this.currentConsole !== null && this.currentConsole !== this.pendingConsole;

    this.setState(needsMorph ? 'morphing' : 'awaitingPowerOn');
  }

  onMorphAnimationComplete(): void {
    if (this.state !== 'morphing') return;
    this.setState('awaitingPowerOn');
  }

  pressPowerOn(): void {
    if (this.state !== 'awaitingPowerOn') return;
    this.currentConsole = this.pendingConsole;
    this.setState('poweringOn');
  }

  onPowerOnAnimationComplete(): void {
    if (this.state !== 'poweringOn') return;
    this.setState('playing');
  }

  /**
   * Retour direct a "off" sans passer par poweringOff, utilise quand une
   * console detectee s'avere non jouable (aucun coeur EmulatorJS) : il n'y
   * a pas de jeu en cours a arreter proprement, juste l'ecran d'info a
   * fermer.
   */
  cancelUnsupportedConsole(): void {
    if (this.state === 'off' || this.state === 'poweringOff') return;
    this.pendingConsole = null;
    this.currentConsole = null;
    this.setState('off');
  }

  pressPowerOff(): void {
    if (this.state !== 'playing') return;
    this.setState('poweringOff');
  }

  onPowerOffAnimationComplete(): void {
    if (this.state !== 'poweringOff') return;
    this.setState('off');
  }
}
