export type RosterRow = { name: string; netid: string; house: string };

/**
 * Parse a roster CSV with columns name, netid, house. A header row is
 * detected and skipped. Handles double-quoted fields with embedded commas.
 */
export function parseRosterCsv(text: string): {
  rows: RosterRow[];
  errors: string[];
} {
  const rows: RosterRow[] = [];
  const errors: string[] = [];
  const lines = text.split(/\r\n|\n|\r/).filter((l) => l.trim().length > 0);

  lines.forEach((line, idx) => {
    const fields = splitCsvLine(line).map((f) => f.trim());
    if (idx === 0 && fields[0]?.toLowerCase() === "name") return; // header
    if (fields.length < 3) {
      errors.push(`Line ${idx + 1}: expected 3 columns (name, netid, house).`);
      return;
    }
    const [name, netid, house] = fields;
    if (!name || !netid || !house) {
      errors.push(`Line ${idx + 1}: missing name, netid, or house.`);
      return;
    }
    rows.push({ name, netid: netid.toLowerCase(), house });
  });

  return { rows, errors };
}

function splitCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cur += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      out.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out;
}
