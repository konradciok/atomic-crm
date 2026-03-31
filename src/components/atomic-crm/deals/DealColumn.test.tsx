import React from "react";
import { render } from "vitest-browser-react";

import { DealColumn } from "./DealColumn";
import { getDealStageTone } from "./dealBoardTheme";

vi.mock("@hello-pangea/dnd", () => ({
  Droppable: ({
    children,
    droppableId,
  }: {
    children: (props: {
      innerRef: () => void;
      droppableProps: Record<string, unknown>;
      placeholder: React.ReactNode;
    }, snapshot: { isDraggingOver: boolean }) => React.ReactNode;
    droppableId: string;
  }) => (
    <>
      {children(
        {
          innerRef: () => undefined,
          droppableProps: { "data-droppable-id": droppableId },
          placeholder: <div data-testid="placeholder" />,
        },
        { isDraggingOver: false },
      )}
    </>
  ),
}));

vi.mock("../root/ConfigurationContext", () => ({
  useConfigurationContext: () => ({
    dealStages: [
      { value: "new-inquiry", label: "New Inquiry" },
      { value: "qualified", label: "Qualified" },
    ],
  }),
}));

vi.mock("./DealCard", () => ({
  DealCard: ({ deal }: { deal: { name: string } }) => <div>{deal.name}</div>,
}));

describe("DealColumn", () => {
  it("renders the stage header, count, and amount summary", async () => {
    const screen = await render(
      <DealColumn
        stage="new-inquiry"
        deals={[
          {
            amount: 25000,
            category: "bespoke-itinerary",
            company_id: 1,
            id: 1,
            index: 1,
            name: "Ania inquiry",
            stage: "new-inquiry",
          },
          {
            amount: 7500,
            category: "small-group-journey",
            company_id: 2,
            id: 2,
            index: 2,
            name: "Konrad itinerary",
            stage: "new-inquiry",
          },
        ]}
        tone={getDealStageTone("new-inquiry")}
      />,
    );

    await expect.element(screen.getByText("New Inquiry")).toBeVisible();
    await expect.element(screen.getByText(/^2$/)).toBeVisible();
    await expect.element(screen.getByText("$32.5K")).toBeVisible();
    await expect.element(screen.getByText("Ania inquiry")).toBeVisible();
    await expect.element(screen.getByText("Konrad itinerary")).toBeVisible();
  });

  it("keeps empty stages visually available for dropping", async () => {
    const screen = await render(
      <DealColumn
        stage="qualified"
        deals={[]}
        tone={getDealStageTone("qualified")}
      />,
    );

    await expect.element(screen.getByText("Qualified")).toBeVisible();
    await expect.element(screen.getByText("Drop deals here")).toBeVisible();
  });
});
