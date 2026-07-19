/**
 * MovingManPanel.ts
 *
 * A pre-themed Panel that automatically uses MovingManColors for background and
 * border. Use this for all control panels and info boxes in the sim so that
 * default / projector mode switching is handled automatically.
 *
 * ── Basic usage ───────────────────────────────────────────────────────────────
 *
 *   import { MovingManPanel } from "../../common/MovingManPanel.js";
 *   import { VBox, Text } from "scenerystack/scenery";
 *
 *   const content = new VBox({
 *     children: [ new Text("label"), slider ],
 *     spacing: 8,
 *   });
 *   const panel = new MovingManPanel(content);
 *
 * ── Overriding defaults ───────────────────────────────────────────────────────
 *
 *   // Wider margins, sharper corners, custom stroke
 *   const panel = new MovingManPanel(content, { xMargin: 20, cornerRadius: 0 });
 *
 *   // Transparent background (decorative border only)
 *   const panel = new MovingManPanel(content, { fill: "transparent" });
 */

import type { Node } from "scenerystack/scenery";
import type { PanelOptions } from "scenerystack/sun";
import { Panel } from "scenerystack/sun";
import MovingManColors from "../MovingManColors.js";
import { PANEL_CORNER_RADIUS } from "../MovingManConstants.js";

export class MovingManPanel extends Panel {
  public constructor(content: Node, providedOptions?: PanelOptions) {
    super(content, {
      fill: MovingManColors.panelBackgroundColorProperty,
      stroke: MovingManColors.panelBorderColorProperty,
      cornerRadius: PANEL_CORNER_RADIUS,
      xMargin: 12,
      yMargin: 10,
      ...providedOptions,
    });
  }
}
