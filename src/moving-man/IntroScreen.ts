import { type EmptySelfOptions, optionize } from "scenerystack/phet-core";
import { Screen, type ScreenOptions } from "scenerystack/sim";
import type { Tandem } from "scenerystack/tandem";
import { createIntroIcon } from "../common/MovingManScreenIcons.js";
import type { MovingManPreferencesModel } from "../preferences/MovingManPreferencesModel.js";
import { MovingManModel } from "./model/MovingManModel.js";
import { IntroScreenView } from "./view/IntroScreenView.js";
import { MovingManKeyboardHelpContent } from "./view/MovingManKeyboardHelpContent.js";

type IntroScreenOptions = ScreenOptions & { tandem: Tandem; preferences: MovingManPreferencesModel };

export class IntroScreen extends Screen<MovingManModel, IntroScreenView> {
  public constructor(options: IntroScreenOptions) {
    super(
      () => new MovingManModel({ noRecording: true, preferences: options.preferences }),
      (model) => new IntroScreenView(model, { tandem: options.tandem.createTandem("view") }),
      optionize<IntroScreenOptions, EmptySelfOptions, ScreenOptions>()(
        {
          homeScreenIcon: createIntroIcon(),
          navigationBarIcon: createIntroIcon(),
          createKeyboardHelpNode: () => new MovingManKeyboardHelpContent(),
        },
        options,
      ),
    );
  }
}
