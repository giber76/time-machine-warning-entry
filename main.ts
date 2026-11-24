import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Funniest Time Machine Warning Label — a single warning label for a time
// machine, 120 characters at most, aiming for the biggest laugh.
//
// The joke turns a real hazard of time travel — meeting your duplicate self —
// into the punchline, keeps a deadpan safety-notice face, and saves the
// surprise for the last few words: your past self has had years to rehearse
// an argument you have not even started yet.
const LINE =
  "WARNING: Do not argue with your past self. He has rehearsed this fight for years, and you have not.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";

// The gate allows 1-120 characters, a single line, not only whitespace.
// Fail loudly instead of writing an invalid entry if the line ever leaves
// the gate.
const length = [...LINE].length;
if (
  length < 1 ||
  length > 120 ||
  LINE.trim().length === 0 ||
  LINE.includes("\n") ||
  LINE.includes("\r") ||
  !LINE.startsWith("WARNING:")
) {
  throw new Error(
    `warning line must be a single WARNING: line of 1-120 characters, got ${length}`,
  );
}

// Create the output dir if missing. Never chmod the dir itself: on the
// grader it is a root-owned bind mount and chmod fails EPERM.
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
