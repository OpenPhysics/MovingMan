/**
 * Fleet-standard memory-leak regression suite.
 * Creates a MovingManModel (noRecording), resets it, drops the reference, and asserts GC.
 */

import { describe, expect, it } from "vitest";
import MovingManConstants from "../src/MovingManConstants.js";
import { MovingManModel } from "../src/moving-man/model/MovingManModel.js";

const { FIXED_DT } = MovingManConstants;

async function forceGC(earlyExitRef?: WeakRef<object>): Promise<void> {
  for (let i = 0; i < 15; i++) {
    globalThis.gc?.();
    await new Promise<void>((r) => setTimeout(r, 50));
    if (earlyExitRef !== undefined && earlyExitRef.deref() === undefined) {
      return;
    }
    if (earlyExitRef !== undefined) {
      await new Promise<void>((r) => setTimeout(r, 0));
    }
  }
}

function createAndDropModel(): WeakRef<object> {
  const model = new MovingManModel({ noRecording: true });
  model.movingMan.setAccelerationDriven();
  model.movingMan.accelerationProperty.value = 1;
  model.play();
  model.step(FIXED_DT);
  model.reset();
  return new WeakRef<object>(model);
}

describe("Memory leak regression", () => {
  it("global.gc is available (--expose-gc)", () => {
    expect(globalThis.gc).toBeDefined();
  });

  it("sanity: plain object is collected", async () => {
    const ref = (() => new WeakRef({ hello: "world" }))();
    await forceGC(ref);
    expect(ref.deref()).toBeUndefined();
  });

  it("MovingManModel is collected after drop", async () => {
    const ref = createAndDropModel();
    await forceGC(ref);
    expect(ref.deref()).toBeUndefined();
  });

  it("repeated create/drop cycles leave no survivors", async () => {
    const refs: WeakRef<object>[] = [];
    for (let i = 0; i < 10; i++) {
      refs.push(createAndDropModel());
    }
    await forceGC();
    expect(refs.filter((r) => r.deref() !== undefined).length).toBe(0);
  });
});
