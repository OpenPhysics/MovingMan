# CLAUDE.md — Moving Man

Sim-specific context for AI assistants. General SceneryStack guidance: [OpenPhysics/.github/CLAUDE.md](https://github.com/OpenPhysics/.github/blob/main/CLAUDE.md).

## Project

SceneryStack port of the PhET Java Moving Man simulation. Two screens: Introduction (play area + sliders) and Charts (record/playback time-series graphs).

## Key files

| Area | Location |
|---|---|
| Screens | `IntroScreen.ts`, `ChartsScreen.ts` |
| Model | `MovingManModel.ts`, `MovingMan.ts`, `DataSeries.ts`, `MotionStrategy.ts`, `functionPresets.ts` |
| View | `IntroScreenView.ts`, `ChartsScreenView.ts`, `ChartNode.ts`, `MovingManSpriteNode.ts`, `PlayAreaNode.ts` |
| Sounds | `MovingManSounds.ts` — wall collision thud + grunt |
| Colors | `MovingManColors.ts`, `MovingManNamespace.ts` |

## Notable port choices

- Free-form x(t) formula entry replaced by **x(t) preset menu** (`FunctionComboBox`) — SceneryStack has no built-in text input
- Man rendered as sprite with walking animation and wall-collision lean
- Easter-egg cloud animation from original not included
