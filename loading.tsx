import { Orb } from "@/components/Orb";
export default function Loading() {
  return <div className="grid min-h-[60vh] place-items-center"><div className="flex flex-col items-center gap-4"><Orb size={80} state="thinking" /><p className="text-sm text-muted">Loading…</p></div></div>;
}
