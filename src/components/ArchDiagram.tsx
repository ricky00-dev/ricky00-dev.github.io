import type { Layer } from "@/content/projects";

export function ArchDiagram({ layers }: { layers: Layer[] }) {
  return (
    <figure>
      <div className="rounded-xl border border-line bg-surface-2/50 p-4 sm:p-6">
        {layers.map((layer, i) => (
          <div key={layer.label}>
            {i > 0 && (
              <div className="py-1.5 pl-8 text-faint sm:pl-[calc(4.5rem+2rem)]" aria-hidden>
                ↓
              </div>
            )}
            <div className="grid gap-2 sm:grid-cols-[4.5rem_1fr] sm:items-center">
              <div className="font-mono text-[11px] tracking-widest text-faint uppercase">{layer.label}</div>
              <div className="flex flex-wrap gap-2">
                {layer.nodes.map((n) => (
                  <div
                    key={n.name}
                    className={`rounded-lg border px-3 py-2 ${
                      n.mine ? "border-accent/40 bg-accent-soft" : "border-line bg-surface"
                    }`}
                  >
                    <div className={`text-sm font-semibold ${n.mine ? "text-accent" : ""}`}>{n.name}</div>
                    {n.note && <div className="mt-0.5 text-xs text-faint">{n.note}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 flex items-center gap-2 text-xs text-faint">
        <span className="inline-block h-3 w-3 rounded border border-accent/40 bg-accent-soft" />
        직접 설계·구현한 부분
      </figcaption>
    </figure>
  );
}
