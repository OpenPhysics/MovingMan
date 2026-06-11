/**
 * StringManager.ts
 *
 * Centralizes string management for Moving Man.
 * Provides access to localized strings for all components.
 */

import type { ReadOnlyProperty } from "scenerystack/axon";
import { LocalizedString } from "scenerystack/chipper";
import stringsEn from "./strings_en.json";
import stringsEs from "./strings_es.json";
import stringsFr from "./strings_fr.json";

// ── Compile-time key-parity check ─────────────────────────────────────────────
// satisfies errors immediately if either locale file is missing keys from the other.
// biome-ignore lint/complexity/noVoid: intentional compile-time type assertion
void (stringsEn satisfies typeof stringsFr);
// biome-ignore lint/complexity/noVoid: intentional compile-time type assertion
void (stringsFr satisfies typeof stringsEn);

// ── Build the reactive string property tree ───────────────────────────────────
const stringProperties = LocalizedString.getNestedStringProperties({
  en: stringsEn,
  fr: stringsFr,
  es: stringsEs,
});

export class StringManager {
  private static instance: StringManager | null = null;

  private constructor() {
    // Private — obtain via getInstance()
  }

  public static getInstance(): StringManager {
    if (StringManager.instance === null) {
      StringManager.instance = new StringManager();
    }
    return StringManager.instance;
  }

  public getTitleStringProperty(): ReadOnlyProperty<string> {
    return stringProperties.titleStringProperty;
  }

  public getScreenNames(): {
    introStringProperty: ReadOnlyProperty<string>;
    chartsStringProperty: ReadOnlyProperty<string>;
  } {
    return {
      introStringProperty: stringProperties.screens.introStringProperty,
      chartsStringProperty: stringProperties.screens.chartsStringProperty,
    };
  }

  public getQuantityStrings() {
    return stringProperties.quantities;
  }

  public getUnitStrings() {
    return stringProperties.units;
  }

  public getVectorStrings() {
    return stringProperties.vectors;
  }

  public getControlStrings() {
    return stringProperties.controls;
  }

  public getPlaybackStrings() {
    return stringProperties.playback;
  }

  public getClockStrings() {
    return stringProperties.clock;
  }

  public getChartStrings() {
    return stringProperties.chart;
  }
}
