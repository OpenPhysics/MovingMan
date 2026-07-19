# CLAUDE.md — Moving Man

Sim-specific context for AI assistants. General SceneryStack guidance: [OpenPhysics/.github/CLAUDE.md](https://github.com/OpenPhysics/.github/blob/main/CLAUDE.md).

## Project

SceneryStack port of the PhET Java Moving Man simulation. Two screens: Introduction (play area + sliders) and Charts (record/playback time-series graphs). The man moves in **1D**; you drive one kinematic quantity and the other two are derived.

## Key files

| Area | Location |
|---|---|
| Screens | `IntroScreen.ts`, `ChartsScreen.ts` |
| Model | `MovingManModel.ts` (screen state + step), `MovingMan.ts` (the man: kinematics + motion strategies), `DataSeries.ts` (time-series buffers), `MotionStrategy.ts`, `functionPresets.ts` (x(t) presets) |
| Numerics | `motionMath.ts` (centered derivatives), `binarySearch.ts`, `MovingManConstants.ts` |
| View | `IntroScreenView.ts`, `ChartsScreenView.ts`, `ChartNode.ts`, `MovingManSpriteNode.ts`, `PlayAreaNode.ts` |
| Sounds | `MovingManSounds.ts` — wall collision thud + grunt |
| Colors | `MovingManColors.ts`, `MovingManNamespace.ts` |

## Model

`MovingManModel` owns the screen-level state and the play/record loop; `MovingMan` owns the man's kinematics. `MotionStrategy` is a string-union (`position` / `velocity` / `acceleration`) — the **driving** quantity; the others are derived from it.

| Property | Owner · type | Meaning |
|---|---|---|
| `recordingProperty` | model · `BooleanProperty` (true) | recording vs. playback |
| `isPlayingProperty` | model · `BooleanProperty` (false) | play/pause |
| `timeProperty` / `furthestRecordedTimeProperty` | model · `NumberProperty` (s) | playback cursor / recording length |
| `playbackSpeedProperty` | model · `NumberProperty` | playback rate multiplier |
| `wallsEnabledProperty` | model · `BooleanProperty` | bound the man between walls |
| `showVelocityVectorProperty` / `showAccelerationVectorProperty` | model · `BooleanProperty` | vector overlays |
| `positionProperty` / `velocityProperty` / `accelerationProperty` | man · `NumberProperty` (m, m/s, m/s²) | kinematics |
| `motionStrategyProperty` | man · `Property<MotionStrategy>` (default `position`) | which quantity drives motion |
| `functionProperty` | man · `Property<MovingManFunctionPreset \| null>` | active x(t) preset, or null |

### Stepping, derivation & walls

- **Fixed timestep accumulator.** `step(dt)` runs whole `FIXED_DT` slices (capped by `MAX_CATCHUP_STEPS`), gated on play state; recording vs. playback branches per slice.
- **Strategy determines derivation direction:** position-driven → velocity & acceleration by **differentiation** (`estimatedCenteredDerivatives` over the data series, with mid-point smoothing); velocity-driven → position by **integration**, acceleration by differentiation; acceleration-driven → velocity & position by integration (trapezoidal mid-velocity). `snapToZero` cleans tiny residuals so a parked man reads exactly 0.
- **Walls:** `clampIfWalled` clamps the new position to the wall; on a collision the driving velocity is zeroed and `collideEmitter` fires → `MovingManSounds` thud.
- `DataSeries` keeps parallel *model* and *graph* series per quantity (plus a `mouseDataSeries` for pointer drags) feeding the Charts screen.

## Conventions & notable port choices

- Free-form x(t) formula entry replaced by an **x(t) preset menu** (`FunctionComboBox`) — SceneryStack has no built-in text input.
- Man rendered as a sprite with walking animation and wall-collision lean.
- Easter-egg cloud animation from the original is not included.
- Enums use a `const` object + string-literal union (not a TS `enum`) to stay compatible with `erasableSyntaxOnly`.

## Accessibility

Follows the shared [OpenPhysics accessibility convention](https://github.com/OpenPhysics/Baton/blob/main/ACCESSIBILITY.md).
Both screens register the shared `MovingManScreenSummaryContent` (live current-details: the man's
position/velocity/acceleration + playback state) via the `screenSummaryContent` super-option, and
order the PDOM through `pdomPlayAreaNode`/`pdomControlAreaNode`. A11y strings live under `a11y` in
each locale JSON, via `StringManager.getA11yStrings()`.

## Testing

Fleet-standard Vitest layout:

| Path | Purpose |
|---|---|
| `vitest.config.ts` | Test environment + `setupFiles` when present; `execArgv: ["--expose-gc"]` with memory-leak suite |
| `tests/setup.ts` | Canvas / AudioContext mocks + `init({ name: "…" })` before SceneryStack imports (when required) |
| `tests/**/*.test.ts` | Model/physics unit tests — mirror `src/` under `tests/` |
| `tests/memory-leak.test.ts` | WeakRef + `forceGC` dispose regression (fleet pattern) |

- Put unit tests only under root `tests/` (never co-locate or use `__tests__/`).
- Run `npm test`. CI runs the suite when a `test` script is present.
- Expand `memory-leak.test.ts` for components that add/remove nodes or link Properties at runtime (see OpticsLab).

## Commands

```bash
npm run lint && npm run check && npm run build
```

No unit-test suite — the build/lint/check gate plus manual run substitute for tests here.
