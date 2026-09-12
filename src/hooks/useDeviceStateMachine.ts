import { useEffect, useRef, useState } from 'react';
import { DeviceStateMachine, DeviceState } from '../state/deviceStateMachine';
import { ConsoleType } from '../models/consoleTypes';

export function useDeviceStateMachine() {
  const machineRef = useRef<DeviceStateMachine>();
  if (!machineRef.current) {
    machineRef.current = new DeviceStateMachine();
  }
  const machine = machineRef.current;

  const [state, setState] = useState<DeviceState>(machine.getState());
  const [currentConsole, setCurrentConsole] = useState<ConsoleType | null>(
    machine.getCurrentConsole(),
  );
  const [pendingConsole, setPendingConsole] = useState<ConsoleType | null>(
    machine.getPendingConsole(),
  );

  useEffect(() => {
    const unsubscribe = machine.onStateChange((next) => {
      setState(next);
      setCurrentConsole(machine.getCurrentConsole());
      setPendingConsole(machine.getPendingConsole());
    });
    return unsubscribe;
  }, [machine]);

  return { machine, state, currentConsole, pendingConsole };
}
