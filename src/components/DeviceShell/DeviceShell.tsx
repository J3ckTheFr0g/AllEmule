import { useCallback, useEffect, useRef, useState } from 'react';
import { useDeviceStateMachine } from '../../hooks/useDeviceStateMachine';
import { readRomFile } from '../../detection/consoleDetector';
import { AmbiguousRomError } from '../../detection/consoleDetector';
import {
  CONSOLE_SPECS,
  CONSOLE_DISPLAY_NAMES,
  CONSOLE_FILE_EXTENSIONS,
  ConsoleType,
} from '../../models/consoleTypes';
import { CONSOLE_SKINS, UnsupportedConsoleNotice } from './skins';
import { ConsoleStand } from './ConsoleStand';
import './DeviceShell.css';

const ANIM_DURATIONS_MS = {
  insert: 900,
  morph: 700,
  powerOn: 1200,
  powerOff: 500,
};

export function DeviceShell() {
  const { machine, state, currentConsole, pendingConsole } = useDeviceStateMachine();
  const [romBlobUrl, setRomBlobUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const emulatorContainerRef = useRef<HTMLDivElement>(null);
  // Console choisie dans le ConsoleStand avant l'ouverture du selecteur de
  // fichier : lue par handleFileSelected pour forcer ce type au chargement
  // plutot que de se fier a la detection automatique (utile notamment pour
  // GBA vs GBA SP, indiscernables par le contenu de la ROM).
  const pendingStandSelectionRef = useRef<ConsoleType | null>(null);

  const handleStandSelect = useCallback((type: ConsoleType) => {
    pendingStandSelectionRef.current = type;
    const input = fileInputRef.current;
    if (!input) return;
    input.accept = (CONSOLE_FILE_EXTENSIONS[type] ?? []).join(',');
    input.click();
  }, []);

  const handleFileSelected = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setErrorMessage(null);

      const forcedConsole = pendingStandSelectionRef.current ?? undefined;
      pendingStandSelectionRef.current = null;

      try {
        const bytes = await readRomFile(file);
        machine.loadRom(bytes, file.name, forcedConsole);
        setRomBlobUrl(URL.createObjectURL(file));
      } catch (err) {
        if (err instanceof AmbiguousRomError) {
          setErrorMessage(
            `Console incertaine pour "${err.fileName}" (hypothese: ${err.bestGuess}). ` +
              `Confirmation manuelle a implementer.`,
          );
        } else {
          setErrorMessage((err as Error).message);
        }
      }

      e.target.value = '';
    },
    [machine],
  );

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (state === 'romInserting') {
      timer = setTimeout(
        () => machine.onInsertAnimationComplete(),
        ANIM_DURATIONS_MS.insert,
      );
    } else if (state === 'morphing') {
      timer = setTimeout(
        () => machine.onMorphAnimationComplete(),
        ANIM_DURATIONS_MS.morph,
      );
    } else if (state === 'poweringOn') {
      timer = setTimeout(
        () => machine.onPowerOnAnimationComplete(),
        ANIM_DURATIONS_MS.powerOn,
      );
    } else if (state === 'poweringOff') {
      timer = setTimeout(() => {
        machine.onPowerOffAnimationComplete();
        setRomBlobUrl(null);
      }, ANIM_DURATIONS_MS.powerOff);
    }

    return () => clearTimeout(timer);
  }, [state, machine]);

  useEffect(() => {
    if (state !== 'playing' || !currentConsole || !romBlobUrl) return;
    const container = emulatorContainerRef.current;
    if (!container) return;

    const spec = CONSOLE_SPECS[currentConsole];
    if (spec.supportStatus !== 'mvp') {
      // Pas de bandeau d'erreur ici : le rendu affiche deja
      // <UnsupportedConsoleNotice> a la place de l'emulateur dans ce cas
      // (voir isUnsupported plus bas).
      return;
    }

    // React 18 StrictMode monte/demonte cet effet deux fois en dev pour
    // verifier son idempotence. Sans cette garde, le nettoyage videait le
    // conteneur pendant que le <script> EmulatorJS chargeait encore en
    // arriere-plan, ce qui empechait le jeu de demarrer une fois sur deux.
    const injectionKey = `${currentConsole}:${romBlobUrl}`;
    if (container.dataset.ejsKey === injectionKey) return;

    container.innerHTML = '';
    container.dataset.ejsKey = injectionKey;

    const playerDiv = document.createElement('div');
    playerDiv.id = 'ejs-player';
    container.appendChild(playerDiv);

    (window as any).EJS_player = '#ejs-player';
    (window as any).EJS_core = spec.emulatorCore;
    (window as any).EJS_gameUrl = romBlobUrl;
    (window as any).EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';
    (window as any).EJS_startOnLoaded = true;
    // Evite de requerir les en-tetes COOP/COEP (SharedArrayBuffer) pour
    // fonctionner aussi bien en dev qu'une fois deploye sur GitHub Pages.
    (window as any).EJS_threads = false;
    // Force le mode "desktop" : supprime l'overlay tactile virtuel natif
    // d'EmulatorJS (croix/A/B/Select/Start/Fast/Slow semi-transparents),
    // concu pour un canvas plein ecran et illisible une fois compresse
    // dans le petit ecran du boitier (cf. capture utilisateur montrant
    // l'overlay superpose au jeu). Les boutons DESSINES sur le skin sont
    // cables (src/utils/emulatorInput.ts) pour envoyer les memes touches
    // clavier qu'EmulatorJS ecoute par defaut, donc le jeu reste jouable
    // au tactile malgre la desactivation de son propre overlay.
    (window as any).EJS_browserMode = 2;
    // Console d'origine : pas d'avance/ralenti rapide. Le menu natif
    // EmulatorJS (parametres, sauvegardes, cheats...) est aussi masque : concu
    // pour un plein ecran desktop, il deborde et se coupe une fois compresse
    // dans le petit ecran du boitier (cf. capture utilisateur). Un vrai menu
    // "dans l'esprit console", navigable avec les boutons du boitier, est une
    // fonctionnalite a part entiere a construire plus tard si voulue.
    (window as any).EJS_Buttons = {
      fastForward: false,
      slowMotion: false,
      contextMenu: false,
      settings: false,
      saveState: false,
      loadState: false,
      quickSave: false,
      quickLoad: false,
      cheat: false,
      screenRecord: false,
      cacheManager: false,
      netplay: false,
      gamepad: false,
      saveSavFiles: false,
      loadSavFiles: false,
      screenshot: false,
      exitEmulation: false,
    };
    (window as any).EJS_onGameStart = () => setErrorMessage(null);
    // EJS_onExit se declenche quand EmulatorJS quitte/plante le jeu en cours
    // (aucun callback "onCrash" dedie n'est documente par EmulatorJS a ce
    // jour : c'est le signal le plus proche d'un arret inattendu du core).
    (window as any).EJS_onExit = () =>
      setErrorMessage(
        "EmulatorJS a signale la fin/le crash du jeu (EJS_onExit) alors que l'appareil " +
          "etait toujours en etat 'playing'.",
      );

    const script = document.createElement('script');
    script.src = 'https://cdn.emulatorjs.org/stable/data/loader.js';
    script.async = true;
    script.onerror = () =>
      setErrorMessage("Impossible de charger EmulatorJS (verifie la connexion internet).");
    container.appendChild(script);
  }, [state, currentConsole, romBlobUrl]);

  // Instrumentation : toute exception JS non catchee ou promesse rejetee
  // pendant que le jeu tourne (crash du core WASM, erreur EmulatorJS, etc.)
  // est remontee dans le bandeau d'erreur existant au lieu de couper le jeu
  // silencieusement. Actif uniquement en etat "playing" et nettoye a la sortie
  // pour ne pas fuiter entre montages/etats.
  useEffect(() => {
    if (state !== 'playing') return;

    const handleWindowError = (event: ErrorEvent) => {
      const detail = event.message || String(event.error ?? 'Erreur inconnue');
      setErrorMessage(
        `Erreur JS pendant l'execution du jeu : ${detail} ` +
          `(${event.filename ?? '?'}:${event.lineno ?? '?'})`,
      );
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason =
        event.reason instanceof Error
          ? event.reason.message
          : String(event.reason ?? 'raison inconnue');
      setErrorMessage(`Promesse rejetee non geree pendant le jeu : ${reason}`);
    };

    window.addEventListener('error', handleWindowError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleWindowError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [state]);

  // Nettoyage reel uniquement quand on quitte l'etat "playing" (extinction),
  // separe de l'effet d'injection pour ne pas interferer avec le double
  // montage de StrictMode ci-dessus.
  useEffect(() => {
    if (state === 'playing') return;
    const container = emulatorContainerRef.current;
    if (container && container.dataset.ejsKey) {
      container.innerHTML = '';
      delete container.dataset.ejsKey;
    }
  }, [state]);

  // Avant l'allumage (insertion/morph/attente), le boitier a afficher est
  // celui de la ROM en cours de chargement (pendingConsole), pas l'ancien
  // currentConsole qui ne bascule qu'a pressPowerOn().
  const isPrePower =
    state === 'romInserting' || state === 'morphing' || state === 'awaitingPowerOn';
  const displayConsole = isPrePower ? pendingConsole : currentConsole;
  const displaySpec = displayConsole ? CONSOLE_SPECS[displayConsole] : null;
  const SkinComponent = displayConsole ? CONSOLE_SKINS[displayConsole] : undefined;
  const isUnsupported = state === 'playing' && !!displaySpec && displaySpec.supportStatus !== 'mvp';

  const orientationClass =
    displaySpec && displaySpec.orientation === 'landscape'
      ? 'orientation-landscape'
      : 'orientation-portrait';

  // Un skin applique `width:100%; height:100%` au SEUL enfant direct de la
  // zone ecran (voir ex. `.gb-skin__screen > *`). Il faut donc toujours
  // rendre un unique noeud racine ici, jamais deux freres (l'ancien bug :
  // le bouton "Eteindre" comme 2e enfant se faisait etirer a 100% et
  // recouvrait tout l'ecran).
  const innerContent = (
    <div className="device-shell__screen-content">
      {state === 'romInserting' && (
        <div className="device-shell__cartridge-insert" />
      )}

      {state === 'morphing' && (
        <div className="device-shell__morph" />
      )}

      {state === 'awaitingPowerOn' && (
        <div className="device-shell__prompt">
          <p>
            ROM chargee -{' '}
            {displayConsole ? CONSOLE_DISPLAY_NAMES[displayConsole] : ''}
          </p>
          <button onClick={() => machine.pressPowerOn()}>Allumer</button>
        </div>
      )}

      {state === 'poweringOn' && <div className="device-shell__boot-flash" />}

      {state === 'playing' && !isUnsupported && (
        <div className="device-shell__playing">
          <div ref={emulatorContainerRef} className="device-shell__emulator" />
          <button
            className="device-shell__power-off"
            onClick={() => machine.pressPowerOff()}
          >
            Eteindre
          </button>
        </div>
      )}

      {state === 'poweringOff' && <div className="device-shell__boot-flash" />}
    </div>
  );

  return (
    <div className={`device-shell ${orientationClass}`}>
      {errorMessage && <div className="device-shell__error">{errorMessage}</div>}

      {state === 'off' ? (
        <ConsoleStand onSelect={handleStandSelect} />
      ) : (
        <div
          className={`device-shell__body ${
            SkinComponent || isUnsupported ? '' : 'device-shell__body--generic'
          }`}
        >
          {isUnsupported && displayConsole ? (
            <UnsupportedConsoleNotice
              consoleName={CONSOLE_DISPLAY_NAMES[displayConsole]}
              onDismiss={() => machine.cancelUnsupportedConsole()}
            />
          ) : SkinComponent ? (
            <SkinComponent screenContent={innerContent} />
          ) : (
            innerContent
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelected}
        style={{ display: 'none' }}
      />
    </div>
  );
}
