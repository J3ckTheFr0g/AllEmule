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

  loadRom(bytes: Uint8Array, fileName: string): void {
    if (this.state !== 'off') {
      throw new Error(
        `Impossible de charger une ROM depuis l'etat "${this.state}". ` +
          `Eteignez la console en cours d'abord.`,
      );
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

  pressPowerOff(): void {
    if (this.state !== 'playing') return;
    this.setState('poweringOff');
  }

  onPowerOffAnimationComplete(): void {
    if (this.state !== 'poweringOff') return;
    this.setState('off');
  }
}
