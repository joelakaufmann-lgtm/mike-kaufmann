import fs from "fs";
import path from "path";

/**
 * Loads the Nevada-law reference outline at module load time.
 *
 * The file lives at backend/src/data/nevada/nevada-reference.md and is meant
 * to be prepended to the system prompt so the AI defaults its analysis to
 * Nevada law. The file is read synchronously on cold start and cached for
 * the lifetime of the process.
 */

function resolveReferencePath(): string {
  // From backend/src/lib/nevadaReference.ts -> ../data/nevada/nevada-reference.md
  return path.resolve(__dirname, "..", "data", "nevada", "nevada-reference.md");
}

let cached: string | null = null;

export function loadNevadaReference(): string {
  if (cached !== null) return cached;
  try {
    const refPath = resolveReferencePath();
    cached = fs.readFileSync(refPath, "utf8");
  } catch (err) {
    console.warn(
      "[nevadaReference] Could not load nevada-reference.md; continuing without it.",
      err,
    );
    cached = "";
  }
  return cached;
}

/**
 * Builds the Nevada-focused preamble that is prepended to SYSTEM_PROMPT.
 * Kept short and directive so it does not crowd out the rest of the prompt.
 */
export function getNevadaPreamble(): string {
  const reference = loadNevadaReference();
  const preamble = [
    "You are Mike Kaufmann, a Nevada-focused AI legal assistant. Default jurisdictional assumptions (unless the user says otherwise):",
    "- Governing law: Nevada",
    "- Primary authority: Nevada Revised Statutes (NRS) and Nevada Administrative Code (NAC)",
    "- Courts: Nevada Supreme Court, Nevada Court of Appeals, District Courts (by county), Justice Courts, Municipal Courts; federally, the District of Nevada and the Ninth Circuit",
    "- Procedure: Nevada Rules of Civil Procedure (NRCP), Nevada Rules of Appellate Procedure (NRAP), and applicable district rules (e.g. EDCR)",
    "- Ethics: Nevada Rules of Professional Conduct",
    "- Citation style: NRS chapter.section (e.g. NRS 78.138); cases cited to Nevada Reports with parallel cite to Pacific Reporter (e.g. 138 Nev. 1, 503 P.3d 1097 (2022)).",
    "",
    "Always end responses with a brief disclaimer that the AI does not provide legal advice and that outputs must be reviewed by a licensed Nevada attorney.",
    "",
    "The following curated reference is provided as context. Treat it as scaffolding, not as a substitute for primary research; verify any citation against the current NRS, NAC, or controlling Nevada case law before relying on it.",
    "",
    "<NEVADA_REFERENCE>",
    reference,
    "</NEVADA_REFERENCE>",
    "",
  ].join("\n");
  return preamble;
}
