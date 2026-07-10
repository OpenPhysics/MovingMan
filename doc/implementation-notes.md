# Implementation Notes - Moving Man Simulation

## Architecture Overview

The Moving Man simulation is structured using a Model-View pattern across two screens that share the same model class but differ in recording and chart behavior. It is a SceneryStack port of the PhET *Moving Man* simulation.

### High-Level Architecture

The simulation follows a modular architecture with **two screens**:

- **Intro screen** (`IntroScreen`): Play area and quantity controls only (no charts); `MovingManModel` created with `noRecording: true`
- **Charts screen** (`ChartsScreen`): Full record/playback with history scrubbing

Each screen has its own model instance and view:

- **Model Layer (`src/moving-man/model/`)**: 1D kinematics, motion strategy, data series, and playback state
- **View Layer (`src/moving-man/view/`)**: Play area, charts, controls, and sound

`MovingManModel` implements `TModel` and a `ManContext` interface used by the moving man entity.

### Model-View Transform

The play area is one-dimensional horizontally. Wall positions are defined by `HALF_CONTAINER_WIDTH` in model space. `LinearTransform.ts` maps model values to chart axis coordinates on the Charts screen.

## Model Components

### Core Model Design

`MovingManModel` coordinates walls, recording, playback speed, simulation time, and history.

### Component Specialization

Each model component has a single responsibility:

1. **MovingMan**: 1D position, velocity, and acceleration; function presets and wall collisions
2. **DataSeries**: Time series for x, v, and a used by charts
3. **MotionStrategy**: Which quantity (position, velocity, or acceleration) drives motion
4. **functionPresets.ts**: x(t) preset formulas replacing free-form text entry

### Physics Simulation Approach

Integration advances the man's state according to the active motion strategy. Wall collisions stop the man at the boundary (velocity zeroed) when walls are enabled.

On the Charts screen, state history supports record, pause, and playback scrubbing. The Intro screen disables recording (no stored history).

Constants live in `MovingManConstants.ts`.

## View Components

### Screen Views as Coordinators

**IntroScreenView** combines the play area with three variable sliders and a walls checkbox.

**ChartsScreenView** uses a compact play area with three collapsible x/v/a vs time charts and transport controls.

Specialized view classes handle specific aspects:

1. **PlayAreaNode**: Ruler, walls, and play-area bounds
2. **MovingManSpriteNode**: Walking animation with wall-collision lean
3. **ChartNode**: Bamboo-based charts with axis zoom
4. **VariableControl**: Slider and vector checkbox per kinematic quantity
5. **FunctionComboBox**: x(t) preset picker
6. **PlaybackControls**: Record/playback transport on the Charts screen
7. **MovingManSounds**: Wall collision thud and grunt via `addCollisionSounds()`

### Color Scheme

Colors are defined in `MovingManColors.ts`. Chart series colors should come from named color properties, not inline hex values.

### Performance Optimizations

- Chart series on the Charts screen use time-limited rolling windows
- History storage on the Charts screen is bounded by reset

Note that no dispose functions have been used, which should be addressed.
