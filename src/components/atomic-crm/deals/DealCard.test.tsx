import React from "react";
import { render } from "vitest-browser-react";

import { DealCardContent } from "./DealCard";

const redirect = vi.fn();

vi.mock("ra-core", () => ({
  RecordContextProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useRedirect: () => redirect,
}));

vi.mock("@/components/admin/reference-field", () => ({
  ReferenceField: ({
    children,
  }: {
    children?: React.ReactNode;
    source: string;
    reference: string;
    link?: boolean;
  }) => (children ? <>{children}</> : <span>Breinton Ltd</span>),
}));

vi.mock("../companies/CompanyAvatar", () => ({
  CompanyAvatar: () => <span>Avatar</span>,
}));

vi.mock("../root/ConfigurationContext", () => ({
  useConfigurationContext: () => ({
    dealCategories: [
      { value: "small-group-journey", label: "Small Group Journey" },
      { value: "bespoke-itinerary", label: "Bespoke Itinerary" },
    ],
  }),
}));

describe("DealCardContent", () => {
  it("renders the current deal fields in the refreshed card layout", async () => {
    const screen = await render(
      <DealCardContent
        deal={{
          amount: 12500,
          category: "small-group-journey",
          company_id: 1,
          id: 7,
          index: 1,
          name: "Quiz inquiry",
          stage: "new-inquiry",
        }}
      />,
    );

    await expect.element(screen.getByText("Breinton Ltd")).toBeVisible();
    await expect.element(screen.getByText("Quiz inquiry")).toBeVisible();
    await expect.element(screen.getByText("$12.5K")).toBeVisible();
    await expect
      .element(screen.getByText("Small Group Journey"))
      .toBeVisible();
  });

  it("keeps cards clickable to open the deal drawer", async () => {
    const screen = await render(
      <DealCardContent
        deal={{
          amount: 0,
          category: "bespoke-itinerary",
          company_id: 2,
          id: 42,
          index: 1,
          name: "Ania inquiry",
          stage: "brief-received",
        }}
      />,
    );

    await screen.getByText("Ania inquiry").click();

    expect(redirect).toHaveBeenCalledWith(
      "/deals/42/show",
      undefined,
      undefined,
      undefined,
      { _scrollToTop: false },
    );
  });
});
