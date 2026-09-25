import Link from "next/link";
import { Orb } from "@/components/Orb";
export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-4 text-center">
      <div><Orb size={120} className="mx-auto" /><h1 className="mt-8 text-3xl font-semibold">Page not found</h1><p className="mt-2 text-muted">This page doesn't exist — but AHMAZZ can probably help with what you were looking for.</p><Link href="/dashboard" className="btn-primary mt-6">Go to dashboard</Link></div>
    </main>
  );
}
