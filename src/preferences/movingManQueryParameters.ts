/**
 * movingManQueryParameters.ts
 *
 * Sim-specific startup query parameters for Moving Man. All entries are public
 * and provide the initial values for the sim-specific preferences in
 * MovingManPreferencesModel.
 *
 * Usage: append e.g. `?showVelocityVector=true&wallsEnabled=false` to the URL.
 */

import { logGlobal } from "scenerystack/phet-core";
import { QueryStringMachine } from "scenerystack/query-string-machine";
import MovingManNamespace from "../MovingManNamespace.js";

const movingManQueryParameters = QueryStringMachine.getAll({
  /** Whether the bounding walls are enabled by default. */
  wallsEnabled: {
    type: "boolean",
    defaultValue: true,
    public: true,
  },

  /** Whether the velocity vector is shown by default. */
  showVelocityVector: {
    type: "boolean",
    defaultValue: false,
    public: true,
  },

  /** Whether the acceleration vector is shown by default. */
  showAccelerationVector: {
    type: "boolean",
    defaultValue: false,
    public: true,
  },
});

MovingManNamespace.register("movingManQueryParameters", movingManQueryParameters);

// Log query parameters (for the console / PhET-iO).
logGlobal("phet.chipper.queryParameters");

export default movingManQueryParameters;
