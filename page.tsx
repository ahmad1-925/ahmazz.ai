"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { PenLine } from "lucide-react";
import { PageHeader, Segmented } from "@/components/ui";
import { TextTool } from "@/components/TextTool";
import { LANGUAGES } from "@/lib/shared/capabilities";

const KINDS = ["Email", "Application", "Essay", "Report", "Assignment", "Research paper", "CV", "Cover letter", "Social media post", "Caption", "Story", "Script", "Speech", "Business document"] as const;
const TONES = ["Professional", "Friendly", "Simple", "Academic", "Creative", "Formal"] as const;

export default function WritePage() {
  const sp = useSearchParams();
  const [input, setInput] = useState(sp.get("prompt") ?? sp.get("text") ?? "");
  const [kind, setKind] = useState<string>("Email");
  const [tone, setTone] = useState<string>("Professional");
  const [length, setLength] = useState<string>("Short");
  const [language, setLanguage] = useState("English");
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <PageHeader icon={<PenLine className="h-5 w-5" />} title="Writing Assistant" subtitle="Emails, applications, CVs, essays, posts, scripts and more." />
      <TextTool task="write" kind="writing" input={input} setInput={setInput} autoRun={!!sp.get("auto")} options={{ kind, tone, length, language }} placeholder="e.g. Write an application to my principal for 3 days' leave due to a family wedding."
        controls={
          <>
            <div><p className="label">Type</p><Segmented label="Type" value={kind} options={KINDS} onChange={setKind} /></div>
            <div><p className="label">Tone</p><Segmented label="Tone" value={tone} options={TONES} onChange={setTone} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><p className="label">Length</p><Segmented label="Length" value={length} options={["Short", "Detailed"]} onChange={setLength} /></div>
              <div><label className="label" htmlFor="wl">Language</label><select id="wl" className="input py-1.5" value={language} onChange={(e) => setLanguage(e.target.value)}>{LANGUAGES.map((l) => <option key={l.code}>{l.name}</option>)}</select></div>
            </div>
          </>
        } />
    </div>
  );
}
