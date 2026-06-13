import Papa from "papaparse";
import { FIELDS, normalizeHeader, type FieldKey } from "./fields";

export interface ParsedCsv {
  headers: string[];
  rows: Record<string, string>[];
}

/** Parse a CSV File into headers + row objects keyed by header. */
export function parseCsv(file: File): Promise<ParsedCsv> {
  return new Promise((resolve, reject) => {
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: "greedy",
      transformHeader: (h) => h.trim(),
      complete: (results) => {
        const headers = (results.meta.fields ?? []).filter((h) => h && h.length > 0);
        resolve({ headers, rows: results.data });
      },
      error: (err) => reject(err),
    });
  });
}

/**
 * Suggest a field mapping for each header via case-insensitive alias matching.
 * Returns a map of header -> FieldKey ("" means skip). Each field is assigned
 * to at most one header (first match wins) to avoid duplicate targets.
 */
export function autoMap(headers: string[]): Record<string, FieldKey | ""> {
  const mapping: Record<string, FieldKey | ""> = {};
  const used = new Set<FieldKey>();

  for (const header of headers) {
    const norm = normalizeHeader(header);
    let matched: FieldKey | "" = "";

    for (const field of FIELDS) {
      if (used.has(field.key)) continue;
      if (field.aliases.includes(norm)) {
        matched = field.key;
        used.add(field.key);
        break;
      }
    }

    mapping[header] = matched;
  }

  return mapping;
}
