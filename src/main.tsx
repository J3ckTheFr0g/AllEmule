import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { DeviceShell } from './components/DeviceShell/DeviceShell';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DeviceShell />
  </StrictMode>,
);
