import type { ReactNode } from "react";
import type { InputProps } from "ra-core";
import { useGetIdentity, useListContext, useTranslate } from "ra-core";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { matchPath, useLocation } from "react-router-dom";
import { AutocompleteInput } from "@/components/admin/autocomplete-input";
import { ExportButton } from "@/components/admin/export-button";
import { List } from "@/components/admin/list";
import { ReferenceInput } from "@/components/admin/reference-input";
import { FilterButton } from "@/components/admin/filter-form";
import { SearchInput } from "@/components/admin/search-input";
import { SelectInput } from "@/components/admin/select-input";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

import { useConfigurationContext } from "../root/ConfigurationContext";
import { TopToolbar } from "../layout/TopToolbar";
import { DealArchivedList } from "./DealArchivedList";
import { DealCreate } from "./DealCreate";
import { DealEdit } from "./DealEdit";
import { DealEmpty } from "./DealEmpty";
import { DealListContent } from "./DealListContent";
import { DealShow } from "./DealShow";
import { OnlyMineInput } from "./OnlyMineInput";

const DealList = () => {
  const { identity } = useGetIdentity();
  const { dealCategories } = useConfigurationContext();
  const translate = useTranslate();

  if (!identity) return null;

  const dealFilters = [
    <SearchInput
      source="q"
      alwaysOn
      className="min-w-56 [&_[data-slot=input]]:h-10 [&_[data-slot=input]]:rounded-full [&_[data-slot=input]]:border-border/70 [&_[data-slot=input]]:bg-background/85 [&_[data-slot=input]]:pl-3 [&_[data-slot=input]]:shadow-sm"
    />,
    <ReferenceInput source="company_id" reference="companies">
      <AutocompleteInput
        label={false}
        placeholder={translate("resources.deals.fields.company_id")}
        className="min-w-52 [&_[data-slot=button]]:h-10 [&_[data-slot=button]]:rounded-full [&_[data-slot=button]]:border-border/70 [&_[data-slot=button]]:bg-background/85 [&_[data-slot=button]]:px-3 [&_[data-slot=button]]:shadow-sm"
      />
    </ReferenceInput>,
    <WrapperField source="category" label="resources.deals.fields.category">
      <SelectInput
        source="category"
        label={false}
        emptyText="resources.deals.fields.category"
        choices={dealCategories}
        optionText="label"
        optionValue="value"
        className="min-w-44 [&_[data-slot=select-trigger]]:h-10 [&_[data-slot=select-trigger]]:rounded-full [&_[data-slot=select-trigger]]:border-border/70 [&_[data-slot=select-trigger]]:bg-background/85 [&_[data-slot=select-trigger]]:px-3 [&_[data-slot=select-trigger]]:shadow-sm"
      />
    </WrapperField>,
    <OnlyMineInput source="sales_id" alwaysOn className="min-w-fit" />,
  ];

  return (
    <List
      perPage={100}
      filter={{ "archived_at@is": null }}
      title={false}
      sort={{ field: "index", order: "DESC" }}
      filters={dealFilters}
      actions={<DealActions />}
      pagination={null}
      className="mt-4"
    >
      <DealLayout />
    </List>
  );
};

const DealLayout = () => {
  const location = useLocation();
  const matchCreate = matchPath("/deals/create", location.pathname);
  const matchShow = matchPath("/deals/:id/show", location.pathname);
  const matchEdit = matchPath("/deals/:id", location.pathname);

  const { data, isPending, filterValues } = useListContext();
  const hasFilters = filterValues && Object.keys(filterValues).length > 0;

  if (isPending) return null;
  if (!data?.length && !hasFilters)
    return (
      <>
        <DealEmpty>
          <DealShow open={!!matchShow} id={matchShow?.params.id} />
          <DealArchivedList />
        </DealEmpty>
      </>
    );

  return (
    <div className="w-full">
      <DealListContent />
      <DealArchivedList />
      <DealCreate open={!!matchCreate} />
      <DealEdit open={!!matchEdit && !matchCreate} id={matchEdit?.params.id} />
      <DealShow open={!!matchShow} id={matchShow?.params.id} />
    </div>
  );
};

const DealActions = () => (
    <TopToolbar className="rounded-full border border-border/70 bg-background/85 px-2 py-2 shadow-sm backdrop-blur-sm">
      <FilterButton
        variant="ghost"
        className="rounded-full text-sm font-medium text-muted-foreground hover:text-foreground"
        size="sm"
      />
    <ExportButton className="rounded-full border-0 bg-transparent text-sm font-medium text-muted-foreground shadow-none hover:bg-muted hover:text-foreground" />
    <Link
      className={cn(
        buttonVariants({ variant: "default" }),
        "rounded-full bg-foreground px-4 text-sm text-background shadow-sm hover:bg-foreground/90",
      )}
      to="/deals/create"
    >
      <Plus className="h-4 w-4" />
      New Deal
    </Link>
  </TopToolbar>
);

/**
 *
 * Used so that label of filters can be inferred for the select display,
 * but not be displayed when showing the input.
 */
const WrapperField = ({ children }: InputProps & { children: ReactNode }) =>
  children;

export default DealList;
