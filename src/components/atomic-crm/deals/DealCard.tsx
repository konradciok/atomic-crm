import { Draggable } from "@hello-pangea/dnd";
import { useRedirect, RecordContextProvider } from "ra-core";
import { ReferenceField } from "@/components/admin/reference-field";
import { cn } from "@/lib/utils";

import { CompanyAvatar } from "../companies/CompanyAvatar";
import { useConfigurationContext } from "../root/ConfigurationContext";
import type { Deal } from "../types";

export const DealCard = ({ deal, index }: { deal: Deal; index: number }) => {
  if (!deal) return null;

  return (
    <Draggable draggableId={String(deal.id)} index={index}>
      {(provided, snapshot) => (
        <DealCardContent provided={provided} snapshot={snapshot} deal={deal} />
      )}
    </Draggable>
  );
};

export const DealCardContent = ({
  provided,
  snapshot,
  deal,
}: {
  provided?: any;
  snapshot?: any;
  deal: Deal;
}) => {
  const { dealCategories } = useConfigurationContext();
  const redirect = useRedirect();
  const categoryLabel = deal.category
    ? dealCategories.find((category) => category.value === deal.category)?.label
    : null;
  const handleClick = () => {
    redirect(`/deals/${deal.id}/show`, undefined, undefined, undefined, {
      _scrollToTop: false,
    });
  };

  return (
    <div
      className="cursor-pointer"
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      ref={provided?.innerRef}
      onClick={handleClick}
    >
      <RecordContextProvider value={deal}>
        <article
          className={cn(
            "rounded-[1.05rem] border border-white/80 bg-background/96 p-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-all duration-200 dark:border-white/5 dark:bg-background/95",
            snapshot?.isDragging
              ? "rotate-[0.8deg] border-border shadow-[0_14px_30px_rgba(15,23,42,0.14)]"
              : "hover:-translate-y-0.5 hover:border-border/80 hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)]",
          )}
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <div className="truncate text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/85">
                  <ReferenceField
                    source="company_id"
                    reference="companies"
                    link={false}
                  />
                </div>
                <p className="mt-1.5 text-[13px] font-semibold leading-5 text-foreground">
                  {deal.name}
                </p>
              </div>
              <div className="shrink-0 pt-0.5 opacity-80">
                <ReferenceField
                  source="company_id"
                  reference="companies"
                  link={false}
                >
                  <CompanyAvatar width={22} height={22} />
                </ReferenceField>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[12px] font-semibold text-foreground">
                {deal.amount.toLocaleString("en-US", {
                  notation: "compact",
                  style: "currency",
                  currency: "USD",
                  currencyDisplay: "narrowSymbol",
                  minimumSignificantDigits: 3,
                })}
              </span>
              {categoryLabel ? (
                <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                  {categoryLabel}
                </span>
              ) : null}
            </div>
          </div>
        </article>
      </RecordContextProvider>
    </div>
  );
};
