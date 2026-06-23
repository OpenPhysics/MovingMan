import { type EmptySelfOptions, optionize } from "scenerystack/phet-core";
import { Screen, type ScreenOptions } from "scenerystack/sim";
import type { Tandem } from "scenerystack/tandem";
import type { MovingManPreferencesModel } from "../preferences/MovingManPreferencesModel.js";
import { MovingManModel } from "./model/MovingManModel.js";
import { ChartsScreenIcon } from "./view/ChartsScreenIcon.js";
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
          homeScreenIcon: new ChartsScreenIcon({ size: Screen.MINIMUM_HOME_SCREEN_ICON_SIZE }),
          navigationBarIcon: new ChartsScreenIcon({ size: Screen.MINIMUM_NAVBAR_ICON_SIZE }),
          createKeyboardHelpNode: () => new MovingManKeyboardHelpContent(),
        },
        options,
      ),
    );
  }
}
