type Row = { label: string; before: string; after: string };

export function Diff({ rows, compact = false }: { rows: Row[]; compact?: boolean }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line font-mono text-[13px] leading-6">
      {rows.map((r) => (
        <div key={r.label} className="border-b border-line last:border-b-0">
          {!compact && (
            <div className="bg-surface-2 px-3 py-1 font-sans text-xs text-faint">{r.label}</div>
          )}
          <div className="flex gap-3 bg-del-bg px-3 text-del-fg">
            <span className="select-none">-</span>
            {compact && <span className="flex-1 truncate font-sans text-del-fg/80">{r.label}</span>}
            <span className={compact ? "" : "flex-1"}>{r.before}</span>
          </div>
          <div className="flex gap-3 bg-add-bg px-3 font-semibold text-add-fg">
            <span className="select-none">+</span>
            {compact && <span className="flex-1 truncate font-sans font-normal text-add-fg/80">{r.label}</span>}
            <span className={compact ? "" : "flex-1"}>{r.after}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
