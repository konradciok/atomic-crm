import { useGetIdentity, useListFilterContext, useTranslate } from "ra-core";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export const OnlyMineInput = ({
  className,
}: {
  alwaysOn: boolean;
  source: string;
  className?: string;
}) => {
  const translate = useTranslate();
  const { filterValues, displayedFilters, setFilters } = useListFilterContext();
  const { identity } = useGetIdentity();

  const handleChange = () => {
    const newFilterValues = { ...filterValues };
    if (typeof filterValues.sales_id !== "undefined") {
      delete newFilterValues.sales_id;
    } else {
      newFilterValues.sales_id = identity && identity?.id;
    }
    setFilters(newFilterValues, displayedFilters);
  };
  return (
    <div className={cn("mt-auto", className)}>
      <div className="flex items-center gap-2 rounded-full border border-border/70 bg-background/85 px-3 py-2 shadow-sm backdrop-blur-sm">
        <Switch
          id="only-mine"
          checked={typeof filterValues.sales_id !== "undefined"}
          onCheckedChange={handleChange}
        />
        <Label htmlFor="only-mine" className="text-sm font-medium">
          {translate("resources.companies.filters.only_mine", {
            _: "Only companies I manage",
          })}
        </Label>
      </div>
    </div>
  );
};
