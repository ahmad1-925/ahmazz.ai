import { applyInstruction, buildSite, readSpec, specFromPrompt } from "@/lib/ai/demo";
import { collect, generate, pick } from "@/lib/ai/text";
import { jsonError } from "@/lib/ai/stream";
import { rateLimit, tooMany } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 120;

export async function POST(req: Request) {
  if (!rateLimit(req, { perMinute: 12, key: "website" })) return tooMany();
  try {
    const { prompt, html, instruction, provider } = (await req.json()) as { prompt?: string; html?: string; instruction?: string; provider?: string };
    const p = pick(provider);

    if (p.demo) {
      if (html && instruction) {
        const spec = readSpec(html) ?? specFromPrompt(prompt ?? "");
        const { spec: next, summary } = applyInstruction(spec, instruction);
        return Response.json({ html: buildSite(next), summary, demo: true });
      }
      const spec = specFromPrompt(prompt ?? "");
      return Response.json({ html: buildSite(spec), summary: `Built a ${spec.pages.length}-section ${spec.kind} website (“${spec.name}”) from a demo template. Try: “make the header green”, “add a gallery”, “dark theme”.`, demo: true });
    }

    const user = html && instruction
      ? `Here is the current website HTML:\n\n${html.slice(0, 60000)}\n\nApply this change and return the complete updated HTML document: ${instruction}`
      : `Create a website: ${prompt}`;
    const out = await collect(generate({ task: "website", provider, temperature: 0.5, messages: [{ role: "user", content: user }], demo: () => "" }));
    const doc = out.match(/<!doctype html[\s\S]*<\/html>/i)?.[0] ?? out.replace(/^```html?\s*|```\s*$/g, "");
    if (!/<html[\s>]/i.test(doc)) throw new Error("Model did not return HTML");
    return Response.json({ html: doc, summary: instruction ? `Updated: ${instruction}` : "Your website is ready. Ask me for any change.", demo: false });
  } catch (e) {
    return jsonError(e);
  }
}
