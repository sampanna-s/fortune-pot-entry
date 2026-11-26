import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const fortune =
  "A new leaf will arrive like gossip: quietly, then all over the windowsill.";

// Mirror the gate: UTF-8 text, 1-120 characters, single line, not only white space.
function assertValidFortune(text) {
  const chars = [...text].length;
  if (chars < 1 || chars > 120 || /[\r\n]/.test(text) || text.trim() === "") {
    throw new Error(`entry fails the gate: ${chars} chars`);
  }
}

function writeEntryAtomically(outputDir, text) {
  mkdirSync(outputDir, { recursive: true });
  const tmp = join(outputDir, ".entry.txt.tmp");
  writeFileSync(tmp, text, "utf8");
  renameSync(tmp, join(outputDir, "entry.txt"));
}

assertValidFortune(fortune);
writeEntryAtomically(process.env.MAKEFUN_OUTPUT_DIR || "/output", fortune);
