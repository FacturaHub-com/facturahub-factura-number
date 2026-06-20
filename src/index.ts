// @facturahub/factura-number — Numeración correlativa de facturas (España). 0 dependencias.
// Build, parse and validate sequential invoice numbers. The law requires an
// unbroken correlative series, so gap detection is first-class here.

export interface NumberParts {
  /** Serie opcional (p. ej. "FAC", "A"). */
  series?: string;
  /** Año opcional (p. ej. 2026). */
  year?: number;
  /** Secuencial. */
  seq: number;
}

export interface FormatOptions {
  /** Dígitos de relleno del secuencial (por defecto 4 → 0001). */
  pad?: number;
  /** Separador entre partes (por defecto "/"). */
  separator?: string;
}

/** Formatea un número de factura: { year:2026, seq:1 } → "2026/0001". */
export function formatNumber(parts: NumberParts, opts: FormatOptions = {}): string {
  const { pad = 4, separator = '/' } = opts;
  const seq = String(parts.seq).padStart(pad, '0');
  const segs: string[] = [];
  if (parts.series) segs.push(parts.series);
  if (parts.year != null) segs.push(String(parts.year));
  segs.push(seq);
  return segs.join(separator);
}

/** Parsea "FAC/2026/0001" → { series:'FAC', year:2026, seq:1 }. */
export function parseNumber(value: string, separator = '/'): NumberParts | null {
  const raw = (value || '').trim();
  if (!raw) return null;
  const segs = raw.split(separator).map((s) => s.trim()).filter(Boolean);
  if (segs.length === 0) return null;

  const seq = parseInt(segs[segs.length - 1], 10);
  if (!Number.isFinite(seq)) return null;

  const rest = segs.slice(0, -1);
  let year: number | undefined;
  let series: string | undefined;
  for (const s of rest) {
    if (/^\d{4}$/.test(s)) year = parseInt(s, 10);
    else series = s;
  }
  return { series, year, seq };
}

/** Devuelve el siguiente número (incrementa el secuencial). */
export function nextNumber(last: string, opts: FormatOptions = {}): string | null {
  const sep = opts.separator ?? '/';
  const parts = parseNumber(last, sep);
  if (!parts) return null;
  const pad = opts.pad ?? lastSegmentLength(last, sep);
  return formatNumber({ ...parts, seq: parts.seq + 1 }, { ...opts, pad, separator: sep });
}

function lastSegmentLength(value: string, sep: string): number {
  const segs = value.split(sep);
  return segs[segs.length - 1].trim().length || 4;
}

/** Detecta huecos en una serie de secuenciales (requisito legal: sin saltos). */
export function findGaps(numbers: Array<number | string>, separator = '/'): number[] {
  const seqs = numbers
    .map((n) => (typeof n === 'number' ? n : parseNumber(n, separator)?.seq))
    .filter((n): n is number => Number.isFinite(n as number))
    .sort((a, b) => a - b);

  const gaps: number[] = [];
  for (let i = 1; i < seqs.length; i++) {
    for (let missing = seqs[i - 1] + 1; missing < seqs[i]; missing++) {
      gaps.push(missing);
    }
  }
  return gaps;
}

/** true si la serie es correlativa y sin huecos. */
export function isCorrelative(numbers: Array<number | string>, separator = '/'): boolean {
  return findGaps(numbers, separator).length === 0;
}
