import { render } from "vitest-browser-react";

import { ActivityLogNote } from "./ActivityLogNote";

describe("ActivityLogNote", () => {
  it("renders lead-style note content as separate labeled fields", async () => {
    const screen = await render(
      <ActivityLogNote
        header={<div>Header</div>}
        link={false}
        text="Source: tour_planner_leads#7 Travel window: 2026-03-31 -> 2026-04-15 Transport preference: Train Hotel standard: Luxury/Castle Activities: City Tours, Whisky Tasting Additional requests: I love zombies and death"
      />,
    );

    await expect.element(screen.getByText("Source")).toBeVisible();
    await expect
      .element(screen.getByText("tour_planner_leads#7"))
      .toBeVisible();
    await expect.element(screen.getByText("Travel window")).toBeVisible();
    await expect
      .element(screen.getByText("2026-03-31 -> 2026-04-15"))
      .toBeVisible();
    await expect
      .element(screen.getByText("Transport preference"))
      .toBeVisible();
    await expect.element(screen.getByText("Train")).toBeVisible();
  });

  it("collapses very long note content behind a read more toggle", async () => {
    const screen = await render(
      <ActivityLogNote
        header={<div>Header</div>}
        link={false}
        text={`Source: contact_submissions#6 Payload: ${"Long details ".repeat(80)}`}
      />,
    );

    await expect
      .element(screen.getByRole("button", { name: "Read more" }))
      .toBeVisible();

    await screen.getByRole("button", { name: "Read more" }).click();

    await expect
      .element(screen.getByRole("button", { name: "Show less" }))
      .toBeVisible();
  });
});
