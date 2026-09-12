# ROM Console Web

Lecteur de ROMs multi-consoles portables (jusqu'a 2005), package en PWA
installable, heberge sur GitHub Pages.

## Stack

- **React + TypeScript + Vite** - build statique
- **Rive** (`@rive-app/react-canvas`) - animations vectorielles des boitiers
  (insertion, morphing, allumage/extinction), pilotees par state machine
- **EmulatorJS** - coeurs d'emulation en WebAssembly (a integrer, voir
  `docs/emulatorjs-integration.md` une fois redigee)
- **Tailwind CSS** - habillage UI

## Structure

```
src/
  models/consoleTypes.ts       - specs par console (orientation, ratio, core, asset Rive)
  detection/consoleDetector.ts - detection de ROM par header/checksum ou extension
  state/deviceStateMachine.ts  - cycle off -> insertion -> (morph) -> power on -> playing -> power off
  components/                  - composants React (a creer)
  assets/                      - fichiers .riv, sprites, sons
```

## Demarrage

```bash
npm install
npm run dev
```

## Deploiement

Le push sur `main` declenche automatiquement le build et le deploiement
via `.github/workflows/deploy.yml`. Verifier que `base` dans
`vite.config.ts` correspond exactement au nom du repo GitHub.

## Points d'attention

- **Propriete intellectuelle** : les logos de demarrage et boitiers sont
  des hommages stylises, pas des reproductions exactes des marques
  deposees Nintendo/Sega/Atari/etc.
- **GBA vs GBA SP** : indiscernables par le contenu de la ROM (meme puce).
  La distinction se fait via une preference utilisateur, pas la detection.
- **Coeurs manquants** : GP32 n'a pas de core WebAssembly mature a ce jour.
  Watara Supervision et Game & Watch (MAME) sont partiellement supportes
  selon les builds EmulatorJS disponibles - a valider avant de promettre
  ces consoles aux utilisateurs.
- **ROMs non hebergees** : chargement exclusivement local par
  l'utilisateur (`<input type="file">`), jamais commite dans le repo.
