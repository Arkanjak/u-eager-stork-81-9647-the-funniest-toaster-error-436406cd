import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The funniest error message a kitchen toaster shows its owner.
// Gate: /output/entry.txt must be UTF-8 text of 1-120 characters, one line,
// not only whitespace. Deterministic; no network; no file reads, so the
// program behaves identically from any working directory.
//
// The line keeps the deadpan error-code format of a real appliance message,
// but the joke comes from somewhere the obvious toaster puns never go: HTTP
// 451, "unavailable for legal reasons", applied to bread — and the toaster
// ends by sending its owner to the crumbs, like a lawyer sending a client
// to the evidence. One voice, one read, every word earning its place.
const TEXT =
  "ERROR 451: Bread unavailable for legal reasons. Please consult your crumbs.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const out = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(out, TEXT, "utf8");
const n = [...TEXT].length;
if (n < 1 || n > 120 || TEXT.trim().length === 0 || TEXT.includes("\n")) {
  console.error(`entry.txt would be ${n} characters — outside the 1..120 gate`);
  process.exit(1);
}
console.log(`wrote ${out} (${n} characters)`);
