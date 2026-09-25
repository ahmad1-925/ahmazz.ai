"use client";
import { ErrorState } from "@/components/ErrorState";
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="mx-auto max-w-lg px-4 py-24"><ErrorState detail={`${error.message}${error.digest ? ` (digest ${error.digest})` : ""}`} onRetry={reset} /></main>;
}
