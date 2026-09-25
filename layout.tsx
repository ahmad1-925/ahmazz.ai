import { Suspense } from "react";
import { AppShell } from "@/components/shell/AppShell";
import { Thinking } from "@/components/ui";

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      <Suspense fallback={<div className="p-8"><Thinking label="Loading" /></div>}>{children}</Suspense>
    </AppShell>
  );
}
