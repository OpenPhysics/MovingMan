/**
 * IntroScreenView.ts
 *
 * The "Introduction" screen. A play area with the man, walls, and ruler on top; a vertical
 * stack of three quantity controls (Position, Velocity, Acceleration) below, each with its
 * vector checkbox to the right; a small Walls checkbox; play/pause + Reset All controls
 * bottom-right.
 *
 * No recording / playback chrome — that's reserved for the Charts screen, matching the
 * original sim's simplification of the Intro tab (see Deviations.md in the source).
 */

import { AlignGroup, Node, VBox } from "scenerystack/scenery";
import { PlayPauseButton, ResetAllButton } from "scenerystack/scenery-phet";
import { ScreenView, type ScreenViewOptions } from "scenerystack/sim";
import type { Tandem } from "scenerystack/tandem";
import MovingManConstants from "../model/MovingManConstants.js";
import type { MovingManModel } from "../model/MovingManModel.js";
import { FunctionComboBox } from "./FunctionComboBox.js";
import { addCollisionSounds } from "./MovingManSounds.js";
import { PlayAreaNode } from "./PlayAreaNode.js";
import { VariableControl } from "./VariableControl.js";
import { WallsCheckbox } from "./WallsCheckbox.js";

const MARGIN = 14;
const PLAY_AREA_WIDTH = 980;
// Shorter than the original (less sky/ground) so the three quantity controls can stack
// vertically below it; the man is scaled down to match so his arrows still clear the top.
const PLAY_AREA_HEIGHT = 300;
const MAN_HEIGHT = 120;
const CONTROL_SLIDER_WIDTH = 240;
const PLAY_PAUSE_RADIUS = 28;

export type IntroScreenViewOptions = ScreenViewOptions & { tandem: Tandem };

export class IntroScreenView extends ScreenView {
  public constructor(model: MovingManModel, providedOptions: IntroScreenViewOptions) {
    super(providedOptions);

    const layoutBounds = this.layoutBounds;

    addCollisionSounds(model.movingMan.collideEmitter);

    const playArea = new PlayAreaNode(model, {
      width: PLAY_AREA_WIDTH,
      height: PLAY_AREA_HEIGHT,
      manHeight: MAN_HEIGHT,
    });

    // Pads each control panel to a shared width (left-aligned) so the stacked sliders line up
    // and the vector checkboxes share a right-hand column.
    const controlsAlignGroup = new AlignGroup({ matchVertical: false });
    const makeControl = (
      kind: "position" | "velocity" | "acceleration",
      range: typeof MovingManConstants.POSITION_RANGE,
    ) =>
      new VariableControl(model, {
        kind,
        range,
        sliderWidth: CONTROL_SLIDER_WIDTH,
        vectorCheckboxPlacement: "right",
        contentAlignGroup: controlsAlignGroup,
      });

    const positionControl = makeControl("position", MovingManConstants.POSITION_RANGE);
    const velocityControl = makeControl("velocity", MovingManConstants.VELOCITY_RANGE);
    const accelerationControl = makeControl("acceleration", MovingManConstants.ACCELERATION_RANGE);

    const controlsColumn = new VBox({
      spacing: 10,
      align: "center",
      children: [positionControl, velocityControl, accelerationControl],
    });

    const wallsCheckbox = new WallsCheckbox(model);

    // The combo box's dropdown list renders into this parent so it sits above siblings;
    // it opens upward because the chooser now sits at the bottom of the screen.
    const comboListParent = new Node();
    const functionComboBox = new FunctionComboBox(model, comboListParent, "above");

    const playPauseButton = new PlayPauseButton(model.isPlayingProperty, { radius: PLAY_PAUSE_RADIUS });

    const resetAllButton = new ResetAllButton({
      listener: () => {
        this.interruptSubtreeInput();
        model.reset();
      },
      tandem: providedOptions.tandem.createTandem("resetAllButton"),
    });

    // ── Layout ───────────────────────────────────────────────────────────────
    playArea.centerX = layoutBounds.centerX;
    playArea.top = layoutBounds.minY + MARGIN;

    // Walls toggle tucked into the top-right corner of the sky, like the original sim.
    wallsCheckbox.right = playArea.right - 10;
    wallsCheckbox.top = playArea.top + 10;

    controlsColumn.centerX = layoutBounds.centerX;
    controlsColumn.top = playArea.bottom + 16;

    // Preset position-function chooser, bottom-left.
    functionComboBox.left = layoutBounds.minX + MARGIN;
    functionComboBox.bottom = layoutBounds.maxY - MARGIN;

    resetAllButton.right = layoutBounds.maxX - MARGIN;
    resetAllButton.bottom = layoutBounds.maxY - MARGIN;

    playPauseButton.right = resetAllButton.left - 3 * MARGIN;
    playPauseButton.centerY = resetAllButton.centerY;

    this.children = [
      playArea,
      wallsCheckbox,
      controlsColumn,
      functionComboBox,
      playPauseButton,
      resetAllButton,
      comboListParent,
    ];
  }
}
