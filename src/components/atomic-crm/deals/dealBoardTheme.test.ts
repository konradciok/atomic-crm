import { describe, expect, it } from "vitest";

import { getDealStageTone } from "./dealBoardTheme";

describe("getDealStageTone", () => {
  it("returns a stage-specific tone for configured stages", () => {
    const tone = getDealStageTone("proposal-sent");

    expect(tone.boardSurfaceClassName).toContain("amber");
    expect(tone.columnClassName).toContain("amber");
  });

  it("falls back to the neutral tone for unknown stages", () => {
    const tone = getDealStageTone("unexpected-stage");

    expect(tone.boardSurfaceClassName).toContain("slate");
    expect(tone.dragOverClassName).toContain("slate");
  });
});
