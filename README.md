# Moving Man

A [SceneryStack](https://scenerystack.org/) port of the PhET **Moving Man** simulation. Drag the man or
drive his motion with Position, Velocity, or Acceleration controls, and record playback on time-series
charts.

## Screens

- **Introduction** — A man, two walls, and a ruler. Drag the man (or use the Position / Velocity /
  Acceleration sliders) to drive his motion. Toggle the velocity and acceleration vector arrows from the
  controls.
- **Charts** — Same play area, plus a stack of three time-series charts (one per quantity). Record motion,
  then scrub through it with a record/playback radio, rewind / play / step transport, playback-speed slider,
  and a click-to-seek cursor inside each chart. Each chart sits in a collapsible box with its own value-axis
  zoom; a shared control zooms the time axis of all three at once.

## Notable deviations from the original

- The original's free-form **"use function"** formula entry is replaced by an **x(t) preset menu** (an
  `x(t):` combo box on both screens) offering linear, parabolic, sinusoidal, and root functions; SceneryStack
  has no built-in text input. Choosing one drives position from the function (velocity/acceleration are the
  usual derivatives) and disables the position control; "Off" restores slider/drag control.
- **Collision sound effects** play a thud plus a random grunt on each wall hit (tambo `SoundClip`s driven by
  the model's `collideEmitter`); toggle them with the navigation-bar sound button.
- Cosmetic: the man is rendered as a Scenery sprite using the original PhET figure art — he stands at rest
  and switches to a mid-stride walking frame facing his direction of travel, with a footstep bob and a
  lean-and-recover on each wall hit; the original tree and cottage art stand on the ground. The easter-egg
  cloud animation is not included.

## Quick Start

```bash
npm install
npm run icons    # rasterize public/icons/icon.svg into the PWA icons
npm start        # dev server → http://localhost:5173
```

## Scripts

| Command | Description |
|---|---|
| `npm start` / `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check + production build → `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run check` | TypeScript type check (`src` + `scripts`) |
| `npm run lint` | Biome lint check |
| `npm run format` | Auto-format all files |
| `npm run fix` | Lint + auto-fix |
| `npm run icons` | Regenerate PWA icons from `public/icons/icon.svg` |
| `npm run clean` | Remove `dist/` |

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| [SceneryStack](https://scenerystack.org/) | ^3.0.0 | Simulation framework |
| [Vite](https://vitejs.dev/) | ^8 | Build tool + dev server |
| [TypeScript](https://www.typescriptlang.org/) | ^6 | Type-safe JavaScript |
| [Biome](https://biomejs.dev/) | ^2.4 | Linting + formatting |
| [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) | ^1 | PWA + service worker |

## License

MIT. The original PhET simulation is Copyright © University of Colorado; this is an independent reimplementation.

## Contributing

See [OpenPhysics contributing guidelines](https://github.com/OpenPhysics/.github/blob/main/CONTRIBUTING.md).
Report bugs via GitHub Issues; use org issue templates.
