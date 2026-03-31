export type DealStageTone = {
  boardSurfaceClassName: string;
  chipClassName: string;
  columnClassName: string;
  dragOverClassName: string;
};

const defaultTone: DealStageTone = {
  boardSurfaceClassName:
    "bg-slate-50/85 border-slate-200/80 dark:bg-slate-950/30 dark:border-slate-800/90",
  chipClassName:
    "bg-slate-200/80 text-slate-700 dark:bg-slate-900 dark:text-slate-200",
  columnClassName:
    "bg-slate-50/75 border-slate-200/80 dark:bg-slate-950/25 dark:border-slate-800/90",
  dragOverClassName:
    "bg-slate-100/95 border-slate-300/90 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.24)] dark:bg-slate-900/60 dark:border-slate-700",
};

const stageTones: Record<string, DealStageTone> = {
  "new-inquiry": {
    boardSurfaceClassName:
      "bg-stone-50/90 border-stone-200/80 dark:bg-stone-950/35 dark:border-stone-800/90",
    chipClassName:
      "bg-stone-200/80 text-stone-700 dark:bg-stone-900 dark:text-stone-200",
    columnClassName:
      "bg-stone-50/80 border-stone-200/80 dark:bg-stone-950/25 dark:border-stone-800/90",
    dragOverClassName:
      "bg-stone-100/95 border-stone-300/90 shadow-[inset_0_0_0_1px_rgba(168,162,158,0.28)] dark:bg-stone-900/60 dark:border-stone-700",
  },
  qualified: {
    boardSurfaceClassName:
      "bg-sky-50/90 border-sky-200/80 dark:bg-sky-950/35 dark:border-sky-800/90",
    chipClassName:
      "bg-sky-200/80 text-sky-700 dark:bg-sky-900 dark:text-sky-200",
    columnClassName:
      "bg-sky-50/80 border-sky-200/80 dark:bg-sky-950/25 dark:border-sky-800/90",
    dragOverClassName:
      "bg-sky-100/95 border-sky-300/90 shadow-[inset_0_0_0_1px_rgba(56,189,248,0.22)] dark:bg-sky-900/60 dark:border-sky-700",
  },
  "discovery-booked": {
    boardSurfaceClassName:
      "bg-cyan-50/90 border-cyan-200/80 dark:bg-cyan-950/35 dark:border-cyan-800/90",
    chipClassName:
      "bg-cyan-200/80 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-200",
    columnClassName:
      "bg-cyan-50/80 border-cyan-200/80 dark:bg-cyan-950/25 dark:border-cyan-800/90",
    dragOverClassName:
      "bg-cyan-100/95 border-cyan-300/90 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.22)] dark:bg-cyan-900/60 dark:border-cyan-700",
  },
  "brief-received": {
    boardSurfaceClassName:
      "bg-indigo-50/90 border-indigo-200/80 dark:bg-indigo-950/35 dark:border-indigo-800/90",
    chipClassName:
      "bg-indigo-200/80 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200",
    columnClassName:
      "bg-indigo-50/80 border-indigo-200/80 dark:bg-indigo-950/25 dark:border-indigo-800/90",
    dragOverClassName:
      "bg-indigo-100/95 border-indigo-300/90 shadow-[inset_0_0_0_1px_rgba(129,140,248,0.22)] dark:bg-indigo-900/60 dark:border-indigo-700",
  },
  "itinerary-in-design": {
    boardSurfaceClassName:
      "bg-violet-50/90 border-violet-200/80 dark:bg-violet-950/35 dark:border-violet-800/90",
    chipClassName:
      "bg-violet-200/80 text-violet-700 dark:bg-violet-900 dark:text-violet-200",
    columnClassName:
      "bg-violet-50/80 border-violet-200/80 dark:bg-violet-950/25 dark:border-violet-800/90",
    dragOverClassName:
      "bg-violet-100/95 border-violet-300/90 shadow-[inset_0_0_0_1px_rgba(167,139,250,0.22)] dark:bg-violet-900/60 dark:border-violet-700",
  },
  "proposal-sent": {
    boardSurfaceClassName:
      "bg-amber-50/90 border-amber-200/80 dark:bg-amber-950/35 dark:border-amber-800/90",
    chipClassName:
      "bg-amber-200/80 text-amber-700 dark:bg-amber-900 dark:text-amber-200",
    columnClassName:
      "bg-amber-50/80 border-amber-200/80 dark:bg-amber-950/25 dark:border-amber-800/90",
    dragOverClassName:
      "bg-amber-100/95 border-amber-300/90 shadow-[inset_0_0_0_1px_rgba(251,191,36,0.22)] dark:bg-amber-900/60 dark:border-amber-700",
  },
  "revision-follow-up": {
    boardSurfaceClassName:
      "bg-rose-50/90 border-rose-200/80 dark:bg-rose-950/35 dark:border-rose-800/90",
    chipClassName:
      "bg-rose-200/80 text-rose-700 dark:bg-rose-900 dark:text-rose-200",
    columnClassName:
      "bg-rose-50/80 border-rose-200/80 dark:bg-rose-950/25 dark:border-rose-800/90",
    dragOverClassName:
      "bg-rose-100/95 border-rose-300/90 shadow-[inset_0_0_0_1px_rgba(251,113,133,0.2)] dark:bg-rose-900/60 dark:border-rose-700",
  },
  "deposit-confirmed": {
    boardSurfaceClassName:
      "bg-emerald-50/90 border-emerald-200/80 dark:bg-emerald-950/35 dark:border-emerald-800/90",
    chipClassName:
      "bg-emerald-200/80 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200",
    columnClassName:
      "bg-emerald-50/80 border-emerald-200/80 dark:bg-emerald-950/25 dark:border-emerald-800/90",
    dragOverClassName:
      "bg-emerald-100/95 border-emerald-300/90 shadow-[inset_0_0_0_1px_rgba(52,211,153,0.2)] dark:bg-emerald-900/60 dark:border-emerald-700",
  },
  "closed-lost": {
    boardSurfaceClassName:
      "bg-zinc-50/90 border-zinc-200/80 dark:bg-zinc-950/35 dark:border-zinc-800/90",
    chipClassName:
      "bg-zinc-200/80 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200",
    columnClassName:
      "bg-zinc-50/80 border-zinc-200/80 dark:bg-zinc-950/25 dark:border-zinc-800/90",
    dragOverClassName:
      "bg-zinc-100/95 border-zinc-300/90 shadow-[inset_0_0_0_1px_rgba(161,161,170,0.2)] dark:bg-zinc-900/60 dark:border-zinc-700",
  },
};

export function getDealStageTone(stage: string): DealStageTone {
  return stageTones[stage] ?? defaultTone;
}
