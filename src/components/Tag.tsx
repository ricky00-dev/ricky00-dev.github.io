const colors: Record<string, string> = {
  Performance: "bg-amber-50 text-amber-700 ring-amber-200",
  Security: "bg-rose-50 text-rose-700 ring-rose-200",
  Backend: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  Debugging: "bg-sky-50 text-sky-700 ring-sky-200",
  Database: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Infra: "bg-slate-100 text-slate-700 ring-slate-200",
  Architecture: "bg-violet-50 text-violet-700 ring-violet-200",
  Search: "bg-teal-50 text-teal-700 ring-teal-200",
  Caching: "bg-orange-50 text-orange-700 ring-orange-200",
  Messaging: "bg-cyan-50 text-cyan-700 ring-cyan-200",
  Realtime: "bg-cyan-50 text-cyan-700 ring-cyan-200",
};

export function Tag({ name }: { name: string }) {
  const c = colors[name] ?? "bg-stone-100 text-stone-700 ring-stone-200";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${c}`}>
      {name}
    </span>
  );
}
