import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useTranslate } from "ra-core";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ActivityLogNoteProps = {
  header: ReactNode;
  text: string;
  link: string | false;
};

type ActivityLogBlock =
  | {
      type: "field";
      label: string;
      value: string;
    }
  | {
      type: "paragraph";
      value: string;
    };

const structuredLabels = [
  "Additional requests",
  "Transport preference",
  "Hotel standard",
  "Submission type",
  "Travel window",
  "Travel dates",
  "Budget range",
  "Group size",
  "Activities",
  "Tracking",
  "Planning stage",
  "Payload",
  "Source",
  "Guests",
  "Rooms",
  "Days",
];

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function formatActivityLogNoteText(text: string): ActivityLogBlock[] {
  const plainText = text.replace(/\s+/g, " ").trim();

  if (!plainText) {
    return [];
  }

  const labelPattern = new RegExp(
    `(^|\\s)(${structuredLabels.map(escapeRegex).join("|")}):`,
    "g",
  );

  const matches = Array.from(plainText.matchAll(labelPattern)).map((match) => ({
    index: (match.index ?? 0) + match[1].length,
    label: match[2],
  }));

  if (matches.length === 0) {
    return [{ type: "paragraph", value: plainText }];
  }

  const blocks: ActivityLogBlock[] = [];
  const leadingText = plainText.slice(0, matches[0].index).trim();

  if (leadingText) {
    blocks.push({ type: "paragraph", value: leadingText });
  }

  matches.forEach((match, index) => {
    const start = match.index + match.label.length + 1;
    const end = matches[index + 1]?.index ?? plainText.length;
    const value = plainText.slice(start, end).trim();

    if (!value) {
      return;
    }

    blocks.push({
      type: "field",
      label: match.label,
      value,
    });
  });

  return blocks.length > 0 ? blocks : [{ type: "paragraph", value: plainText }];
}

export function ActivityLogNote({ header, text, link }: ActivityLogNoteProps) {
  const translate = useTranslate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const blocks = useMemo(() => formatActivityLogNoteText(text), [text]);
  const shouldCollapseByDefault = useMemo(
    () =>
      text.replace(/\s+/g, " ").trim().length > 280 ||
      blocks.length > 4 ||
      blocks.some((block) => block.type === "field" && block.value.length > 160),
    [blocks, text],
  );

  useEffect(() => {
    const element = contentRef.current;

    if (!element) {
      return;
    }

    setIsTruncated(
      shouldCollapseByDefault || element.scrollHeight > element.clientHeight + 1,
    );
  }, [blocks, isExpanded, shouldCollapseByDefault]);

  if (blocks.length === 0) {
    return null;
  }

  const textElement = (
    <div
      ref={contentRef}
      className={cn(
        "overflow-hidden transition-[max-height] duration-300 ease-in-out",
        isExpanded ? "max-h-[48rem]" : "max-h-32",
      )}
    >
      <div className="space-y-3 rounded-lg bg-muted/30 px-4 py-3">
        {blocks.map((block, index) =>
          block.type === "field" ? (
            <div
              key={`${block.label}-${index}`}
              className="grid gap-1 md:grid-cols-[minmax(0,10rem)_1fr] md:gap-3"
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {block.label}
              </div>
              <div className="text-sm leading-6 text-foreground break-words">
                {block.value}
              </div>
            </div>
          ) : (
            <p
              key={`${block.value.slice(0, 24)}-${index}`}
              className="text-sm leading-6 text-foreground break-words"
            >
              {block.value}
            </p>
          ),
        )}
      </div>
    </div>
  );

  return (
    <div className="p-0">
      <div className="flex w-full flex-col space-y-3">
        <div className="flex w-full flex-row items-start space-x-1">
          {header}
        </div>
        <div className="md:max-w-150">
          {link !== false ? (
            <Link to={link} className="block rounded-lg transition-colors hover:bg-muted/40">
              {textElement}
            </Link>
          ) : (
            textElement
          )}
          {isTruncated ? (
            <Button
              type="button"
              variant="link"
              size="sm"
              className="mt-2 h-auto px-0 text-sm"
              onClick={() => setIsExpanded((expanded) => !expanded)}
            >
              {isExpanded
                ? translate("crm.common.show_less", { _: "Show less" })
                : translate("crm.common.read_more", { _: "Read more" })}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
