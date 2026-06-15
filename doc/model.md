# Model - Moving Man

This document describes the model (the underlying physics, math, and behavior) for the simulation, in
terms appropriate for an educator. It is the companion to
[implementation-notes.md](./implementation-notes.md), which targets developers.

## Overview

The simulation teaches **one-dimensional kinematics** through a man walking back and forth along a
horizontal line between two walls. Students set the man's position, velocity, or acceleration and watch
the other quantities evolve on synchronized charts, connecting graphs of position, velocity, and
acceleration versus time. An **Intro** screen shows live motion with rolling chart windows, and a
**Charts** screen adds full record/playback so students can scrub through recorded history.

## Quantities and units

| Quantity | Symbol | Units | Notes |
|---|---|---|---|
| Position | x | m | Location along the 1-D track; bounded by the walls |
| Velocity | v | m/s | Rate of change of position |
| Acceleration | a | m/s² | Rate of change of velocity |
| Time | t | s | Advances through the model `step(dt)` chain |

## Governing equations

The man obeys one-dimensional kinematics:

```
v = dx/dt        a = dv/dt
```

advanced each step by

```
v ← v + a · dt        x ← x + v · dt
```

The student chooses a control mode (set position, velocity, or acceleration); the simulation then
derives the remaining quantities by differentiation or integration. When the man is dragged, velocity
and acceleration are estimated from the recorded position history.

## Simplifications and assumptions

- Pure kinematics: motion is prescribed, not produced by forces or mass.
- One-dimensional point particle.
- The walls bound the position; reaching a wall stops motion at the boundary rather than bouncing
  physically.
- Charts assume no minimum frame rate; the model integrates with arbitrarily small time steps.

## References

- One-dimensional kinematics, any introductory mechanics text (e.g. Halliday, Resnick & Walker, Ch. 2).
- Based on the PhET *Moving Man* simulation.
</content>
