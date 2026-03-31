import { cn } from "@/lib/utils";
import { Droppable } from "@hello-pangea/dnd";

import { useConfigurationContext } from "../root/ConfigurationContext";
import type { Deal } from "../types";
import { findDealLabel } from "./dealUtils";
import type { DealStageTone } from "./dealBoardTheme";
import { DealCard } from "./DealCard";

export const DealColumn = ({
  stage,
  deals,
  tone,
}: {
  stage: string;
  deals: Deal[];
  tone: DealStageTone;
}) => {
  const totalAmount = deals.reduce((sum, deal) => sum + deal.amount, 0);
  const { dealStages } = useConfigurationContext();
  return (
    <div className="w-[19.5rem] shrink-0 pb-8 xl:w-[20.5rem]">
      <div
        className={cn(
          "rounded-[1.6rem] border p-3 shadow-[0_1px_0_rgba(255,255,255,0.5)_inset]",
          tone.boardSurfaceClassName,
        )}
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold tracking-tight text-foreground">
              {findDealLabel(dealStages, stage)}
            </h3>
            <p className="mt-1 text-xs font-medium text-muted-foreground">
              {totalAmount.toLocaleString("en-US", {
                notation: "compact",
                style: "currency",
                currency: "USD",
                currencyDisplay: "narrowSymbol",
                minimumSignificantDigits: 3,
              })}
            </p>
          </div>
          <div
            className={cn(
              "inline-flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-xs font-semibold",
              tone.chipClassName,
            )}
          >
            {deals.length}
          </div>
        </div>
        <div className="mb-2 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/85">
          Active deals
        </div>
        <Droppable droppableId={stage}>
          {(droppableProvided, snapshot) => (
            <div
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
              className={cn(
                "flex min-h-[12rem] flex-col gap-2.5 rounded-[1.25rem] border border-dashed p-3 transition-all",
                tone.columnClassName,
                snapshot.isDraggingOver && tone.dragOverClassName,
              )}
            >
              {deals.map((deal, index) => (
                <DealCard key={deal.id} deal={deal} index={index} />
              ))}
              {deals.length === 0 ? (
                <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-transparent px-4 py-8 text-center text-xs text-muted-foreground">
                  Drop deals here
                </div>
              ) : null}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};
