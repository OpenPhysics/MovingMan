import { type EmptySelfOptions, optionize } from "scenerystack/phet-core";
import { Screen, type ScreenOptions } from "scenerystack/sim";
import type { Tandem } from "scenerystack/tandem";
import { createChartsIcon } from "../common/MovingManScreenIcons.js";
import type { MovingManPreferencesModel } from "../preferences/MovingManPreferencesModel.js";
import { MovingManModel } from "./model/MovingManModel.js";
import { ChartsScreenView } from "./view/ChartsScreenView.js";
import { MovingManKeyboardHelpContent } from "./view/MovingManKeyboardHelpContent.js";

type ChartsScreenOptions = ScreenOptions & { tandem: Tandem; preferences: MovingManPreferencesModel };

export class ChartsScreen extends Screen<MovingManModel, ChartsScreenView> {
  public constructor(options: ChartsScreenOptions) {
    super(
      () => new MovingManModel({ preferences: options.preferences }),
      (model) => new ChartsScreenView(model, { tandem: options.tandem.createTandem("view") }),
      optionize<ChartsScreenOptions, EmptySelfOptions, ScreenOptions>()(
        {
          homeScreenIcon: createChartsIcon(),
          navigationBarIcon: createChartsIcon(),
          createKeyboardHelpNode: () => new MovingManKeyboardHelpContent(),
        },
        options,
      ),
    );
  }
}
