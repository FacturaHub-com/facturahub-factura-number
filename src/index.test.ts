import { describe, it, expect } from 'vitest';
import { formatNumber, parseNumber, nextNumber, findGaps, isCorrelative } from './index';

describe('formatNumber', () => {
  it('año + secuencial', () => {
    expect(formatNumber({ year: 2026, seq: 1 })).toBe('2026/0001');
  });
  it('serie + año + secuencial', () => {
    expect(formatNumber({ series: 'FAC', year: 2026, seq: 42 })).toBe('FAC/2026/0042');
  });
  it('pad y separador personalizados', () => {
    expect(formatNumber({ year: 2026, seq: 7 }, { pad: 6, separator: '-' })).toBe('2026-000007');
  });
});

describe('parseNumber', () => {
  it('desglosa', () => {
    expect(parseNumber('FAC/2026/0042')).toEqual({ series: 'FAC', year: 2026, seq: 42 });
    expect(parseNumber('2026/0001')).toEqual({ series: undefined, year: 2026, seq: 1 });
  });
  it('null si vacío o sin secuencial', () => {
    expect(parseNumber('')).toBeNull();
    expect(parseNumber('FAC/abc')).toBeNull();
  });
});

describe('nextNumber', () => {
  it('incrementa manteniendo formato', () => {
    expect(nextNumber('2026/0001')).toBe('2026/0002');
    expect(nextNumber('FAC/2026/0042')).toBe('FAC/2026/0043');
    expect(nextNumber('2026/0099')).toBe('2026/0100');
  });
});

describe('findGaps / isCorrelative', () => {
  it('detecta huecos', () => {
    expect(findGaps([1, 2, 4, 7])).toEqual([3, 5, 6]);
    expect(findGaps(['2026/0001', '2026/0002', '2026/0004'])).toEqual([3]);
  });
  it('sin huecos', () => {
    expect(findGaps([1, 2, 3])).toEqual([]);
    expect(isCorrelative([1, 2, 3, 4])).toBe(true);
    expect(isCorrelative([1, 3])).toBe(false);
  });
});
