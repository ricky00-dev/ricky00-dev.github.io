import type { Layer } from "@/content/projects";

export function ArchDiagram({ layers, compact = false }: { layers: Layer[]; compact?: boolean }) {
  return (
    <figure>
      <div className={compact ? "card p-3" : "card p-4 sm:p-6"}>
        {layers.map((layer, i) => (
          <div key={layer.label}>
            {i > 0 && (
              <div className={`pl-8 text-xs text-faint sm:pl-[calc(4.5rem+2rem)] ${compact ? "py-0 leading-4" : "py-1"}`} aria-hidden>
                ↓
              </div>
            )}
            <div className="grid gap-2 sm:grid-cols-[4.5rem_1fr] sm:items-center">
              <div className="text-xs font-medium text-faint">{layer.label}</div>
              <div className="flex flex-wrap gap-2">
                {layer.nodes.map((n) => (
                  <div
                    key={n.name}
                    className={`rounded-md border ${compact ? "px-2 py-1" : "px-3 py-2"} ${
                      n.mine ? "border-accent/50 bg-accent-soft" : "border-dashed border-line bg-surface-2/60"
                    }`}
                  >
                    <div className={`text-sm font-semibold ${n.mine ? "text-add-fg" : "text-muted"}`}>{n.name}</div>
                    {n.note && <div className="mt-0.5 text-xs text-faint">{n.note}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-faint">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm border border-accent/50 bg-accent-soft" />
          직접 구현하거나 연동한 부분
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm border border-dashed border-line bg-surface-2" />
          팀원 담당
        </span>
      </figcaption>
    </figure>
  );
}
